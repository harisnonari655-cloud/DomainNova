import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ExternalLink, 
  ShieldCheck, 
  Check, 
  X, 
  Copy, 
  Calendar, 
  FileText, 
  Globe, 
  Cpu, 
  Lock, 
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Share2
} from 'lucide-react';
import { PROVIDERS } from '../data/providers';
import { GUIDES } from '../data/guides';
import { StatusBadge } from '../components/StatusBadge';
import { copyToClipboard } from '../lib/storage';
import { useToast } from '../components/Toast';

export const ProviderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { showToast } = useToast();

  const provider = PROVIDERS.find(p => p.id === id);

  if (!provider) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-100 mb-2">Provider Not Found</h2>
        <p className="text-sm text-slate-400 mb-6">
          The requested provider does not exist in our verified database.
        </p>
        <Link
          to="/domains"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Provider Directory</span>
        </Link>
      </div>
    );
  }

  const handleCopyLink = async () => {
    const success = await copyToClipboard(window.location.href);
    showToast(success ? 'Link copied to clipboard' : 'Could not copy', success ? 'success' : 'error');
  };

  const relatedGuides = GUIDES.filter(g => g.relatedProviders?.includes(provider.id));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Back button */}
      <div className="mb-6">
        <Link
          to="/domains"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Directory</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-10 mb-8 backdrop-blur-md shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
                {provider.name}
              </h1>
              <StatusBadge status={provider.verificationStatus} />
            </div>
            <div className="font-mono text-cyan-400 text-sm sm:text-base font-semibold">
              Sample: {provider.samplePattern}
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleCopyLink}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-slate-100 border border-slate-700 transition-colors"
              title="Share Provider"
              aria-label="Share provider"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <a
              href={provider.claimUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all"
            >
              <span>Official Claim Page</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Tagline & Evidence */}
        <div className="pt-6 space-y-4">
          <p className="text-slate-200 text-base leading-relaxed">
            {provider.tagline}
          </p>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-3 text-xs leading-relaxed">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-200 block mb-0.5">Authoritative Evidence & Verification Citation:</strong>
              <span className="text-slate-400">{provider.evidence}</span>
              <div className="mt-2 text-[11px] text-slate-500 font-mono flex items-center gap-1.5">
                <Calendar className="w-3 h-3 text-cyan-400" />
                <span>Last verified on {provider.lastVerifiedDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Specifications & Technical Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Card 1: Core Specifications */}
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 space-y-4">
          <h3 className="text-sm uppercase font-mono font-bold text-cyan-400 flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            <span>Technical Specifications</span>
          </h3>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between py-2 border-b border-slate-800/80">
              <span className="text-slate-400">Pricing Model:</span>
              <span className="font-mono font-bold text-emerald-400">{provider.priceModel}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-800/80">
              <span className="text-slate-400">Domain Classification:</span>
              <span className="font-mono text-slate-200 text-right">{provider.domainType}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-800/80">
              <span className="text-slate-400">Ownership Model:</span>
              <span className="text-slate-300 text-right text-xs max-w-[240px]">{provider.ownershipModel}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-800/80">
              <span className="text-slate-400">DNS Record Control:</span>
              <span className="text-slate-200">{provider.dnsSupport ? 'Yes (Custom Records)' : 'No (Fixed Hostname)'}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-800/80">
              <span className="text-slate-400">Supported Records:</span>
              <span className="font-mono text-cyan-300">{provider.supportedRecordTypes.join(', ')}</span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-slate-400">SSL Certificate:</span>
              <span className="font-mono text-slate-200">{provider.sslSupport}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Renewal & Official Links */}
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 space-y-4">
          <h3 className="text-sm uppercase font-mono font-bold text-cyan-400 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <span>Renewal & Official Links</span>
          </h3>

          <div className="space-y-4 text-xs sm:text-sm">
            <div>
              <span className="text-slate-400 block mb-1">Renewal Terms & Conditions:</span>
              <p className="text-slate-200 text-xs leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                {provider.renewalConditions}
              </p>
            </div>

            <div>
              <span className="text-slate-400 block mb-1">DNS Support Details:</span>
              <p className="text-slate-300 text-xs leading-relaxed">
                {provider.dnsSupportDetails}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-2">
              <a
                href={provider.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center justify-between p-2 rounded-lg bg-slate-950/60 hover:bg-slate-950 border border-slate-800 transition-colors"
              >
                <span>Official Provider Homepage</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={provider.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center justify-between p-2 rounded-lg bg-slate-950/60 hover:bg-slate-950 border border-slate-800 transition-colors"
              >
                <span>Official Documentation & Policy</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Step-by-Step Claim Walkthrough */}
      <div className="rounded-3xl bg-slate-900/70 border border-slate-800 p-6 sm:p-8 mb-8">
        <h3 className="text-lg font-bold text-slate-100 mb-6 flex items-center gap-2">
          <span>Step-by-Step Registration & Claim Guide</span>
        </h3>

        <div className="space-y-6">
          {provider.stepByStepClaim.map(step => (
            <div key={step.step} className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center font-mono font-bold text-sm shrink-0 mt-0.5">
                {step.step}
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-slate-100 mb-1">
                  {step.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Eligibility vs Restrictions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Eligibility */}
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6">
          <h3 className="text-sm font-bold text-emerald-400 uppercase font-mono tracking-wider mb-4 flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Eligibility Requirements</span>
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-300">
            {provider.eligibility.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-400 shrink-0 font-bold">&#10003;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Restrictions */}
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6">
          <h3 className="text-sm font-bold text-rose-400 uppercase font-mono tracking-wider mb-4 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>Restrictions & Policies</span>
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-300">
            {provider.restrictions.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-rose-400 shrink-0 font-bold">&#10007;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Technical Pros & Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6">
          <h4 className="text-xs font-mono uppercase text-slate-400 font-bold mb-3">Key Technical Advantages</h4>
          <ul className="space-y-2 text-xs text-slate-300">
            {provider.technicalPros.map((pro, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6">
          <h4 className="text-xs font-mono uppercase text-slate-400 font-bold mb-3">Technical Trade-offs</h4>
          <ul className="space-y-2 text-xs text-slate-300">
            {provider.technicalCons.map((con, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Related Technical Guides */}
      {relatedGuides.length > 0 && (
        <div className="rounded-2xl bg-slate-900/50 border border-slate-800 p-6">
          <h3 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>Related Setup Guides for {provider.name}</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedGuides.map(guide => (
              <Link
                key={guide.id}
                to={`/guides/${guide.id}`}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/40 transition-all group block"
              >
                <h4 className="text-sm font-bold text-slate-200 group-hover:text-cyan-300 transition-colors mb-1">
                  {guide.title}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {guide.description}
                </p>
                <div className="mt-3 text-[11px] text-cyan-400 font-medium flex items-center gap-1">
                  <span>Read guide ({guide.readingTimeMinutes} min)</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
