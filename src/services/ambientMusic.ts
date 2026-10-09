// Web Audio API Soothing Ambient Music & Soundscape Generator
// Zero external network dependencies, works offline and on all mobile devices

export type SoundscapeType = 'sanctuary' | 'ocean' | 'rain' | 'singing_bowl';

export interface SoundscapeInfo {
  id: SoundscapeType;
  title: string;
  description: string;
  icon: string;
  theme: string;
}

export const SOUNDSCAPES: SoundscapeInfo[] = [
  {
    id: 'sanctuary',
    title: 'Sanctuary Dawn (432Hz)',
    description: 'Warm harmonic healing drone with slow gentle chime resonances',
    icon: '✨',
    theme: 'Warm Harmonic Pad'
  },
  {
    id: 'ocean',
    title: 'Gentle Ocean Swell',
    description: 'Rhythmic somatic sea waves to soothe the vagus nerve',
    icon: '🌊',
    theme: 'Rhythmic Calming Waves'
  },
  {
    id: 'rain',
    title: 'Soothing Haven Rain',
    description: 'Soft tranquil rainfall with warm delta frequency background',
    icon: '🌧️',
    theme: 'Tranquil Rainfall'
  },
  {
    id: 'singing_bowl',
    title: 'Sacred Tibetan Bowl',
    description: 'Deep grounding resonant drone with harmonic overtones',
    icon: '🧘',
    theme: 'Deep Grounding Stillness'
  }
];

class AmbientMusicEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private currentTrack: SoundscapeType = 'sanctuary';
  private masterGain: GainNode | null = null;
  private activeNodes: (AudioNode | number)[] = [];
  private chimeTimer: any = null;
  private volume: number = 0.35;

  private initContext() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtxClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(this.volume, this.ctx.currentTime + 0.1);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public getCurrentTrack(): SoundscapeType {
    return this.currentTrack;
  }

  public getIsPlaying(): boolean {
    return this.isRunning;
  }

  public play(track: SoundscapeType = 'sanctuary') {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.stopInternal();
    this.currentTrack = track;
    this.isRunning = true;

    if (track === 'sanctuary') {
      this.startSanctuaryPad();
    } else if (track === 'ocean') {
      this.startOceanWaves();
    } else if (track === 'rain') {
      this.startSoftRain();
    } else if (track === 'singing_bowl') {
      this.startSingingBowl();
    }
  }

  public pause() {
    this.stopInternal();
    this.isRunning = false;
  }

  private stopInternal() {
    if (this.chimeTimer) {
      clearInterval(this.chimeTimer);
      this.chimeTimer = null;
    }

    this.activeNodes.forEach(item => {
      try {
        if (typeof item === 'number') {
          clearInterval(item);
        } else if ('stop' in item && typeof (item as any).stop === 'function') {
          (item as any).stop();
        } else if ('disconnect' in item && typeof item.disconnect === 'function') {
          item.disconnect();
        }
      } catch (e) {}
    });
    this.activeNodes = [];
  }

  // TRACK 1: 432Hz Warm Harmonic Pad with gentle periodic chime overtones
  private startSanctuaryPad() {
    if (!this.ctx || !this.masterGain) return;

    // Frequencies: D (108Hz, 216Hz, 432Hz), A (324Hz), F# (270Hz) - A peaceful D-Major 9th chord
    const freqs = [108, 216, 270, 324, 432];

    freqs.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Lowpass warmth
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600 + idx * 80, this.ctx.currentTime);

      // Slow gentle LFO breathing swell
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.08 + idx * 0.02, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

      const baseLevel = 0.08 / (idx + 1);
      gain.gain.setValueAtTime(baseLevel, this.ctx.currentTime);

      lfo.connect(gain.gain);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      lfo.start();

      this.activeNodes.push(osc, lfo, gain, filter);
    });

    // Gentle periodic wind chimes every 7 seconds
    this.triggerChime();
    this.chimeTimer = setInterval(() => {
      if (this.isRunning && this.currentTrack === 'sanctuary') {
        this.triggerChime();
      }
    }, 7500);
  }

  private triggerChime() {
    if (!this.ctx || !this.masterGain || !this.isRunning) return;
    const chimeFreqs = [864, 1080, 1296, 1728];
    const pick = chimeFreqs[Math.floor(Math.random() * chimeFreqs.length)];

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(pick, this.ctx.currentTime);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(pick, this.ctx.currentTime);
    filter.Q.setValueAtTime(6, this.ctx.currentTime);

    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.05, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.00001, now + 5.5);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 6.0);
  }

  // TRACK 2: Ocean Swell using filtered brown noise modulated by slow sine wave
  private startOceanWaves() {
    if (!this.ctx || !this.masterGain) return;

    // Buffer noise generator
    const bufferSize = this.ctx.sampleRate * 3;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02; // Brown noise
      lastOut = data[i];
      data[i] *= 3.5;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(250, this.ctx.currentTime);

    // Wave swell LFO (12 seconds per wave breath)
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(0.08, this.ctx.currentTime); // ~12s cycle
    lfoGain.gain.setValueAtTime(300, this.ctx.currentTime);

    lfo.connect(filter.frequency);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.22, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start();
    lfo.start();

    this.activeNodes.push(noise, lfo, gain, filter);
  }

  // TRACK 3: Soothing Haven Rain
  private startSoftRain() {
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1; // Pink noise approx
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1100, this.ctx.currentTime);
    filter.Q.setValueAtTime(0.7, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);

    // Warm deep sub hum
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(65, this.ctx.currentTime);
    subGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    subOsc.connect(subGain);
    subGain.connect(this.masterGain);

    noise.start();
    subOsc.start();

    this.activeNodes.push(noise, subOsc, gain, subGain, filter);
  }

  // TRACK 4: Sacred Singing Bowl Drone
  private startSingingBowl() {
    if (!this.ctx || !this.masterGain) return;

    // Frequencies: 136.1Hz (Om frequency) with rich harmonic overtones
    const fundamental = 136.1;
    const harmonics = [fundamental, fundamental * 2.01, fundamental * 3.02, fundamental * 4.98];

    harmonics.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(freq, this.ctx.currentTime);
      filter.Q.setValueAtTime(12, this.ctx.currentTime);

      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.05 + idx * 0.03, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(0.02, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.08 / (idx + 1), this.ctx.currentTime);

      lfo.connect(gain.gain);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      lfo.start();

      this.activeNodes.push(osc, lfo, gain, filter);
    });
  }
}

export const ambientMusic = new AmbientMusicEngine();
