import { useEffect, useState } from 'react';
import ChordCard from './ChordCard.jsx';
import { playProgression, DEFAULT_CHORD_GAP_MS } from '../lib/audio.js';
import Footswitch from '../ui/Footswitch.jsx';

const PULSE_MS = 550;

export default function ProgressionView({ items }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const validResolved = items.map(item => item.resolved).filter(Boolean);

  useEffect(() => {
    if (activeIndex === null) return;
    const id = setTimeout(() => setActiveIndex(null), PULSE_MS);
    return () => clearTimeout(id);
  }, [activeIndex]);

  const playAll = () => {
    playProgression(validResolved);
    items.forEach((item, i) => {
      if (!item.resolved) return;
      setTimeout(() => setActiveIndex(i), i * DEFAULT_CHORD_GAP_MS);
    });
  };

  return (
    <div>
      <Footswitch disabled={validResolved.length === 0} onClick={playAll}>
        Play all
      </Footswitch>
      {items.length === 0 ? (
        <div className="rack-empty rack--below-transport">Type a progression to see it here.</div>
      ) : (
        <div className="rack rack--below-transport">
          {items.map((item, i) => (
            <ChordCard key={`${item.token}-${i}`} resolved={item.resolved} token={item.token} isActive={activeIndex === i} />
          ))}
        </div>
      )}
    </div>
  );
}
