import React, { useState } from 'react';
import { TraumaTrack, CommunityMessage } from '../types';
import { INITIAL_COMMUNITY_MESSAGES, generateSafeAlias } from '../data/community';
import { Shield, Lock, Users, Send, Heart, Flame, Flag, AlertOctagon, CheckCircle2, ArrowLeft, HeartHandshake } from 'lucide-react';

interface TraumaGroupChatModalProps {
  track: TraumaTrack;
  isEnrolled: boolean;
  onEnrollAndEnter: (track: TraumaTrack) => void;
  onClose: () => void;
}

export const TraumaGroupChatModal: React.FC<TraumaGroupChatModalProps> = ({
  track,
  isEnrolled,
  onEnrollAndEnter,
  onClose
}) => {
  const [messages, setMessages] = useState<CommunityMessage[]>(() =>
    INITIAL_COMMUNITY_MESSAGES.filter(m => m.track === track || m.isModeratorNote)
  );
  const [myAlias] = useState<string>(() => generateSafeAlias());
  const [newMessageText, setNewMessageText] = useState('');
  const [triggerWarning, setTriggerWarning] = useState('');
  const [reportedMessageId, setReportedMessageId] = useState<string | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const groupInfo: Record<TraumaTrack, {
    title: string;
    subtitle: string;
    icon: string;
    themeColor: string;
    badgeBg: string;
    membersCount: number;
    traumaSpecificGuidance: string;
    peerReplies: string[];
  }> = {
    ptsd: {
      title: 'PTSD Grounding & Flashback Circle',
      subtitle: 'Exclusive peer sanctuary for nervous system stabilization & hypervigilance relief',
      icon: '🛡️',
      themeColor: 'from-emerald-800 to-teal-900',
      badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      membersCount: 47,
      traumaSpecificGuidance: 'Safe space to share triggers, grounding breakthroughs, and flashback grounding without judgment.',
      peerReplies: [
        'Thank you for grounding here with us. I had that exact tremor yesterday—remember your feet on the earth. You are safe now.',
        'Holding gentle space for you. You survived the war; today is for resting your nervous system.',
        'We see you and we hear you. Take one slow, long exhale with me right now.'
      ]
    },
    stockholm: {
      title: 'Stockholm Syndrome & Coercive Control Haven',
      subtitle: 'Exclusive peer sanctuary for breaking trauma bonds & unlearning survival appease',
      icon: '🕊️',
      themeColor: 'from-rose-900 to-stone-900',
      badgeBg: 'bg-rose-100 text-rose-900 border-rose-300',
      membersCount: 38,
      traumaSpecificGuidance: 'Safe space to untangle cognitive dissonance, maintain No-Contact boundaries, and honor personal autonomy.',
      peerReplies: [
        'You are so strong for choosing yourself today. Breaking the trauma bond is agonizing, but freedom is real.',
        'Remember: their intermittent kindness was part of the trap, not proof that they were safe. Your truth matters.',
        'Hugging Barnaby for you right now. You are worthy of genuine, non-coercive peace.'
      ]
    },
    sexual_abuse: {
      title: 'Sexual Abuse Survivor Sovereign Circle',
      subtitle: 'Exclusive peer sanctuary for bodily autonomy, shame release & sacred healing',
      icon: '🌸',
      themeColor: 'from-purple-900 to-indigo-950',
      badgeBg: 'bg-purple-100 text-purple-900 border-purple-300',
      membersCount: 52,
      traumaSpecificGuidance: 'Gentle, sacred space celebrating bodily ownership, safe touch rediscovery, and unconditional belief in survivors.',
      peerReplies: [
        'Your body is holy, sovereign, and entirely yours. We believe you, we honor your courage, and you are cherished here.',
        'Sending the warmest, safest hug across the distance. What happened was never, ever your fault.',
        'Thank you for sharing your heart with this circle. You are reclaiming your sacred light breath by breath.'
      ]
    },
    substance_abuse: {
      title: 'Substance Sobriety & Compassionate Haven',
      subtitle: 'Exclusive peer sanctuary for urge regulation, relapse prevention & clean clarity',
      icon: '🌿',
      themeColor: 'from-amber-900 to-teal-950',
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
      membersCount: 41,
      traumaSpecificGuidance: 'Judgment-free peer support for staying clean, riding urge waves, and healing root emotional pain.',
      peerReplies: [
        'Massive respect for standing strong today! One hour, one breath, one day at a time. We walk with you.',
        'Urges are just neural waves passing through. You have the courage to ride it out clean.',
        'Proud of your honesty. Sobriety is the greatest gift of self-compassion you can give to your soul.'
      ]
    }
  };

  const currentGroup = groupInfo[track];

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;

    // Strict Anonymity Filter
    const lower = newMessageText.toLowerCase();
    const phoneRegex = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/;
    const emailRegex = /@.*\.(com|net|org|io|edu)/;

    if (phoneRegex.test(newMessageText) || emailRegex.test(newMessageText) || lower.includes('my name is') || lower.includes('instagram') || lower.includes('snapchat')) {
      alert("⚠️ SAFETY PROTOCOL BLOCKED: Contact info, social media handles, or real names are strictly prohibited in Haven to protect all survivors from stalkers, abusers, and predators. Please rephrase anonymously.");
      return;
    }

    const userMessage: CommunityMessage = {
      id: `msg-${Date.now()}`,
      authorAlias: myAlias,
      avatarSeed: 'user',
      avatarBg: 'bg-teal-700',
      track: track,
      content: newMessageText.trim(),
      timestamp: 'Just now',
      likes: 1,
      likedByMe: true,
      hugs: 0,
      huggedByMe: false,
      triggerWarning: triggerWarning.trim() || undefined
    };

    setMessages(prev => [prev[0], userMessage, ...prev.slice(1)]);
    setNewMessageText('');
    setTriggerWarning('');
    setActionNotice("Your message has been shared privately within this recovery circle.");
    setTimeout(() => setActionNotice(null), 3000);

    // Warm peer response simulation within 2.5s
    setTimeout(() => {
      const randomReply = currentGroup.peerReplies[Math.floor(Math.random() * currentGroup.peerReplies.length)];
      const peerMsg: CommunityMessage = {
        id: `peer-${Date.now()}`,
        authorAlias: generateSafeAlias(),
        avatarSeed: 'peer',
        avatarBg: 'bg-indigo-600',
        track: track,
        content: randomReply,
        timestamp: 'Just now',
        likes: 2,
        likedByMe: false,
        hugs: 1,
        huggedByMe: false
      };
      setMessages(prev => [prev[0], peerMsg, ...prev.slice(1)]);
    }, 2200);
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
    setMessages(prev => prev.filter(m => m.id !== reportedMessageId));
    setReportedMessageId(null);
    setActionNotice("🛡️ Violation flagged and removed. Offender reported to Sentinel under No-Nonsense Policy.");
    setTimeout(() => setActionNotice(null), 4000);
  };

  // If user is not yet enrolled in this recovery program, show the safe privacy gate
  if (!isEnrolled) {
    return (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-stone-200 text-center animate-fadeIn">
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800">
            <Lock className="w-7 h-7" />
          </div>

          <h3 className="font-serif-title font-bold text-xl text-stone-900 mb-2">
            Restricted Survivor Safe Space
          </h3>

          <p className="text-xs text-stone-600 mb-4 leading-relaxed">
            To protect confidentiality and create a sanctuary of trust, the <strong>{currentGroup.title}</strong> is exclusively open to survivors actively walking this specific recovery program.
          </p>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-left text-xs text-amber-900 mb-6 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-amber-700" />
              <span>Program Access Requirements:</span>
            </div>
            <p>• Zero voyeurism or curiosity visits</p>
            <p>• Strict anonymity with automatic pseudonyms</p>
            <p>• Zero tolerance for victim-blaming or invalidation</p>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => onEnrollAndEnter(track)}
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
            >
              I am on this recovery journey • Verify & Enter Chat
            </button>
            <button
              onClick={onClose}
              className="w-full py-2.5 text-xs text-stone-500 hover:text-stone-700 font-medium"
            >
              Return to Previous Screen
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Enrolled Survivor Chat Room Interface
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full h-[90vh] shadow-2xl border border-stone-200 flex flex-col overflow-hidden animate-fadeIn">
        {/* Chat Room Header */}
        <div className={`p-4 sm:p-5 bg-gradient-to-r ${currentGroup.themeColor} text-white flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Leave room"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">{currentGroup.icon}</span>
                <h3 className="font-serif-title font-bold text-base sm:text-lg leading-tight">
                  {currentGroup.title}
                </h3>
              </div>
              <p className="text-[11px] text-white/80 mt-0.5 line-clamp-1">
                {currentGroup.subtitle}
              </p>
            </div>
          </div>

          <div className="text-right flex-shrink-0 ml-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{currentGroup.membersCount} Online</span>
            </div>
            <span className="text-[10px] text-emerald-200/90 block mt-0.5">
              Verified Enrolled
            </span>
          </div>
        </div>

        {/* User Alias and Safety Bar */}
        <div className="bg-stone-100/90 border-b border-stone-200 px-4 py-2 flex items-center justify-between text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <span>Your Safe Alias:</span>
            <span className="font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-stone-200">
              {myAlias}
            </span>
          </div>
          <span className="text-[11px] text-stone-500 flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            Zero Tolerance Safe Space
          </span>
        </div>

        {/* Notice toast */}
        {actionNotice && (
          <div className="p-2.5 bg-emerald-100 border-b border-emerald-300 text-emerald-900 text-xs font-medium flex items-center gap-2 px-4 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
            <span>{actionNotice}</span>
          </div>
        )}

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-stone-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-3.5 sm:p-4 rounded-2xl border transition-all ${
                msg.isModeratorNote
                  ? 'bg-emerald-900 text-emerald-50 border-emerald-800'
                  : 'bg-white border-stone-200 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
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
                    title="Report violation"
                    className="text-stone-400 hover:text-rose-600 p-1 text-xs"
                  >
                    <Flag className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {msg.triggerWarning && (
                <div className="mb-2 px-2 py-0.5 rounded-md bg-amber-100 border border-amber-300 text-[10px] font-semibold text-amber-900 inline-block">
                  ⚠️ TW: {msg.triggerWarning}
                </div>
              )}

              <p className={`text-xs sm:text-sm leading-relaxed ${msg.isModeratorNote ? 'text-emerald-100 font-medium' : 'text-stone-700'}`}>
                {msg.content}
              </p>

              {!msg.isModeratorNote && (
                <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center gap-4 text-xs">
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

        {/* Input Bar */}
        <form onSubmit={handlePost} className="p-3 bg-white border-t border-stone-200 space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={triggerWarning}
              onChange={(e) => setTriggerWarning(e.target.value)}
              placeholder="Optional Trigger Warning label (e.g. court, panic attack)"
              className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              required
              value={newMessageText}
              onChange={(e) => setNewMessageText(e.target.value)}
              placeholder={`Message ${currentGroup.title} safely & anonymously...`}
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-stone-50"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>
        </form>

        {/* Report Modal */}
        {reportedMessageId && (
          <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-stone-200 text-center animate-fadeIn">
              <AlertOctagon className="w-10 h-10 text-rose-600 mx-auto mb-3" />
              <h3 className="font-serif-title font-bold text-base text-stone-900">
                Report Safety Violation?
              </h3>
              <p className="text-xs text-stone-600 my-2 leading-relaxed">
                Haven Sentinel removes violating messages immediately and bans users breaching anonymity, boundaries, or empathy.
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
    </div>
  );
};
