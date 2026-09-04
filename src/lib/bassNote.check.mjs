import assert from 'node:assert/strict';
import { applyBassNote } from './bassNote.js';
import { getVoicings, pickEasiestVoicing } from './chordDb.js';

// C/G: C major's easiest voicing mutes the low E string, and G (semitone 7)
// lands on fret 3 of it -- well within the open-position hand span.
const cMajor = pickEasiestVoicing(getVoicings('C', 'major'));
const cOverG = applyBassNote(cMajor, 7);
assert.deepEqual(cOverG.frets, [3, 3, 2, 0, 1, 0]);
assert.equal(cOverG.midi[0], 43); // G2

// C/B: B (semitone 11) needs fret 7 on the low E string from this open
// shape -- too far from the hand position, so it falls back unchanged.
const cOverB = applyBassNote(cMajor, 11);
assert.deepEqual(cOverB, cMajor);

console.log('bassNote.js: all checks passed');
