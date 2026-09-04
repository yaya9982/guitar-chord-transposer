# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React + Vite. No backend — the app is entirely client-side. Local only for now (run via dev server / `npm run dev`); no static-host deployment planned at this time.

## Users

Guitar players who have a chord progression (from a song, tab, or their own writing) and need it in a different key. They already know their chord shapes; what they need is to see and hear the progression transposed, and to decide whether to play it with full/barre shapes at the new key or with a capo and easier open shapes.

## Product Purpose

Takes a typed or picked chord progression and transposes it up or down (by semitone or target key), then shows playable fingerings and lets the user hear the result. A toggle switches between "free" (play the actual transposed chords, open or barre shapes as needed) and "capo" mode (auto-suggests the capo fret that lets the most chords be played as easy open shapes, with a manual override). Success = the user can quickly find a comfortable way to play a progression in a key it wasn't originally written in.

## Positioning

Unlike a static transposition chart or a chord-image lookup site, this computes real fingerings from music theory and renders/synthesizes them on the fly — so it works for any key and any capo position, not just a pre-drawn set, and it specifically solves the "should I barre this or capo it" decision by scoring capo positions for playability.

## Operating Context

Used at an instrument, mid-practice: type or click in a progression, nudge the transposition, glance at the diagrams, tap play to hear a chord or strum the whole progression, try free vs. capo mode to see which is easier to play.

## Capabilities and Constraints

- Standard 6-string guitar, standard tuning only (no alternate tunings, no other instruments, at least for v1).
- Chord input: text box (e.g. "G D Em C", "Am7", "G/B") plus click-to-add common-chord buttons.
- Transposition: semitone +/- nudge and a target-key dropdown, both driving the same shift.
- Capo mode: auto-suggested best capo fret (0-7) scored by how many chords land on easy open shapes, manually overridable.
- Chord voicing data: bundled local dataset (sourced from the open, MIT-licensed tombatossals/chords-db, covering all 12 roots × ~40 qualities, including altered/extended dominants). The chord-symbol parser's alias table maps every one of the dataset's qualities to a real chord-symbol spelling, so any chord the dataset can voice, the parser can recognize — verified with a coverage check (0 of 480 root×quality combinations missing). Only genuinely unparseable input (typos, non-standard notation) is reported as unsupported.
- Diagrams are drawn as SVG from fingering data (not scraped images), so any transposition/capo combination can always be rendered.
- Audio is synthesized in-browser via the Web Audio API (Karplus-Strong plucked-string per string, strummed with a slight offset) — no audio sample files.
- No user accounts, no persistence/saving of progressions (open question — not decided for v1; revisit if the user wants to save/share progressions later).

## Evidence on Hand

None. No existing name, logo, brand assets, or reference content — this is a from-scratch personal tool.

## Product Principles

1. Never dead-end: every quality the bundled dataset actually has, the chord-symbol parser must recognize — a chord only comes back unsupported when the input itself can't be parsed, never because a valid quality wasn't wired up.
2. Data-driven, not image-driven: every diagram and sound is generated from fingering/pitch data so any key/capo combination just works.
3. Free vs. capo is a first-class choice, not an afterthought — the app should make the trade-off (barre effort vs. capo simplicity) visible and easy to compare.
4. Client-side only: no backend, no accounts, no network dependency at runtime.
