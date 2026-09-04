import { transposeNote, noteNameToSemitone } from './notes.js';
import { getVoicings, pickEasiestVoicing } from './chordDb.js';
import { applyBassNote } from './bassNote.js';

function bassIntervalOf(chord) {
  if (!chord.bass) return null;
  return ((noteNameToSemitone(chord.bass) - noteNameToSemitone(chord.root)) % 12 + 12) % 12;
}

function resolveAt(root, quality, capoFret, soundingRoot, bassInterval) {
  const voicings = getVoicings(root, quality);
  let voicing = pickEasiestVoicing(voicings);
  if (!voicing) return null;

  let bass = null;
  if (bassInterval !== null) {
    const rootSemitone = noteNameToSemitone(root);
    const bassSemitone = (rootSemitone + bassInterval) % 12;
    const withBass = applyBassNote(voicing, bassSemitone, rootSemitone);
    // applyBassNote returns the same reference unchanged when no viable
    // string was found -- only claim the slash bass when it actually landed.
    if (withBass !== voicing) {
      voicing = withBass;
      bass = transposeNote(root, bassInterval);
    }
  }

  return { displayRoot: root, soundingRoot, quality, voicing, capoFret, bass };
}

export function resolveFreeChord(chord, semitoneShift) {
  const targetRoot = transposeNote(chord.root, semitoneShift);
  return resolveAt(targetRoot, chord.quality, 0, targetRoot, bassIntervalOf(chord));
}

export function resolveCapoAtFret(chords, semitoneShift, capoFret) {
  return chords.map(chord => {
    const targetRoot = transposeNote(chord.root, semitoneShift);
    const shapeRoot = transposeNote(targetRoot, -capoFret);
    return resolveAt(shapeRoot, chord.quality, capoFret, targetRoot, bassIntervalOf(chord));
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
