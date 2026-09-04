const COMMON_CHORDS = ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim'];

export default function ChordInput({ value, onChange }) {
  const append = token => {
    const next = value.trim().length > 0 ? `${value.trim()} ${token}` : token;
    onChange(next);
  };

  return (
    <div>
      <input
        type="text"
        className="patch-input"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="e.g. G D Em C"
      />
      <div className="chord-buttons">
        {COMMON_CHORDS.map(c => (
          <button key={c} type="button" className="footswitch" onClick={() => append(c)}>{c}</button>
        ))}
      </div>
    </div>
  );
}
