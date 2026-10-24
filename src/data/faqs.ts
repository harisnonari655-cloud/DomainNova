export interface FaqItem {
  question: string;
  answer: string;
  category: 'general' | 'availability' | 'ownership' | 'technical';
}

export const FAQS: FaqItem[] = [
  {
    category: 'ownership',
    question: 'Do I actually "own" a free subdomain like .is-a.dev or .github.io?',
    answer: 'No. When you use a free subdomain or platform address (such as myapp.is-a.dev or username.github.io), the parent domain remains under the legal ownership and control of the registry or platform maintainer. You are granted free delegated DNS routing rights according to their terms of service and acceptable use policies. True registrable ownership only applies to top-level second-level domains (e.g., example.com) purchased through ICANN-accredited registrars.'
  },
  {
    category: 'availability',
    question: 'How does DomainNova verify whether a domain or subdomain is available?',
    answer: 'DomainNova adheres to strict verification principles: For standard TLDs, we perform authoritative RFC syntax validation and query the ICANN-backed Registration Data Access Protocol (RDAP) and authoritative DNS resolvers. We never claim a domain is available just because DNS resolution timed out or returned NXDOMAIN. For community registries (like is-a.dev or js.org), availability is determined by existing active records and GitHub PR registry files. When live API access is not configured, we explicitly declare it and direct you to the official provider registry.'
  },
  {
    category: 'general',
    question: 'Are there any truly free .com, .net, or .org domain names?',
    answer: 'Under normal circumstances, no. Top-level domains like .com, .net, and .org incur mandatory wholesale registry fees (Verisign charges ~$10/year for .com, plus ICANN fees). Any website claiming to give you "free .com domains forever without conditions" is either running a promotional trial (which requires future renewal fees), bundling it with paid web hosting, or engaging in scam advertising. Authentic free alternatives are community-managed subdomains (is-a.dev, js.org), platform hostnames (github.io, vercel.app), or educational student packs (such as the GitHub Student Developer Pack).'
  },
  {
    category: 'technical',
    question: 'Can I send and receive custom emails with a free subdomain?',
    answer: 'It depends on the provider. Providers that support custom MX and TXT/SPF records (such as is-a.dev or eu.org) allow you to configure free email forwarding services like ImprovMX, Forward Email, or Cloudflare Email Routing. However, hosting-only subdomains (like *.github.io or *.vercel.app) do not expose MX records and cannot be used for inbound email.'
  },
  {
    category: 'technical',
    question: 'Will search engines index my website on a free subdomain?',
    answer: 'Yes! Major search engines like Google, Bing, and DuckDuckGo crawl and index websites hosted on free subdomains just like any other website. However, subdomains on established domains with clean histories (like github.io or js.org) often inherit positive domain trust faster than newly registered, unverified low-cost TLDs.'
  },
  {
    category: 'ownership',
    question: 'What is the Mozilla Public Suffix List (PSL) and why does it matter?',
    answer: 'The Public Suffix List (publicsuffix.org) is an initiative cataloging domain boundaries where internet users can directly register names. Registries like eu.org or github.io are included in the PSL. This ensures web browsers isolate cookies, HTTP Strict Transport Security (HSTS), and local storage between distinct subdomains (e.g. alice.github.io cannot read cookies from bob.github.io).'
  }
];
