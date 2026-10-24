import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Shield, Terminal, Heart, Sparkles, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Core Disclaimer Box */}
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 mb-12 backdrop-blur-sm">
          <div className="flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0 mt-0.5">
              <Shield className="w-5 h-5" />
            </div>
            <div className="flex flex-col gap-1 text-xs sm:text-sm leading-relaxed text-slate-300">
              <strong className="text-slate-100 font-semibold flex items-center gap-2">
                DomainNova Truth & Transparency Guarantee
              </strong>
              <p>
                DomainNova is an independent open platform. We do not sell domains, accept affiliate kickbacks, or simulate fake .com availability. Free community subdomains (e.g., <code className="text-cyan-400 font-mono">is-a.dev</code>, <code className="text-cyan-400 font-mono">js.org</code>) and platform addresses (<code className="text-cyan-400 font-mono">github.io</code>, <code className="text-cyan-400 font-mono">vercel.app</code>) are delegated routing rights managed by their respective open-source communities and cloud providers.
              </p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1 */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider text-slate-200 font-bold mb-4">
              Discovery Directory
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/domains?category=developer_community" className="hover:text-cyan-400 transition-colors">
                  Developer Registries
                </Link>
              </li>
              <li>
                <Link to="/domains?category=public_suffix_registry" className="hover:text-cyan-400 transition-colors">
                  Public Suffix SLDs (eu.org)
                </Link>
              </li>
              <li>
                <Link to="/domains?category=dynamic_dns" className="hover:text-cyan-400 transition-colors">
                  Dynamic DNS (DuckDNS)
                </Link>
              </li>
              <li>
                <Link to="/domains?category=static_hosting" className="hover:text-cyan-400 transition-colors">
                  Static Host Subdomains
                </Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-cyan-400 transition-colors">
                  Side-by-Side Comparison
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider text-slate-200 font-bold mb-4">
              Verification & Tools
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/checker" className="hover:text-cyan-400 transition-colors">
                  Live Domain Checker
                </Link>
              </li>
              <li>
                <Link to="/advisor" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-cyan-300">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  Gemini 4 Argon Advisor
                </Link>
              </li>
              <li>
                <a 
                  href="https://lookup.icann.org" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1"
                >
                  ICANN Official RDAP
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://publicsuffix.org" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1"
                >
                  Mozilla Public Suffix List
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider text-slate-200 font-bold mb-4">
              Guides & Docs
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/guides/dns-records-explained" className="hover:text-cyan-400 transition-colors">
                  DNS Records Explained
                </Link>
              </li>
              <li>
                <Link to="/guides/github-pages-custom-domain" className="hover:text-cyan-400 transition-colors">
                  GitHub Pages CNAME Guide
                </Link>
              </li>
              <li>
                <Link to="/guides/vercel-custom-domain-guide" className="hover:text-cyan-400 transition-colors">
                  Vercel Edge Subdomains
                </Link>
              </li>
              <li>
                <Link to="/guides/truth-about-free-domains" className="hover:text-cyan-400 transition-colors text-amber-300/90">
                  The Freenom Collapse (.tk)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider text-slate-200 font-bold mb-4">
              Legal & Integrity
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/about" className="hover:text-cyan-400 transition-colors">
                  About DomainNova
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-cyan-400 transition-colors">
                  Privacy Policy (Zero Tracking)
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-cyan-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-400 transition-colors">
                  Contact & Corrections
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-500" />
            <span>&copy; {new Date().getFullYear()} DomainNova. Open Source & Educational Platform.</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-800/40">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Verified Registry Engine
            </span>
            <span>Deployable on GitHub & Vercel</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
