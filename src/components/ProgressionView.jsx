import ChordCard from './ChordCard.jsx';
import { playProgression } from '../lib/audio.js';

export default function ProgressionView({ items }) {
  const validResolved = items.map(item => item.resolved).filter(Boolean);

  return (
    <div>
      <button type="button" disabled={validResolved.length === 0} onClick={() => playProgression(validResolved)}>
        Play all
      </button>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
        {items.map((item, i) => (
          <ChordCard key={`${item.token}-${i}`} resolved={item.resolved} token={item.token} />
        ))}
      </div>
    </div>
  );
}
