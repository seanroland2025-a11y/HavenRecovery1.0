import React from 'react';
import { Phone, MessageSquare, Shield, ExternalLink, HeartHandshake, AlertCircle } from 'lucide-react';

export const CrisisModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const resources = [
    {
      name: '988 Suicide & Crisis Lifeline',
      contact: 'Call or Text 988',
      desc: 'Free, confidential support available 24/7 for emotional distress or suicidal crisis.',
      url: 'tel:988',
      type: 'phone'
    },
    {
      name: 'RAINN (National Sexual Assault Hotline)',
      contact: '1-800-656-4673',
      desc: 'Confidential support for survivors of sexual assault, harassment, and abuse.',
      url: 'tel:18006564673',
      type: 'phone'
    },
    {
      name: 'National Domestic Violence Hotline',
      contact: '1-800-799-7233 or Text "START" to 88788',
      desc: '24/7 support for domestic violence, relationship abuse, and coercive control.',
      url: 'tel:18007997233',
      type: 'phone'
    },
    {
      name: 'SAMHSA National Helpline (Substance Recovery)',
      contact: '1-800-662-4357',
      desc: '24/7 treatment referral and support for substance use disorders.',
      url: 'tel:18006624357',
      type: 'phone'
    },
    {
      name: 'Crisis Text Line',
      contact: 'Text HOME to 741741',
      desc: 'Free, 24/7 crisis support via text message in the US and Canada.',
      url: 'sms:741741',
      type: 'text'
    },
    {
      name: 'The Trevor Project (LGBTQ+ Crisis Support)',
      contact: '1-866-488-7386 or Text START to 678-678',
      desc: '24/7 confidential crisis intervention and suicide prevention.',
      url: 'tel:18664887386',
      type: 'phone'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-stone-200 animate-fadeIn max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2 text-rose-700">
            <HeartHandshake className="w-6 h-6" />
            <h2 className="font-serif-title text-xl font-bold">
              Immediate Crisis & Safety Support
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 text-sm font-medium p-1 rounded-lg"
          >
            ✕ Close
          </button>
        </div>

        <div className="my-4 p-3 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-2.5 text-xs text-rose-900">
          <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
          <p>
            If you are in immediate physical danger, please call <strong>911</strong> or your local emergency services immediately from a safe location.
          </p>
        </div>

        <div className="space-y-3">
          {resources.map((res, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl border border-stone-200 bg-stone-50 hover:bg-stone-100/80 transition-colors"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold text-sm text-stone-900">
                  {res.name}
                </h3>
                <a
                  href={res.url}
                  className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold flex items-center gap-1 shadow-sm transition-colors"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call Now</span>
                </a>
              </div>
              <p className="text-xs font-mono font-medium text-rose-800 mt-1">
                {res.contact}
              </p>
              <p className="text-xs text-stone-600 mt-1">
                {res.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-stone-200 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-stone-800 hover:bg-stone-900 text-white rounded-xl text-xs font-semibold transition-colors"
          >
            Return to Haven Sanctuary
          </button>
        </div>
      </div>
    </div>
  );
};
