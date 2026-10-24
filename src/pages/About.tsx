import React from 'react';
import { ShieldCheck, Heart, Terminal, Sparkles, CheckCircle2, Globe, Cpu } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold mb-3">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Integrity Manifesto</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
          About DomainNova
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
          Built to combat deceptive free domain marketing, explain real DNS realities, and empower developers with authentic open-source tools.
        </p>
      </div>

      <div className="space-y-8 text-slate-300 text-sm sm:text-base leading-relaxed">
        {/* Core Mission */}
        <section className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 backdrop-blur-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Globe className="w-5 h-5 text-cyan-400" />
            <span>Our Core Mission</span>
          </h2>
          <p>
            The internet was built on open standards, but discovering genuinely free domains and subdomains has become a minefield of clickbait, expired promotions, and outright scams. Deceptive websites promise "Free .COM Domains For Life," only to hit students and hobbyists with forced subscription renewals, intrusive parking ads, or stolen DNS traffic.
          </p>
          <p>
            <strong className="text-slate-100">DomainNova exists to set the record straight:</strong> Top-level domains (such as <code className="text-cyan-400 font-mono">.com</code>, <code className="text-cyan-400 font-mono">.net</code>, and <code className="text-cyan-400 font-mono">.org</code>) incur mandatory wholesale registry fees set by ICANN and registry operators. Therefore, legitimate unconditioned "free .com" registrations do not exist.
          </p>
          <p>
            However, there are extraordinary open-source communities (like <code className="text-cyan-400 font-mono">is-a.dev</code> and <code className="text-cyan-400 font-mono">js.org</code>), historic public suffix registries (like <code className="text-cyan-400 font-mono">eu.org</code>), and world-class hosting platforms (like GitHub Pages and Vercel) that provide rock-solid, 100% free subdomains with genuine DNS and HTTPS capabilities.
          </p>
        </section>

        {/* The 4 Principles of DomainNova */}
        <section className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 backdrop-blur-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>The Four Pillars of Our Platform</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <strong className="text-slate-100 block text-sm mb-1 font-semibold">1. Zero Fabricated Claims</strong>
              <p className="text-xs text-slate-400 leading-relaxed">
                We never fake availability, simulate mock checkout screens, or claim you "own" a root zone that is only delegated.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <strong className="text-slate-100 block text-sm mb-1 font-semibold">2. Authoritative Verification</strong>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every provider in our directory includes exact documentation citations, last checked dates, and verified restrictions.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <strong className="text-slate-100 block text-sm mb-1 font-semibold">3. Standard ICANN Protocols</strong>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our domain availability checker queries official ICANN RDAP endpoints and live Google DoH resolvers—not scrape tricks.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <strong className="text-slate-100 block text-sm mb-1 font-semibold">4. Privacy & Anti-Surveillance</strong>
              <p className="text-xs text-slate-400 leading-relaxed">
                No tracking scripts, no behavioral fingerprinting, no email harvesting, and no mandatory registration.
              </p>
            </div>
          </div>
        </section>

        {/* High Thinking Architecture Engine */}
        <section className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 backdrop-blur-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <span>High Thinking AI Advisor</span>
          </h2>
          <p className="text-sm">
            To assist developers facing complex edge configurations (such as Apex CNAME flattening, SSL certificate loop mitigation, and ACME DNS-01 automation on dynamic IPs), we integrated Gemini 4 Argon with High Thinking reasoning mode. It generates step-by-step configurations tailored to your exact tech stack.
          </p>
        </section>
      </div>
    </div>
  );
};
