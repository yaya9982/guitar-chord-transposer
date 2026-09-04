import assert from 'node:assert/strict';
import { applyBassNote } from './bassNote.js';
import { getVoicings, pickEasiestVoicing } from './chordDb.js';

// C/G: C major's easiest voicing mutes the low E string, and G (semitone 7)
// lands on fret 3 of it -- well within the open-position hand span.
const cMajor = pickEasiestVoicing(getVoicings('C', 'major'));
const cOverG = applyBassNote(cMajor, 7, 0);
assert.deepEqual(cOverG.frets, [3, 3, 2, 0, 1, 0]);
assert.equal(cOverG.midi[0], 43); // G2

// C/B: adding B on the muted low E needs fret 7 -- too far. But retargeting
// the A string (currently fret 3 = C, doubled on the B string so the root
// survives) down to fret 2 = B is the standard C/B fingering, x-2-2-0-1-0.
const cOverB = applyBassNote(cMajor, 11, 0);
assert.deepEqual(cOverB.frets, [-1, 2, 2, 0, 1, 0]);
assert.equal(cOverB.midi[0], 47); // B2

// A voicing where the root appears nowhere else if the lowest string is
// retargeted, and no muted string is available either, falls back unchanged.
const noEscape = { frets: [1, 1, 3, 3, 3, 1], fingers: [1, 1, 2, 3, 4, 1], baseFret: 1, barres: [1], midi: [41, 48, 53, 57, 60, 65] };
assert.deepEqual(applyBassNote(noEscape, 2, 5), noEscape); // barred, so retargeting is refused entirely

console.log('bassNote.js: all checks passed');
