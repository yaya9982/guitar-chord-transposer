import { useEffect, useState } from 'react';
import ChordDiagram from './ChordDiagram.jsx';
import { QUALITY_LABELS } from '../lib/chordParser.js';
import { playVoicing } from '../lib/audio.js';

const PULSE_MS = 550;

export default function ChordCard({ resolved, token, isActive = false }) {
  const [localPulse, setLocalPulse] = useState(false);

  useEffect(() => {
    if (!localPulse) return;
    const id = setTimeout(() => setLocalPulse(false), PULSE_MS);
    return () => clearTimeout(id);
  }, [localPulse]);

  if (!resolved) {
    return (
      <div className="module-panel module-panel--unsupported">
        <div className="module-label"><span className="led led--red" /> {token}</div>
        <div className="module-note">Unsupported chord — no voicing in the dataset.</div>
      </div>
    );
  }

  const { displayRoot, soundingRoot, quality, voicing, capoFret } = resolved;
  const label = `${displayRoot}${QUALITY_LABELS[quality] ?? quality}`;
  const accent = capoFret > 0 ? '--led-amber' : '--led-green';
  const ledClass = capoFret > 0 ? 'led--amber' : 'led--green';
  const pulsing = localPulse || isActive;

  return (
    <div className="module-panel">
      <div className="module-label"><span className={`led ${ledClass}`} /> {label}</div>
      {capoFret > 0 && (
        <div className="module-sub">sounds as {soundingRoot}{QUALITY_LABELS[quality] ?? quality}</div>
      )}
      <div
        className={`diagram-window${pulsing ? ' diagram-window--pulse' : ''}`}
        style={{ '--pulse-color': `var(${accent})` }}
      >
        <ChordDiagram voicing={voicing} accent={accent} />
      </div>
      <button
        type="button"
        className="footswitch"
        onClick={() => { playVoicing(voicing, { capoFret }); setLocalPulse(true); }}
      >
        Play
      </button>
    </div>
  );
}
