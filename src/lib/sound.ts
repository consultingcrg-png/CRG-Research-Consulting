let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;

  const AudioCtor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

  if (!AudioCtor) return null;
  audioContext ??= new AudioCtor();
  return audioContext;
}

/**
 * Plays a short, soft "card flip" whoosh using the Web Audio API.
 * No audio file is required, and the sound is generated on the user gesture.
 */
export function playFlipSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === "suspended") {
      void ctx.resume();
    }

    const now = ctx.currentTime;

    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(640, now);
    oscillator.frequency.exponentialRampToValueAtTime(190, now + 0.2);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1800, now);
    filter.frequency.exponentialRampToValueAtTime(600, now + 0.2);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.07, now + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);

    oscillator.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start(now);
    oscillator.stop(now + 0.26);
  } catch {
    // Audio is a progressive enhancement — ignore any browser restrictions.
  }
}
