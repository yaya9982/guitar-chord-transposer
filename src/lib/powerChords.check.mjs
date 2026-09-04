import assert from 'node:assert/strict';
import { getPowerChordVoicings } from './powerChords.js';

// Open E5: low E open + A string 2nd fret.
const [, eShapeOpen] = getPowerChordVoicings('E');
assert.deepEqual(eShapeOpen.frets, [0, 2, -1, -1, -1, -1]);
assert.equal(eShapeOpen.baseFret, 1);
assert.deepEqual(eShapeOpen.midi, [40, 47]); // E2, B2

// C5: A-shape at the 3rd fret is the idiomatic low position.
const [aShapeC] = getPowerChordVoicings('C');
assert.deepEqual(aShapeC.frets, [-1, 1, 3, -1, -1, -1]);
assert.equal(aShapeC.baseFret, 3);
assert.deepEqual(aShapeC.midi, [48, 55]); // C3, G3

console.log('powerChords.js: all checks passed');
