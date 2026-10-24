import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Menu, X, Star, Sparkles, Sun, Moon, Compass, CheckCircle, ShieldCheck } from 'lucide-react';
import { getFavorites } from '../lib/storage';

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    const updateFavs = () => {
      setFavoriteCount(getFavorites().length);
    };
    updateFavs();
    window.addEventListener('storage', updateFavs);
    return () => window.removeEventListener('storage', updateFavs);
  }, [location.pathname]);

  // Close mobile menu on page change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Directory', href: '/domains' },
    { label: 'Domain Checker', href: '/checker' },
    { label: 'Compare', href: '/compare' },
    { label: 'Guides', href: '/guides' },
    { label: 'AI Advisor', href: '/advisor', badge: 'Gemini 4' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/25 group-hover:scale-105 transition-transform">
              <Globe className="w-5 h-5 text-slate-950 stroke-[2.2]" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-100 group-hover:text-cyan-300 transition-colors font-sans">
                Domain<span className="text-cyan-400">Nova</span>
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 -mt-1 hidden sm:block">
                Free Domain & Subdomain Hub
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map(link => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
                    active
                      ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-800/40'
                      : 'text-slate-300 hover:text-slate-100 hover:bg-slate-900/60'
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Favorites link button */}
            <Link
              to="/domains?filter=favorites"
              className="relative p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-800 transition-colors"
              title="Saved Favorites"
              aria-label="View saved favorite providers"
            >
              <Star className="w-4 h-4" />
              {favoriteCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-slate-950 text-[10px] font-bold flex items-center justify-center">
                  {favoriteCount}
                </span>
              )}
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 transition-colors"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              aria-label="Toggle color theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* CTA button to Checker */}
            <Link
              to="/checker"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold text-xs transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Verify Domain</span>
            </Link>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-900/80 text-slate-300 hover:text-slate-100 border border-slate-800"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-2xl px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1.5">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between ${
                  isActive(link.href)
                    ? 'text-cyan-300 bg-cyan-950/50 border border-cyan-800/40'
                    : 'text-slate-200 hover:bg-slate-900'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-800/80 mt-2 flex items-center justify-between">
              <Link
                to="/domains?filter=favorites"
                className="text-sm text-slate-300 hover:text-amber-300 flex items-center gap-2 py-2"
              >
                <Star className="w-4 h-4 text-amber-400" />
                <span>Saved Favorites ({favoriteCount})</span>
              </Link>
              <Link
                to="/checker"
                className="px-3.5 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
              >
                Verify Domain
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
