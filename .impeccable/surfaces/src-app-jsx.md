---
version: 1
slug: "src-app-jsx"
primary_target: "src/App.jsx"
related_targets: []
---

## Direction contract

THESIS: Every control is a literal piece of pedalboard gear — a knob, a footswitch, an LED status light — refusing the flat card-and-dropdown SaaS-tool layout every generic "chord app" ships.

OWN-WORLD: Brushed dark-graphite panel ground; LED colors are a semantic law reserved per state (green = resolved/supported chord, amber = capo-adjusted/sounds different than shown, red = unsupported) and never decorative elsewhere; chunky knob/footswitch-styled controls for steppers and toggles; condensed stencil/silkscreen-style labels paired with a monospace numeric readout for semitone count and capo fret.

STORY: The player understands this is precision gear, not a toy; trusts that every dial and light corresponds to a real state; types or picks a progression, turns the transpose knob or hits the capo footswitch, reads the panel, hits play.

FIRST VIEWPORT: A silkscreened panel-plate header at top. Input row styled as a patch-style text field with footswitch-shaped common-chord buttons beneath it. A control strip holding the transpose stepper (knob-styled, monospace readout) and the free/capo mode toggle (footswitch-styled, LED-lit) plus capo-fret control when active. Below, chord results render as individual module panels, each an LED-lit diagram window with its own footswitch play button.

FORM: Pedalboard / effects panel — grounded candidate #1 of 7 derived directions (pedalboard panel, tab-chart notation, tuner LCD, circuit board, hardshell case interior, guitar-body wood grain, road case). Chosen as IMPECCABLE'S PICK over the dice-assigned direction (hardshell case interior, candidate #5). Seed key: 2fbcd527.

Raises (donated from declined/competitive challengers dealt against the assigned direction, carried forward into this chosen form):
- FROM variety-telop-caption-field (declined): state changes communicate via LED brightness/glow pulse, never by shifting layout position.
- FROM notation-diagram-systems-orienteering-map (competitive): the panel's silkscreened structure (labels, fret grid) stays visually fixed and permanent; only the lit LEDs/dots for the current chord are the dynamic, per-chord overlay.
- FROM textiles-weave-drape-fashion-drawcord-transforming-cape (declined) + medium-native-crt-arcade-pixel-glow (declined): LED/accent color is a strict semantic law — one color per state, reserved exclusively, never reused decoratively.
- FROM signals-instruments-night-flight-six-pack (declined): each control cluster (transpose, mode, capo) reads as one self-contained instrument module with one truth, not a blended toolbar row.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
