import React, { useState } from 'react';
import { Shield, Lock, EyeOff, Database, Trash2, CheckCircle2 } from 'lucide-react';
import { isLocalStorageEnabled, setStorageOptOut, clearRecentSearches } from '../lib/storage';
import { useToast } from '../components/Toast';

export const Privacy: React.FC = () => {
  const { showToast } = useToast();
  const [lsEnabled, setLsEnabled] = useState(() => isLocalStorageEnabled());

  const handleToggleLs = (enabled: boolean) => {
    setStorageOptOut(!enabled);
    setLsEnabled(enabled);
    showToast(enabled ? 'Local storage enabled' : 'Local storage disabled and cleared', 'info');
  };

  const handleClearAll = () => {
    clearRecentSearches();
    try {
      localStorage.clear();
      showToast('All locally stored data has been cleared', 'success');
    } catch {
      showToast('Error clearing local storage', 'error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold mb-3">
          <Shield className="w-4 h-4 text-cyan-400" />
          <span>Zero Surveillance</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
          DomainNova does not track you, sell analytics, or require personal accounts. Here is an honest explanation of every bit of data touched.
        </p>
      </div>

      <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
        {/* Interactive Privacy Controls */}
        <section className="rounded-2xl bg-cyan-950/30 border border-cyan-500/30 p-6 sm:p-8 backdrop-blur-sm">
          <h2 className="text-lg font-bold text-slate-100 mb-2 flex items-center gap-2">
            <Lock className="w-5 h-5 text-cyan-400" />
            <span>Your In-Browser Storage Controls</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mb-6">
            We store only your saved favorite providers and recent domain search history inside your browser's standard <code className="text-cyan-400 font-mono">localStorage</code>. This data never leaves your device.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div>
              <div className="font-semibold text-slate-200 text-sm">Local Storage Preference</div>
              <div className="text-xs text-slate-400">
                {lsEnabled ? 'Currently enabled (favorites and recent searches are kept locally)' : 'Currently disabled (no data stored)'}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleToggleLs(!lsEnabled)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  lsEnabled
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                {lsEnabled ? 'Enabled' : 'Disabled'}
              </button>

              <button
                onClick={handleClearAll}
                className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Wipe Stored Data</span>
              </button>
            </div>
          </div>
        </section>

        {/* 1. What Data We Collect */}
        <section className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 space-y-3">
          <h2 className="text-lg font-bold text-slate-100">1. Data We Do NOT Collect</h2>
          <p>
            • We do not require account registration or passwords.<br />
            • We do not collect credit cards, billing addresses, or payment details.<br />
            • We do not embed third-party advertising scripts or tracking pixels.<br />
            • We do not sell query telemetry or behavioral profiles.
          </p>
        </section>

        {/* 2. API Requests */}
        <section className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 space-y-3">
          <h2 className="text-lg font-bold text-slate-100">2. External API Requests</h2>
          <p>
            When you use the <strong>Domain Checker</strong>, the server or browser sends the queried domain string to standard public infrastructure:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400 text-xs sm:text-sm">
            <li><strong>ICANN RDAP / rdap.org:</strong> The official IANA/ICANN protocol to check if an authoritative registration record exists.</li>
            <li><strong>Google Public DNS (DoH):</strong> Used exclusively to check if live DNS A/AAAA/CNAME records resolve for the hostname.</li>
          </ul>
          <p className="text-xs text-slate-400 pt-2">
            When you consult the <strong>AI Architecture Advisor</strong>, your query is processed securely through Gemini 4 Argon via our server proxy without exposing your browser identity or API secrets.
          </p>
        </section>

        {/* 3. External Third-Party Links */}
        <section className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 space-y-3">
          <h2 className="text-lg font-bold text-slate-100">3. Third-Party Websites & Registries</h2>
          <p>
            DomainNova links to official registries (such as GitHub, is-a.dev, Vercel, Duck DNS, and nic.eu.org). When you click an external link, you are governed by the privacy policy and terms of service of that respective provider.
          </p>
        </section>
      </div>
    </div>
  );
};
