import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '1mb' }));

// Helper to initialize GoogleGenAI with proper User-Agent header
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

// Security Headers Middleware
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Domain Checker Route (Honest DoH + RDAP + Registrar link)
app.get('/api/check-domain', async (req: Request, res: Response) => {
  const domainQuery = (req.query.domain as string || '').trim().toLowerCase();
  if (!domainQuery) {
    return res.status(400).json({ error: 'Domain parameter is required' });
  }

  // Sanitation
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
        // Honest disclosure per prompt guidelines
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
    // Network fallback
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
});

// Gemini 4 Argon High Thinking Advisor Route
app.post('/api/ai/advisor', async (req: Request, res: Response) => {
  const { question, context } = req.body;

  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'Question string is required' });
  }

  const ai = getGeminiClient();

  if (!ai) {
    return res.status(503).json({
      error: 'GEMINI_API_KEY is not configured on the server.',
      message: 'To use the High Thinking Architecture Advisor, ensure GEMINI_API_KEY is set in your environment variables. You can add it in the Secrets panel in AI Studio or .env.'
    });
  }

  try {
    const prompt = `User Query: "${question}"\n\nContext:\n${context || 'General domain and hosting architecture question.'}`;

    // Per instruction: Use gemini-4-argon with thinkingLevel: ThinkingLevel.HIGH, do NOT set maxOutputTokens
    const response = await ai.models.generateContent({
      model: 'gemini-4-argon',
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.HIGH
        },
        systemInstruction: `You are the Lead Systems & DNS Infrastructure Engineer at DomainNova.
You provide deep, technically pristine, actionable answers to developers seeking to deploy websites, home labs, APIs, and portfolios using free domains, free subdomains, and cloud platforms (GitHub Pages, Vercel, Cloudflare, DuckDNS, is-a.dev, js.org, eu.org).

Key Rules:
1. Be 100% truthful. Never claim a commercial .com is free. Explain ICANN wholesale costs.
2. Detail exact DNS record types (A, AAAA, CNAME, ALIAS, TXT, MX) and exact host/target values.
3. Provide step-by-step troubleshooting for common SSL failures, CAA record collisions, and Cloudflare Orange Cloud vs Grey Cloud conflicts.
4. Explain ownership vs delegation rights clearly.
5. Provide code blocks for CNAME files, nginx/caddy configs, or curl scripts where appropriate.
6. Format responses with clean Markdown, clear headings, and bullet points.`
      }
    });

    const reply = response.text || 'No response generated from the model.';

    return res.json({
      success: true,
      model: 'gemini-4-argon',
      thinkingLevel: 'HIGH',
      answer: reply,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Error generating AI advice:', error);
    return res.status(500).json({
      error: 'Failed to generate advice with Gemini 4 Argon.',
      details: error.message || 'Unknown error occurred during AI processing.'
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`DomainNova server running on http://localhost:${PORT}`);
  });
}

startServer();
