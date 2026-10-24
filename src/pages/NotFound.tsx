import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, Search, ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center rounded-3xl bg-slate-900/80 border border-slate-800 p-8 sm:p-10 backdrop-blur-md shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-6">
          <Compass className="w-8 h-8 animate-pulse" />
        </div>

        <div className="text-4xl font-extrabold font-mono text-cyan-400 mb-2">404</div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-100 mb-2">Zone Not Found</h1>
        <p className="text-xs sm:text-sm text-slate-400 mb-8 leading-relaxed">
          The requested page or record does not exist on this domain. Check the URL path or return to our directory.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </Link>

          <Link
            to="/domains"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs border border-slate-700 transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Explore Directory</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
