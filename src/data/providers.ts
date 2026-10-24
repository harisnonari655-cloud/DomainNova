import { Provider } from '../types/provider';

export const PROVIDERS: Provider[] = [
  {
    id: 'is-a-dev',
    name: 'is-a.dev',
    tagline: 'Free subdomain service designed exclusively for developers and tech portfolios',
    category: 'developer_community',
    domainType: 'registrable_subdomain',
    samplePattern: 'yourname.is-a.dev',
    availableSuffixes: ['is-a.dev'],
    priceModel: '100% Free',
    officialUrl: 'https://is-a.dev',
    docsUrl: 'https://is-a.dev/docs',
    claimUrl: 'https://github.com/is-a-dev/register',
    dnsSupport: true,
    dnsSupportDetails: 'Supports CNAME, A, AAAA, TXT, MX, and URL redirects configured via automated JSON pull request on GitHub.',
    supportedRecordTypes: ['A', 'AAAA', 'CNAME', 'TXT', 'MX', 'URL'],
    sslSupport: 'DNS-01 ACME / Let\'s Encrypt',
    renewalConditions: 'Free indefinitely as long as your registered GitHub repository/PR remains valid. Occasional registry pings may be sent.',
    eligibility: [
      'Must have an active GitHub account with genuine development history',
      'Intended for developer portfolios, open-source projects, and personal tools',
      'No phishing, spam, redirect abuse, or commercially deceptive sites',
      'One subdomain per GitHub account by default (additional upon review)'
    ],
    restrictions: [
      'NS delegation is restricted to prevent zone takeover',
      'Cannot be used for commercial ad farms or illicit content',
      'Pull requests undergo automated linting and community maintainer review'
    ],
    ownershipModel: 'Community Delegated Subdomain (DNS Control)',
    verificationStatus: 'FREE VERIFIED',
    lastVerifiedDate: '2026-10-20',
    evidence: 'Official registration documentation at https://is-a.dev/docs/guidelines confirms zero fees, GitHub PR automated workflow, and community guidelines.',
    stepByStepClaim: [
      {
        step: 1,
        title: 'Fork the Registry Repository',
        description: 'Navigate to https://github.com/is-a-dev/register and create a personal fork of the repository.'
      },
      {
        step: 2,
        title: 'Create Your JSON Record',
        description: 'Inside the domains/ directory, create a new file named <yourname>.json specifying your record type (CNAME, A, etc.) and target.'
      },
      {
        step: 3,
        title: 'Submit Pull Request',
        description: 'Open a PR against the main branch. Automated GitHub Actions run syntax checks, and maintainers merge within 24-48 hours.'
      },
      {
        step: 4,
        title: 'Configure Your Host',
        description: 'Point your host (GitHub Pages, Vercel, Cloudflare Pages) to expect <yourname>.is-a.dev and request an automated SSL certificate.'
      }
    ],
    technicalPros: [
      'Clean, prestigious domain suffix for developer resumes and portfolios',
      'Git-backed configuration with complete commit history',
      'Supports Cloudflare CNAME flattening and Apex A records',
      'Active open-source maintenance team'
    ],
    technicalCons: [
      'Requires basic Git/GitHub knowledge to edit JSON and submit PR',
      'Subject to community maintainer merge schedule (typically 12-48h)'
    ],
    recommendedUseCases: ['Developer portfolios', 'GitHub Pages custom domain', 'Side project showcases', 'API documentation'],
    isPopular: true
  },
  {
    id: 'js-org',
    name: 'JS.ORG',
    tagline: 'Dedicated free subdomains for genuine JavaScript, TypeScript & Web tech open-source projects',
    category: 'developer_community',
    domainType: 'registrable_subdomain',
    samplePattern: 'yourproject.js.org',
    availableSuffixes: ['js.org'],
    priceModel: 'Free for Open Source',
    officialUrl: 'https://js.org',
    docsUrl: 'https://github.com/js-org/js.org#readme',
    claimUrl: 'https://github.com/js-org/js.org',
    dnsSupport: true,
    dnsSupportDetails: 'CNAME delegation pointing to GitHub Pages, Cloudflare Pages, GitLab Pages, or compatible static hosts.',
    supportedRecordTypes: ['CNAME'],
    sslSupport: 'Automated Let\'s Encrypt',
    renewalConditions: 'Free forever as long as the underlying open-source project remains public, active, and compliant with guidelines.',
    eligibility: [
      'Must be a genuine open-source JavaScript, TypeScript, or Node.js project',
      'Repository must have an OSI-approved open-source license (MIT, Apache-2.0, etc.)',
      'Must provide substantive content, documentation, or useful utility (not an empty placeholder)',
      'Site must be hosted on a supported public platform (GitHub Pages preferred)'
    ],
    restrictions: [
      'Personal portfolios or general non-JS projects are rejected',
      'No advertising, commercial sales funnels, cryptocurrency pumps, or affiliate schemes',
      'Cannot register generic words (e.g., react.js.org, api.js.org) without being the official maintainer'
    ],
    ownershipModel: 'Community Delegated Subdomain (DNS Control)',
    verificationStatus: 'FREE VERIFIED',
    lastVerifiedDate: '2026-10-20',
    evidence: 'Official JS.ORG policy on GitHub (https://github.com/js-org/js.org) states: "JS.ORG is a free service provided to the JavaScript community since 2015."',
    stepByStepClaim: [
      {
        step: 1,
        title: 'Deploy Project on GitHub Pages',
        description: 'Publish your open-source documentation or demo site on GitHub Pages or Cloudflare Pages with your source repo public.'
      },
      {
        step: 2,
        title: 'Add CNAME in Repository',
        description: 'Add a CNAME file containing <project>.js.org into your gh-pages branch or publishing source.'
      },
      {
        step: 3,
        title: 'Submit PR to js-org/js.org',
        description: 'Edit cnames_active.js in the js-org repo to append your desired subdomain and target username.github.io.'
      },
      {
        step: 4,
        title: 'Review & Live Activation',
        description: 'Once merged by the js.org team, DNS propagates worldwide within minutes and Let\'s Encrypt issues SSL automatically.'
      }
    ],
    technicalPros: [
      'Extremely high domain authority and instant trust in the JS/TS ecosystem',
      'Over 9 years of rock-solid uptime and service history',
      'Included in public search indexes seamlessly'
    ],
    technicalCons: [
      'Strictly limited to JavaScript/TypeScript projects',
      'Only CNAME records are supported (no custom MX or TXT)'
    ],
    recommendedUseCases: ['JS/TS libraries', 'NPM package documentation', 'Web developer open-source utilities', 'Educational JS tutorials'],
    isPopular: true
  },
  {
    id: 'github-pages',
    name: 'GitHub Pages',
    tagline: 'Standard hosting subdomain for GitHub users, organizations, and public repositories',
    category: 'static_hosting',
    domainType: 'hosting_subdomain',
    samplePattern: 'username.github.io',
    availableSuffixes: ['github.io'],
    priceModel: '100% Free',
    officialUrl: 'https://pages.github.com',
    docsUrl: 'https://docs.github.com/en/pages',
    claimUrl: 'https://github.com/new',
    dnsSupport: false,
    dnsSupportDetails: 'Fixed hosting address assigned by GitHub. You can attach your own custom domain, but github.io DNS cannot be edited for other hosts.',
    supportedRecordTypes: ['Fixed Platform Hostname'],
    sslSupport: 'Automated Let\'s Encrypt',
    renewalConditions: 'Free permanently as long as the GitHub account and repository remain in good standing.',
    eligibility: [
      'Any registered GitHub user or organization',
      'Repository must stay within fair-use limits (recommended < 1GB, 100GB monthly bandwidth)'
    ],
    restrictions: [
      'Static sites only (HTML, CSS, client-side JS, Jekyll)',
      'No server-side backend execution (PHP, Node server, Python backend)',
      'Not for cryptocurrency mining, high-frequency commercial commerce, or password harvesting'
    ],
    ownershipModel: 'Platform Hosted Subdomain (No Domain Ownership)',
    verificationStatus: 'FREE VERIFIED',
    lastVerifiedDate: '2026-10-20',
    evidence: 'GitHub Docs: https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages - "GitHub Pages is available in public repositories with GitHub Free."',
    stepByStepClaim: [
      {
        step: 1,
        title: 'Create Special Repository',
        description: 'Create a new public repository named <username>.github.io where <username> is your exact GitHub account handle.'
      },
      {
        step: 2,
        title: 'Add index.html',
        description: 'Commit an index.html file or build output to the main/master branch.'
      },
      {
        step: 3,
        title: 'Enable Pages in Settings',
        description: 'Go to Settings > Pages > Source > Deploy from a branch (main / root) and click Save.'
      },
      {
        step: 4,
        title: 'Site Live with HTTPS',
        description: 'GitHub builds the site and provides an automatic SSL certificate at https://<username>.github.io.'
      }
    ],
    technicalPros: [
      'Instant global CDN through Fastly and GitHub infrastructure',
      'Zero maintenance, zero billing setup required',
      'Built-in GitHub Actions CI/CD workflows'
    ],
    technicalCons: [
      'Platform subdomain only (cannot delegate DNS records to external VPS or email)',
      'Static assets only, no dynamic backend'
    ],
    recommendedUseCases: ['Personal portfolios', 'Open-source documentation', 'Static blogs', 'JAMstack websites'],
    isPopular: true
  },
  {
    id: 'vercel-app',
    name: 'Vercel App',
    tagline: 'High-performance Edge deployment subdomains for Next.js, React, and serverless apps',
    category: 'cloud_platform',
    domainType: 'hosting_subdomain',
    samplePattern: 'yourproject.vercel.app',
    availableSuffixes: ['vercel.app'],
    priceModel: 'Free Tier Included',
    officialUrl: 'https://vercel.com',
    docsUrl: 'https://vercel.com/docs/domains/working-with-domains',
    claimUrl: 'https://vercel.com/new',
    dnsSupport: false,
    dnsSupportDetails: 'Hosting platform subdomain automatically generated for each project and preview branch. DNS is managed entirely by Vercel Edge network.',
    supportedRecordTypes: ['Fixed Platform Hostname'],
    sslSupport: 'Automated Let\'s Encrypt',
    renewalConditions: 'Free perpetually on Vercel Hobby plan within bandwidth and serverless function limits.',
    eligibility: [
      'Free Hobby tier for personal, non-commercial, and hobbyist projects',
      'Requires GitHub, GitLab, or Bitbucket sign-in'
    ],
    restrictions: [
      'Hobby tier prohibits commercial enterprise production use',
      'Must follow Vercel Fair Use guidelines (100GB bandwidth/month on free tier)',
      'Cannot delegate vercel.app DNS externally'
    ],
    ownershipModel: 'Platform Hosted Subdomain (No Domain Ownership)',
    verificationStatus: 'FREE VERIFIED',
    lastVerifiedDate: '2026-10-20',
    evidence: 'Official Vercel Documentation at https://vercel.com/docs/domains confirms every deployment receives a default .vercel.app domain at zero cost.',
    stepByStepClaim: [
      {
        step: 1,
        title: 'Sign in to Vercel',
        description: 'Log in at vercel.com using your GitHub account.'
      },
      {
        step: 2,
        title: 'Import Repository',
        description: 'Click "Add New" > "Project" and import your frontend or full-stack web project.'
      },
      {
        step: 3,
        title: 'Configure Project Name',
        description: 'The project name you select determines your initial subdomain: <project-name>.vercel.app.'
      },
      {
        step: 4,
        title: 'Deploy',
        description: 'Vercel builds and deploys to their Edge Network with automatic SSL enabled.'
      }
    ],
    technicalPros: [
      'Exceptional performance with Global Edge Network caching',
      'Supports full-stack serverless functions and SSR',
      'Automatic preview branches for every Git commit'
    ],
    technicalCons: [
      'Subdomain is tied to Vercel hosting only',
      'Hobby plan has commercial usage restrictions'
    ],
    recommendedUseCases: ['Modern React/Next.js apps', 'API prototypes', 'Production hobby tools', 'Client demos'],
    isPopular: true
  },
  {
    id: 'cloudflare-workers',
    name: 'Cloudflare Workers (workers.dev)',
    tagline: 'Edge compute serverless subdomains backed by Cloudflare global anycast network',
    category: 'cloud_platform',
    domainType: 'hosting_subdomain',
    samplePattern: 'your-worker.your-subdomain.workers.dev',
    availableSuffixes: ['workers.dev'],
    priceModel: 'Free Tier Included',
    officialUrl: 'https://workers.cloudflare.com',
    docsUrl: 'https://developers.cloudflare.com/workers/configuration/routing/workers-dev/',
    claimUrl: 'https://dash.cloudflare.com',
    dnsSupport: false,
    dnsSupportDetails: 'Routed directly to Cloudflare V8 worker isolates across 300+ cities globally.',
    supportedRecordTypes: ['Edge Worker Route'],
    sslSupport: 'Platform Native SSL',
    renewalConditions: 'Free with Cloudflare free tier (100,000 requests/day).',
    eligibility: [
      'Any Cloudflare account holder',
      'User registers one unique workers.dev subdomain prefix per account'
    ],
    restrictions: [
      'Subdomain is exclusively for routing to Cloudflare Workers scripts',
      'Free tier limit: 100,000 requests per day, 10ms CPU execution time per invocation'
    ],
    ownershipModel: 'Platform Hosted Subdomain (No Domain Ownership)',
    verificationStatus: 'FREE VERIFIED',
    lastVerifiedDate: '2026-10-20',
    evidence: 'Cloudflare Workers Developer Docs: https://developers.cloudflare.com/workers/configuration/routing/workers-dev/ explains free workers.dev subdomains.',
    stepByStepClaim: [
      {
        step: 1,
        title: 'Sign Up for Cloudflare',
        description: 'Create an account on cloudflare.com and open Workers & Pages.'
      },
      {
        step: 2,
        title: 'Choose workers.dev Subdomain',
        description: 'Pick an available account-level namespace, e.g. <yourteam>.workers.dev.'
      },
      {
        step: 3,
        title: 'Deploy a Worker',
        description: 'Deploy code via the web dashboard editor or Wrangler CLI (npx wrangler deploy).'
      },
      {
        step: 4,
        title: 'Test Your Endpoint',
        description: 'Worker is immediately accessible with wildcard HTTPS at https://<worker-name>.<yourteam>.workers.dev.'
      }
    ],
    technicalPros: [
      'Sub-millisecond cold starts across 300+ global data centers',
      'Wildcard HTTPS included by default',
      'Powerful API gateway and microservice capability'
    ],
    technicalCons: [
      'Only routes to Cloudflare Worker scripts, cannot host regular arbitrary VPS or external server',
      'Format is 2 levels deep: <worker>.<account>.workers.dev'
    ],
    recommendedUseCases: ['Serverless microservices', 'Webhooks', 'Edge redirects', 'API proxies', 'Lightweight backends']
  },
  {
    id: 'netlify-app',
    name: 'Netlify App',
    tagline: 'Instant web hosting subdomains with automated CI/CD and serverless edge functions',
    category: 'static_hosting',
    domainType: 'hosting_subdomain',
    samplePattern: 'yoursite.netlify.app',
    availableSuffixes: ['netlify.app'],
    priceModel: 'Free Tier Included',
    officialUrl: 'https://www.netlify.com',
    docsUrl: 'https://docs.netlify.com/domains-https/custom-domains/',
    claimUrl: 'https://app.netlify.com',
    dnsSupport: false,
    dnsSupportDetails: 'Fixed hosting address assigned by Netlify. Fully routed to Netlify Edge CDN with automatic HTTPS.',
    supportedRecordTypes: ['Fixed Platform Hostname'],
    sslSupport: 'Automated Let\'s Encrypt',
    renewalConditions: 'Free continuously on Netlify Free Starter tier.',
    eligibility: [
      'Free Starter plan includes 100GB monthly bandwidth and 300 build minutes per month',
      'Open to personal, developer, and small commercial projects'
    ],
    restrictions: [
      'Hosting subdomain cannot be pointed away to an external server or third-party host',
      'Fair use bandwidth limits apply'
    ],
    ownershipModel: 'Platform Hosted Subdomain (No Domain Ownership)',
    verificationStatus: 'FREE VERIFIED',
    lastVerifiedDate: '2026-10-20',
    evidence: 'Netlify Docs: https://docs.netlify.com/domains-https/custom-domains/ - "Every site configured on Netlify receives a default site subdomain at [custom-name].netlify.app."',
    stepByStepClaim: [
      {
        step: 1,
        title: 'Sign in to Netlify',
        description: 'Log in at netlify.com using GitHub, GitLab, or email.'
      },
      {
        step: 2,
        title: 'Deploy Your Site',
        description: 'Drag and drop a folder or connect your Git repository.'
      },
      {
        step: 3,
        title: 'Customize Subdomain',
        description: 'Navigate to Site configuration > General > Site details > Change site name to pick your preferred name.'
      },
      {
        step: 4,
        title: 'Live with SSL',
        description: 'Your site is live at https://<custom-name>.netlify.app with an automatic SSL certificate.'
      }
    ],
    technicalPros: [
      'Easy site name customization directly from the control panel',
      'Generous 100GB free tier bandwidth',
      'Form handling and identity support built-in'
    ],
    technicalCons: [
      'Cannot configure custom DNS records on netlify.app',
      'Subdomain strictly tied to Netlify platform'
    ],
    recommendedUseCases: ['Static websites', 'Documentation portals', 'JAMstack apps', 'Landing pages']
  },
  {
    id: 'eu-org',
    name: 'EU.org',
    tagline: 'Pioneering free public suffix domain registry operating since 1996 with full NS delegation',
    category: 'public_suffix_registry',
    domainType: 'delegated_sld',
    samplePattern: 'yourname.eu.org',
    availableSuffixes: ['eu.org'],
    priceModel: '100% Free',
    officialUrl: 'https://nic.eu.org',
    docsUrl: 'https://nic.eu.org/op/doc/faq.html',
    claimUrl: 'https://nic.eu.org/arf/',
    dnsSupport: true,
    dnsSupportDetails: 'Complete authoritative Name Server (NS) delegation. You point the domain to your own nameservers (Cloudflare, Hurricane Electric, Cloudns, etc.) and have 100% DNS record control.',
    supportedRecordTypes: ['NS Delegation (Full DNS Zone Control)'],
    sslSupport: 'Bring Your Own',
    renewalConditions: 'Free permanently. Does not require annual payment, though domains must maintain valid functioning nameservers.',
    eligibility: [
      'Open to individuals and non-profit organizations worldwide (despite EU branding)',
      'Requires pre-configuring valid authoritative nameservers before application submission (e.g., Cloudflare free zone)'
    ],
    restrictions: [
      'Manual human approval process: queue times can range from several weeks to months',
      'Zero tolerance for spam, deceptive abuse, or fraudulent activities',
      'Technical check: nameservers must answer authoritatively for the requested domain before approval'
    ],
    ownershipModel: 'Public Suffix Delegated SLD (Full Zone Delegation)',
    verificationStatus: 'FREE VERIFIED',
    lastVerifiedDate: '2026-10-20',
    evidence: 'Official EU.org registry: https://nic.eu.org/op/doc/faq.html - "EU.org was founded in 1996 by Pierre Beyssac to provide free domain registration." Included in Mozilla Public Suffix List.',
    stepByStepClaim: [
      {
        step: 1,
        title: 'Create Account on nic.eu.org',
        description: 'Register a contact handle at https://nic.eu.org/arf/ and verify your email.'
      },
      {
        step: 2,
        title: 'Pre-configure Nameservers',
        description: 'Add your desired domain (e.g., example.eu.org) to Cloudflare DNS (Free) or HE.net DNS so the servers respond to queries.'
      },
      {
        step: 3,
        title: 'Submit ARF Form',
        description: 'Fill out the Domain Creation form on nic.eu.org specifying your domain name and the exact nameserver hostnames.'
      },
      {
        step: 4,
        title: 'Await Approval',
        description: 'The automated checker validates your zone, and volunteer administrators approve requests in batches.'
      }
    ],
    technicalPros: [
      'Full nameserver (NS) delegation—equivalent to owning a standard TLD',
      'Recognized on the Mozilla Public Suffix List (cookies, SSL certs isolated)',
      'Completely free with no renewal fees since 1996'
    ],
    technicalCons: [
      'Registration review backlog is long (often takes weeks or months for admin review)',
      'Requires pre-existing technical knowledge to configure external nameservers'
    ],
    recommendedUseCases: ['Personal self-hosting', 'Home lab setups', 'Long-term personal web projects', 'Custom email setups'],
    isPopular: true
  },
  {
    id: 'duckdns',
    name: 'Duck DNS',
    tagline: 'Reliable free dynamic DNS service running on AWS with API updates and Let\'s Encrypt support',
    category: 'dynamic_dns',
    domainType: 'dynamic_dns_subdomain',
    samplePattern: 'yourhost.duckdns.org',
    availableSuffixes: ['duckdns.org'],
    priceModel: '100% Free',
    officialUrl: 'https://www.duckdns.org',
    docsUrl: 'https://www.duckdns.org/install.jsp',
    claimUrl: 'https://www.duckdns.org',
    dnsSupport: true,
    dnsSupportDetails: 'Supports IPv4 (A), IPv6 (AAAA), and TXT records (ideal for Let\'s Encrypt ACME DNS-01 verification) via simple HTTP API.',
    supportedRecordTypes: ['A', 'AAAA', 'TXT'],
    sslSupport: 'DNS-01 ACME / Let\'s Encrypt',
    renewalConditions: 'Free permanently. Up to 5 free subdomains per account. No forced monthly CAPTCHA renewals.',
    eligibility: [
      'Sign in via GitHub, Google, Reddit, or Twitter/X',
      'Free for personal home lab, Raspberry Pi, router, and dynamic IP tracking'
    ],
    restrictions: [
      'Maximum 5 subdomains per registered user',
      'No custom NS delegation or MX records for email',
      'Public service fair use rate limits apply to API update scripts'
    ],
    ownershipModel: 'Dynamic Hostname (IP/CNAME Control)',
    verificationStatus: 'FREE VERIFIED',
    lastVerifiedDate: '2026-10-20',
    evidence: 'Official DuckDNS site (https://www.duckdns.org): "Free dynamic DNS hosted on Amazon VPC. Free for everyone."',
    stepByStepClaim: [
      {
        step: 1,
        title: 'Login to Duck DNS',
        description: 'Navigate to duckdns.org and log in with your GitHub or Google account.'
      },
      {
        step: 2,
        title: 'Choose Subdomain',
        description: 'Type your desired name into the domain input box and click "Add domain".'
      },
      {
        step: 3,
        title: 'Set IP or Automate',
        description: 'Your current public IP is auto-detected. Use the provided installation guide for your OS (cron, curl, Docker, OpenWrt).'
      },
      {
        step: 4,
        title: 'Generate SSL with Certbot',
        description: 'Use the official DuckDNS certbot plugin to obtain a free Let\'s Encrypt wildcard certificate via TXT record.'
      }
    ],
    technicalPros: [
      'Supports automated DNS-01 Let\'s Encrypt SSL challenges for internal LAN IPs',
      'Zero renewal fees and no annoying "click monthly to keep active" demands',
      'Extensive integration scripts for Docker, Home Assistant, WireGuard, and routers'
    ],
    technicalCons: [
      'Fixed *.duckdns.org suffix',
      'Cannot configure MX records for receiving custom domain emails'
    ],
    recommendedUseCases: ['Home Assistant & IoT', 'Self-hosted WireGuard/VPN', 'Raspberry Pi projects', 'Dynamic residential IPs'],
    isPopular: true
  },
  {
    id: 'freedns-afraid',
    name: 'FreeDNS (Afraid.org)',
    tagline: 'Community-shared DNS platform with thousands of public domain suffixes and dynamic updates',
    category: 'dynamic_dns',
    domainType: 'dynamic_dns_subdomain',
    samplePattern: 'yourhost.mooo.com',
    availableSuffixes: ['mooo.com', 'chickenkiller.com', 'ignorelist.com', 'strangled.net'],
    priceModel: 'Freemium',
    officialUrl: 'https://freedns.afraid.org',
    docsUrl: 'https://freedns.afraid.org/faq/',
    claimUrl: 'https://freedns.afraid.org/signup/',
    dnsSupport: true,
    dnsSupportDetails: 'A, AAAA, CNAME, MX, TXT, NS, LOC, RP, and SSHFP records with web UI and cron dynamic update scripts.',
    supportedRecordTypes: ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS'],
    sslSupport: 'Automated Let\'s Encrypt',
    renewalConditions: 'Free accounts must log in to the web interface at least once every 6 months to prevent hostname expiration.',
    eligibility: [
      'Anyone can register a free account',
      'Free tier includes up to 5 subdomains across public shared domains'
    ],
    restrictions: [
      'Requires manual account login every 6 months',
      'Publicly shared domains have variable reputation scores; some corporate firewalls block common suffixes',
      'Advanced features (stealth DNS, backup MX) require paid Premium tier'
    ],
    ownershipModel: 'Dynamic Hostname (IP/CNAME Control)',
    verificationStatus: 'CHECK OFFICIAL TERMS',
    lastVerifiedDate: '2026-10-20',
    evidence: 'FreeDNS Afraid.org FAQ at https://freedns.afraid.org/faq/ documents free tier limits and 6-month inactivity policy.',
    stepByStepClaim: [
      {
        step: 1,
        title: 'Register Account',
        description: 'Sign up at freedns.afraid.org and confirm your email.'
      },
      {
        step: 2,
        title: 'Browse Public Registry',
        description: 'Click "Subdomains" > "Add" and browse thousands of community-shared domain extensions.'
      },
      {
        step: 3,
        title: 'Configure Target',
        description: 'Enter your hostname and destination IP address or CNAME target.'
      },
      {
        step: 4,
        title: 'Maintain Active Status',
        description: 'Remember to log in to the Afraid.org web interface every 6 months to prevent expiration.'
      }
    ],
    technicalPros: [
      'Massive selection of domain extensions contributed by community domain owners',
      'Full support for MX, TXT, and custom records',
      'Established since 2001'
    ],
    technicalCons: [
      'Requires periodic login every 6 months to prevent cancellation',
      'Shared public domains may suffer from low email reputation'
    ],
    recommendedUseCases: ['Dynamic IP tracking', 'Testing DNS configurations', 'Short-term development endpoints']
  },
  {
    id: 'openrepos',
    name: 'OpenRepos.org',
    tagline: 'Open-source software distribution repository and developer package endpoints',
    category: 'developer_community',
    domainType: 'registrable_subdomain',
    samplePattern: 'user.openrepos.net',
    availableSuffixes: ['openrepos.net'],
    priceModel: 'Free for Open Source',
    officialUrl: 'https://openrepos.net',
    docsUrl: 'https://openrepos.net/content/about-openrepos',
    claimUrl: 'https://openrepos.net/user/register',
    dnsSupport: false,
    dnsSupportDetails: 'Developer endpoints and repository manifests for RPM/deb mobile packages.',
    supportedRecordTypes: ['Repository Hostname'],
    sslSupport: 'Provider Managed',
    renewalConditions: 'Free for legitimate open-source mobile developers maintaining package repositories.',
    eligibility: [
      'Developers building or packaging software for mobile Linux platforms (Sailfish OS, Nemo, AsteroidOS)',
      'Software packages must be authentic open-source or freely distributable freeware'
    ],
    restrictions: [
      'Exclusively a repository service for mobile Linux software; not a general-purpose web hosting or DNS registrar',
      'No commercial malware or unlicensed proprietary binary redistribution'
    ],
    ownershipModel: 'Platform Hosted Subdomain (No Domain Ownership)',
    verificationStatus: 'REQUIRES OPEN SOURCE',
    lastVerifiedDate: '2026-10-20',
    evidence: 'OpenRepos about page at https://openrepos.net/content/about-openrepos states focus on Linux mobile package distribution.',
    stepByStepClaim: [
      {
        step: 1,
        title: 'Register Developer Profile',
        description: 'Sign up for a maintainer account on openrepos.net.'
      },
      {
        step: 2,
        title: 'Submit Package Repository',
        description: 'Upload your application package along with source code repository link and license details.'
      },
      {
        step: 3,
        title: 'Access Developer Endpoint',
        description: 'Your package repository URL is activated on openrepos.net infrastructure.'
      }
    ],
    technicalPros: [
      'Tailored infrastructure for Linux mobile package managers',
      'Dedicated developer audience in the open-source community'
    ],
    technicalCons: [
      'Specialized software package index, not a general web DNS service',
      'Strictly mobile Linux scope'
    ],
    recommendedUseCases: ['Sailfish OS / Linux mobile package hosting', 'Open-source software distributions']
  },
  {
    id: 'render-com',
    name: 'Render (onrender.com)',
    tagline: 'Modern cloud application hosting with free web service and static site URLs',
    category: 'cloud_platform',
    domainType: 'hosting_subdomain',
    samplePattern: 'your-app.onrender.com',
    availableSuffixes: ['onrender.com'],
    priceModel: 'Free Tier Included',
    officialUrl: 'https://render.com',
    docsUrl: 'https://render.com/docs/web-services',
    claimUrl: 'https://dashboard.render.com',
    dnsSupport: false,
    dnsSupportDetails: 'Default hosting URL provided for all deployed web services, background workers, and static sites.',
    supportedRecordTypes: ['Fixed Platform Hostname'],
    sslSupport: 'Automated Let\'s Encrypt',
    renewalConditions: 'Free tier web services spin down after 15 minutes of inactivity; static sites have 100% continuous uptime.',
    eligibility: [
      'Any registered Render account',
      'Free tier includes 750 free instance hours per month for web services and unlimited static sites'
    ],
    restrictions: [
      'Free web services spin down when idle (takes ~50s to wake up on first request)',
      'Subdomain cannot be routed to outside servers'
    ],
    ownershipModel: 'Platform Hosted Subdomain (No Domain Ownership)',
    verificationStatus: 'FREE VERIFIED',
    lastVerifiedDate: '2026-10-20',
    evidence: 'Render Documentation at https://render.com/docs/web-services confirms free onrender.com subdomains and automatic TLS.',
    stepByStepClaim: [
      {
        step: 1,
        title: 'Create Render Account',
        description: 'Sign up at render.com with GitHub or GitLab.'
      },
      {
        step: 2,
        title: 'Create Web Service',
        description: 'Click "New" > "Web Service" and link your code repository.'
      },
      {
        step: 3,
        title: 'Choose Service Name',
        description: 'Name your service; this assigns your default onrender.com subdomain.'
      },
      {
        step: 4,
        title: 'Deploy',
        description: 'Render builds and deploys your container or runtime with TLS enabled.'
      }
    ],
    technicalPros: [
      'Full backend Docker & Node/Python/Go support on free tier',
      'Automatic TLS certificate provisioning',
      'Simple Git push deploys'
    ],
    technicalCons: [
      'Free backend instances sleep after 15 minutes of inactivity',
      'Subdomain strictly platform-bound'
    ],
    recommendedUseCases: ['Full-stack demos', 'API backends', 'Express/FastAPI prototypes', 'Static documentation']
  },
  {
    id: 'fly-io',
    name: 'Fly.io (fly.dev)',
    tagline: 'Deploy full-stack Docker containers close to users with dedicated fly.dev subdomains',
    category: 'cloud_platform',
    domainType: 'hosting_subdomain',
    samplePattern: 'your-app.fly.dev',
    availableSuffixes: ['fly.dev'],
    priceModel: 'Freemium',
    officialUrl: 'https://fly.io',
    docsUrl: 'https://fly.io/docs/reference/configuration/',
    claimUrl: 'https://fly.io',
    dnsSupport: false,
    dnsSupportDetails: 'Direct anycast routing to running Firecracker microVMs across Fly global edge.',
    supportedRecordTypes: ['Anycast Hostname'],
    sslSupport: 'Automated Let\'s Encrypt',
    renewalConditions: 'Free usage tier allowances require valid credit card on file for identity verification.',
    eligibility: [
      'Requires credit card for abuse prevention even on free allowance',
      'Free tier includes up to 3 shared-cpu-1x 256MB VMs'
    ],
    restrictions: [
      'Requires payment card validation to activate',
      'Platform hosting subdomain only'
    ],
    ownershipModel: 'Platform Hosted Subdomain (No Domain Ownership)',
    verificationStatus: 'CHECK OFFICIAL TERMS',
    lastVerifiedDate: '2026-10-20',
    evidence: 'Fly.io Docs: https://fly.io/docs/about/pricing/ explains credit card requirement and free resource allowances.',
    stepByStepClaim: [
      {
        step: 1,
        title: 'Install flyctl CLI',
        description: 'Install flyctl and run fly auth signup.'
      },
      {
        step: 2,
        title: 'Launch App',
        description: 'Run fly launch in your project directory.'
      },
      {
        step: 3,
        title: 'Deploy to Edge',
        description: 'Run fly deploy to spin up microVMs with automatic *.fly.dev certificate.'
      }
    ],
    technicalPros: [
      'Global anycast IP distribution',
      'Runs real Dockerfiles and lightweight Linux VMs'
    ],
    technicalCons: [
      'Mandatory credit card verification to start',
      'CLI-centric workflow'
    ],
    recommendedUseCases: ['Global microservices', 'Database-backed web apps', 'WebSocket servers']
  }
];

export const CATEGORY_LABELS: Record<string, { label: string; description: string; icon: string }> = {
  developer_community: {
    label: 'Developer Community Registries',
    description: 'Subdomains gifted to developers and open-source creators with DNS control.',
    icon: 'Code'
  },
  public_suffix_registry: {
    label: 'Public Suffix Delegated SLDs',
    description: 'True nameserver zone delegation recognized in the Public Suffix List.',
    icon: 'Globe'
  },
  dynamic_dns: {
    label: 'Free Dynamic DNS (DDNS)',
    description: 'Dynamic hostnames for home labs, IoT, VPNs, and residential servers.',
    icon: 'Radio'
  },
  static_hosting: {
    label: 'Static Hosting Subdomains',
    description: 'Zero-cost platform subdomains provided when deploying static websites.',
    icon: 'Layers'
  },
  cloud_platform: {
    label: 'Cloud & Edge Platforms',
    description: 'Subdomains provided with serverless compute and microVM deployments.',
    icon: 'Cloud'
  }
};
