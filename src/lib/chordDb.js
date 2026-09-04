import chordData from './chordData.js';

export function getVoicings(dbKeyRoot, quality) {
  const entries = chordData.chords[dbKeyRoot];
  if (!entries) return [];
  const entry = entries.find(e => e.suffix === quality);
  return entry ? entry.positions : [];
}

export function pickEasiestVoicing(positions) {
  if (!positions || positions.length === 0) return null;
  return [...positions].sort((a, b) =>
    a.barres.length !== b.barres.length
      ? a.barres.length - b.barres.length
      : a.baseFret - b.baseFret
  )[0];
}
