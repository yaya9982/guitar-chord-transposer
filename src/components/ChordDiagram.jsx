const STRING_COUNT = 6;
const FRET_COUNT = 4;
const WIDTH = 120;
const HEIGHT = 150;
const LEFT = 20;
const TOP = 30;
const STRING_GAP = (WIDTH - LEFT * 2) / (STRING_COUNT - 1);
const FRET_GAP = (HEIGHT - TOP - 10) / FRET_COUNT;

export default function ChordDiagram({ voicing }) {
  const { frets, fingers, baseFret, barres } = voicing;

  const stringX = i => LEFT + i * STRING_GAP;
  const fretY = f => TOP + f * FRET_GAP;

  return (
    <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
      {baseFret === 1 ? (
        <rect x={LEFT - 2} y={TOP - 4} width={WIDTH - LEFT * 2 + 4} height={4} fill="currentColor" />
      ) : (
        <text x={LEFT - 12} y={TOP + FRET_GAP / 2} fontSize="10" fill="currentColor">{baseFret}fr</text>
      )}

      {Array.from({ length: FRET_COUNT + 1 }, (_, f) => (
        <line key={`fret-${f}`} x1={LEFT} y1={fretY(f)} x2={WIDTH - LEFT} y2={fretY(f)} stroke="currentColor" strokeWidth={1} />
      ))}

      {Array.from({ length: STRING_COUNT }, (_, i) => (
        <line key={`string-${i}`} x1={stringX(i)} y1={TOP} x2={stringX(i)} y2={fretY(FRET_COUNT)} stroke="currentColor" strokeWidth={1} />
      ))}

      {barres.map(fret => {
        const relativeFret = fret - baseFret + 1;
        const barredStrings = frets
          .map((f, i) => (f === fret ? i : null))
          .filter(i => i !== null);
        if (barredStrings.length < 2) return null;
        const first = Math.min(...barredStrings);
        const last = Math.max(...barredStrings);
        return (
          <rect
            key={`barre-${fret}`}
            x={stringX(first) - 5}
            y={fretY(relativeFret - 1) + FRET_GAP / 2 - 5}
            width={stringX(last) - stringX(first) + 10}
            height={10}
            rx={5}
            fill="currentColor"
          />
        );
      })}

      {frets.map((fret, i) => {
        const x = stringX(i);
        if (fret === -1) {
          return <text key={`mark-${i}`} x={x - 4} y={TOP - 10} fontSize="12" fill="currentColor">x</text>;
        }
        if (fret === 0) {
          return <circle key={`mark-${i}`} cx={x} cy={TOP - 12} r={4} fill="none" stroke="currentColor" strokeWidth={1.5} />;
        }
        const relativeFret = fret - baseFret + 1;
        const y = fretY(relativeFret - 1) + FRET_GAP / 2;
        return (
          <g key={`mark-${i}`}>
            <circle cx={x} cy={y} r={6} fill="currentColor" />
            {fingers[i] > 0 && (
              <text x={x - 3} y={y + 4} fontSize="9" fill="var(--diagram-bg, white)">{fingers[i]}</text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
