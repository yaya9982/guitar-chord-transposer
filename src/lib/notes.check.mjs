import assert from 'node:assert/strict';
import { transposeNote, noteNameToSemitone, midiToFreq } from './notes.js';

assert.equal(transposeNote('C', 2), 'D');
assert.equal(transposeNote('B', 1), 'C');   // wraps forward past B
assert.equal(transposeNote('C', -1), 'B');  // wraps backward past C
assert.equal(transposeNote('A', -2), 'G');
assert.equal(transposeNote('Db', 0), 'C#'); // normalizes flat spelling to DB_KEYS spelling
assert.equal(noteNameToSemitone('Bb'), 10);
assert.equal(midiToFreq(69), 440);
console.log('notes.js: all checks passed');
