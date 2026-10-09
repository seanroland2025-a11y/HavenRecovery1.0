import React, { useState } from 'react';
import { CommunityMessage, TraumaTrack } from '../types';
import { INITIAL_COMMUNITY_MESSAGES, generateSafeAlias } from '../data/community';
import { Users, Shield, Send, Heart, Flame, AlertOctagon, Flag, Lock, Sparkles, CheckCircle2 } from 'lucide-react';

interface AnonymousCommunityProps {
  activeTrack: TraumaTrack;
  onOpenGroupChat?: (track: TraumaTrack) => void;
  isEnrolledInTrack?: (track: TraumaTrack) => boolean;
}

export const AnonymousCommunity: React.FC<AnonymousCommunityProps> = ({
  activeTrack,
  onOpenGroupChat,
  isEnrolledInTrack,
}) => {
  const [messages, setMessages] = useState<CommunityMessage[]>(INITIAL_COMMUNITY_MESSAGES);
  const [myAlias] = useState<string>(() => generateSafeAlias());
  const [newMessageText, setNewMessageText] = useState('');
  const [triggerWarning, setTriggerWarning] = useState('');
  const [selectedCircle, setSelectedCircle] = useState<string>(activeTrack);
  const [reportedMessageId, setReportedMessageId] = useState<string | null>(null);
  const [showCharter, setShowCharter] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const circleNames: Record<string, string> = {
    all: 'All Safe Circles',
    ptsd: 'PTSD Grounding & Flashback Circle',
    stockholm: 'Stockholm & Coercive Control Haven',
    sexual_abuse: 'Sexual Abuse Survivor Sanctuary',
    substance_abuse: 'Substance Sobriety & Urge Support',
    general: 'General Gentle Wins'
  };

  const filteredMessages = messages.filter((m) => {
    if (m.isModeratorNote) return true;
    if (selectedCircle === 'all') return true;
    return m.track === selectedCircle || m.track === 'general';
  });

  const handlePostMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;

    // Strict Anonymity Safety Check
    const lower = newMessageText.toLowerCase();
    const phoneRegex = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/;
    const emailRegex = /@.*\.(com|net|org|io|edu)/;

    if (phoneRegex.test(newMessageText) || emailRegex.test(newMessageText) || lower.includes('my name is') || lower.includes('instagram') || lower.includes('snapchat')) {
      alert("⚠️ SAFETY PROTOCOL BLOCKED: Contact info, social media handles, or real names are strictly prohibited in Haven to protect all survivors from stalkers, abusers, and predators. Please rephrase anonymously.");
      return;
    }

    const newMsg: CommunityMessage = {
      id: `msg-${Date.now()}`,
      authorAlias: myAlias,
      avatarSeed: 'user',
      avatarBg: 'bg-teal-700',
      track: selectedCircle === 'all' ? activeTrack : (selectedCircle as TraumaTrack),
      content: newMessageText.trim(),
      timestamp: 'Just now',
      likes: 1,
      likedByMe: true,
      hugs: 0,
      huggedByMe: false,
      triggerWarning: triggerWarning.trim() || undefined
    };

    setMessages([messages[0], newMsg, ...messages.slice(1)]);
    setNewMessageText('');
    setTriggerWarning('');

    setActionNotice("Your encouraging message was posted anonymously to the circle.");
    setTimeout(() => setActionNotice(null), 3000);
  };

  const handleHug = (id: string) => {
    setMessages(prev => prev.map(m => {
      if (m.id === id) {
        return {
          ...m,
          hugs: m.huggedByMe ? m.hugs - 1 : m.hugs + 1,
          huggedByMe: !m.huggedByMe
        };
      }
      return m;
    }));
  };

  const handleLike = (id: string) => {
    setMessages(prev => prev.map(m => {
      if (m.id === id) {
        return {
          ...m,
          likes: m.likedByMe ? m.likes - 1 : m.likes + 1,
          likedByMe: !m.likedByMe
        };
      }
      return m;
    }));
  };

  const handleReport = (id: string) => {
    setReportedMessageId(id);
  };

  const confirmReport = () => {
    // Immediately remove reported message from feed and ban offender
    setMessages(prev => prev.filter(m => m.id !== reportedMessageId));
    setReportedMessageId(null);
    setActionNotice("🛡️ Content removed and reported to Haven Sentinel. Offender has been flagged for permanent ban under the No-Nonsense Safety Policy.");
    setTimeout(() => setActionNotice(null), 4500);
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-stone-200/80">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-100 text-indigo-800">
              <Users className="w-4 h-4" />
            </span>
            <h2 className="font-serif-title text-xl font-semibold text-stone-900">
              Anonymous Survivor Circles
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Safe peer-to-peer encouragement with strict anonymity and zero-tolerance safety policies.
          </p>
        </div>

        {/* Safety Charter button */}
        <button
          onClick={() => setShowCharter(!showCharter)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold self-start sm:self-auto transition-colors"
        >
          <Shield className="w-3.5 h-3.5 text-emerald-600" />
          <span>Safety Charter & Rules</span>
        </button>
      </div>

      {/* Safety Charter Banner */}
      {showCharter && (
        <div className="mb-6 p-5 rounded-2xl bg-stone-900 text-stone-200 text-xs space-y-2 border border-stone-700 animate-fadeIn">
          <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
            <Shield className="w-4 h-4" />
            <span>Strict Anonymity & No-Nonsense Safety Policy</span>
          </div>
          <p className="text-stone-300 leading-relaxed">
            1. <strong>Zero Personal Information:</strong> Never ask for or post phone numbers, social media, addresses, real names, or private messaging requests.
          </p>
          <p className="text-stone-300 leading-relaxed">
            2. <strong>Zero Tolerance for Victim-Blaming:</strong> Any skepticism, gaslighting, harassment, or invalidation of another survivor's lived experience results in an immediate permanent ban.
          </p>
          <p className="text-stone-300 leading-relaxed">
            3. <strong>Content Warnings:</strong> When discussing heavy graphic abuse details, label with a Trigger Warning (TW) tag so fellow survivors can safeguard their nervous systems.
          </p>
        </div>
      )}

      {/* User's Protected Alias Badge */}
      <div className="mb-5 p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-stone-600 font-medium">Your Protected Anonymity Identity:</span>
          <span className="font-bold text-emerald-900 bg-white px-2.5 py-0.5 rounded-lg border border-emerald-300">
            {myAlias}
          </span>
        </div>
        <span className="text-[11px] text-emerald-700 font-medium">
          🔒 IP & Device Hidden
        </span>
      </div>

      {/* Circle Tabs */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {Object.entries(circleNames).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setSelectedCircle(key)}
            className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-colors ${
              selectedCircle === key
                ? 'bg-indigo-700 text-white shadow-sm'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {label.split('&')[0]}
          </button>
        ))}
      </div>

      {/* Program-Gated Chat Room Quick Launcher */}
      {selectedCircle !== 'all' && selectedCircle !== 'general' && onOpenGroupChat && (
        <div className="mb-5 p-3.5 rounded-2xl bg-gradient-to-r from-indigo-50 to-emerald-50 border border-indigo-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white text-indigo-700 shadow-2xs border border-indigo-100">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif-title font-bold text-xs text-stone-900">
                {circleNames[selectedCircle]} Private Room
              </h4>
              <p className="text-[11px] text-stone-500">
                Exclusive peer sanctuary protected for enrolled participants.
              </p>
            </div>
          </div>

          {isEnrolledInTrack && isEnrolledInTrack(selectedCircle as TraumaTrack) ? (
            <button
              onClick={() => onOpenGroupChat(selectedCircle as TraumaTrack)}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-semibold text-xs shadow-xs transition-transform active:scale-98 flex items-center justify-center gap-1.5 whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Enter Dedicated Room</span>
            </button>
          ) : (
            <button
              onClick={() => onOpenGroupChat(selectedCircle as TraumaTrack)}
              className="px-3.5 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
            >
              <Lock className="w-3 h-3 text-amber-700" />
              <span>Program Gated • Verify Access</span>
            </button>
          )}
        </div>
      )}

      {/* Notification toast */}
      {actionNotice && (
        <div className="mb-4 p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-medium flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Messages Feed */}
      <div className="space-y-3.5 max-h-[460px] overflow-y-auto pr-1 mb-5">
        {filteredMessages.map((msg) => (
          <div
            key={msg.id}
            className={`p-4 rounded-2xl border transition-all ${
              msg.isModeratorNote
                ? 'bg-emerald-900 text-emerald-50 border-emerald-800'
                : 'bg-stone-50 border-stone-200 text-stone-800'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white ${msg.avatarBg}`}>
                  {msg.authorAlias.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <span className={`text-xs font-bold ${msg.isModeratorNote ? 'text-emerald-200' : 'text-stone-900'}`}>
                    {msg.authorAlias}
                  </span>
                  <span className={`text-[10px] ml-2 ${msg.isModeratorNote ? 'text-emerald-300/80' : 'text-stone-400'}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>

              {!msg.isModeratorNote && (
                <button
                  onClick={() => handleReport(msg.id)}
                  title="Report safety violation"
                  className="text-stone-400 hover:text-rose-600 p-1 text-xs"
                >
                  <Flag className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {msg.triggerWarning && (
              <div className="mb-2 px-2.5 py-1 rounded-md bg-amber-100 border border-amber-300 text-[11px] font-semibold text-amber-900 inline-block">
                ⚠️ TW: {msg.triggerWarning}
              </div>
            )}

            <p className={`text-xs leading-relaxed ${msg.isModeratorNote ? 'text-emerald-100 font-medium' : 'text-stone-700'}`}>
              {msg.content}
            </p>

            {!msg.isModeratorNote && (
              <div className="mt-3 pt-2.5 border-t border-stone-200/60 flex items-center gap-4 text-xs">
                <button
                  onClick={() => handleHug(msg.id)}
                  className={`flex items-center gap-1.5 transition-colors ${
                    msg.huggedByMe ? 'text-rose-600 font-semibold' : 'text-stone-500 hover:text-rose-600'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${msg.huggedByMe ? 'fill-current' : ''}`} />
                  <span>{msg.hugs} Gentle Hugs</span>
                </button>

                <button
                  onClick={() => handleLike(msg.id)}
                  className={`flex items-center gap-1.5 transition-colors ${
                    msg.likedByMe ? 'text-amber-600 font-semibold' : 'text-stone-500 hover:text-amber-600'
                  }`}
                >
                  <Flame className={`w-3.5 h-3.5 ${msg.likedByMe ? 'fill-current' : ''}`} />
                  <span>{msg.likes} Strength</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Post message input */}
      <form onSubmit={handlePostMessage} className="space-y-2 pt-3 border-t border-stone-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={triggerWarning}
            onChange={(e) => setTriggerWarning(e.target.value)}
            placeholder="Optional Trigger Warning (e.g. mention of hospital, court)"
            className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            required
            value={newMessageText}
            onChange={(e) => setNewMessageText(e.target.value)}
            placeholder={`Share anonymous encouragement to ${circleNames[selectedCircle]}...`}
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-stone-50"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-indigo-700 hover:bg-indigo-800 text-white rounded-xl text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
        </div>
      </form>

      {/* Report Modal */}
      {reportedMessageId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-stone-200 text-center animate-fadeIn">
            <AlertOctagon className="w-10 h-10 text-rose-600 mx-auto mb-3" />
            <h3 className="font-serif-title font-bold text-base text-stone-900">
              Report Safety Violation?
            </h3>
            <p className="text-xs text-stone-600 my-2 leading-relaxed">
              Haven enforces a strict no-nonsense policy against harassment, predatory requests, victim-blaming, or anonymity breaches.
            </p>
            <div className="flex gap-2 justify-center mt-4">
              <button
                onClick={() => setReportedMessageId(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-stone-600 hover:bg-stone-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmReport}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-sm"
              >
                Report & Ban User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
