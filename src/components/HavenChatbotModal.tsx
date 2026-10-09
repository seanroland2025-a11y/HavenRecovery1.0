import React, { useState, useRef, useEffect } from 'react';
import { ChatbotMessage, NavAction, askHavenCompanion } from '../services/havenChatbot';
import { TraumaTrack } from '../types';
import {
  Sparkles, Send, ShieldAlert, HeartHandshake, Bot, X,
  ArrowRight, RefreshCw, Volume2, VolumeX, Shield, Heart, Compass,
  BookOpen, Users, Phone, Lock, Sparkle
} from 'lucide-react';

interface HavenChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: 'home' | 'rewards' | 'library' | 'community' | 'reflections' | 'stories') => void;
  onOpenTool: (tool: 'grounding' | 'breathing' | 'body_scan' | 'reframer') => void;
  onOpenCrisis: () => void;
  onTriggerQuickExit: () => void;
  onOpenGroupChat: (track: TraumaTrack) => void;
}

export const HavenChatbotModal: React.FC<HavenChatbotModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
  onOpenTool,
  onOpenCrisis,
  onTriggerQuickExit,
  onOpenGroupChat,
}) => {
  const [messages, setMessages] = useState<ChatbotMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hello, survivor. I am your Haven Companion. I am here to provide an empathetic, non-judgmental sanctuary whenever you feel triggered or overwhelmed, and to guide you seamlessly through Haven's recovery tools, reading libraries, support groups, and crisis lifelines.\n\nTake a slow, gentle breath. You are safe in this moment. What does your heart, mind, or nervous system need right now?",
      timestamp: 'Just now',
      navActions: [
        { label: 'Somatic Box Breathing', actionType: 'tool', target: 'breathing', icon: '🫁' },
        { label: '5-4-3-2-1 Sensory Grounding', actionType: 'tool', target: 'grounding', icon: '👁️' },
        { label: 'Reading Sanctuary', actionType: 'tab', target: 'library', icon: '📚' },
        { label: 'Support Circles', actionType: 'tab', target: 'community', icon: '👥' },
        { label: 'Crisis Lifelines', actionType: 'crisis', target: 'crisis', icon: '📞' }
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isReadingId, setIsReadingId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMsg: ChatbotMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await askHavenCompanion(text, messages);
      const assistantMsg: ChatbotMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        timestamp: 'Just now',
        isTriggerDetected: response.isTriggerDetected,
        triggerCategory: response.triggerCategory,
        navActions: response.navActions
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (e) {
      setMessages(prev => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          sender: 'assistant',
          text: "Let's pause together right now. Take a deep, gentle breath in and out. You are safe in this moment. If you are experiencing distress, let's practice Box Breathing or connect with immediate support.",
          timestamp: 'Just now',
          isTriggerDetected: true,
          navActions: [
            { label: 'Somatic Box Breathing', actionType: 'tool', target: 'breathing', icon: '🫁' },
            { label: 'Immediate Crisis Lifelines', actionType: 'crisis', target: 'crisis', icon: '📞' }
          ]
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = (action: NavAction) => {
    if (action.actionType === 'tool') {
      onOpenTool(action.target as any);
      onClose();
    } else if (action.actionType === 'tab') {
      onNavigateTab(action.target as any);
      onClose();
    } else if (action.actionType === 'crisis') {
      onOpenCrisis();
      onClose();
    } else if (action.actionType === 'quick_exit') {
      onTriggerQuickExit();
      onClose();
    } else if (action.actionType === 'chat_room') {
      onOpenGroupChat(action.target as any);
      onClose();
    }
  };

  const handleToggleSpeak = (msg: ChatbotMessage) => {
    if (!('speechSynthesis' in window)) return;

    if (isReadingId === msg.id) {
      window.speechSynthesis.cancel();
      setIsReadingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(msg.text);
    utterance.rate = 0.88;
    utterance.onend = () => setIsReadingId(null);
    utterance.onerror = () => setIsReadingId(null);

    window.speechSynthesis.speak(utterance);
    setIsReadingId(msg.id);
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full h-[90vh] max-h-[720px] shadow-2xl border border-stone-200 flex flex-col overflow-hidden">
        {/* Chatbot Header */}
        <div className="p-4 bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center shadow-xs">
              <Bot className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif-title font-bold text-base leading-tight">
                  Haven Companion
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-200 border border-emerald-400/30 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Trauma-Informed
                </span>
              </div>
              <p className="text-[11px] text-emerald-200/80">
                Empathetic listener & in-app technical navigation guide
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Close companion"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Safety & Active Trigger Monitoring Indicator */}
        <div className="bg-emerald-50 border-b border-emerald-200/80 px-3.5 py-1.5 flex items-center justify-between text-[11px] text-emerald-900">
          <span className="flex items-center gap-1 font-medium">
            <Shield className="w-3.5 h-3.5 text-emerald-700" />
            <span>Active Trigger Monitoring • Instant Grounding Pivot</span>
          </span>
          <span className="text-emerald-800 font-semibold text-[10px] bg-emerald-100 px-1.5 py-0.5 rounded">
            Confidential
          </span>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="p-2.5 bg-stone-50 border-b border-stone-200 overflow-x-auto flex gap-1.5 no-scrollbar">
          <button
            onClick={() => handleSend("I feel like I'm having a panic attack and flashback")}
            className="px-2.5 py-1 rounded-full bg-white hover:bg-rose-50 text-rose-800 border border-rose-200 text-[11px] font-semibold whitespace-nowrap transition-colors flex items-center gap-1 shadow-2xs"
          >
            <span>⚡</span>
            <span>Panic & Flashback</span>
          </button>
          <button
            onClick={() => handleSend("I have an intense urge to drink or use right now")}
            className="px-2.5 py-1 rounded-full bg-white hover:bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-semibold whitespace-nowrap transition-colors flex items-center gap-1 shadow-2xs"
          >
            <span>🌿</span>
            <span>Substance Craving</span>
          </button>
          <button
            onClick={() => handleSend("I miss my abusive partner and keep blaming myself")}
            className="px-2.5 py-1 rounded-full bg-white hover:bg-purple-50 text-purple-900 border border-purple-200 text-[11px] font-semibold whitespace-nowrap transition-colors flex items-center gap-1 shadow-2xs"
          >
            <span>🕊️</span>
            <span>Trauma Bond & Guilt</span>
          </button>
          <button
            onClick={() => handleSend("Where is the Reading Library in the app?")}
            className="px-2.5 py-1 rounded-full bg-white hover:bg-teal-50 text-teal-800 border border-teal-200 text-[11px] font-semibold whitespace-nowrap transition-colors flex items-center gap-1 shadow-2xs"
          >
            <span>📚</span>
            <span>Reading Library</span>
          </button>
          <button
            onClick={() => handleSend("How do I join a support group chat circle?")}
            className="px-2.5 py-1 rounded-full bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-semibold whitespace-nowrap transition-colors flex items-center gap-1 shadow-2xs"
          >
            <span>👥</span>
            <span>Support Groups</span>
          </button>
        </div>

        {/* Conversation Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-stone-50/60">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3.5 rounded-2xl max-w-[90%] text-xs sm:text-sm leading-relaxed shadow-2xs ${
                    isUser
                      ? 'bg-emerald-800 text-white rounded-br-xs'
                      : msg.isTriggerDetected
                      ? 'bg-rose-50/95 border-2 border-rose-300 text-rose-950 rounded-bl-xs'
                      : 'bg-white border border-stone-200 text-stone-800 rounded-bl-xs'
                  }`}
                >
                  {/* Trigger Alert Header if detected */}
                  {!isUser && msg.isTriggerDetected && (
                    <div className="mb-2.5 pb-2 border-b border-rose-200 flex items-center justify-between text-rose-900 font-bold text-[11px] uppercase tracking-wide">
                      <div className="flex items-center gap-1.5">
                        <ShieldAlert className="w-4 h-4 text-rose-600 animate-pulse" />
                        <span>Trigger Monitored • De-escalating with Gentleness</span>
                      </div>
                      <span className="text-[10px] bg-rose-200/80 text-rose-950 px-2 py-0.5 rounded-full font-bold">
                        Pause & Breathe
                      </span>
                    </div>
                  )}

                  <p className="whitespace-pre-line leading-relaxed font-sans">{msg.text}</p>

                  {/* Interactive In-App Navigation Action Chips */}
                  {msg.navActions && msg.navActions.length > 0 && (
                    <div className="mt-3.5 pt-2.5 border-t border-stone-200/70">
                      <div className="text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        <span>Direct In-App Navigation Quick-Links:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.navActions.map((action, i) => (
                          <button
                            key={i}
                            onClick={() => handleActionClick(action)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-semibold shadow-2xs transition-all active:scale-95"
                            title={action.description || action.label}
                          >
                            <span>{action.icon}</span>
                            <span>{action.label}</span>
                            <ArrowRight className="w-3 h-3 text-emerald-700" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Read Aloud button for assistant replies */}
                  {!isUser && (
                    <div className="mt-2 pt-1 flex justify-end">
                      <button
                        onClick={() => handleToggleSpeak(msg)}
                        className="text-[10px] text-stone-500 hover:text-stone-800 flex items-center gap-1 font-medium bg-stone-100/80 px-2 py-0.5 rounded-md"
                        title="Listen aloud with gentle reader"
                      >
                        {isReadingId === msg.id ? (
                          <>
                            <VolumeX className="w-3 h-3 text-rose-600" />
                            <span className="text-rose-600 font-semibold">Stop Audio</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3 h-3 text-stone-600" />
                            <span>Listen Aloud</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2.5 p-3.5 bg-white rounded-2xl border border-stone-200 text-stone-600 text-xs w-fit shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span>Haven Companion is listening empathetically...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-white border-t border-stone-200 flex gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Share what you feel, or ask how to find a section..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-stone-50 placeholder:text-stone-400"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
