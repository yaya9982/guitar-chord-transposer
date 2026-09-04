import chordData from './chordData.js';

// The dataset's `keys` array and each entry's own `key` field spell sharps
// as e.g. "C#", but the `chords` object's own property names spell them out
// ("Csharp") instead. Map the DB_KEYS spelling to the actual property name.
const CHORDS_OBJECT_KEY = { 'C#': 'Csharp', 'F#': 'Fsharp' };

export function getVoicings(dbKeyRoot, quality) {
  const objectKey = CHORDS_OBJECT_KEY[dbKeyRoot] ?? dbKeyRoot;
  const entries = chordData.chords[objectKey];
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
