import React, { useState, useEffect } from 'react';
import { Smartphone, Download, Share, PlusSquare, CheckCircle2, X, Sparkles, ShieldCheck } from 'lucide-react';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  deferredPrompt: any;
  onPromptHandled: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({
  isOpen,
  onClose,
  deferredPrompt,
  onPromptHandled,
}) => {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  useEffect(() => {
    // Check if running on iOS Safari
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIOSDevice);

    // Check if already installed & running standalone
    const isStandaloneMode =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(isStandaloneMode);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }
    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstallSuccess(true);
      }
      onPromptHandled();
    } catch (err) {
      console.error('Error triggering PWA install:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-stone-200 overflow-hidden relative">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close installation window"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Smartphone className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-emerald-200 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" /> Step 2: Mobile App Launch
              </span>
              <h3 className="font-serif-title font-bold text-lg text-white">
                Add Haven to Home Screen
              </h3>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5">
          {isStandalone || installSuccess ? (
            <div className="text-center py-4 space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="font-serif-title font-bold text-lg text-stone-900">
                Haven is Installed & Ready!
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Haven is now accessible directly from your home screen as a standalone app with offline resilience, full-screen immersion, and instant access.
              </p>
              <button
                onClick={onClose}
                className="w-full mt-2 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-sm"
              >
                Close & Return to Sanctuary
              </button>
            </div>
          ) : isIOS ? (
            /* iOS Instructions */
            <div className="space-y-4">
              <p className="text-xs text-stone-600 leading-relaxed">
                Follow these three simple steps in Safari to add Haven to your iPhone or iPad home screen:
              </p>

              <div className="space-y-3 bg-stone-50 p-4 rounded-2xl border border-stone-200/80">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                      Tap the Share Button <Share className="w-3.5 h-3.5 text-blue-600 inline" />
                    </p>
                    <p className="text-[11px] text-stone-500">
                      Located in the bottom navigation bar of Safari.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                      Select "Add to Home Screen" <PlusSquare className="w-3.5 h-3.5 text-stone-700 inline" />
                    </p>
                    <p className="text-[11px] text-stone-500">
                      Scroll down in the share sheet to find this option.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-800">
                      Tap "Add" in Top Right
                    </p>
                    <p className="text-[11px] text-stone-500">
                      Haven will appear on your device alongside your other mobile apps.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px]">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Zero app-store tracking. Complete anonymous privacy.</span>
              </div>

              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-stone-800 hover:bg-stone-900 text-white text-xs font-semibold shadow-sm"
              >
                Got It
              </button>
            </div>
          ) : deferredPrompt ? (
            /* Android / Chrome One-Tap Install */
            <div className="space-y-4">
              <p className="text-xs text-stone-600 leading-relaxed">
                Install Haven directly onto your device. Enjoy standalone full-screen view, faster load times, and offline access to your recovery tools and calming audio.
              </p>

              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 space-y-2">
                <div className="flex items-center gap-2 text-xs font-medium text-stone-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <span>Instant launch from Home Screen or App Drawer</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-stone-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <span>Audio player runs seamlessly without browser clutter</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-stone-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <span>Quick Exit calculator disguise always one tap away</span>
                </div>
              </div>

              <button
                onClick={handleInstallClick}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-800 hover:to-teal-800 text-white text-xs font-bold shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98"
              >
                <Download className="w-4 h-4" />
                <span>Install Haven App to Device</span>
              </button>
            </div>
          ) : (
            /* Browser instructions for desktop or Android menu */
            <div className="space-y-4">
              <p className="text-xs text-stone-600 leading-relaxed">
                Haven can be installed through your browser's menu:
              </p>
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 space-y-2 text-xs text-stone-700">
                <p className="font-semibold text-stone-900">Chrome / Edge / Brave:</p>
                <p className="text-[11px] text-stone-600">
                  Click the install icon <Download className="w-3.5 h-3.5 inline mx-1 text-emerald-700" /> on the right side of the address bar, or open the browser menu (⋮) and select <strong>"Install Haven..."</strong>.
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-stone-800 hover:bg-stone-900 text-white text-xs font-semibold shadow-sm"
              >
                Understood
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
