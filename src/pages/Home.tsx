import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ExternalLink, 
  ArrowRight, 
  Sparkles, 
  Code2, 
  Radio, 
  Globe, 
  Layers, 
  ChevronDown, 
  Check, 
  AlertTriangle,
  FileCheck,
  Zap,
  Terminal,
  Server
} from 'lucide-react';
import { PROVIDERS, CATEGORY_LABELS } from '../data/providers';
import { FAQS } from '../data/faqs';
import { DomainSearchBar } from '../components/DomainSearchBar';
import { ProviderCard } from '../components/ProviderCard';
import { GlobeAnimation } from '../components/GlobeAnimation';

export const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const filteredProviders = selectedCategory === 'all' 
    ? PROVIDERS.filter(p => p.isPopular)
    : PROVIDERS.filter(p => p.category === selectedCategory);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] overflow-hidden pointer-events-none -z-10 opacity-70">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[500px] rounded-full bg-gradient-to-b from-cyan-600/15 via-blue-600/10 to-transparent blur-3xl" />
        <GlobeAnimation className="absolute inset-0 opacity-40" />
      </div>

      {/* Hero Section */}
      <section className="pt-12 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Anti-Slop Truth Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-medium mb-6 backdrop-blur-md shadow-lg shadow-cyan-950/40 animate-in fade-in duration-300">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Authoritative Directory: Zero fake .com claims & zero ad traps</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-100 tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none mb-6">
          Discover Genuinely Free <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
            Domains & Subdomains
          </span>
        </h1>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          The verified registry for developers, makers, and self-hosters. Check real availability, compare DNS routing rights, inspect eligibility criteria, and claim authentic addresses.
        </p>

        {/* Hero Domain Search Bar */}
        <div className="mb-14">
          <DomainSearchBar autoFocus={false} />
        </div>

        {/* Live Integrity Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
            <div className="text-2xl font-extrabold text-cyan-400 font-mono">100%</div>
            <div className="text-xs font-medium text-slate-300 mt-1">Verified Pricing</div>
            <div className="text-[11px] text-slate-500">No surprise renewals</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
            <div className="text-2xl font-extrabold text-sky-400 font-mono">ICANN RDAP</div>
            <div className="text-xs font-medium text-slate-300 mt-1">Real Whois Protocol</div>
            <div className="text-[11px] text-slate-500">Official registry lookup</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
            <div className="text-2xl font-extrabold text-emerald-400 font-mono">1996—2026</div>
            <div className="text-xs font-medium text-slate-300 mt-1">Proven Uptime</div>
            <div className="text-[11px] text-slate-500">Decades of community trust</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
            <div className="text-2xl font-extrabold text-purple-400 font-mono">Full DNS</div>
            <div className="text-xs font-medium text-slate-300 mt-1">A, CNAME, TXT</div>
            <div className="text-[11px] text-slate-500">Let's Encrypt SSL ready</div>
          </div>
        </div>
      </section>

      {/* Verified Providers Showcase */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1 font-semibold">
              Curated Directory
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
              Verified Free Domain Providers
            </h2>
          </div>

          <Link
            to="/domains"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Explore all {PROVIDERS.length} providers
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all border ${
              selectedCategory === 'all'
                ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900/70 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-slate-100'
            }`}
          >
            Featured ({PROVIDERS.filter(p => p.isPopular).length})
          </button>
          {Object.entries(CATEGORY_LABELS).map(([key, info]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all border ${
                selectedCategory === key
                  ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/70 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-slate-100'
              }`}
            >
              {info.label}
            </button>
          ))}
        </div>

        {/* Grid of Provider Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map(provider => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      </section>

      {/* How to Claim Safe Domains (Step by Step) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1 font-semibold">
            Execution Blueprint
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-3">
            How to Claim & Deploy in 4 Honest Steps
          </h2>
          <p className="text-slate-400 text-sm">
            No synthetic checkout carts or fake registrations. Here is how genuine community subdomains and platform URLs are actually provisioned.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 relative">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center font-mono font-bold mb-4">
              01
            </div>
            <h3 className="text-base font-bold text-slate-100 mb-2">Check Syntax & Suffix</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Choose an extension suited to your stack: <code className="text-cyan-400">.is-a.dev</code> for developer portfolios, <code className="text-cyan-400">.js.org</code> for open-source JS libraries, or <code className="text-cyan-400">.duckdns.org</code> for dynamic IPs.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 relative">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center font-mono font-bold mb-4">
              02
            </div>
            <h3 className="text-base font-bold text-slate-100 mb-2">Verify Eligibility</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Review specific registry requirements. Open-source registries require an active public repository with an approved license (MIT/Apache), while others require an active GitHub account.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 relative">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center font-mono font-bold mb-4">
              03
            </div>
            <h3 className="text-base font-bold text-slate-100 mb-2">Submit Claim / PR</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Navigate to the official provider page or Git repository. Create your record file (e.g. JSON in is-a-dev/register) or configure your project name in Vercel or Netlify.
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 relative">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center font-mono font-bold mb-4">
              04
            </div>
            <h3 className="text-base font-bold text-slate-100 mb-2">Bind CNAME & SSL</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Point your host (GitHub Pages, Vercel, Cloudflare) to the registered domain. Automatic Let's Encrypt TLS provisions within 10 to 30 minutes once DNS propagates.
            </p>
          </div>
        </div>
      </section>

      {/* High Thinking AI Advisor Feature Callout */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-blue-950/60 border border-cyan-500/30 p-8 sm:p-12 overflow-hidden shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Powered by Gemini 4 Argon &bull; High Thinking Mode
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 mb-4 tracking-tight">
              Complex DNS or Architecture Troubles?
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              Stuck with CNAME flattening on Apex domains, Let's Encrypt HTTP-01 challenge failures behind Cloudflare, or Home Lab DDNS routing? Ask our High-Thinking AI Advisor for deep, step-by-step infrastructure analysis.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/advisor"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
              >
                <span>Launch Architecture Advisor</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/guides"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 text-sm font-medium transition-colors"
              >
                <span>Browse Written Guides</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Honest Domain FAQs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-slate-800/60">
        <div className="text-center mb-12">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1 font-semibold">
            Transparency First
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Clear answers about domain ownership, ICANN wholesale costs, and community policies.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = expandedFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 text-slate-100 hover:text-cyan-300 transition-colors focus:outline-none"
                >
                  <span className="font-semibold text-sm sm:text-base">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-cyan-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/40 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
