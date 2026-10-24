import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Star, Copy, Shield, Cpu, ArrowUpRight } from 'lucide-react';
import { Provider } from '../types/provider';
import { StatusBadge } from './StatusBadge';
import { isFavorite, toggleFavorite, copyToClipboard } from '../lib/storage';
import { useToast } from './Toast';

interface ProviderCardProps {
  provider: Provider;
  onFavoriteChange?: () => void;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({ provider, onFavoriteChange }) => {
  const { showToast } = useToast();
  const [favorite, setFavorite] = React.useState(() => isFavorite(provider.id));

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = toggleFavorite(provider.id);
    const isNowFav = updated.includes(provider.id);
    setFavorite(isNowFav);
    showToast(isNowFav ? `Saved ${provider.name} to favorites` : `Removed ${provider.name} from favorites`, 'info');
    if (onFavoriteChange) onFavoriteChange();
  };

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const success = await copyToClipboard(provider.claimUrl);
    if (success) {
      showToast(`Copied claim URL for ${provider.name}`, 'success');
    } else {
      showToast(`Could not copy link to clipboard`, 'error');
    }
  };

  return (
    <div className="group relative rounded-2xl bg-slate-900/70 border border-slate-800/90 hover:border-cyan-500/40 p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/20 backdrop-blur-sm flex flex-col justify-between">
      {/* Glow highlight */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div>
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 flex-wrap">
              <Link 
                to={`/providers/${provider.id}`} 
                className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors inline-flex items-center gap-1.5"
              >
                {provider.name}
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
              </Link>
              {provider.isPopular && (
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Popular
                </span>
              )}
            </div>
            <span className="font-mono text-xs text-cyan-400/90 mt-0.5">
              {provider.samplePattern}
            </span>
          </div>

          <button
            onClick={handleToggleFavorite}
            aria-label={favorite ? `Remove ${provider.name} from favorites` : `Add ${provider.name} to favorites`}
            className={`p-2 rounded-xl border transition-all ${
              favorite 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border-slate-700/60'
            }`}
          >
            <Star className={`w-4 h-4 ${favorite ? 'fill-amber-300' : ''}`} />
          </button>
        </div>

        {/* Verification Status Badge */}
        <div className="mb-3">
          <StatusBadge status={provider.verificationStatus} size="sm" />
        </div>

        {/* Description Tagline */}
        <p className="text-sm text-slate-300 mb-4 leading-relaxed line-clamp-2">
          {provider.tagline}
        </p>

        {/* Key Features & Badges */}
        <div className="flex flex-wrap gap-1.5 mb-5 text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/60 flex items-center gap-1 font-mono">
            <Shield className="w-3 h-3 text-cyan-400" />
            {provider.priceModel}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/60 flex items-center gap-1">
            <Cpu className="w-3 h-3 text-cyan-400" />
            {provider.dnsSupport ? 'DNS Records' : 'Platform URL'}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/60 font-mono">
            {provider.sslSupport.split('/')[0]}
          </span>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3 text-xs">
        <Link
          to={`/providers/${provider.id}`}
          className="font-medium text-slate-300 hover:text-cyan-300 transition-colors py-1.5"
        >
          View Specs & Guides →
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            title="Copy claim link to clipboard"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>

          <a
            href={provider.claimUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 transition-all font-medium"
          >
            Claim
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
