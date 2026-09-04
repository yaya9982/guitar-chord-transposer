import { midiToFreq } from './notes.js';

let sharedCtx = null;

export function getAudioContext() {
  if (!sharedCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    sharedCtx = new Ctx();
  }
  return sharedCtx;
}

// Karplus-Strong plucked-string synthesis: a noise-filled ring buffer that
// feeds back through a two-sample average (lowpass) and a decay factor.
function pluckBuffer(ctx, freq, duration = 2.0, decay = 0.996) {
  const sampleRate = ctx.sampleRate;
  const length = Math.floor(sampleRate * duration);
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);
  const period = Math.max(2, Math.round(sampleRate / freq));
  const ring = new Float32Array(period);
  for (let i = 0; i < period; i++) ring[i] = Math.random() * 2 - 1;
  let prev = 0;
  for (let i = 0; i < length; i++) {
    const idx = i % period;
    const current = ring[idx];
    data[i] = current;
    ring[idx] = decay * 0.5 * (current + prev);
    prev = current;
  }
  return buffer;
}

export function playVoicing(voicing, { capoFret = 0, strumMs = 25, ctx = getAudioContext() } = {}) {
  const now = ctx.currentTime;
  voicing.midi.forEach((midi, i) => {
    const freq = midiToFreq(midi + capoFret);
    const source = ctx.createBufferSource();
    source.buffer = pluckBuffer(ctx, freq);
    const gain = ctx.createGain();
    gain.gain.value = 0.3;
    source.connect(gain).connect(ctx.destination);
    source.start(now + (i * strumMs) / 1000);
  });
}

export function playProgression(resolvedChords, { chordGapMs = 900 } = {}) {
  const ctx = getAudioContext();
  resolvedChords.forEach((resolved, i) => {
    if (!resolved) return;
    setTimeout(() => playVoicing(resolved.voicing, { capoFret: resolved.capoFret, ctx }), i * chordGapMs);
  });
}
