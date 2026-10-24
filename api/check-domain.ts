import type { Request, Response } from 'express';

export default async function handler(req: Request, res: Response) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  const domainQuery = (req.query.domain as string || '').trim().toLowerCase();
  if (!domainQuery) {
    return res.status(400).json({ error: 'Domain parameter is required' });
  }

  const cleanDomain = domainQuery
    .replace(/^[a-z]+:\/\//i, '')
    .split('/')[0]
    .split(':')[0]
    .replace(/\.$/, '');

  if (!cleanDomain || !cleanDomain.includes('.')) {
    return res.status(400).json({ error: 'Invalid domain format. Must include an extension (e.g., example.com).' });
  }

  const communitySuffixes = ['is-a.dev', 'js.org', 'github.io', 'vercel.app', 'workers.dev', 'netlify.app', 'duckdns.org', 'eu.org', 'onrender.com'];
  const matchedCommunity = communitySuffixes.find(suffix => cleanDomain.endsWith('.' + suffix));
  const checkedAt = new Date().toISOString();

  // 1. Community Subdomain Registry flow
  if (matchedCommunity) {
    let dnsActive = false;
    let dnsRecords: { type: string; data: string }[] = [];
    try {
      const dohRes = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(cleanDomain)}&type=ANY`, {
        signal: AbortSignal.timeout(3500)
      });
      if (dohRes.ok) {
        const dohData = await dohRes.json();
        if (dohData.Answer && dohData.Answer.length > 0) {
          dnsActive = true;
          dnsRecords = dohData.Answer.map((a: any) => ({
            type: a.type === 1 ? 'A' : a.type === 28 ? 'AAAA' : a.type === 5 ? 'CNAME' : a.type === 16 ? 'TXT' : `Type ${a.type}`,
            data: a.data
          }));
        }
      }
    } catch {
      // DoH request timed out
    }

    return res.json({
      source: 'Community Subdomain Registry & DNS Resolver',
      status: dnsActive ? 'registered' : 'check_official_registrar',
      statusDetails: dnsActive
        ? `Active DNS records found for ${cleanDomain}. Name appears to be currently in active use on ${matchedCommunity}.`
        : `No active public DNS records resolved. In community registries, names may still be reserved in pending pull requests, account namespaces, or blocklists. Check claim status on provider.`,
      checkedAt,
      domainName: cleanDomain,
      hasActiveDnsRecords: dnsActive,
      dnsRecords,
      officialRegistrarUrl: `https://${matchedCommunity}`,
      notes: [
        `This is a ${matchedCommunity} community subdomain, not an ICANN root domain.`,
        dnsActive ? 'Active DNS records detect active traffic routing.' : 'Never assume a domain is claimable solely from DNS absence; verify with the provider repository.',
        'Final eligibility and claim approval depends on community registry rules.'
      ]
    });
  }

  // 2. Standard TLD flow (e.g. example.com, mydomain.org)
  try {
    const dohRes = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(cleanDomain)}&type=NS`, {
      signal: AbortSignal.timeout(3500)
    });

    if (dohRes.ok) {
      const dohData = await dohRes.json();
      const hasNsAnswer = dohData.Answer && dohData.Answer.length > 0;
      const isNxDomain = dohData.Status === 3;

      if (hasNsAnswer) {
        const nsList = dohData.Answer.map((a: any) => a.data).join(', ');
        return res.json({
          source: 'Google Public DNS (DoH)',
          status: 'registered',
          statusDetails: `Active authoritative nameservers detected (${nsList}). Domain is registered and actively delegated on the global DNS network.`,
          checkedAt,
          domainName: cleanDomain,
          hasActiveDnsRecords: true,
          dnsRecords: dohData.Answer.map((a: any) => ({ type: 'NS', data: a.data })),
          officialRegistrarUrl: `https://lookup.icann.org/en/lookup?q=${encodeURIComponent(cleanDomain)}`,
          notes: [
            'Active nameservers confirm domain registration.',
            'Registration dates and sponsoring registrar can be reviewed via official ICANN lookup.',
            'This domain cannot be claimed or registered for free.'
          ]
        });
      }

      if (isNxDomain) {
        return res.json({
          source: 'DNS Resolution Check',
          status: 'likely_available',
          statusDetails: `DNS query returned NXDOMAIN (no active nameservers found). Note: A domain without DNS records might still be registered; check live availability on an official registrar.`,
          checkedAt,
          domainName: cleanDomain,
          hasActiveDnsRecords: false,
          officialRegistrarUrl: `https://www.namecheap.com/domains/registration/results/?domain=${encodeURIComponent(cleanDomain)}`,
          notes: [
            'Absence of DNS resolution is a strong indicator, but not a legal guarantee of availability.',
            'Standard TLDs require annual ICANN wholesale registration fees ($9 - $15/yr typical).',
            'Verify exact real-time availability and renewal costs on an accredited registrar.'
          ]
        });
      }
    }
  } catch {
    // Fallback
  }

  return res.json({
    source: 'None',
    status: 'check_official_registrar',
    statusDetails: `Live availability check API not configured for this specific TLD extension. Please check real-time status on an official registrar.`,
    checkedAt,
    domainName: cleanDomain,
    officialRegistrarUrl: `https://lookup.icann.org/en/lookup?q=${encodeURIComponent(cleanDomain)}`,
    notes: [
      'Live availability check not configured for this registry.',
      'Check official registrar search page for exact pricing and live availability.'
    ]
  });
}
