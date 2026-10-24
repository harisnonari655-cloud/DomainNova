import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, ExternalLink, ArrowRight, ShieldCheck, Cpu, Sliders } from 'lucide-react';
import { PROVIDERS } from '../data/providers';
import { StatusBadge } from '../components/StatusBadge';

export const Compare: React.FC = () => {
  // Default to the top 4 popular providers for side-by-side comparison
  const [selectedIds, setSelectedIds] = useState<string[]>(['is-a-dev', 'js-org', 'github-pages', 'eu-org']);

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length <= 1) return; // Keep at least one
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const selectedProviders = PROVIDERS.filter(p => selectedIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Page Header */}
      <div className="mb-8">
        <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-2">
          Side-by-Side Analysis
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          Compare Free Domain Providers
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
          Compare costs, ownership rights, DNS record capabilities, Let's Encrypt automation, and renewal policies side-by-side.
        </p>
      </div>

      {/* Provider Selector Badges */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-8 backdrop-blur-sm">
        <div className="text-xs font-semibold text-slate-300 mb-3 flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-cyan-400" />
          <span>Select providers to compare ({selectedProviders.length} active):</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {PROVIDERS.map(p => {
            const isSelected = selectedIds.includes(p.id);
            return (
              <button
                key={p.id}
                onClick={() => toggleSelect(p.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 ring-1 ring-cyan-500/30'
                    : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 text-cyan-400" />}
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm shadow-2xl">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/80">
              <th className="p-4 sm:p-5 text-xs font-mono uppercase text-slate-400 w-1/4">
                Provider Attribute
              </th>
              {selectedProviders.map(p => (
                <th key={p.id} className="p-4 sm:p-5 text-left w-1/4">
                  <div className="font-bold text-slate-100 text-base">{p.name}</div>
                  <div className="font-mono text-xs text-cyan-400 mt-0.5">{p.samplePattern}</div>
                  <div className="mt-2">
                    <StatusBadge status={p.verificationStatus} size="sm" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
            {/* Price Model */}
            <tr>
              <td className="p-4 sm:p-5 font-semibold text-slate-300 bg-slate-950/30">
                Pricing Model
              </td>
              {selectedProviders.map(p => (
                <td key={p.id} className="p-4 sm:p-5 font-mono font-bold text-emerald-400">
                  {p.priceModel}
                </td>
              ))}
            </tr>

            {/* Domain Type */}
            <tr>
              <td className="p-4 sm:p-5 font-semibold text-slate-300 bg-slate-950/30">
                Domain Type
              </td>
              {selectedProviders.map(p => (
                <td key={p.id} className="p-4 sm:p-5 text-slate-300">
                  {p.domainType}
                </td>
              ))}
            </tr>

            {/* Ownership Model */}
            <tr>
              <td className="p-4 sm:p-5 font-semibold text-slate-300 bg-slate-950/30">
                Ownership Model
              </td>
              {selectedProviders.map(p => (
                <td key={p.id} className="p-4 sm:p-5 text-slate-300">
                  {p.ownershipModel}
                </td>
              ))}
            </tr>

            {/* DNS Support */}
            <tr>
              <td className="p-4 sm:p-5 font-semibold text-slate-300 bg-slate-950/30">
                DNS Record Control
              </td>
              {selectedProviders.map(p => (
                <td key={p.id} className="p-4 sm:p-5">
                  {p.dnsSupport ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <Check className="w-4 h-4" /> Full Control
                    </span>
                  ) : (
                    <span className="text-slate-400 flex items-center gap-1">
                      <X className="w-4 h-4 text-slate-500" /> Platform Only
                    </span>
                  )}
                </td>
              ))}
            </tr>

            {/* Supported Records */}
            <tr>
              <td className="p-4 sm:p-5 font-semibold text-slate-300 bg-slate-950/30">
                Supported Record Types
              </td>
              {selectedProviders.map(p => (
                <td key={p.id} className="p-4 sm:p-5 font-mono text-cyan-300">
                  {p.supportedRecordTypes.join(', ')}
                </td>
              ))}
            </tr>

            {/* SSL Support */}
            <tr>
              <td className="p-4 sm:p-5 font-semibold text-slate-300 bg-slate-950/30">
                SSL Provisioning
              </td>
              {selectedProviders.map(p => (
                <td key={p.id} className="p-4 sm:p-5 text-slate-300">
                  {p.sslSupport}
                </td>
              ))}
            </tr>

            {/* Renewal & Expiration */}
            <tr>
              <td className="p-4 sm:p-5 font-semibold text-slate-300 bg-slate-950/30">
                Renewal Conditions
              </td>
              {selectedProviders.map(p => (
                <td key={p.id} className="p-4 sm:p-5 text-xs text-slate-300 leading-relaxed">
                  {p.renewalConditions}
                </td>
              ))}
            </tr>

            {/* Eligibility Summary */}
            <tr>
              <td className="p-4 sm:p-5 font-semibold text-slate-300 bg-slate-950/30">
                Key Eligibility
              </td>
              {selectedProviders.map(p => (
                <td key={p.id} className="p-4 sm:p-5 text-xs text-slate-300 leading-relaxed">
                  <ul className="space-y-1">
                    {p.eligibility.slice(0, 2).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span className="text-cyan-400">&bull;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* Registration Workflow */}
            <tr>
              <td className="p-4 sm:p-5 font-semibold text-slate-300 bg-slate-950/30">
                Claim Action
              </td>
              {selectedProviders.map(p => (
                <td key={p.id} className="p-4 sm:p-5">
                  <div className="flex flex-col gap-2">
                    <Link
                      to={`/providers/${p.id}`}
                      className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      Read Complete Specs &rarr;
                    </Link>
                    <a
                      href={p.claimUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 text-xs font-medium transition-all"
                    >
                      <span>Claim at Provider</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
