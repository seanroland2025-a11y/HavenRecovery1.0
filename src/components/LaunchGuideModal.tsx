import React, { useState } from 'react';
import { Globe, Smartphone, Server, CheckCircle2, Copy, Check, ExternalLink, X, ShieldAlert, Sparkles, Rocket } from 'lucide-react';

interface LaunchGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPWAInstall: () => void;
}

export const LaunchGuideModal: React.FC<LaunchGuideModalProps> = ({
  isOpen,
  onClose,
  onOpenPWAInstall,
}) => {
  const [activeTab, setActiveTab] = useState<'domain' | 'pwa' | 'hosting'>('domain');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-5 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close launch guide"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Rocket className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider">
                  Production Launch Suite
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">
                  Ready to Deploy
                </span>
              </div>
              <h3 className="font-serif-title font-bold text-lg md:text-xl text-white">
                Launch Steps 2 & 3: Mobile PWA & Custom Domain
              </h3>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex gap-2 mt-4 pt-2 border-t border-white/10">
            <button
              onClick={() => setActiveTab('domain')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'domain'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span>Step 3: Custom Domain</span>
            </button>
            <button
              onClick={() => setActiveTab('pwa')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'pwa'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Step 2: Mobile PWA</span>
            </button>
            <button
              onClick={() => setActiveTab('hosting')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'hosting'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Server className="w-3.5 h-3.5 text-emerald-600" />
              <span>Hosting Platforms</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-stone-700">
          {/* TAB 1: CUSTOM DOMAIN (STEP 3) */}
          {activeTab === 'domain' && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-900 leading-relaxed">
                  <p className="font-bold">Permanent Custom Domain Ready</p>
                  <p className="mt-0.5 text-emerald-800">
                    To point your official address (e.g., <strong>havenrecovery.org</strong> or <strong>app.havenrecovery.org</strong>), configure these standard DNS records with your registrar (GoDaddy, Namecheap, Cloudflare, etc.).
                  </p>
                </div>
              </div>

              {/* DNS Records Table */}
              <div className="border border-stone-200 rounded-2xl overflow-hidden text-xs">
                <div className="bg-stone-100/80 px-4 py-2.5 font-bold text-stone-800 flex items-center justify-between border-b border-stone-200">
                  <span>Standard DNS Records Configuration</span>
                  <span className="text-[10px] text-stone-500 font-normal">TTL: Automatic / 300</span>
                </div>

                <div className="divide-y divide-stone-100">
                  {/* Record 1: A Record */}
                  <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-stone-50/50">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px]">
                          A Record
                        </span>
                        <span className="font-mono text-stone-600">Host: @</span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1">Directs apex/root domain traffic</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="bg-stone-100 px-2 py-1 rounded text-stone-800 font-mono text-[11px]">
                        76.76.21.21
                      </code>
                      <button
                        onClick={() => handleCopy('76.76.21.21', 'a_record')}
                        className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-600 transition-colors"
                        title="Copy IP Address"
                      >
                        {copiedKey === 'a_record' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Record 2: CNAME */}
                  <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-stone-50/50">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-mono font-bold text-[10px]">
                          CNAME
                        </span>
                        <span className="font-mono text-stone-600">Host: www</span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1">Directs www.havenrecovery.org</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="bg-stone-100 px-2 py-1 rounded text-stone-800 font-mono text-[11px]">
                        cname.vercel-dns.com
                      </code>
                      <button
                        onClick={() => handleCopy('cname.vercel-dns.com', 'cname_record')}
                        className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-600 transition-colors"
                        title="Copy CNAME Target"
                      >
                        {copiedKey === 'cname_record' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Automatic SSL note */}
              <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 text-xs space-y-1">
                <p className="font-semibold text-stone-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Automatic Free SSL (HTTPS)
                </p>
                <p className="text-stone-600 text-[11px]">
                  When deployed on Vercel, Netlify, or Cloudflare, your SSL security certificate provisions automatically without manual renewals.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: MOBILE PWA INSTALL (STEP 2) */}
          {activeTab === 'pwa' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200/80">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-emerald-900">
                    PWA Engine & Service Worker Active
                  </p>
                  <p className="text-[11px] text-emerald-700">
                    Offline caching and Home Screen installation are configured and active.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenPWAInstall();
                  }}
                  className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-sm shrink-0"
                >
                  Test Install Dialog
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                  <div className="flex items-center gap-2 text-stone-900 font-bold text-xs">
                    <Smartphone className="w-4 h-4 text-emerald-700" />
                    <span>iOS (Safari)</span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-relaxed">
                    Users tap <strong>Share</strong> in Safari &gt; <strong>"Add to Home Screen"</strong> &gt; <strong>"Add"</strong>. The app launches with no browser address bar.
                  </p>
                </div>

                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                  <div className="flex items-center gap-2 text-stone-900 font-bold text-xs">
                    <Smartphone className="w-4 h-4 text-teal-700" />
                    <span>Android (Chrome)</span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-relaxed">
                    A native install banner appears automatically, or users click the in-app <strong>"Install Haven App"</strong> button.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 text-xs">
                <p className="font-bold text-stone-800 mb-1">PWA Capabilities Enabled in this Build:</p>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-stone-600">
                  <li>Full standalone screen mode (app-like immersion)</li>
                  <li>Offline recovery tools & background sound playback</li>
                  <li>Fast instant loading via precached Service Worker (<code>sw.js</code>)</li>
                  <li>One-tap Quick Exit camouflage protection</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: HOSTING PLATFORMS (STEP 3) */}
          {activeTab === 'hosting' && (
            <div className="space-y-3">
              {/* Vercel Card */}
              <div className="p-4 rounded-2xl border-2 border-emerald-500/30 bg-emerald-50/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Vercel Deployment (Pre-configured via vercel.json)
                  </span>
                  <span className="text-[10px] text-emerald-800 bg-emerald-100 font-bold px-2 py-0.5 rounded border border-emerald-200">
                    Recommended • Ready
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Haven is fully pre-configured for Vercel with <code>vercel.json</code> handling SPA rewrites, Service Worker headers, and security rules.
                </p>

                {/* Vercel CLI & Config Details */}
                <div className="bg-white/90 border border-emerald-200/80 rounded-xl p-3 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold text-stone-700">Deploy via CLI:</span>
                    <button
                      onClick={() => handleCopy('npx vercel --prod', 'vercel_cli')}
                      className="flex items-center gap-1 text-[11px] text-emerald-700 hover:text-emerald-800 font-semibold px-2 py-1 rounded bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                    >
                      {copiedKey === 'vercel_cli' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>Copy command</span>
                    </button>
                  </div>
                  <code className="block bg-stone-900 text-emerald-300 font-mono text-[11px] p-2.5 rounded-lg overflow-x-auto">
                    npx vercel --prod
                  </code>

                  <div className="pt-1 flex items-center justify-between text-[11px] text-stone-600">
                    <span>Or push code to GitHub & import project at <strong>vercel.com/new</strong></span>
                    <button
                      onClick={() => handleCopy(`{\n  "$schema": "https://openapi.vercel.sh/vercel.json",\n  "framework": "vite",\n  "buildCommand": "npm run build",\n  "outputDirectory": "dist",\n  "cleanUrls": true,\n  "trailingSlash": false,\n  "rewrites": [\n    { "source": "/(.*)", "destination": "/index.html" }\n  ]\n}`, 'vercel_json_raw')}
                      className="flex items-center gap-1 text-[10px] text-stone-600 hover:text-stone-900 px-2 py-0.5 rounded border border-stone-200 hover:bg-stone-50"
                    >
                      {copiedKey === 'vercel_json_raw' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>Copy vercel.json</span>
                    </button>
                  </div>

                  <div className="text-[10px] text-stone-500 bg-stone-50 p-2 rounded-lg border border-stone-200/60 leading-normal">
                    💡 <strong>Tip on Vercel Import:</strong> If Vercel prompts with <em>"We found values that may be secrets"</em>, click <strong>"Remove false positives"</strong> or <strong>"Continue"</strong>. No manual commands need to be typed or pasted into Vercel settings.
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" /> Netlify (Configured via netlify.toml)
                  </span>
                  <span className="text-[10px] text-teal-700 bg-teal-100 font-bold px-2 py-0.5 rounded">
                    Turnkey
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Connect GitHub repository to Netlify. Build command and SPA redirect rules are ready in <code>netlify.toml</code>.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" /> Google Cloud Run (Containerized)
                  </span>
                  <span className="text-[10px] text-blue-700 bg-blue-100 font-bold px-2 py-0.5 rounded">
                    Docker & Nginx
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  A high-performance production <code>Dockerfile</code> and <code>nginx.conf</code> are bundled for instant Cloud Run container deployment.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-stone-50 px-6 py-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] text-stone-500">
            All configuration files (<code>vercel.json</code>, <code>netlify.toml</code>, <code>Dockerfile</code>, <code>sw.js</code>) are committed and ready.
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-semibold shadow-sm transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
