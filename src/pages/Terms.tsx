import React from 'react';
import { FileText, ShieldAlert, AlertTriangle } from 'lucide-react';

export const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold mb-3">
          <FileText className="w-4 h-4 text-cyan-400" />
          <span>Legal Transparency</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
          Please review the terms governing use of the DomainNova discovery engine and domain lookup tools.
        </p>
      </div>

      <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
        {/* Core Disclaimer */}
        <section className="rounded-2xl bg-amber-950/20 border border-amber-500/30 p-6 sm:p-8 space-y-3">
          <h2 className="text-lg font-bold text-amber-300 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <span>Important Registration & Ownership Notice</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            DomainNova is strictly an educational discovery index and technical reference directory. DomainNova is NOT a domain registrar, does not sell top-level domains, and does not operate any DNS authoritative name servers directly. Using a free subdomain (such as on <code className="text-cyan-400 font-mono">is-a.dev</code> or <code className="text-cyan-400 font-mono">github.io</code>) does NOT grant you legal intellectual property ownership of the root zone.
          </p>
        </section>

        <section className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 space-y-3">
          <h2 className="text-lg font-bold text-slate-100">1. Acceptance of Terms</h2>
          <p>
            By accessing or using DomainNova, you agree to these Terms of Service. If you do not agree, please discontinue using the service immediately.
          </p>
        </section>

        <section className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 space-y-3">
          <h2 className="text-lg font-bold text-slate-100">2. Accuracy of Availability Data</h2>
          <p>
            While DomainNova utilizes authoritative ICANN RDAP endpoints and live DNS resolvers, domain availability is inherently dynamic. A domain shown as likely available may be in pending registrar review, subject to trademark reservation, premium pricing tier, or recently claimed by another party. Final registration confirmation must always be completed at an official ICANN-accredited registrar or community maintainer registry.
          </p>
        </section>

        <section className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 space-y-3">
          <h2 className="text-lg font-bold text-slate-100">3. Prohibited Use of Free Subdomains</h2>
          <p>
            All listed providers enforce strict acceptable use policies. You agree not to use free subdomains discovered on DomainNova for:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400 text-xs sm:text-sm">
            <li>Phishing, credential harvesting, or deceptive branding mimicking banks or services.</li>
            <li>Spamming, malware distribution, or botnet command-and-control servers.</li>
            <li>Trademark infringement or cybersquatting.</li>
          </ul>
        </section>

        <section className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 space-y-3">
          <h2 className="text-lg font-bold text-slate-100">4. Disclaimer of Warranties</h2>
          <p className="text-xs text-slate-400">
            DomainNova is provided "as is" and "as available", without warranty of any kind, express or implied. Under no circumstances shall DomainNova or its contributors be held liable for domain disputes, loss of hostname rights, or third-party service discontinuation.
          </p>
        </section>
      </div>
    </div>
  );
};
