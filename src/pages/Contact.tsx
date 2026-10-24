import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, ShieldCheck, FileText, AlertCircle } from 'lucide-react';
import { useToast } from '../components/Toast';

export const Contact: React.FC = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'correction',
    providerName: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast('Please fill out all required fields', 'error');
      return;
    }

    setSubmitted(true);
    showToast('Report received. Thank you for maintaining community data integrity!', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold mb-3">
          <Mail className="w-4 h-4 text-cyan-400" />
          <span>Community Communication</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
          Contact & Data Corrections
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
          Found an outdated provider rule, broken claim URL, or want to submit an authentic free registry? Let us know.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Submission Guidelines */}
        <div className="md:col-span-5 space-y-6">
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Provider Inclusion Criteria</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We only add providers that meet rigorous standards:
            </p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">&#10003;</span>
                <span>Authoritative, public terms of service with clear zero-cost terms.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">&#10003;</span>
                <span>No forced credit card requirements for basic free functionality.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">&#10003;</span>
                <span>Active, functioning DNS resolution or hosting infrastructure.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">&#10007;</span>
                <span>No promotional bait-and-switch trials with hidden renewals.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 text-xs text-slate-400 leading-relaxed">
            <strong className="text-slate-200 block mb-1">Open Source Contribution:</strong>
            You can also contribute directly via our GitHub repository by opening an issue or submitting a pull request to update the provider data module.
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-7">
          <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-100">Report Successfully Logged</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Thank you for helping keep DomainNova 100% accurate. Maintainers will review the documentation citation and update the directory.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', type: 'correction', providerName: '', message: '' });
                  }}
                  className="mt-4 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                >
                  Submit Another Report
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Rivera"
                    className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                    Your Email * (For follow-up questions only)
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@example.com"
                    className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-sans"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                      Report Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={e => setFormData({ ...formData, type: e.target.value })}
                      className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                    >
                      <option value="correction">Data Correction / Policy Update</option>
                      <option value="submission">New Free Provider Submission</option>
                      <option value="scam_report">Report a Domain Scam</option>
                      <option value="general">General Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                      Provider / Suffix (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.providerName}
                      onChange={e => setFormData({ ...formData, providerName: e.target.value })}
                      placeholder="e.g. is-a.dev, eu.org"
                      className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                    Details & Evidence Link *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please include official documentation URLs or repository links supporting the update..."
                    className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl p-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-sans resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/20 active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Community Report</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
