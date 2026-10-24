import React, { useState } from 'react';
import { 
  Sparkles, 
  BrainCircuit, 
  Send, 
  RotateCcw, 
  Terminal, 
  CheckCircle2, 
  AlertCircle, 
  Lightbulb, 
  Copy, 
  Check, 
  ShieldCheck,
  ChevronRight,
  Cpu
} from 'lucide-react';
import { askAiAdvisor } from '../lib/api';
import { copyToClipboard } from '../lib/storage';
import { useToast } from '../components/Toast';

const PRESET_QUERIES = [
  {
    title: 'GitHub Pages + is-a.dev Subdomain',
    description: 'Exact CNAME file configuration, GitHub repository settings, and Let\'s Encrypt SSL verification.',
    prompt: 'How do I configure my GitHub Pages portfolio repository with a free is-a.dev subdomain? What exact CNAME record and CNAME file do I need, and how do I prevent SSL certificate errors?'
  },
  {
    title: 'Cloudflare Proxy (Orange Cloud) vs Vercel SSL',
    description: 'Troubleshoot SSL handshake loops, ERR_TOO_MANY_REDIRECTS, and CNAME flattening.',
    prompt: 'I have a custom subdomain on Cloudflare pointed to Vercel, but I am getting ERR_TOO_MANY_REDIRECTS and SSL certificate verification pending. How do I fix Cloudflare SSL mode (Flexible vs Full Strict) and proxy status?'
  },
  {
    title: 'Duck DNS + Home Lab SSL without Port 80',
    description: 'ACME DNS-01 challenge setup for local LAN services with Nginx Proxy Manager or Caddy.',
    prompt: 'How can I obtain a trusted Let\'s Encrypt wildcard SSL certificate for my private Home Assistant / home lab on duckdns.org without forwarding port 80 or exposing my home router to the public internet?'
  },
  {
    title: 'EU.org Nameserver Delegation to Cloudflare',
    description: 'Pre-configuring authoritative NS records before submitting the ARF form on nic.eu.org.',
    prompt: 'What are the exact technical requirements to delegate an eu.org domain to Cloudflare nameservers? Why does the nic.eu.org zone checker fail with "nameservers not answering authoritatively" and how do I fix it?'
  }
];

export const AiAdvisorPage: React.FC = () => {
  const { showToast } = useToast();
  const [question, setQuestion] = useState('');
  const [context, setContext] = useState('Frontend & DNS Architecture');
  const [loading, setLoading] = useState(false);
  const [thinkingStep, setThinkingStep] = useState(0);
  const [response, setResponse] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const thinkingMessages = [
    'Initializing Gemini 4 Argon reasoning engine...',
    'Analyzing DNS zone delegation & RFC apex constraints...',
    'Auditing Let\'s Encrypt ACME challenge requirements...',
    'Synthesizing production-grade step-by-step solution...'
  ];

  const handleAsk = async (queryText?: string) => {
    const q = (queryText || question).trim();
    if (!q) {
      showToast('Please enter a technical question', 'error');
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setResponse(null);
    setThinkingStep(0);

    // Animate thinking milestones
    const interval = setInterval(() => {
      setThinkingStep(prev => (prev < thinkingMessages.length - 1 ? prev + 1 : prev));
    }, 1800);

    try {
      const res = await askAiAdvisor(q, `Category: ${context}`);
      clearInterval(interval);

      if (res.success && res.answer) {
        setResponse(res.answer);
      } else {
        setErrorMsg(res.message || res.error || 'Failed to generate response. Ensure GEMINI_API_KEY is configured.');
      }
    } catch {
      clearInterval(interval);
      setErrorMsg('Network error connecting to the AI Advisor service.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!response) return;
    const ok = await copyToClipboard(response);
    if (ok) {
      setCopied(true);
      showToast('Advice copied to clipboard', 'success');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold mb-3 backdrop-blur-md shadow-lg shadow-cyan-950/30">
          <BrainCircuit className="w-4 h-4 text-cyan-400" />
          <span>Gemini 4 Argon &bull; High Thinking Architecture Consultant</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          Deep DNS & Hosting Architecture Advisor
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
          Stuck with intricate CNAME flattening, SSL handshake loops, reverse proxy configs, or open-source registry validation? Ask deep reasoning queries with high-thinking verification.
        </p>
      </div>

      {/* Preset Problem Cards */}
      <div className="mb-8">
        <div className="text-xs uppercase font-mono font-bold text-slate-400 mb-3 flex items-center gap-1.5">
          <Lightbulb className="w-3.5 h-3.5 text-cyan-400" />
          <span>Recommended Complex Architecture Scenarios:</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {PRESET_QUERIES.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuestion(preset.prompt);
                handleAsk(preset.prompt);
              }}
              className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 text-left transition-all hover:bg-slate-900 group"
            >
              <div className="font-bold text-sm text-slate-200 group-hover:text-cyan-300 transition-colors flex items-center justify-between mb-1">
                <span>{preset.title}</span>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-transform group-hover:translate-x-0.5" />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {preset.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4 sm:p-6 mb-8 backdrop-blur-md shadow-2xl">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-3">
          <label className="text-xs font-mono font-semibold text-slate-300">
            Ask Your Technical Question:
          </label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Context:</span>
            <select
              value={context}
              onChange={e => setContext(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="Frontend & Static Hosting">Frontend & Static Hosting</option>
              <option value="Home Lab & DDNS">Home Lab & Dynamic DNS</option>
              <option value="Cloud & Edge Microservices">Cloud & Edge Microservices</option>
              <option value="Open Source Registries">Open Source Registries</option>
              <option value="SSL/TLS Certificates">SSL/TLS Certificates</option>
            </select>
          </div>
        </div>

        <textarea
          rows={4}
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="e.g., How do I point my is-a.dev subdomain to Vercel without breaking Cloudflare SSL? Include exact record values..."
          className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl p-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 font-mono resize-none leading-relaxed"
        />

        <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Model: gemini-4-argon &bull; ThinkingLevel: HIGH</span>
          </div>

          <button
            onClick={() => handleAsk()}
            disabled={loading || !question.trim()}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm transition-all disabled:opacity-50 shadow-lg shadow-cyan-500/20"
          >
            {loading ? (
              <>
                <RotateCcw className="w-4 h-4 animate-spin" />
                <span>Thinking deeply...</span>
              </>
            ) : (
              <>
                <span>Analyze with High Thinking</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Thinking State Animation */}
      {loading && (
        <div className="rounded-2xl bg-slate-900/60 border border-cyan-500/30 p-8 text-center animate-pulse backdrop-blur-md mb-8">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-4">
            <BrainCircuit className="w-6 h-6 animate-spin" />
          </div>
          <h3 className="text-base font-bold text-slate-200 mb-1">
            Gemini 4 Argon is reasoning with High Thinking
          </h3>
          <p className="text-xs font-mono text-cyan-400 mt-2">
            {thinkingMessages[thinkingStep]}
          </p>
        </div>
      )}

      {/* Error Card */}
      {errorMsg && (
        <div className="rounded-2xl bg-rose-950/30 border border-rose-800/60 p-5 mb-8 flex items-start gap-3 text-xs leading-relaxed text-rose-200">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-rose-100 font-semibold block mb-1">Advisor Notice:</strong>
            <p>{errorMsg}</p>
          </div>
        </div>
      )}

      {/* Response Display */}
      {response && (
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-10 backdrop-blur-md shadow-2xl animate-in fade-in duration-300">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Architectural Synthesis (gemini-4-argon / HIGH Thinking)</span>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-slate-100 text-xs font-medium transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Solution</span>
                </>
              )}
            </button>
          </div>

          <div className="prose prose-invert max-w-none text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-sans space-y-4">
            {response}
          </div>
        </div>
      )}
    </div>
  );
};
