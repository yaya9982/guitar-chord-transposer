import { useState, useMemo } from 'react';
import { parseProgression } from './lib/chordParser.js';
import { resolveFreeChord, resolveCapoAtFret, resolveCapoSuggestion } from './lib/transpose.js';
import ChordInput from './components/ChordInput.jsx';
import TransposeControls from './components/TransposeControls.jsx';
import ModeToggle from './components/ModeToggle.jsx';
import ProgressionView from './components/ProgressionView.jsx';
import './App.css';

export default function App() {
  const [inputText, setInputText] = useState('G D Em C');
  const [semitoneShift, setSemitoneShift] = useState(0);
  const [mode, setMode] = useState('free');
  const [capoOverride, setCapoOverride] = useState(null);

  const parsed = useMemo(() => parseProgression(inputText), [inputText]);
  const validChords = useMemo(() => parsed.map(p => p.chord).filter(Boolean), [parsed]);

  const suggestion = useMemo(
    () => (mode === 'capo' ? resolveCapoSuggestion(validChords, semitoneShift) : null),
    [mode, validChords, semitoneShift]
  );

  const effectiveCapoFret = capoOverride ?? suggestion?.capoFret ?? 0;

  const items = useMemo(() => {
    if (mode === 'free') {
      return parsed.map(p => ({ token: p.token, resolved: p.chord ? resolveFreeChord(p.chord, semitoneShift) : null }));
    }
    const capoResolved = resolveCapoAtFret(validChords, semitoneShift, effectiveCapoFret);
    let capoIndex = 0;
    return parsed.map(p => {
      if (!p.chord) return { token: p.token, resolved: null };
      const resolved = capoResolved[capoIndex];
      capoIndex += 1;
      return { token: p.token, resolved };
    });
  }, [parsed, validChords, mode, semitoneShift, effectiveCapoFret]);

  return (
    <div className="rig">
      <header className="panel-plate">
        <span className="screw screw--tl" />
        <span className="screw screw--tr" />
        <span className="screw screw--bl" />
        <span className="screw screw--br" />
        <h1 className="title">Chord Transposer</h1>
        <p className="tagline">Signal path: input &rarr; transpose &rarr; output</p>
      </header>

      <div className="input-module">
        <ChordInput value={inputText} onChange={setInputText} />
      </div>

      <div className="control-strip">
        <TransposeControls
          semitoneShift={semitoneShift}
          onShiftChange={setSemitoneShift}
          firstChordRoot={validChords[0]?.root ?? null}
        />
        <ModeToggle
          mode={mode}
          onModeChange={newMode => { setMode(newMode); setCapoOverride(null); }}
          capoFret={effectiveCapoFret}
          onCapoOverrideChange={setCapoOverride}
        />
      </div>

      <ProgressionView items={items} />
    </div>
  );
}
