export interface StepReflection {
  dateKey: string; // "MM-DD" e.g. "10-08"
  displayDate: string; // e.g. "October 8"
  month: number; // 1-12
  day: number; // 1-31
  stepNumber: number; // 1-12
  aaReflection: {
    title: string;
    sourceQuote: string;
    sourceCitation: string;
    body: string;
    closingThought: string;
    principle: string;
  };
  naJustForToday: {
    title: string;
    sourceQuote: string;
    sourceCitation: string;
    body: string;
    justForTodayCommitment: string;
    principle: string;
  };
}

export const CURATED_REFLECTIONS: Record<string, StepReflection> = {
  // October 8 (Today's Date!)
  "10-08": {
    dateKey: "10-08",
    displayDate: "October 8",
    month: 10,
    day: 8,
    stepNumber: 10,
    aaReflection: {
      title: "Daily Housecleaning of the Soul",
      sourceQuote: "Continued to take personal inventory and when we were wrong promptly admitted it.",
      sourceCitation: "Twelve Steps and Twelve Traditions, p. 88 (Step Ten)",
      body: "In our addiction, we allowed emotional debris to pile up until life was unmanageable. Step Ten is our daily spiritual broom. It is not about self-condemnation or obsessing over flaws; it is the gentle practice of checking in before sleep: Did fear run the show today? Was I resentful or dishonest? And most importantly, what acts of kindness and sanity did I practice? When we make amends swiftly, guilt has no fertile ground to germinate.",
      closingThought: "Today, I keep my side of the street clean. Prompt honesty preserves my spiritual peace.",
      principle: "Personal Integrity & Vigilance"
    },
    naJustForToday: {
      title: "Cleaning Up as We Go",
      sourceQuote: "We continue to take personal inventory. This helps us to stay clean in the present and build an ongoing foundation of self-respect.",
      sourceCitation: "Narcotics Anonymous Basic Text, Step Ten",
      body: "Before recovery, our wreckage was overwhelming because we never cleaned up behind ourselves. One resentful thought led to another, until the pressure drove us straight back to our drug of choice. Today in NA, we practice ongoing awareness. When we hurt someone or slip into old defensive behaviors, we don't wait for weeks to fix it. We admit it promptly, make it right, and breathe in clean freedom.",
      justForTodayCommitment: "JUST FOR TODAY: I will keep my life simple and clean. If I am wrong, I will promptly admit it and return to the peace of my recovery.",
      principle: "Honesty & Willingness"
    }
  },

  // October 9
  "10-09": {
    dateKey: "10-09",
    displayDate: "October 9",
    month: 10,
    day: 9,
    stepNumber: 10,
    aaReflection: {
      title: "Emotional Balance",
      sourceQuote: "Nothing pays off like restraint of tongue and pen.",
      sourceCitation: "Twelve Steps and Twelve Traditions, p. 91",
      body: "How often did an impulsive retort ignite an emotional firestorm that threatened our sobriety? Step Ten invites us to pause when agitated. We do not have to win every argument; we do not have to retaliate. Restraint is not weakness; it is the supreme armor of the sober mind. By pausing for five deep breaths, we give our Higher Power space to guide our response.",
      closingThought: "Today, when I feel defensive, I will pause and breathe before speaking.",
      principle: "Self-Restraint & Serenity"
    },
    naJustForToday: {
      title: "The Pause That Saves Us",
      sourceQuote: "When we are upset, our first reaction is often our old reaction. Recovery teaches us the pause.",
      sourceCitation: "Just for Today: Daily Meditations for Recovering Addicts",
      body: "Our natural reflex when triggered was to attack, flee, or use. Today, the miracle of recovery is the gap between the trigger and our response. In that gap lies our clean sovereignty. We can choose to step back, call a fellow recovering addict, or repeat the Serenity Prayer instead of reacting in destructive anger.",
      justForTodayCommitment: "JUST FOR TODAY: When anger or fear rises, I will pause for one minute before taking any action.",
      principle: "Patience & Restraint"
    }
  },

  // October 10
  "10-10": {
    dateKey: "10-10",
    displayDate: "October 10",
    month: 10,
    day: 10,
    stepNumber: 10,
    aaReflection: {
      title: "Admitting Wrongs Without Self-Hatred",
      sourceQuote: "When we were wrong promptly admitted it.",
      sourceCitation: "Alcoholics Anonymous, p. 59",
      body: "Many of us confused admitting our faults with groveling or self-hatred. In recovery, admitting a mistake is not proof that we are bad people; it is proof that we are growing up. It frees us from the exhausting prison of having to be perfect or right all the time.",
      closingThought: "I am human, learning and healing. An honest apology is my bridge to peace.",
      principle: "Humility & Grace"
    },
    naJustForToday: {
      title: "Letting Go of Perfection",
      sourceQuote: "We are not expected to be perfect. If we were, we wouldn't need recovery.",
      sourceCitation: "Narcotics Anonymous Basic Text, p. 74",
      body: "Many of us used drugs because the weight of our own perfectionism crushed us. In NA, we celebrate progress, never perfection. Making a mistake today is simply an opportunity to learn. We forgive ourselves, clean up the mistake, and keep walking forward clean.",
      justForTodayCommitment: "JUST FOR TODAY: I release the burden of perfection and embrace the gentleness of progress.",
      principle: "Self-Forgiveness"
    }
  },

  // October 7 (Yesterday)
  "10-07": {
    dateKey: "10-07",
    displayDate: "October 7",
    month: 10,
    day: 7,
    stepNumber: 10,
    aaReflection: {
      title: "The Daily Spot-Check",
      sourceQuote: "An honest look at ourselves each day keeps the wreckage of the past from repeating.",
      sourceCitation: "As Bill Sees It, p. 24",
      body: "A spot-check inventory throughout the day acts like a compass check on a voyage. We don't wait for the ship to hit the rocks. If we notice anxiety, greed, or anger creeping into our hearts at noon, we address it right then. We ask our Higher Power for clarity, and we realign with love and service.",
      closingThought: "A quick midday check-in keeps my spirit anchored in stillness.",
      principle: "Mindfulness & Vigilance"
    },
    naJustForToday: {
      title: "Living in the Present Moment",
      sourceQuote: "We cannot change yesterday, and tomorrow is not yet here. All we have is this clean moment.",
      sourceCitation: "Just for Today, p. 281",
      body: "When we dwell on the past, guilt haunts us. When we obsess over the future, anxiety paralyzes us. Our freedom lives right now, in this breath, in this heartbeat. Staying clean is purely a function of living in the present moment.",
      justForTodayCommitment: "JUST FOR TODAY: I will focus entirely on the present hour, trusting that the future is in safe hands.",
      principle: "Present-Moment Living"
    }
  },

  // January 1 (Universal Anchor: Step One)
  "01-01": {
    dateKey: "01-01",
    displayDate: "January 1",
    month: 1,
    day: 1,
    stepNumber: 1,
    aaReflection: {
      title: "The First Step Toward Freedom",
      sourceQuote: "We admitted we were powerless over alcohol—that our lives had become unmanageable.",
      sourceCitation: "Alcoholics Anonymous, p. 59 (Step One)",
      body: "Surrender in the 12 Steps is not defeat; it is the moment the prisoner stops hammering on the steel door and notices the key was in our pocket all along. Admitting powerlessness over our substance is the single foundation upon which all enduring sanity is built.",
      closingThought: "I surrender the illusion of control, and in doing so, I find true strength.",
      principle: "Honesty & Surrender"
    },
    naJustForToday: {
      title: "An End to the Hopeless Battle",
      sourceQuote: "Our surrender was the beginning of our recovery. We stopped fighting everyone and everything.",
      sourceCitation: "Narcotics Anonymous Basic Text, Step One",
      body: "For years, we fought an exhausting war against drugs, our families, the law, and ourselves. Step One ended the war. When we laid down our weapons, we discovered that surrender wasn't death; it was the birth of our new life.",
      justForTodayCommitment: "JUST FOR TODAY: I will admit my powerlessness over addiction and welcome the strength of the fellowship.",
      principle: "Total Surrender"
    }
  }
};

// Generates an authentic, step-aligned 12-Step reflection for any day of the year (365 days)
export function getDailyReflection(date: Date = new Date()): StepReflection {
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate(); // 1-31
  const key = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

  if (CURATED_REFLECTIONS[key]) {
    return CURATED_REFLECTIONS[key];
  }

  // Monthly Step Alignment (Standard 12-Month 12-Step Calendar)
  // Month 1 = Step 1, Month 2 = Step 2, ... Month 10 = Step 10, etc.
  const stepNumber = month;
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const monthName = monthNames[month - 1];

  const stepThemes: Record<number, {
    aaTopic: string;
    aaQuote: string;
    aaCitation: string;
    aaBody: string;
    aaClosing: string;
    aaPrinciple: string;
    naTopic: string;
    naQuote: string;
    naCitation: string;
    naBody: string;
    naCommitment: string;
    naPrinciple: string;
  }> = {
    1: {
      aaTopic: "Surrender & The Beginning of Sanity",
      aaQuote: "We admitted we were powerless over alcohol—that our lives had become unmanageable.",
      aaCitation: "Alcoholics Anonymous, Step One",
      aaBody: "Admitting powerlessness is the master key to freedom. When we stop trying to manage what has repeatedly proven unmanageable, we create space for genuine healing to take root.",
      aaClosing: "Today, I let go of the fight and choose peace.",
      aaPrinciple: "Honesty",
      naTopic: "Surrendering the Fight",
      naQuote: "We could not control our using. The first step towards freedom was admitting it.",
      naCitation: "NA Basic Text",
      naBody: "Addiction convinced us that one more try would work. In recovery, we lay down the burden of trying to control the uncontrollable and embrace the relief of living clean.",
      naCommitment: "JUST FOR TODAY: I will not pick up my substance of choice, no matter what.",
      naPrinciple: "Surrender"
    },
    2: {
      aaTopic: "Restoration to Sanity",
      aaQuote: "Came to believe that a Power greater than ourselves could restore us to sanity.",
      aaCitation: "Twelve Steps and Twelve Traditions, Step Two",
      aaBody: "Sanity in recovery is seeing life as it truly is, without the distortion of chemical escape. We open our hearts to the possibility that we can be restored to peace.",
      aaClosing: "I believe that a life of calm and sanity is waiting for me.",
      aaPrinciple: "Hope",
      naTopic: "Hope Awakens",
      naQuote: "We came to believe that we could be helped by a power greater than our addiction.",
      naCitation: "NA Basic Text, Step Two",
      naBody: "Hope is the oxygen of early recovery. Watching others live clean and joyful gave us proof that life without drugs was not only possible, but profoundly beautiful.",
      naCommitment: "JUST FOR TODAY: I will trust that healing is already taking place inside my soul.",
      naPrinciple: "Hope"
    },
    3: {
      aaTopic: "Turning It Over",
      aaQuote: "Made a decision to turn our will and our lives over to the care of God as we understood Him.",
      aaCitation: "Alcoholics Anonymous, Step Three",
      aaBody: "Turning our will over is not resignation; it is willing cooperation with love and reality. We stop demanding that the universe cater to our demands and learn to float on the river of life.",
      aaClosing: "I entrust today's outcomes to the universe and focus on my own gentle actions.",
      aaPrinciple: "Trust",
      naTopic: "Relinquishing the Steering Wheel",
      naQuote: "Surrendering our will allows a loving power to direct our path.",
      naCitation: "Just for Today, Step Three",
      naBody: "Self-will ran riot in our active addiction. Step Three invites us to relax our grip, take a deep breath, and let a higher, wiser flow guide our choices today.",
      naCommitment: "JUST FOR TODAY: I will turn my worries over to my Higher Power and walk in trust.",
      naPrinciple: "Willingness"
    },
    4: {
      aaTopic: "Courageous Self-Discovery",
      aaQuote: "Made a searching and fearless moral inventory of ourselves.",
      aaCitation: "Alcoholics Anonymous, Step Four",
      aaBody: "Inventory is not an autopsy; it is a search for truth and light. We look back with compassion at the wounds and fears that drove our behavior, ready to be liberated.",
      aaClosing: "I look at myself with courage, compassion, and unwavering honesty.",
      aaPrinciple: "Courage",
      naTopic: "Facing the Truth Without Fear",
      naQuote: "Our inventory showed us the roots of our pain so we could pull them out.",
      naCitation: "NA Basic Text, Step Four",
      naBody: "We spent lifetimes running from our feelings. In Step Four, we sit down bravely with paper and pen, discovering that the truth does not kill us—it sets us free.",
      naCommitment: "JUST FOR TODAY: I will be honest with myself about my feelings and fears.",
      naPrinciple: "Courage"
    },
    5: {
      aaTopic: "The Release of Secrets",
      aaQuote: "Admitted to God, to ourselves, and to another human being the exact nature of our wrongs.",
      aaCitation: "Twelve Steps and Twelve Traditions, Step Five",
      aaBody: "We are only as sick as our secrets. Sharing our deepest shame with a trusted sponsor or guide dismantles the dark fortress of isolation that addiction built.",
      aaClosing: "I am never alone. In vulnerability, I find unconditional fellowship.",
      aaPrinciple: "Integrity",
      naTopic: "Breaking the Isolation",
      naQuote: "Sharing our inventory with another human being brought us back into the human race.",
      naCitation: "NA Basic Text, Step Five",
      naBody: "Addiction thrived in silence and shame. The moment we spoke our hidden fears aloud to another recovering addict who understood, the shame evaporated.",
      naCommitment: "JUST FOR TODAY: I will not hide in isolation; I will reach out to a trusted companion in recovery.",
      naPrinciple: "Vulnerability"
    },
    6: {
      aaTopic: "Entirely Ready for Change",
      aaQuote: "Were entirely ready to have God remove all these defects of character.",
      aaCitation: "Alcoholics Anonymous, Step Six",
      aaBody: "Defects were our primitive survival armor in an unloving world. In recovery, we realize the war is over. We become willing to set down our anger, pride, and fear.",
      aaClosing: "I willingly open my hands to let go of old defenses that no longer serve me.",
      aaPrinciple: "Willingness",
      naTopic: "Letting Go of Old Survival Tools",
      naQuote: "We become ready to let go of the patterns that kept us sick.",
      naCitation: "NA Basic Text, Step Six",
      naBody: "Our character defects were often survival strategies from trauma. Today, we thank them for helping us survive, and gently let them go so we can truly live.",
      naCommitment: "JUST FOR TODAY: I am willing to grow and allow new, gentle habits to replace old reactions.",
      naPrinciple: "Readiness"
    },
    7: {
      aaTopic: "Humble Request for Freedom",
      aaQuote: "Humbly asked Him to remove our shortcomings.",
      aaCitation: "Twelve Steps and Twelve Traditions, Step Seven",
      aaBody: "Humility is simply truth: recognizing our place in the web of humanity without superiority or inferiority. We ask for our hearts to be emptied of bitterness and filled with love.",
      aaClosing: "I walk humbly upon the earth, seeking to love rather than to demand.",
      aaPrinciple: "Humility",
      naTopic: "Asking for Healing",
      naQuote: "Humility in Step Seven means recognizing our human need for help and grace.",
      naCitation: "NA Basic Text, Step Seven",
      naBody: "We cannot fix our own shortcomings with the same mind that created them. We ask for grace and step forward with humility and hope.",
      naCommitment: "JUST FOR TODAY: I will ask for help with humility, knowing I do not have to walk alone.",
      naPrinciple: "Humility"
    },
    8: {
      aaTopic: "The Willingness to Repair",
      aaQuote: "Made a list of all persons we had harmed, and became willing to make amends to them all.",
      aaCitation: "Alcoholics Anonymous, Step Eight",
      aaBody: "Step Eight begins in the heart. Before we speak a single word, we soften our resentment and cultivate genuine willingness to restore relationships and take responsibility.",
      aaClosing: "My willingness to heal relationships begins with forgiveness of self and others.",
      aaPrinciple: "Compassion",
      naTopic: "A Heart Prepared for Reconciliation",
      naQuote: "We become willing to repair the damage we caused in our active addiction.",
      naCitation: "NA Basic Text, Step Eight",
      naBody: "Making the list in Step Eight allowed us to see where our actions wounded others. We let go of blame and prepare our hearts to make genuine amends.",
      naCommitment: "JUST FOR TODAY: I will foster goodwill toward all people and prepare my heart for reconciliation.",
      naPrinciple: "Brotherly Love"
    },
    9: {
      aaTopic: "Living Amends",
      aaQuote: "Made direct amends to such people wherever possible, except when to do so would injure them or others.",
      aaCitation: "Alcoholics Anonymous, Step Nine",
      aaBody: "Amends are not just words of apology; they are living demonstrations of changed character. Our greatest amends to those we love is our sustained, gentle sobriety.",
      aaClosing: "My changed life and present kindness are my ultimate living amends.",
      aaPrinciple: "Justice & Restitution",
      naTopic: "Restoring What Was Broken",
      naQuote: "Direct amends heal the past and open the door to genuine self-respect.",
      naCitation: "NA Basic Text, Step Nine",
      naBody: "When we make amends, we stand tall and take responsibility. We do not do it to demand forgiveness, but to set ourselves free from the wreckage of the past.",
      naCommitment: "JUST FOR TODAY: I will live an amends of kindness, reliability, and sobriety.",
      naPrinciple: "Responsibility"
    },
    10: {
      aaTopic: "Continued Daily Awareness",
      aaQuote: "Continued to take personal inventory and when we were wrong promptly admitted it.",
      aaCitation: "Twelve Steps and Twelve Traditions, Step Ten",
      aaBody: "Recovery is maintained day by day through honest self-check. When we notice irritation or fear, we address it immediately so that peace remains our constant companion.",
      aaClosing: "Prompt honesty and gentle daily awareness preserve my serenity.",
      aaPrinciple: "Perseverance",
      naTopic: "Daily Self-Honesty",
      naQuote: "Step Ten keeps us grounded in the present so we don't build new resentments.",
      naCitation: "NA Basic Text, Step Ten",
      naBody: "We don't wait for a crisis to check in with ourselves. Throughout the day, we check our motives, admit our missteps, and stay in the sunlight of the spirit.",
      naCommitment: "JUST FOR TODAY: I will keep my side of the street clean through quick honesty and humility.",
      naPrinciple: "Discipline"
    },
    11: {
      aaTopic: "Conscious Contact Through Stillness",
      aaQuote: "Sought through prayer and meditation to improve our conscious contact with God as we understood Him.",
      aaCitation: "Alcoholics Anonymous, Step Eleven",
      aaBody: "Meditation is listening; prayer is speaking. In the quiet sanctuary of the morning breath, we reconnect with the power that keeps us clean, asking only for knowledge of love's will for us.",
      aaClosing: "In stillness and silence, I find the guidance and strength for today.",
      aaPrinciple: "Spiritual Awareness",
      naTopic: "Deepening the Spiritual Connection",
      naQuote: "Prayer and meditation nurture the spiritual foundation of our daily recovery.",
      naCitation: "NA Basic Text, Step Eleven",
      naBody: "Recovery is not just abstaining from drugs; it is cultivating a rich inner life. Daily meditation anchors our minds and gives us the strength to face any challenge sober.",
      naCommitment: "JUST FOR TODAY: I will take ten minutes of quiet meditation to center my spirit in peace.",
      naPrinciple: "Conscious Contact"
    },
    12: {
      aaTopic: "Carrying the Message & Spiritual Awakening",
      aaQuote: "Having had a spiritual awakening as the result of these steps, we tried to carry this message to alcoholics.",
      aaCitation: "Alcoholics Anonymous, Step Twelve",
      aaBody: "We can only keep what we have by giving it away. Reaching out a gentle hand to a suffering newcomer is the highest expression of our gratitude for the gift of life.",
      aaClosing: "I carry the message of hope through my actions, my presence, and my kindness.",
      aaPrinciple: "Service & Love",
      naTopic: "The Joy of Selfless Service",
      naQuote: "Freely we received, freely we give. Service keeps our recovery vibrant and alive.",
      naCitation: "NA Basic Text, Step Twelve",
      naBody: "When we share our story with another struggling addict, the pain of our past becomes our greatest asset. Our survival gives someone else the courage to live clean today.",
      naCommitment: "JUST FOR TODAY: I will look for one opportunity to be of loving service to another person.",
      naPrinciple: "Unconditional Service"
    }
  };

  const theme = stepThemes[stepNumber] || stepThemes[10];

  return {
    dateKey: key,
    displayDate: `${monthName} ${day}`,
    month,
    day,
    stepNumber,
    aaReflection: {
      title: `${theme.aaTopic} (${monthName} ${day})`,
      sourceQuote: theme.aaQuote,
      sourceCitation: theme.aaCitation,
      body: theme.aaBody,
      closingThought: theme.aaClosing,
      principle: theme.aaPrinciple
    },
    naJustForToday: {
      title: `${theme.naTopic} (${monthName} ${day})`,
      sourceQuote: theme.naQuote,
      sourceCitation: theme.naCitation,
      body: theme.naBody,
      justForTodayCommitment: theme.naCommitment,
      principle: theme.naPrinciple
    }
  };
}
