import ChordDiagram from './ChordDiagram.jsx';
import { QUALITY_LABELS } from '../lib/chordParser.js';
import { playVoicing } from '../lib/audio.js';

export default function ChordCard({ resolved, token }) {
  if (!resolved) {
    return (
      <div style={{ padding: '0.5rem', border: '1px solid #c00', borderRadius: 4 }}>
        <strong>{token}</strong>
        <div>Unsupported chord — no voicing in the dataset.</div>
      </div>
    );
  }

  const { displayRoot, soundingRoot, quality, voicing, capoFret } = resolved;
  const label = `${displayRoot}${QUALITY_LABELS[quality] ?? quality}`;
  const soundingLabel = capoFret > 0 ? ` (sounds as ${soundingRoot}${QUALITY_LABELS[quality] ?? quality})` : '';

  return (
    <div style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: 4, textAlign: 'center' }}>
      <div><strong>{label}</strong>{soundingLabel}</div>
      <ChordDiagram voicing={voicing} />
      <button type="button" onClick={() => playVoicing(voicing, { capoFret })}>Play</button>
    </div>
  );
}
