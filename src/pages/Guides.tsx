import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  Copy, 
  Check, 
  AlertTriangle, 
  Lightbulb, 
  ArrowRight, 
  Terminal,
  Shield,
  Layers
} from 'lucide-react';
import { GUIDES } from '../data/guides';
import { copyToClipboard } from '../lib/storage';
import { useToast } from '../components/Toast';

export const Guides: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { showToast } = useToast();

  const selectedGuide = GUIDES.find(g => g.id === id) || GUIDES[0];
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  const handleCopyCode = async (code: string, index: number) => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopiedCodeIndex(index);
      showToast('Configuration snippet copied', 'success');
      setTimeout(() => setCopiedCodeIndex(null), 2500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Page Header */}
      <div className="mb-10 text-center sm:text-left">
        <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-2 flex items-center gap-1.5 justify-center sm:justify-start">
          <BookOpen className="w-4 h-4" />
          <span>Technical Knowledge Base</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          DNS, SSL & Custom Subdomain Guides
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
          Comprehensive, production-ready documentation on configuring DNS records, automated Let's Encrypt certificates, GitHub Pages CNAMEs, and Vercel edge domains.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar / Guide Table of Contents */}
        <aside className="lg:col-span-4 space-y-2">
          <div className="text-xs uppercase font-mono font-bold text-slate-400 mb-3 px-2">
            Available Guides ({GUIDES.length})
          </div>

          <div className="space-y-1.5">
            {GUIDES.map(guide => {
              const isCurrent = guide.id === selectedGuide.id;
              return (
                <Link
                  key={guide.id}
                  to={`/guides/${guide.id}`}
                  className={`block p-4 rounded-xl border transition-all ${
                    isCurrent
                      ? 'bg-cyan-950/50 text-cyan-300 border-cyan-500/50 shadow-md shadow-cyan-950/20'
                      : 'bg-slate-900/50 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-slate-100'
                  }`}
                >
                  <div className="font-bold text-sm mb-1 leading-snug">{guide.title}</div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      {guide.readingTimeMinutes} min read
                    </span>
                    <span className="capitalize">{guide.category.replace('_', ' ')}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </aside>

        {/* Main Article Content */}
        <article className="lg:col-span-8 rounded-3xl bg-slate-900/70 border border-slate-800 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          {/* Article Header */}
          <div className="pb-6 border-b border-slate-800 mb-8">
            <div className="flex items-center gap-3 text-xs text-slate-400 font-mono mb-3">
              <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 capitalize">
                {selectedGuide.category.replace('_', ' ')}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                {selectedGuide.readingTimeMinutes} min read
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                Updated {selectedGuide.lastUpdated}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight mb-4">
              {selectedGuide.title}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {selectedGuide.description}
            </p>
          </div>

          {/* Article Sections */}
          <div className="space-y-8">
            {selectedGuide.sections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-slate-100 flex items-center gap-2">
                  <span>{section.heading}</span>
                </h3>

                <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>

                {/* Code Example Snippet */}
                {section.codeExample && (
                  <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-inner my-4">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs font-mono text-slate-400">
                      <span className="flex items-center gap-1.5 text-cyan-400">
                        <Terminal className="w-3.5 h-3.5" />
                        {section.codeExample.caption || section.codeExample.language}
                      </span>
                      <button
                        onClick={() => handleCopyCode(section.codeExample!.code, idx)}
                        className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors p-1"
                        aria-label="Copy snippet"
                      >
                        {copiedCodeIndex === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 text-[11px]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span className="text-[11px]">Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 text-xs font-mono text-cyan-200 overflow-x-auto selection:bg-cyan-500 selection:text-slate-950">
                      <code>{section.codeExample.code}</code>
                    </pre>
                  </div>
                )}

                {/* Tip Callout */}
                {section.tip && (
                  <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/40 flex items-start gap-3 text-xs leading-relaxed text-cyan-200">
                    <Lightbulb className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-cyan-300 font-semibold block mb-0.5">Pro Tip:</strong>
                      <span>{section.tip}</span>
                    </div>
                  </div>
                )}

                {/* Warning Callout */}
                {section.warning && (
                  <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/40 flex items-start gap-3 text-xs leading-relaxed text-amber-200">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-300 font-semibold block mb-0.5">Important Warning:</strong>
                      <span>{section.warning}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer of Guide */}
          <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <span className="text-xs text-slate-400">
              Need custom architecture advice for your specific project?
            </span>
            <Link
              to="/advisor"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-all"
            >
              <span>Ask AI Architecture Advisor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};
