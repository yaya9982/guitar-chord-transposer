import { transposeNote } from './notes.js';
import { getVoicings, pickEasiestVoicing } from './chordDb.js';

function resolveAt(root, quality, capoFret, soundingRoot) {
  const voicings = getVoicings(root, quality);
  const voicing = pickEasiestVoicing(voicings);
  if (!voicing) return null;
  return { displayRoot: root, soundingRoot, quality, voicing, capoFret };
}

export function resolveFreeChord(chord, semitoneShift) {
  const targetRoot = transposeNote(chord.root, semitoneShift);
  return resolveAt(targetRoot, chord.quality, 0, targetRoot);
}

export function resolveCapoAtFret(chords, semitoneShift, capoFret) {
  return chords.map(chord => {
    const targetRoot = transposeNote(chord.root, semitoneShift);
    const shapeRoot = transposeNote(targetRoot, -capoFret);
    return resolveAt(shapeRoot, chord.quality, capoFret, targetRoot);
  });
}

export function resolveCapoSuggestion(chords, semitoneShift, maxCapo = 7) {
  let best = null;
  for (let capoFret = 0; capoFret <= maxCapo; capoFret++) {
    const resolved = resolveCapoAtFret(chords, semitoneShift, capoFret);
    if (resolved.some(r => r === null)) continue;
    const barreFreeCount = resolved.filter(r => r.voicing.barres.length === 0).length;
    const totalBaseFret = resolved.reduce((sum, r) => sum + r.voicing.baseFret, 0);
    const isBetter =
      !best ||
      barreFreeCount > best.barreFreeCount ||
      (barreFreeCount === best.barreFreeCount && totalBaseFret < best.totalBaseFret);
    if (isBetter) {
      best = { capoFret, resolved, barreFreeCount, totalBaseFret };
    }
  }
  return best ? { capoFret: best.capoFret, resolved: best.resolved } : null;
}
