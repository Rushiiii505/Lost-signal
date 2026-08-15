// Web Audio API sound synthesizer for authentic OS sounds and simulated audio clues
class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private activeMemoSource: AudioNode | null = null;
  private isPlayingMemo: boolean = false;
  private memoStopCallback: (() => void) | null = null;

  constructor() {
    // AudioContext will be initialized on first user gesture
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAllAudio();
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public playLockSound() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(420, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.09);
  }

  public playUnlockSound() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Two-tone rising chime
    const tones = [587.33, 880.0]; // D5, A5
    tones.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.06);

      gain.gain.setValueAtTime(0.2, now + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.06);
      osc.stop(now + i * 0.06 + 0.14);
    });
  }

  public playTapSound() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.03);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.035);
  }

  public playMessageSent() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(980, now + 0.12);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.17);
  }

  public playMessageReceived() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [659.25, 830.61, 1046.5]; // E5, G#5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);

      gain.gain.setValueAtTime(0.2, now + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.16);
    });
  }

  public playCameraShutter() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    // White noise burst for mechanical click
    const bufferSize = ctx.sampleRate * 0.05;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.Q.setValueAtTime(3, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
  }

  public playClueFound() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.22, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.4);
    });
  }

  public playDialTone(key: string) {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    // DTMF Frequencies
    const dtmf: Record<string, [number, number]> = {
      '1': [697, 1209], '2': [697, 1336], '3': [697, 1477],
      '4': [770, 1209], '5': [770, 1336], '6': [770, 1477],
      '7': [852, 1209], '8': [852, 1336], '9': [852, 1477],
      '*': [941, 1209], '0': [941, 1336], '#': [941, 1477],
    };

    const freqs = dtmf[key] || [440, 880];
    const now = ctx.currentTime;
    const duration = 0.15;

    freqs.forEach(freq => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.02);
    });
  }

  public playBiometricScan() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.linearRampToValueAtTime(900, now + 0.4);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.46);
  }

  // Voice memo / voicemail audio simulator
  public playSimulatedVoiceMemo(
    audioType: 'editor_warning' | 'viper_voice' | 'patrol_radio' | 'foghorn_dock' | 'general',
    durationSecs: number,
    onProgress?: (progress: number) => void,
    onEnded?: () => void
  ) {
    this.stopAllAudio();
    if (this.isMuted) {
      if (onEnded) onEnded();
      return;
    }

    const ctx = this.initCtx();
    if (!ctx) return;

    this.isPlayingMemo = true;
    const startTime = ctx.currentTime;
    const endTime = startTime + durationSecs;

    // Master gain
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.22, startTime);
    masterGain.connect(ctx.destination);

    // Voice formant simulation using modulated oscillators
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const noiseNode = ctx.createBufferSource();
    
    // Create subtle tape hiss / background noise
    const bufferSize = ctx.sampleRate * Math.min(durationSecs, 10);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.05;
    }
    noiseNode.buffer = buffer;
    noiseNode.loop = true;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(800, startTime);

    const voiceFilter = ctx.createBiquadFilter();
    voiceFilter.type = 'bandpass';
    voiceFilter.frequency.setValueAtTime(1100, startTime);
    voiceFilter.Q.setValueAtTime(2.5, startTime);

    if (audioType === 'editor_warning') {
      // Frantic editor speech pattern (pitch modulation)
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(140, startTime);
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(280, startTime);
    } else if (audioType === 'viper_voice') {
      // Deep distorted cipher voice
      osc1.type = 'square';
      osc1.frequency.setValueAtTime(95, startTime);
      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(190, startTime);
    } else if (audioType === 'foghorn_dock') {
      // Low resonant foghorn in background + shipyard radio
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(82, startTime); // Low E foghorn
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(164, startTime);
    } else {
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(130, startTime);
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(260, startTime);
    }

    // Connect nodes
    osc1.connect(voiceFilter);
    osc2.connect(voiceFilter);
    voiceFilter.connect(masterGain);

    noiseNode.connect(noiseFilter);
    noiseFilter.connect(masterGain);

    osc1.start(startTime);
    osc2.start(startTime);
    noiseNode.start(startTime);

    osc1.stop(endTime);
    osc2.stop(endTime);
    noiseNode.stop(endTime);

    // Progress interval
    const interval = setInterval(() => {
      if (!this.isPlayingMemo || !this.ctx) {
        clearInterval(interval);
        return;
      }
      const elapsed = this.ctx.currentTime - startTime;
      const progress = Math.min(1, elapsed / durationSecs);
      if (onProgress) onProgress(progress);

      if (elapsed >= durationSecs) {
        clearInterval(interval);
        this.isPlayingMemo = false;
        if (onEnded) onEnded();
      }
    }, 100);

    this.memoStopCallback = () => {
      clearInterval(interval);
      try {
        osc1.stop();
        osc2.stop();
        noiseNode.stop();
      } catch (e) {}
      this.isPlayingMemo = false;
    };
  }

  public stopAllAudio() {
    if (this.memoStopCallback) {
      this.memoStopCallback();
      this.memoStopCallback = null;
    }
    this.isPlayingMemo = false;
  }
}

export const soundFX = new SoundEngine();
