export interface SurvivorStory {
  id: string;
  title: string;
  authorLabel: string;
  timeline: string;
  focusArea: string;
  triggerWarning: string;
  excerpt: string;
  fullNarrative: string;
  keyTakeaway: string;
  affirmation: string;
  sourceAttribution: string;
  sourceUrl: string;
}

export const SURVIVORS_TRUST_STORIES: SurvivorStory[] = [
  {
    id: 'st-story-1',
    title: 'Finding My Voice After 20 Years in the Shadows',
    authorLabel: 'Sarah, Adult Survivor of Childhood Abuse',
    timeline: '20 Years After Abuse',
    focusArea: 'Breaking the Silence & Releasing Guilt',
    triggerWarning: 'Mentions childhood grooming and long-term secret keeping. Focuses on the breakthrough of speaking out.',
    excerpt: 'For two decades I carried a secret that convinced me I was broken goods. The day I phoned a specialist support service affiliated with The Survivors Trust was the first time someone looked me in the eye and said: "It was not your fault."',
    fullNarrative: `For twenty years, I lived as two different people. On the outside, I had a job, friends, and a polite smile. On the inside, I was suffocating under the weight of childhood abuse that I had never spoken aloud to another human being.\n\nI believed the lies my abuser planted in me: that I was dirty, that I asked for it, that speaking would destroy my family. Every time someone touched my arm unexpectedly, my heart hammered like a trapped bird.\n\nAt age 32, the panic attacks became unmanageable. With trembling hands at midnight, I found The Survivors Trust website. Reading stories from other survivors felt like waking from a coma. I wasn't an alien. I wasn't alone.\n\nWhen I finally attended my first trauma-informed specialist support session, I cried for fifty minutes straight without uttering a word. The counselor simply sat with me in quiet, unconditional warmth. For the first time in my life, no one was demanding anything from my body.\n\nToday, I have boundaries. I have safe people. Speaking my truth didn't destroy me; it was the key that unlocked the cage. Healing isn't a straight line, but the silence no longer owns me.`,
    keyTakeaway: 'The shame belongs 100% to the perpetrator. Speaking your truth to a safe, trauma-informed listener begins the process of setting down an impossible weight.',
    affirmation: 'My voice has power. The secret no longer has power over my future.',
    sourceAttribution: 'Adapted with respect from survivor contributions to The Survivors Trust (thesurvivorstrust.org)',
    sourceUrl: 'https://www.thesurvivorstrust.org/'
  },
  {
    id: 'st-story-2',
    title: 'A Male Survivor Reclaiming Wholeness',
    authorLabel: 'David, Male Survivor',
    timeline: '12 Years in Recovery',
    focusArea: 'Overcoming Stigma & Masculine Conditioning',
    triggerWarning: 'Mentions sports coach abuse and masculine stigma. Focuses on emotional liberation.',
    excerpt: 'As a man, society taught me that admitting vulnerability was weakness. Admitting I was sexually abused as a teenager felt impossible until I learned how many men walk this exact same path in silence.',
    fullNarrative: `Men aren't supposed to get abused—that was the toxic myth drilled into my head from childhood. When my sports coach violated my boundaries at age 15, my mind went into a profound freeze response. For years I channeled that buried rage into extreme overworking, emotional detachment, and destructive isolation.\n\nI thought real strength meant never feeling pain. It took reaching rock bottom in my late twenties to realize that numbing my pain was also numbing my ability to feel love, joy, and peace.\n\nReaching out to a specialist survivor agency changed everything. Sitting in a circle with other men who had experienced the same violation shattered the isolation. I learned that tonic immobility and freeze are neurobiological reflexes designed to keep you alive—not signs of weakness or consent.\n\nReal courage isn't pretending you weren't wounded; real courage is having the guts to heal. My body belongs to me now. I am proud of the gentle, honest man I am becoming.`,
    keyTakeaway: 'Biological freeze and confusion during abuse are survival reflexes commanded by the nervous system. Male survivors are not alone, and healing is masculine strength.',
    affirmation: 'I am safe to lay down the armor. Vulnerability and self-compassion are my true power.',
    sourceAttribution: 'Adapted with respect from survivor contributions to The Survivors Trust (thesurvivorstrust.org)',
    sourceUrl: 'https://www.thesurvivorstrust.org/'
  },
  {
    id: 'st-story-3',
    title: 'From Merely Existing to Truly Living in My Body',
    authorLabel: 'Elena, Somatic Healing Journey',
    timeline: '8 Years After Leaving Abusive Marriage',
    focusArea: 'Bodily Autonomy & Somatic Sovereignty',
    triggerWarning: 'Mentions marital sexual coercion and dissociation. Focuses on peaceful somatic reclamation.',
    excerpt: 'I used to "float above my ceiling" whenever intimate touch occurred. Reclaiming my physical body was a slow, sacred act of gentleness—learning that my skin is a sovereign temple.',
    fullNarrative: `In my past relationship, my bodily boundaries were erased so systematically that I forgot I had the right to say no. I developed severe dissociation—floating above my body, watching life from afar like a movie screen.\n\nWhen I finally left, my body felt like enemy territory. I couldn't bear to look in mirrors, and soft physical touch triggered instant nausea and tremors.\n\nThrough trauma-informed somatic therapy and survivor resources supported by The Survivors Trust network, I learned to move at the speed of safety. I started with micro-steps: feeling the warmth of a mug between both palms. Wrapping myself in an oversized fleece blanket that I chose. Putting my own hand over my heart and reminding my cells: "No one touches us without our full, joyful permission."\n\nSlowly, the light returned to my physical form. I went from merely surviving and floating away, to grounding my feet firmly into the grass. My body was never ruined; it was waiting for me to come home to it.`,
    keyTakeaway: 'You have the absolute right to set the pace of your own healing. Your body is resilient, sovereign, and deserving of unconditional gentleness.',
    affirmation: 'My body is my home. I am safe to inhabit my skin with dignity and peace.',
    sourceAttribution: 'Adapted with respect from survivor contributions to The Survivors Trust (thesurvivorstrust.org)',
    sourceUrl: 'https://www.thesurvivorstrust.org/'
  },
  {
    id: 'st-story-4',
    title: 'The Breakthrough of Being Believed',
    authorLabel: 'Maya, Survivor & Peer Mentor',
    timeline: '15 Years Journey',
    focusArea: 'Institutional Invalidation & Peer Solidarity',
    triggerWarning: 'Mentions initial disbelief by authorities. Focuses on the transformative power of survivor solidarity.',
    excerpt: 'When authority figures dismissed my disclosure, the secondary trauma was almost as painful as the abuse itself. Finding specialist survivor advocates was the anchor that saved my sanity.',
    fullNarrative: `The hardest part of my journey wasn't just surviving the assault; it was the cruel wall of skepticism I hit when I first tried to report it. Having my reality questioned by people in uniforms felt like a second violation.\n\nI began to question my own memory. Was I exaggerating? Was it my fault for trusting the person?\n\nThat self-doubt ate away at my foundation until I contacted a specialist voluntary agency under The Survivors Trust umbrella. The counselor didn't cross-examine me. She didn't ask what I was wearing or why I didn't scream. She looked at me and said: "I believe you. And we are going to walk through this together."\n\nThose four words—"I believe you"—were a defibrillator to my soul. Having my pain validated allowed my nervous system to finally stop fighting for its own reality.\n\nNow, as a peer mentor, I tell every survivor I meet: your pain is real, your truth is valid, and you deserve a community that stands shoulder-to-shoulder with you in unwavering belief.`,
    keyTakeaway: 'Secondary trauma from being disbelieved is deeply painful, but survivor solidarity provides an unshakable foundation of truth and validation.',
    affirmation: 'I believe my own truth. I do not need the approval of those who failed to protect me.',
    sourceAttribution: 'Adapted with respect from survivor contributions to The Survivors Trust (thesurvivorstrust.org)',
    sourceUrl: 'https://www.thesurvivorstrust.org/'
  }
];
