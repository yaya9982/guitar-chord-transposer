import assert from 'node:assert/strict';
import guitarData from './chordData.js';

assert.deepEqual(guitarData.keys, ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B']);
assert.ok(Array.isArray(guitarData.chords['C']), 'expected chords.C to be an array');
assert.ok(guitarData.chords['C'].some(e => e.suffix === 'major'), 'expected a C major entry');
console.log('chordData.js: all checks passed');
