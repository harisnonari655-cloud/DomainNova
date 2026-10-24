import { Guide } from '../types/guide';

export const GUIDES: Guide[] = [
  {
    id: 'dns-records-explained',
    title: 'DNS Records Explained: A, AAAA, CNAME, TXT & NS',
    description: 'A complete, practical breakdown of the fundamental DNS record types used when setting up free domains and subdomains.',
    category: 'dns_basics',
    readingTimeMinutes: 5,
    lastUpdated: '2026-10-22',
    sections: [
      {
        heading: '1. What Happens When a Domain Resolves',
        content: 'The Domain Name System (DNS) translates human-readable addresses like myapp.is-a.dev into machine-routable IP addresses. When a browser queries your domain, it reaches out to recursive resolvers, root servers, TLD authoritative servers, and finally your specific authoritative nameserver.'
      },
      {
        heading: '2. The Core DNS Record Types',
        content: 'Here are the primary records you will encounter when configuring free subdomains:\n\n• A Record (Address): Maps a hostname directly to an IPv4 address (e.g., 185.199.108.153).\n• AAAA Record (IPv6): Maps a hostname to an IPv6 address (e.g., 2606:4700::6811:d209).\n• CNAME Record (Canonical Name): Creates an alias pointing one domain name to another domain name. Crucial rule: RFC 1912 forbids CNAME records on the root/apex domain (e.g., example.com) if other records exist, but subdomains (like app.example.com) use CNAME freely.\n• TXT Record: Holds arbitrary text used for domain verification, SPF email security, and Let\'s Encrypt ACME DNS-01 challenges.\n• NS Record (Name Server): Specifies which DNS servers are authoritative for the entire domain or sub-zone.',
        codeExample: {
          language: 'dns-zone',
          caption: 'Sample DNS Zone Configuration',
          code: '; A Record for direct IPv4 server\napi.myapp.is-a.dev.   300 IN A      192.0.2.1\n\n; CNAME Record for GitHub Pages\nwww.myapp.is-a.dev.   300 IN CNAME  username.github.io.\n\n; TXT Record for SSL certificate validation\n_acme-challenge.myapp 300 IN TXT    "e0A9d_fKl827hZbQ..."'
        }
      },
      {
        heading: '3. TTL (Time To Live)',
        content: 'TTL indicates how many seconds intermediate DNS resolvers and ISPs cache your DNS answer before re-checking. When setting up a new domain or migrating servers, keep your TTL low (e.g., 300 seconds = 5 minutes). Once stable, you can increase it to 3600 (1 hour) or 86400 (24 hours).',
        tip: 'If your DNS changes do not seem to appear immediately, test directly against Google DNS (8.8.8.8) or Cloudflare DNS (1.1.1.1) to bypass local router caching.'
      }
    ],
    relatedProviders: ['is-a-dev', 'duckdns', 'eu-org']
  },
  {
    id: 'github-pages-custom-domain',
    title: 'Connecting a Free Subdomain to GitHub Pages',
    description: 'Step-by-step guide on configuring custom subdomains (such as is-a.dev or js.org) with GitHub Pages and enabling HTTPS.',
    category: 'hosting',
    readingTimeMinutes: 4,
    lastUpdated: '2026-10-21',
    sections: [
      {
        heading: '1. Create Your CNAME File',
        content: 'GitHub Pages requires a file named CNAME (all uppercase, without any extension) located in the root of your publishing branch (usually main or gh-pages). The file must contain exactly one line with your custom domain name.',
        codeExample: {
          language: 'text',
          caption: 'CNAME file in root directory',
          code: 'portfolio.is-a.dev'
        }
      },
      {
        heading: '2. Configure the DNS Provider',
        content: 'On your DNS provider or subdomain registry (e.g. is-a.dev pull request), specify a CNAME record with:\n• Name: your chosen subdomain\n• Target: <your-github-username>.github.io\n\nDo NOT point the CNAME to your repository name or repository URL. It must always point to your username root hostname.'
      },
      {
        heading: '3. Enforce HTTPS in GitHub Settings',
        content: 'Go to your repository on GitHub > Settings > Pages. Verify that your Custom Domain displays a green checkmark indicating DNS check passed. Then check the box "Enforce HTTPS". GitHub will automatically coordinate with Let\'s Encrypt to provision a certificate (usually takes 5 to 15 minutes).',
        warning: 'Do not click "Enforce HTTPS" until DNS propagation has finished; otherwise certificate issuance may fail temporarily.'
      }
    ],
    relatedProviders: ['github-pages', 'is-a-dev', 'js-org']
  },
  {
    id: 'vercel-custom-domain-guide',
    title: 'Custom Subdomains & CNAME Setup on Vercel',
    description: 'Learn how Vercel handles project domains, preview branch domains, and custom CNAME records.',
    category: 'hosting',
    readingTimeMinutes: 4,
    lastUpdated: '2026-10-22',
    sections: [
      {
        heading: '1. Vercel Domain Architecture',
        content: 'Every Vercel project receives a production URL ending in .vercel.app. In addition, you can add unlimited custom domains and subdomains in your project settings.'
      },
      {
        heading: '2. Adding the Subdomain',
        content: 'Navigate to Project Settings > Domains. Enter your desired subdomain (e.g., showcase.is-a.dev). Vercel will immediately display the required DNS records: typically a CNAME record pointing to cname.vercel-dns.com.'
      },
      {
        heading: '3. Cloudflare Proxy (Orange Cloud) Warning',
        content: 'If your domain’s DNS is managed by Cloudflare, ensure the proxy status for the Vercel CNAME is set to "DNS Only" (Grey Cloud) during initial certificate issuance, unless you configure Cloudflare SSL in "Full (Strict)" mode. Vercel provisions its own SSL certificate at the Edge.',
        tip: 'Vercel checks DNS records every 10 seconds while the domain settings modal is open.'
      }
    ],
    relatedProviders: ['vercel-app', 'is-a-dev']
  },
  {
    id: 'duckdns-homelab-ssl',
    title: 'Home Lab Dynamic DNS & Free SSL with Duck DNS',
    description: 'How to route dynamic home residential IPs to Duck DNS and issue Let\'s Encrypt certificates using ACME DNS-01 challenges.',
    category: 'ssl',
    readingTimeMinutes: 6,
    lastUpdated: '2026-10-20',
    sections: [
      {
        heading: '1. Why Dynamic DNS is Essential for Self-Hosters',
        content: 'Most residential internet service providers (ISPs) change your home public IP address periodically. A Dynamic DNS (DDNS) daemon automatically detects when your IP changes and updates your Duck DNS record in real-time.'
      },
      {
        heading: '2. Updating Duck DNS via Curl or Cron',
        content: 'Duck DNS provides a secure REST API. Running a simple one-line curl command updates your record immediately:',
        codeExample: {
          language: 'bash',
          caption: 'Duck DNS Update Script (run every 10 minutes)',
          code: 'echo url="https://www.duckdns.org/update?domains=myhomelab&token=YOUR-TOKEN-HERE&ip=" | curl -k -o ~/duckdns/duck.log -K -'
        }
      },
      {
        heading: '3. Obtaining SSL for Internal Services (No Open Ports Needed)',
        content: 'Normally, HTTP-01 Let\'s Encrypt challenges require port 80 to be forwarded and reachable from the public internet. However, with Duck DNS and Certbot\'s DNS-01 challenge plugin, you can generate authentic trusted SSL certificates by creating temporary TXT records via the Duck DNS API—allowing full HTTPS on your private local home network!',
        tip: 'Tools like Nginx Proxy Manager, Caddy, and Traefik have built-in native Duck DNS ACME plugins.'
      }
    ],
    relatedProviders: ['duckdns']
  },
  {
    id: 'truth-about-free-domains',
    title: 'The Truth About "Free Domains": What Really Happened to Freenom (.tk, .ml)',
    description: 'An authoritative, educational exposé on domain economics, why ICANN-regulated free top-level domains collapsed, and how to stay safe from domain scams.',
    category: 'troubleshooting',
    readingTimeMinutes: 7,
    lastUpdated: '2026-10-24',
    sections: [
      {
        heading: '1. The History of Free TLDs (Freenom Collapse)',
        content: 'Between 2005 and 2023, many tutorials recommended "free top-level domains" such as .tk, .ml, .ga, .cf, and .gq provided by the company Freenom. Users believed they owned these domains. In reality, users were only licensed temporary usage rights. Freenom could—and frequently did—reclaim monetizable domains without notice.\n\nIn 2023, following major lawsuits over systemic abuse, trademark infringement, and lack of anti-phishing controls, Freenom stopped offering free domain registrations and ceased operations. Today, there are NO legitimate ICANN-accredited registries giving away unconditioned free .com, .net, or .org domain registrations.'
      },
      {
        heading: '2. The Difference Between an SLD and a Subdomain',
        content: 'A Second-Level Domain (SLD) like example.com requires annual registration fees paid to the TLD registry and ICANN ($0.18 ICANN fee + registry wholesale price). That is why genuine SLDs are rarely free unless subsidized as a student promotion (e.g. GitHub Student Developer Pack with Namecheap) or cloud credit.\n\nIn contrast, community subdomains (like is-a.dev, js.org, or eu.org) operate transparently: the root domain owner maintains the primary registry and freely delegates sub-zones or DNS records to legitimate developers and open-source projects.'
      },
      {
        heading: '3. Common Free Domain Scams to Avoid',
        content: 'Beware of websites promising "Free .COM domains for life with no credit card":\n\n• Hidden Subscription Traps: The first month is free, but high auto-renew charges are locked into terms.\n• Forced High-Ad Parking: The provider replaces your site with intrusive spam advertisements.\n• Identity & Phishing Harvesting: Asking for personal passport or ID uploads to "verify" a non-existent free domain.\n• Unofficial Scrapes: Services pretending to register your domain while having no actual connection to the authoritative registrar.',
        warning: 'Never enter personal passwords or credit card numbers on third-party sites claiming to offer free premium .com domains.'
      }
    ],
    relatedProviders: ['eu-org', 'is-a-dev', 'github-pages']
  }
];
