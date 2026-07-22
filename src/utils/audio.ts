// Web Audio API Sound Synthesizer for Ancient RPG FX

class SoundManager {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    // Lazy init audio context on user interaction
  }

  private getContext(): AudioContext | null {
    if (!this.enabled) return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  // Button click
  public playClick() {
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  }

  // Coin gleam / redemption chime
  public playCoin() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'triangle';

    osc1.frequency.setValueAtTime(987.77, now); // B5
    osc1.frequency.setValueAtTime(1318.51, now + 0.08); // E6

    osc2.frequency.setValueAtTime(1975.53, now); // B6
    osc2.frequency.setValueAtTime(2637.02, now + 0.08); // E7

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.35);
    osc2.stop(now + 0.35);
  }

  // Success / Achievement chord
  public playSuccess() {
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const now = ctx.currentTime + idx * 0.07;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.4);
    });
  }

  // Water splash in Mikveh
  public playSplash() {
    const ctx = this.getContext();
    if (!ctx) return;

    const bufferSize = ctx.sampleRate * 0.4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(300, ctx.currentTime + 0.4);
    filter.Q.value = 3;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
    noise.stop(ctx.currentTime + 0.4);
  }

  // Harp string note
  public playHarpNote(pitchHz: number = 440) {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(pitchHz, now);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.8);
  }

  // Trumpet fanfare
  public playTrumpetFanfare() {
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [392.00, 523.25, 659.25, 783.99]; // G4, C5, E5, G5
    const times = [0, 0.15, 0.30, 0.45];

    notes.forEach((freq, i) => {
      const now = ctx.currentTime + times[i];
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + (i === 3 ? 0.8 : 0.25));

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + (i === 3 ? 0.8 : 0.25));
    });
  }

  // Drum / Cymbal hit
  public playCymbal() {
    const ctx = this.getContext();
    if (!ctx) return;

    const bufferSize = ctx.sampleRate * 0.5;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 4000;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
    noise.stop(ctx.currentTime + 0.5);
  }

  // Fire sizzle / Altar fire
  public playFire() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.linearRampToValueAtTime(80, now + 0.3);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  // Complete Song of Ascents (שיר המעלות) with Melody & Hebrew Speech Synthesis
  public playSongOfAscents(onVerseChange?: (verse: string, progressPercent: number) => void): () => void {
    const ctx = this.getContext();

    const verses = [
      'שָׂמַחְתִּי בְּאֹמְרִים לִי בֵּית ה\' נֵלֵךְ!',
      'עֹמְדוֹת הָיוּ רַגְלֵינוּ בִּשְׁעָרַיִךְ יְרוּשָׁלָםִ!',
      'יְרוּשָׁלַםִ הַבְּנוּיָה כְּעִיר שֶׁחֻבְּרָה לָהּ יַחְדָּו!',
      'שֶׁשָּׁם עָלוּ שְׁבָטִים שִׁבְטֵי יָהּ עֵדוּת לְיִשְׂרָאֵל!'
    ];

    // Speech Synthesis in Hebrew if available
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      verses.forEach((verseText, vIdx) => {
        const utterance = new SpeechSynthesisUtterance(verseText);
        utterance.lang = 'he-IL';
        utterance.rate = 0.85;
        utterance.pitch = 1.1;
        utterance.onstart = () => {
          if (onVerseChange) {
            onVerseChange(verseText, Math.min(100, (vIdx + 1) * 25));
          }
        };
        window.speechSynthesis.speak(utterance);
      });
    }

    if (!ctx) return () => {};

    // Play musical tune notes using Web Audio API synthesizer
    const melodyNotes = [
      // Verse 1
      { freq: 293.66, dur: 0.35, verseIdx: 0 }, // D4
      { freq: 369.99, dur: 0.35, verseIdx: 0 }, // F#4
      { freq: 440.00, dur: 0.45, verseIdx: 0 }, // A4
      { freq: 493.88, dur: 0.45, verseIdx: 0 }, // B4
      { freq: 587.33, dur: 0.70, verseIdx: 0 }, // D5
      // Verse 2
      { freq: 440.00, dur: 0.35, verseIdx: 1 }, // A4
      { freq: 493.88, dur: 0.35, verseIdx: 1 }, // B4
      { freq: 587.33, dur: 0.45, verseIdx: 1 }, // D5
      { freq: 659.25, dur: 0.45, verseIdx: 1 }, // E5
      { freq: 739.99, dur: 0.70, verseIdx: 1 }, // F#5
      // Verse 3
      { freq: 659.25, dur: 0.35, verseIdx: 2 }, // E5
      { freq: 587.33, dur: 0.35, verseIdx: 2 }, // D5
      { freq: 493.88, dur: 0.45, verseIdx: 2 }, // B4
      { freq: 440.00, dur: 0.45, verseIdx: 2 }, // A4
      { freq: 587.33, dur: 0.70, verseIdx: 2 }, // D5
      // Verse 4
      { freq: 369.99, dur: 0.35, verseIdx: 3 }, // F#4
      { freq: 440.00, dur: 0.35, verseIdx: 3 }, // A4
      { freq: 493.88, dur: 0.45, verseIdx: 3 }, // B4
      { freq: 587.33, dur: 0.90, verseIdx: 3 }, // D5
    ];

    let startTime = ctx.currentTime;

    melodyNotes.forEach((note) => {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'triangle'; // Warm flute tone
      osc1.frequency.setValueAtTime(note.freq, startTime);

      osc2.type = 'sine'; // Harp overtone
      osc2.frequency.setValueAtTime(note.freq * 2, startTime);

      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + note.dur);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(startTime);
      osc2.start(startTime);
      osc1.stop(startTime + note.dur);
      osc2.stop(startTime + note.dur);

      // Trigger verse update callback if speech synthesis is not active
      if (!('speechSynthesis' in window) && onVerseChange) {
        setTimeout(() => {
          onVerseChange(verses[note.verseIdx], Math.min(100, (note.verseIdx + 1) * 25));
        }, (startTime - ctx.currentTime) * 1000);
      }

      startTime += note.dur + 0.15;
    });

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }

  // Stop any active speech or long sound
  public stopAudio() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const soundManager = new SoundManager();
