import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, AlertCircle, CheckCircle2, Sparkles, X } from 'lucide-react';
import { validateDomainSyntax, normalizeDomainInput } from '../lib/domainValidator';

interface DomainSearchBarProps {
  initialValue?: string;
  onSearch?: (domain: string) => void;
  className?: string;
  autoFocus?: boolean;
}

const QUICK_EXTENSIONS = [
  'is-a.dev',
  'js.org',
  'github.io',
  'vercel.app',
  'duckdns.org',
  'eu.org'
];

export const DomainSearchBar: React.FC<DomainSearchBarProps> = ({
  initialValue = '',
  onSearch,
  className = '',
  autoFocus = false
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState(initialValue);
  const [validation, setValidation] = useState(() => validateDomainSyntax(initialValue));
  const [selectedExtension, setSelectedExtension] = useState<string | null>(null);

  useEffect(() => {
    if (initialValue) {
      setQuery(initialValue);
      setValidation(validateDomainSyntax(initialValue));
    }
  }, [initialValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim()) {
      setValidation(validateDomainSyntax(val));
    } else {
      setValidation({
        isValid: false,
        domain: '',
        sld: '',
        tld: '',
        isSubdomain: false,
        isIdn: false
      });
    }
  };

  const handleApplyExtension = (ext: string) => {
    let clean = normalizeDomainInput(query);
    if (!clean) {
      clean = 'myproject';
    } else {
      // Strip any existing extension
      const parts = clean.split('.');
      clean = parts[0] || 'myproject';
    }
    const newDomain = `${clean}.${ext}`;
    setQuery(newDomain);
    setSelectedExtension(ext);
    setValidation(validateDomainSyntax(newDomain));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = normalizeDomainInput(query);
    if (!clean) return;

    if (onSearch) {
      onSearch(clean);
    } else {
      navigate(`/checker?domain=${encodeURIComponent(clean)}`);
    }
  };

  const clearInput = () => {
    setQuery('');
    setValidation({
      isValid: false,
      domain: '',
      sld: '',
      tld: '',
      isSubdomain: false,
      isIdn: false
    });
  };

  return (
    <div className={`w-full max-w-3xl mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center rounded-2xl bg-slate-900/90 border border-slate-700/80 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 shadow-2xl backdrop-blur-md transition-all p-1.5 sm:p-2">
          <div className="pl-3 sm:pl-4 text-cyan-400 shrink-0">
            <Search className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>

          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search any domain or subdomain (e.g. devport.is-a.dev or myproject)..."
            autoFocus={autoFocus}
            spellCheck={false}
            autoCapitalize="none"
            className="w-full bg-transparent px-3 py-2.5 sm:py-3.5 text-sm sm:text-base text-slate-100 placeholder-slate-500 focus:outline-none font-mono"
          />

          {query && (
            <button
              type="button"
              onClick={clearInput}
              className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors mr-1"
              aria-label="Clear input"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            type="submit"
            className="shrink-0 inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm sm:text-base transition-all shadow-lg shadow-cyan-500/20 active:scale-[0.98]"
          >
            <span>Check</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Live Syntax Validation Indicator */}
      {query.trim().length > 0 && (
        <div className="mt-2.5 px-2 flex items-center justify-between text-xs animate-in fade-in duration-200">
          {validation.isValid ? (
            <div className="flex items-center gap-1.5 text-emerald-400 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Valid syntax: <strong className="text-slate-200">{validation.domain}</strong></span>
              {validation.isSubdomain && (
                <span className="text-slate-400">({validation.tld} zone)</span>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-amber-400">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{validation.error || 'Enter complete domain (e.g., name.is-a.dev)'}</span>
            </div>
          )}

          {validation.isIdn && (
            <span className="text-cyan-400 font-mono text-[11px] bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
              Internationalized Domain (IDN)
            </span>
          )}
        </div>
      )}

      {/* Quick extension shortcuts */}
      <div className="mt-4 flex items-center gap-2 flex-wrap">
        <span className="text-xs text-slate-400 flex items-center gap-1 shrink-0 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Popular Free Extensions:
        </span>
        {QUICK_EXTENSIONS.map(ext => (
          <button
            key={ext}
            type="button"
            onClick={() => handleApplyExtension(ext)}
            className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
              selectedExtension === ext
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 ring-1 ring-cyan-500/30'
                : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-cyan-300'
            }`}
          >
            .{ext}
          </button>
        ))}
      </div>
    </div>
  );
};
