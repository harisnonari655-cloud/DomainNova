import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ExternalLink, 
  Copy, 
  RotateCcw, 
  Globe, 
  Database, 
  Info, 
  Trash2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { validateDomainSyntax, normalizeDomainInput, generateSuggestions } from '../lib/domainValidator';
import { checkDomainAvailability } from '../lib/api';
import { RdapResult, RecentSearchItem } from '../types/domain';
import { getRecentSearches, saveRecentSearch, clearRecentSearches, copyToClipboard } from '../lib/storage';
import { useToast } from '../components/Toast';

export const Checker: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDomain = searchParams.get('domain') || '';
  const { showToast } = useToast();

  const [inputVal, setInputVal] = useState(initialDomain);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RdapResult | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<RecentSearchItem[]>(() => getRecentSearches());

  const executeCheck = async (domainToCheck: string) => {
    const clean = normalizeDomainInput(domainToCheck);
    if (!clean) {
      setValidationError('Please enter a domain name to check.');
      return;
    }

    const val = validateDomainSyntax(clean);
    if (!val.isValid) {
      setValidationError(val.error || 'Invalid domain syntax.');
      return;
    }

    setValidationError(null);
    setLoading(true);
    setResult(null);

    // Update URL query
    setSearchParams({ domain: clean });

    try {
      const data = await checkDomainAvailability(clean);
      setResult(data);
      // Save recent search
      const updated = saveRecentSearch(clean, data.status);
      setRecentSearches(updated);
    } catch {
      showToast('Error checking domain', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialDomain) {
      setInputVal(initialDomain);
      executeCheck(initialDomain);
    }
  }, [initialDomain]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCheck(inputVal);
  };

  const handleClearHistory = () => {
    clearRecentSearches();
    setRecentSearches([]);
    showToast('Recent searches cleared', 'info');
  };

  const handleCopy = async (text: string, label: string) => {
    const ok = await copyToClipboard(text);
    showToast(ok ? `Copied ${label} to clipboard` : 'Could not copy', ok ? 'success' : 'error');
  };

  const suggestions = result ? generateSuggestions(result.domainName.split('.')[0]) : [];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>Real RDAP & DNS Verification Protocol</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          Domain & Subdomain Availability Checker
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-2">
          Truthful status powered by ICANN RDAP and live DNS resolvers. No fake pricing, no synthetic availability.
        </p>
      </div>

      {/* Main Search Input Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="relative flex items-center rounded-2xl bg-slate-900/90 border border-slate-700/80 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 shadow-2xl backdrop-blur-md p-1.5 sm:p-2 transition-all">
          <div className="pl-3 sm:pl-4 text-cyan-400">
            <Search className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>

          <input
            type="text"
            value={inputVal}
            onChange={e => {
              setInputVal(e.target.value);
              setValidationError(null);
            }}
            placeholder="Enter full domain name (e.g., example.com, myapp.is-a.dev, dev.duckdns.org)..."
            className="w-full bg-transparent px-3 py-3 text-sm sm:text-base text-slate-100 placeholder-slate-500 focus:outline-none font-mono"
            spellCheck={false}
            autoCapitalize="none"
          />

          <button
            type="submit"
            disabled={loading}
            className="shrink-0 inline-flex items-center gap-2 px-5 sm:px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm sm:text-base transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <RotateCcw className="w-4 h-4 animate-spin" />
                <span>Checking...</span>
              </>
            ) : (
              <span>Check Status</span>
            )}
          </button>
        </div>

        {validationError && (
          <div className="mt-2 text-xs text-amber-400 flex items-center gap-1.5 px-3">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}
      </form>

      {/* Status Result Card */}
      {result && (
        <div className="mb-10 rounded-2xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 backdrop-blur-md shadow-2xl animate-in fade-in duration-300">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="text-xs font-mono text-slate-400 mb-1 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                Query Target
              </div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-slate-100 flex items-center gap-3">
                <span>{result.domainName}</span>
                <button
                  onClick={() => handleCopy(result.domainName, 'domain name')}
                  className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
                  title="Copy domain name"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Availability Status Badge */}
            <div className="flex flex-col sm:items-end">
              {result.status === 'registered' ? (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/30 text-xs font-bold uppercase font-mono">
                  <XCircle className="w-4 h-4 text-rose-400" />
                  Currently Registered / In Use
                </span>
              ) : result.status === 'likely_available' ? (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase font-mono">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Likely Available
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase font-mono">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  Check Official Registry
                </span>
              )}
              <span className="text-[11px] text-slate-500 font-mono mt-1">
                Checked at: {new Date(result.checkedAt).toLocaleTimeString()}
              </span>
            </div>
          </div>

          {/* Status Details */}
          <div className="py-5 text-sm text-slate-300 leading-relaxed border-b border-slate-800">
            {result.statusDetails}
          </div>

          {/* Technical Specs & Record Audit */}
          <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <div className="text-slate-400 uppercase font-semibold text-[10px] tracking-wider flex items-center gap-1">
                <Database className="w-3 h-3 text-cyan-400" />
                Authoritative Protocol Source
              </div>
              <div className="text-slate-200">{result.source}</div>

              {result.registrar && (
                <div>
                  <div className="text-slate-500 mt-2">Sponsoring Registrar:</div>
                  <div className="text-slate-200">{result.registrar}</div>
                </div>
              )}

              {result.creationDate && (
                <div>
                  <div className="text-slate-500 mt-2">Registration Date:</div>
                  <div className="text-slate-200">{new Date(result.creationDate).toLocaleDateString()}</div>
                </div>
              )}
              {result.expirationDate && (
                <div>
                  <div className="text-slate-500 mt-2">Expiration Date:</div>
                  <div className="text-slate-200">{new Date(result.expirationDate).toLocaleDateString()}</div>
                </div>
              )}
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <div className="text-slate-400 uppercase font-semibold text-[10px] tracking-wider flex items-center gap-1">
                <Globe className="w-3 h-3 text-cyan-400" />
                DNS Resolution Audit
              </div>
              <div className="text-slate-200">
                {result.hasActiveDnsRecords ? (
                  <span className="text-amber-400">Active DNS Records Detected</span>
                ) : (
                  <span className="text-slate-400">No public DNS records resolved</span>
                )}
              </div>

              {result.dnsRecords && result.dnsRecords.length > 0 && (
                <div className="mt-2 space-y-1">
                  <div className="text-slate-500">Resolved Answers:</div>
                  {result.dnsRecords.slice(0, 3).map((r, i) => (
                    <div key={i} className="text-slate-300 truncate">
                      <span className="text-cyan-400">{r.type}:</span> {r.data}
                    </div>
                  ))}
                </div>
              )}

              {result.statusCodes && result.statusCodes.length > 0 && (
                <div className="mt-2">
                  <div className="text-slate-500">Registry Status Codes:</div>
                  <div className="text-slate-400 truncate text-[11px]">
                    {result.statusCodes.join(', ')}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Notes & Verification Safeguards */}
          <div className="pt-2 pb-6 border-b border-slate-800 space-y-1.5">
            <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-2">
              <Info className="w-3.5 h-3.5 text-cyan-400" />
              <span>Integrity Notes:</span>
            </div>
            {result.notes.map((note, idx) => (
              <div key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                <span className="text-cyan-400 shrink-0 font-bold">&bull;</span>
                <span>{note}</span>
              </div>
            ))}
          </div>

          {/* Official Claim or Registrar Link */}
          {result.officialRegistrarUrl && (
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-400">
                Final availability and checkout must be confirmed at an official authority.
              </span>
              <a
                href={result.officialRegistrarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 font-semibold text-xs sm:text-sm transition-all"
              >
                <span>Check Official Authority</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      )}

      {/* Suggested Free Community Alternatives */}
      {result && suggestions.length > 0 && (
        <div className="mb-12 rounded-2xl bg-slate-900/50 border border-slate-800 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="text-base font-bold text-slate-100">
              Free Community Subdomain Suggestions for "{result.domainName.split('.')[0]}"
            </h3>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            If commercial .com TLDs are costly or taken, consider these verified free developer and hosting subdomains:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
            {suggestions.map(s => (
              <button
                key={s}
                onClick={() => {
                  setInputVal(s);
                  executeCheck(s);
                }}
                className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 text-left transition-all group font-mono text-xs flex items-center justify-between"
              >
                <span className="text-slate-200 group-hover:text-cyan-300 truncate">{s}</span>
                <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 shrink-0 ml-1" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Recent Searches (Local Storage) */}
      <div className="rounded-2xl bg-slate-900/40 border border-slate-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase font-semibold">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>Recent Local Searches ({recentSearches.length})</span>
          </div>

          {recentSearches.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="text-xs text-slate-500 hover:text-rose-400 flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear history</span>
            </button>
          )}
        </div>

        {recentSearches.length === 0 ? (
          <p className="text-xs text-slate-500 italic">
            No recent searches. Domains you check are saved securely in your browser's local storage for your convenience.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {recentSearches.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setInputVal(item.query);
                  executeCheck(item.query);
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-cyan-500/40 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-colors flex items-center gap-2"
              >
                <span>{item.query}</span>
                {item.status && (
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    item.status === 'registered' ? 'bg-rose-400' : 'bg-emerald-400'
                  }`} />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
