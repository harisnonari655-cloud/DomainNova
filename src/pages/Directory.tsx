import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star, 
  RotateCcw, 
  Check, 
  SlidersHorizontal,
  ShieldCheck,
  Cpu,
  Globe
} from 'lucide-react';
import { PROVIDERS, CATEGORY_LABELS } from '../data/providers';
import { ProviderCard } from '../components/ProviderCard';
import { StatusBadge } from '../components/StatusBadge';
import { getFavorites } from '../lib/storage';

export const Directory: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialFilter = searchParams.get('filter') || 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState<string>(initialCategory);
  const [priceModel, setPriceModel] = useState<string>('all');
  const [onlyDnsControl, setOnlyDnsControl] = useState(false);
  const [onlyFavorites, setOnlyFavorites] = useState(initialFilter === 'favorites');
  const [sortBy, setSortBy] = useState<'popular' | 'name' | 'verified'>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<string[]>(() => getFavorites());

  const handleFavoriteChange = () => {
    setFavorites(getFavorites());
  };

  const filteredProviders = useMemo(() => {
    return PROVIDERS.filter(p => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesPattern = p.samplePattern.toLowerCase().includes(q);
        const matchesTagline = p.tagline.toLowerCase().includes(q);
        const matchesSuffix = p.availableSuffixes.some(s => s.toLowerCase().includes(q));
        if (!matchesName && !matchesPattern && !matchesTagline && !matchesSuffix) return false;
      }

      // Category
      if (category !== 'all' && p.category !== category) return false;

      // Price Model
      if (priceModel !== 'all' && p.priceModel !== priceModel) return false;

      // DNS Control
      if (onlyDnsControl && !p.dnsSupport) return false;

      // Only Favorites
      if (onlyFavorites && !favorites.includes(p.id)) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'popular') {
        return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'verified') {
        return b.lastVerifiedDate.localeCompare(a.lastVerifiedDate);
      }
      return 0;
    });
  }, [searchQuery, category, priceModel, onlyDnsControl, onlyFavorites, sortBy, favorites]);

  const activeFiltersCount = (category !== 'all' ? 1 : 0) +
    (priceModel !== 'all' ? 1 : 0) +
    (onlyDnsControl ? 1 : 0) +
    (onlyFavorites ? 1 : 0) +
    (searchQuery ? 1 : 0);

  const resetFilters = () => {
    setSearchQuery('');
    setCategory('all');
    setPriceModel('all');
    setOnlyDnsControl(false);
    setOnlyFavorites(false);
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Page Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2 font-semibold">
          <Globe className="w-4 h-4" />
          <span>Authoritative Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          Free Domains & Subdomains Directory
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
          Filter verified free options by capability, DNS control, eligibility criteria, and pricing model. All records include official documentation links and verification evidence.
        </p>
      </div>

      {/* Search & Main Filter Controls */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-8 backdrop-blur-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Filter by name, extension (e.g. is-a.dev, .org), or keyword..."
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 font-mono"
            />
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 shrink-0 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-slate-950/80 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="popular">Most Popular</option>
              <option value="name">Name (A-Z)</option>
              <option value="verified">Last Verified Date</option>
            </select>

            {/* View Mode */}
            <div className="flex items-center rounded-xl bg-slate-950/80 border border-slate-700/80 p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-slate-200'
                }`}
                aria-label="Grid view"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-slate-200'
                }`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
          {/* Category select */}
          <select
            value={category}
            onChange={e => {
              setCategory(e.target.value);
              setSearchParams(prev => {
                const next = new URLSearchParams(prev);
                if (e.target.value === 'all') next.delete('category');
                else next.set('category', e.target.value);
                return next;
              });
            }}
            className="bg-slate-950/80 border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Categories</option>
            {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>

          {/* Price Model select */}
          <select
            value={priceModel}
            onChange={e => setPriceModel(e.target.value)}
            className="bg-slate-950/80 border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Pricing Models</option>
            <option value="100% Free">100% Free</option>
            <option value="Free for Open Source">Free for Open Source</option>
            <option value="Free Tier Included">Free Tier Included</option>
            <option value="Freemium">Freemium</option>
          </select>

          {/* DNS Control toggle */}
          <button
            onClick={() => setOnlyDnsControl(!onlyDnsControl)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors flex items-center gap-1.5 ${
              onlyDnsControl 
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50' 
                : 'bg-slate-950/80 text-slate-300 border-slate-700/80 hover:text-slate-100'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Requires DNS Records</span>
          </button>

          {/* Saved Favorites filter toggle */}
          <button
            onClick={() => {
              const nextVal = !onlyFavorites;
              setOnlyFavorites(nextVal);
              setSearchParams(prev => {
                const next = new URLSearchParams(prev);
                if (!nextVal) next.delete('filter');
                else next.set('filter', 'favorites');
                return next;
              });
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors flex items-center gap-1.5 ${
              onlyFavorites 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' 
                : 'bg-slate-950/80 text-slate-300 border-slate-700/80 hover:text-slate-100'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-amber-300' : ''}`} />
            <span>Favorites ({favorites.length})</span>
          </button>

          {/* Reset button */}
          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              className="ml-auto text-xs text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors px-2 py-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Results Info */}
      <div className="flex items-center justify-between text-xs text-slate-400 mb-6 px-1">
        <span>
          Showing <strong className="text-slate-200">{filteredProviders.length}</strong> of {PROVIDERS.length} verified providers
        </span>
        {activeFiltersCount > 0 && (
          <span className="text-cyan-400 font-mono">
            {activeFiltersCount} active filter{activeFiltersCount > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Providers Content */}
      {filteredProviders.length === 0 ? (
        <div className="rounded-2xl bg-slate-900/40 border border-slate-800 p-12 text-center max-w-lg mx-auto">
          <SlidersHorizontal className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-200 mb-1">No providers match your criteria</h3>
          <p className="text-xs text-slate-400 mb-6">
            Try adjusting your search query, clearing filters, or unchecking "Favorites".
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-all"
          >
            Clear all filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map(provider => (
            <ProviderCard 
              key={provider.id} 
              provider={provider} 
              onFavoriteChange={handleFavoriteChange} 
            />
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-3">
          {filteredProviders.map(p => (
            <div
              key={p.id}
              className="rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 p-4 sm:p-5 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <a
                    href={`/providers/${p.id}`}
                    className="text-base font-bold text-slate-100 hover:text-cyan-300 transition-colors"
                  >
                    {p.name}
                  </a>
                  <span className="font-mono text-xs text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                    {p.samplePattern}
                  </span>
                  <StatusBadge status={p.verificationStatus} size="sm" />
                </div>
                <p className="text-xs text-slate-300 line-clamp-1">
                  {p.tagline}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs shrink-0 self-end md:self-center">
                <span className="font-mono text-slate-400">{p.priceModel}</span>
                <span className="font-mono text-slate-400">
                  {p.dnsSupport ? 'DNS Records' : 'Platform Host'}
                </span>
                <a
                  href={`/providers/${p.id}`}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors font-medium"
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
