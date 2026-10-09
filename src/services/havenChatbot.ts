export interface ChatbotMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isTriggerDetected?: boolean;
  triggerCategory?: 'ptsd' | 'stockholm' | 'abuse' | 'substance';
  navActions?: NavAction[];
}

export interface NavAction {
  label: string;
  actionType: 'tool' | 'tab' | 'crisis' | 'quick_exit' | 'chat_room';
  target: string;
  icon?: string;
  description?: string;
}

export const HAVEN_SYSTEM_PROMPT = `You are "Haven Companion", an empathetic, trauma-informed, non-judgmental, and objective emotional support companion and interactive guide for the Haven Trauma Recovery Sanctuary app.

### Core Directives & Tone:
1. Empathetic, Non-Judgmental & Objective Tone:
   - Always maintain a warm, gentle, calm, and objective demeanor.
   - Never judge, scold, interrogate, or minimize a survivor's feelings.
   - Validate emotions with grounded empathy (e.g., "It is completely understandable that you feel this way; your body is responding to trauma.").
   - Avoid toxic positivity, clichés, or forced optimism. Be realistic, respectful, and safe.

2. Active Trigger Word Monitoring & Instant De-escalation:
   - Continuously monitor all user messages for trigger words and emotional distress indicators across four key areas:
     * PTSD: flashbacks, panic attacks, hyperventilating, shaking, terror, night terrors, feeling frozen, dissociating, intrusive memories, feeling unsafe, loud noises.
     * Stockholm Syndrome & Coercive Control: missing an abusive partner, wanting to break no-contact, feeling like the abuse was my fault, second-guessing reality, defending the abuser, guilt, appeasement.
     * Abuse: domestic violence, physical assault, threats, sexual violation, stalking, coercion, self-harm, suicidal ideation.
     * Substance Use: cravings, urges, fear of relapse, wanting to drink or use drugs, withdrawal symptoms, feeling overwhelmed by sobriety.
   - UPON RECOGNIZING TRIGGERS:
     * IMMEDIATELY PIVOT TO DE-ESCALATION.
     * Suggest a gentle pause: "Let's pause together right now. Take a slow, gentle breath. You are safe in this moment."
     * Offer specific grounding techniques available inside Haven:
       - 5-4-3-2-1 Sensory Grounding (anchoring sights, textures, sounds, scents, and self-compassion).
       - 4-4-4-4 Somatic Box Breathing (visual pacing flower to down-regulate the nervous system).
       - Somatic Body Scan & Tension Release Map (guided body tension release for trauma holding zones).
       - Trauma Thought Reframer (cognitive reframing of self-blame, trauma bonds, and guilt).
     * If there is immediate danger, domestic violence, severe crisis, or self-harm, immediately provide contact helplines (988 Lifeline, RAINN 1-800-656-4673, National Domestic Violence Hotline 1-800-799-7233, SAMHSA 1-800-662-4357, Crisis Text Line text HOME to 741741).

3. Thorough Knowledge of App Layout & Step-by-Step Guidance:
   You know every section of the Haven app and can provide clear step-by-step directions to guide users anywhere they need:
   - Resource Libraries:
     * "Reading Library / Reading Sanctuary": Accessible by tapping the "Reading Library" tab at the top. Contains essential survivor literature including 'The Body Keeps the Score' (Dr. Bessel van der Kolk), 'Trauma and Recovery' (Dr. Judith Herman), 'The Courage to Heal' (Ellen Bass & Laura Davis), and 'In the Realm of Hungry Ghosts' (Dr. Gabor Maté).
     * "Survivor Stories": In the Sexual Abuse Healing track, accessible via the "Survivor Stories" tab. Real survivor narratives curated from thesurvivorstrust.org with trigger warnings and takeaway lessons.
     * "AA & NA Daily Reflections": In the Substance Sobriety track, accessible via the "AA & NA Reflections" tab. Features daily calendar-driven meditations from AA Daily Reflections and NA Just for Today, with built-in audio read-aloud and personal reflection notes.
   - Support Groups & Chat Circles:
     * Accessible via the "Safe Circles" tab or the top quick-link banner.
     * Four dedicated, privacy-focused group chats:
       1. PTSD Grounding Circle (for managing triggers, flashbacks, and nervous system regulation).
       2. Stockholm & Coercion Haven (for breaking trauma bonds and navigating no-contact).
       3. Sexual Abuse Sanctuary (safe space for bodily autonomy and sovereign healing).
       4. Substance Sobriety Circle (peer accountability, urge surfs, and sobriety milestones).
     * Gated to participants of each track to ensure emotional safety and community trust.
   - Somatic Grounding Tools:
     * Located on the "Daily Haven" home tab under "Interactive Somatic Regulation Tools":
       1. 5-4-3-2-1 Sensory Grounding
       2. 4-4-4-4 Box Breathing
       3. Somatic Body Tension Map
       4. Trauma Thought Reframer
   - Daily Haven:
     * Daily motivational quotes with audio listening.
     * Mini daily recovery goals with progress tracking and celebration.
   - Milestone Gifts & Awards:
     * Accessible via the "Gifts & Badges" tab. Features huggable comfort plushies (Barnaby the Bear, Luna the Bunny), customizable Courage Badges, and 3D interactive recovery coins.
   - Emergency & Privacy Features:
     * "QUICK EXIT": The prominent black button in the top navigation immediately conceals all trauma recovery content and switches to an innocent, functional calculator or daily task scratchpad if an unsafe person enters the room.
     * "Crisis Lifelines": The button in the top header opens direct, one-tap crisis hotlines.

4. Format & Length:
   - Keep answers comforting, concise, and easy to read on mobile devices (2 to 3 short paragraphs).
   - Use bullet points when giving step-by-step directions.`;

// Extensive trigger dictionary for client-side deterministic safety monitoring
const TRIGGER_PATTERNS = {
  abuse: /\b(abused?|abuser|assault(ed)?|beat(en)?|hit(ting)?|slapp(ed)?|punch(ed)?|strangle|choke|threaten(ed)?|stalk(ing|ed)?|rape[ds]?|molest(ed)?|incest|domestic violence|dv|violence|hurt me|in danger|unsafe|scared of him|scared of her|kill myself|suicid(e|al)|end my life|self[- ]?harm|cutting)\b/i,
  ptsd: /\b(flashback|panic(king)?|panic attack|hyperventilat(ing|e)?|can'?t breathe|shaking|tremor|trembling|nightmare|night terror|triggered|hypervigilan(t|ce)|jumpy|startle|dissociat(ing|e|ion)?|numb|frozen|freeze response|spacing out|unreal|derealiz(e|ation)|depersonaliz(e|ation))\b/i,
  stockholm: /\b(miss(ing)? (him|her|them)|want to (call|text|message|see|contact) (him|her|them)|unblock|break no[- ]?contact|my fault|blame myself|was it my fault|trauma bond|trauma bonded|go back to (him|her)|he loved me|she loved me|they loved me|maybe (he|she) changed|guilt(y)?|forgive (him|her))\b/i,
  substance: /\b(crav(ing|ings)|urge|relaps(e|ed|ing)|want to drink|need a drink|want to use|get high|smoke|pill|alcohol|relapsing|tempt(ed|ation)|sober|sobriety|falling off the wagon|withdrawal|dope|weed|cocaine|meth|heroin|fentanyl|slip up)\b/i,
};

export function analyzeMessageForTriggers(text: string): {
  isTriggered: boolean;
  category?: 'ptsd' | 'stockholm' | 'abuse' | 'substance';
  suggestedActions: NavAction[];
} {
  const actions: NavAction[] = [];
  const lower = text.toLowerCase();

  const isAbuse = TRIGGER_PATTERNS.abuse.test(lower);
  const isPtsd = TRIGGER_PATTERNS.ptsd.test(lower);
  const isStockholm = TRIGGER_PATTERNS.stockholm.test(lower);
  const isSubstance = TRIGGER_PATTERNS.substance.test(lower);

  if (isAbuse) {
    actions.push({
      label: 'Crisis Lifelines (988 / RAINN / DV)',
      actionType: 'crisis',
      target: 'crisis',
      icon: '📞',
      description: 'Immediate 24/7 confidential support'
    });
    actions.push({
      label: 'Somatic Box Breathing',
      actionType: 'tool',
      target: 'breathing',
      icon: '🫁',
      description: 'Gentle nervous system down-regulation'
    });
    actions.push({
      label: 'Discreet Quick Exit (Calculator)',
      actionType: 'quick_exit',
      target: 'quick_exit',
      icon: '🛡️',
      description: 'Instantly hide screen if someone approaches'
    });
    return { isTriggered: true, category: 'abuse', suggestedActions: actions };
  }

  if (isPtsd) {
    actions.push({
      label: '5-4-3-2-1 Sensory Grounding',
      actionType: 'tool',
      target: 'grounding',
      icon: '👁️',
      description: 'Anchor in the physical present'
    });
    actions.push({
      label: 'Somatic Box Breathing',
      actionType: 'tool',
      target: 'breathing',
      icon: '🫁',
      description: 'Slow down heart rate and breath'
    });
    actions.push({
      label: 'PTSD Grounding Chat Circle',
      actionType: 'chat_room',
      target: 'ptsd',
      icon: '💬',
      description: 'Connect with peers who understand flashbacks'
    });
    return { isTriggered: true, category: 'ptsd', suggestedActions: actions };
  }

  if (isStockholm) {
    actions.push({
      label: 'Trauma Thought Reframer',
      actionType: 'tool',
      target: 'reframer',
      icon: '🧭',
      description: 'Untangle trauma bonding & self-blame'
    });
    actions.push({
      label: 'Stockholm Recovery Chat Circle',
      actionType: 'chat_room',
      target: 'stockholm',
      icon: '🕊️',
      description: 'Support for no-contact and clarity'
    });
    actions.push({
      label: 'Somatic Body Scan',
      actionType: 'tool',
      target: 'body_scan',
      icon: '🧘',
      description: 'Release stored gut and chest tension'
    });
    return { isTriggered: true, category: 'stockholm', suggestedActions: actions };
  }

  if (isSubstance) {
    actions.push({
      label: 'AA & NA Daily Reflections',
      actionType: 'tab',
      target: 'reflections',
      icon: '📖',
      description: 'Today’s calendar meditation & audio reader'
    });
    actions.push({
      label: 'Somatic Box Breathing (Urge Pacer)',
      actionType: 'tool',
      target: 'breathing',
      icon: '🫁',
      description: 'Pause for 15 minutes while the urge peaks and fades'
    });
    actions.push({
      label: 'Substance Sobriety Circle',
      actionType: 'chat_room',
      target: 'substance_abuse',
      icon: '🌿',
      description: 'Anonymous peer accountability'
    });
    return { isTriggered: true, category: 'substance', suggestedActions: actions };
  }

  // App navigation keywords detection
  if (lower.includes('book') || lower.includes('reading') || lower.includes('library') || lower.includes('literature')) {
    actions.push({
      label: 'Open Reading Library',
      actionType: 'tab',
      target: 'library',
      icon: '📚',
      description: 'Curated trauma recovery books'
    });
  }
  if (lower.includes('chat') || lower.includes('group') || lower.includes('peer') || lower.includes('community') || lower.includes('circle')) {
    actions.push({
      label: 'Open Safe Circles',
      actionType: 'tab',
      target: 'community',
      icon: '👥',
      description: 'Anonymous peer support groups'
    });
  }
  if (lower.includes('breath') || lower.includes('box breath') || lower.includes('inhale')) {
    actions.push({
      label: 'Launch Box Breathing',
      actionType: 'tool',
      target: 'breathing',
      icon: '🫁',
      description: 'Interactive breathing lotus'
    });
  }
  if (lower.includes('ground') || lower.includes('54321') || lower.includes('5-4-3-2-1') || lower.includes('senses')) {
    actions.push({
      label: 'Launch 5-4-3-2-1 Grounding',
      actionType: 'tool',
      target: 'grounding',
      icon: '👁️',
      description: '5-step sensory anchor'
    });
  }
  if (lower.includes('tension') || lower.includes('body scan') || lower.includes('somatic') || lower.includes('muscles')) {
    actions.push({
      label: 'Launch Somatic Body Scan',
      actionType: 'tool',
      target: 'body_scan',
      icon: '🧘',
      description: 'Trauma holding zone release'
    });
  }
  if (lower.includes('reframe') || lower.includes('thought') || lower.includes('distortion') || lower.includes('guilt')) {
    actions.push({
      label: 'Launch Thought Reframer',
      actionType: 'tool',
      target: 'reframer',
      icon: '🧭',
      description: 'Cognitive reframing for trauma survivors'
    });
  }
  if (lower.includes('gift') || lower.includes('badge') || lower.includes('coin') || lower.includes('bear') || lower.includes('reward') || lower.includes('plush')) {
    actions.push({
      label: 'Gifts & Badges Vault',
      actionType: 'tab',
      target: 'rewards',
      icon: '🎁',
      description: 'Comfort plushies, badges & recovery coins'
    });
  }
  if (lower.includes('reflection') || lower.includes('aa') || lower.includes('na') || lower.includes('12-step') || lower.includes('daily reflection')) {
    actions.push({
      label: 'AA & NA Daily Reflections',
      actionType: 'tab',
      target: 'reflections',
      icon: '📖',
      description: 'Calendar daily readings with audio player'
    });
  }
  if (lower.includes('story') || lower.includes('stories') || lower.includes('survivor trust') || lower.includes('thesurvivorstrust')) {
    actions.push({
      label: 'Survivor Stories Section',
      actionType: 'tab',
      target: 'stories',
      icon: '🌸',
      description: 'Real narratives from thesurvivorstrust.org'
    });
  }
  if (lower.includes('exit') || lower.includes('hide') || lower.includes('calculator') || lower.includes('camouflage') || lower.includes('stealth')) {
    actions.push({
      label: 'Trigger Quick Exit Now',
      actionType: 'quick_exit',
      target: 'quick_exit',
      icon: '🛡️',
      description: 'Immediately disguise into a functional calculator'
    });
  }
  if (lower.includes('crisis') || lower.includes('hotline') || lower.includes('helpline') || lower.includes('988') || lower.includes('emergency')) {
    actions.push({
      label: 'Open Crisis Lifelines',
      actionType: 'crisis',
      target: 'crisis',
      icon: '📞',
      description: 'Confidential 24/7 emergency hotlines'
    });
  }

  return { isTriggered: false, suggestedActions: actions };
}

// Empathetic, trauma-informed offline response generator
function getEmpatheticDeescalationText(category: 'ptsd' | 'stockholm' | 'abuse' | 'substance'): string {
  switch (category) {
    case 'abuse':
      return "Let's pause together right now. Take a gentle, unhurried breath. You are not alone, and what happened is not your fault. Your safety and well-being are paramount.\n\n• If you are in immediate physical danger, please tap the Crisis Lifelines button below or call 988 or 911 immediately.\n• If someone unsafe is approaching and you need to hide this screen instantly, tap the Discreet Quick Exit button below—it will immediately switch to an innocent calculator.\n\nTake another slow breath. We are right here with you.";

    case 'ptsd':
      return "Let's pause together right now. Take a slow, steady breath in... and let it gently out. What you are experiencing right now is an emotional flashback or nervous system spike—it is a physiological false alarm.\n\n• Look around the space you are in right now. Find 3 objects that are blue or green.\n• Feel both feet firmly planted on the floor.\n• The past was terrifying, but that moment is over. In this present breath, you are safe.\n\nLet's practice the 5-4-3-2-1 Sensory Grounding tool or the gentle Box Breathing lotus together right now.";

    case 'stockholm':
      return "Let's take a deep, compassionate pause together. I hear how much pain, conflict, and confusion you are carrying right now. Please know that wanting to reach out or feeling protective of someone who hurt you is the natural pull of the trauma bond—an involuntary survival instinct developed during prolonged coercive control.\n\n• It does not mean you failed, and it does not mean they were safe.\n• Reaching out only re-activates the cycle of hurt; it will not bring the safety you deserve.\n\nLet's tap into the Trauma Thought Reframer below to unpack these thoughts with kindness, or join our Stockholm Recovery circle where peers who understand are walking beside you.";

    case 'substance':
      return "Let's pause together for just this current breath. Cravings and emotional urges are like waves in the ocean—they surge, reach a peak for approximately 15 minutes, and then naturally break and dissolve if we ride them without reacting.\n\n• You don't have to stay clean or sober for the rest of your life right now; you only need to stay centered through this breath.\n• Drink a tall glass of cool water and feel the temperature ground your body.\n\nLet's use the 15-Minute Urge Pacer (Box Breathing) or read today's 12-Step AA/NA daily reflection together.";
  }
}

export async function askHavenCompanion(
  userMessage: string,
  history: ChatbotMessage[]
): Promise<{
  text: string;
  isTriggerDetected: boolean;
  triggerCategory?: 'ptsd' | 'stockholm' | 'abuse' | 'substance';
  navActions: NavAction[];
}> {
  const triggerCheck = analyzeMessageForTriggers(userMessage);

  // Safe API key lookup
  let apiKey = '';
  try {
    if (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) {
      apiKey = process.env.GEMINI_API_KEY;
    }
  } catch (e) {}

  // If Gemini API is available, generate response
  if (apiKey && apiKey.length > 5) {
    try {
      const contents = [
        ...history.slice(-6).map(m => ({
          role: m.sender === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
        })),
        {
          role: 'user',
          parts: [{ text: userMessage }]
        }
      ];

      // Target gemini-3.5-flash-lite as validated in the container
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: HAVEN_SYSTEM_PROMPT }]
          },
          contents,
          generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 600,
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidateText && candidateText.trim().length > 0) {
          return {
            text: candidateText.trim(),
            isTriggerDetected: triggerCheck.isTriggered,
            triggerCategory: triggerCheck.category,
            navActions: triggerCheck.suggestedActions
          };
        }
      }
    } catch (e) {
      // Fallback below
    }
  }

  // Graceful, trauma-informed offline / fallback response
  if (triggerCheck.isTriggered && triggerCheck.category) {
    return {
      text: getEmpatheticDeescalationText(triggerCheck.category),
      isTriggerDetected: true,
      triggerCategory: triggerCheck.category,
      navActions: triggerCheck.suggestedActions
    };
  }

  // Helpful conversational navigation guidance fallback
  const lower = userMessage.toLowerCase();
  let defaultReply = "I am Haven Companion, your gentle guide. I'm here to provide an empathetic space for your emotions and help you navigate every corner of Haven.\n\nYou can ask me for a calming grounding exercise, step-by-step guidance to our support circles, our reading sanctuary, or today's recovery reflections. What does your heart or mind need most right now?";

  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey') || lower.includes('start')) {
    defaultReply = "Hello, survivor. Welcome to your safe space. Take a gentle, unhurried breath.\n\nI can support you whenever you feel overwhelmed, talk through recovery feelings without judgment, or guide you step-by-step to any section of the app (like our interactive Box Breathing, survivor peer circles, reading library, or crisis lifelines). How are you feeling in this moment?";
  } else if (lower.includes('help') || lower.includes('how do i') || lower.includes('where is') || lower.includes('layout')) {
    defaultReply = "Here is a quick guide to Haven's key recovery areas:\n\n• **Interactive Grounding Tools:** Under the 'Daily Haven' tab, you will find 5-4-3-2-1 Sensory Grounding, 4-4-4-4 Box Breathing, Somatic Body Scan, and Thought Reframer.\n• **Support Groups:** Tap the 'Safe Circles' tab or the top banner link to join our gated recovery chat circles.\n• **Reading Sanctuary:** Tap the 'Reading Library' tab to explore trauma healing classics.\n• **12-Step Reflections:** Select the 'Substance Sobriety' track to read and listen to daily calendar reflections from AA and NA.\n• **Immediate Help:** The top bar features our 'QUICK EXIT' stealth camouflage button and 'Crisis Lifelines'.";
  } else if (lower.includes('book') || lower.includes('read')) {
    defaultReply = "Our Reading Sanctuary features foundational trauma literature including:\n• *The Body Keeps the Score* by Dr. Bessel van der Kolk\n• *Trauma and Recovery* by Dr. Judith Herman\n• *The Courage to Heal* by Ellen Bass & Laura Davis\n• *In the Realm of Hungry Ghosts* by Dr. Gabor Maté\n\nYou can visit it anytime by tapping the 'Reading Library' tab at the top.";
  }

  return {
    text: defaultReply,
    isTriggerDetected: false,
    navActions: triggerCheck.suggestedActions
  };
}
