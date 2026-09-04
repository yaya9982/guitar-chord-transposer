---
name: Chord Transposer
description: A pedalboard/effects-panel instrument for transposing chord progressions and comparing free vs. capo fingerings.
colors:
  panel-bg: "#1b1c1e"
  panel-raised: "#232527"
  panel-recessed: "#141516"
  panel-edge: "#37393c"
  panel-edge-bright: "#4a4d51"
  ink: "#e8e6df"
  ink-dim: "#8b8d90"
  ink-faint: "#5c5e61"
  led-green: "#3ddc84"
  led-amber: "#ffb020"
  led-red: "#ff5252"
  led-off: "#45484c"
  focus-ring: "#6fd0ff"
typography:
  display:
    fontFamily: "'Big Shoulders Stencil', 'Arial Narrow', sans-serif"
    fontSize: "clamp(1.6rem, 5vw, 2.4rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.06em"
  body:
    fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif"
    fontSize: "17px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.01em"
  label:
    fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif"
    fontSize: "0.7rem"
    fontWeight: 600
    letterSpacing: "0.12em"
  mono:
    fontFamily: "'JetBrains Mono', ui-monospace, monospace"
    fontWeight: 700
    fontSize: "1rem"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  pill: "999px"
spacing:
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
components:
  button-footswitch:
    backgroundColor: "{colors.panel-edge-bright}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 1.1rem"
  button-footswitch-on:
    backgroundColor: "{colors.panel-edge-bright}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 1.1rem"
  input-patch:
    backgroundColor: "{colors.panel-recessed}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "0.65rem 0.85rem"
  select-gear:
    backgroundColor: "{colors.panel-recessed}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0.4rem 1.6rem 0.4rem 0.5rem"
  readout-mono:
    backgroundColor: "{colors.panel-recessed}"
    textColor: "{colors.led-green}"
    typography: "{typography.mono}"
    rounded: "{rounded.sm}"
    padding: "0.35rem 0.65rem"
  panel-module:
    backgroundColor: "{colors.panel-bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "0.9rem"
---

# Design System: Chord Transposer

## Overview

**Creative North Star: "The Pedalboard"**

Every control reads as a literal piece of effects-pedal gear, not a SaaS settings panel: a brushed-graphite chassis, footswitch-shaped buttons, a rotary knob with a real angle, and LEDs that report true machine state rather than decorate. This is the first design pass on a project that previously had zero visual design (default browser chrome only), built code-led with no approved visual comp — the direction brief and the shipped CSS/JSX are the only sources of truth, and they agree closely.

The world is dark, dense, and technical: brushed-graphite panels layered with an actual SVG-noise grain texture (not a flat dark-mode gray), silkscreen-style condensed labels, and a strict green/amber/red LED law that never leaks into decoration. Depth comes from panel layering and inset "carved" shadows, not drop shadows floating above the page — surfaces read as recessed jacks and raised plates on one physical chassis, never as cards stacked in space.

**Key Characteristics:**
- Brushed-graphite chassis with a real grain texture, not a flat dark theme
- LED color is law: green/amber/red map 1:1 to chord state, never used decoratively
- Footswitch pill buttons and a rotary-knob stepper stand in for generic buttons/inputs
- Condensed stencil display face paired with a monospace numeric readout
- One authored motion moment: a played chord's diagram window glows in its LED color, nothing else animates

## Colors

A near-monochrome graphite palette with the LED trio as the only saturated color, reserved entirely for chord state.

### Primary
- **LED Green** (`#3ddc84`): the "shown-as-played" state — free-mode chords, the knob's position notch, the mono readout's digits, and the active-mode LED. This is the resting/default good state, so it appears most often of the three.
- **LED Amber** (`#ffb020`): the "capo-adjusted / sounds different than shown" state — capo-mode chord LEDs and diagram accents, and the capo-mode toggle's LED. Also the browser text-selection color, which doubles as an intentional easter-egg wink at the semantic law rather than a fourth meaning.
- **LED Red** (`#ff5252`): the "unsupported chord" state exclusively — the unsupported module's LED, its border, and its label text.

### Neutral
- **Panel Recessed** (`#141516`): the page background and every "carved-in" surface — text input, numeric readout, dropdowns, diagram window background.
- **Panel Base** (`#1b1c1e`) / **Panel Raised** (`#232527`): the chassis gradient for header and module panels (raised-to-base, top to bottom), giving each panel a subtle lit-from-above bevel.
- **Panel Edge** (`#37393c`) / **Panel Edge Bright** (`#4a4d51`): borders and the footswitch gradient; "bright" is reserved for hover states and the knob's metal highlight.
- **Ink** (`#e8e6df`) / **Ink Dim** (`#8b8d90`) / **Ink Faint** (`#5c5e61`): silkscreened text at three legibility tiers — primary labels, secondary/dim labels (tagline, control labels), and the faintest fretboard grid lines.
- **Focus Ring** (`#6fd0ff`): the one color outside the LED law, reserved for `:focus-visible` and dropdown focus borders so keyboard focus is never confused with a chord-state LED.

### Named Rules
**The LED Law.** Green, amber, and red exist nowhere in this system except as chord-state signals (shown-as-played / capo-adjusted / unsupported). No badge, chip, success toast, or hover state may borrow an LED color for a meaning outside this trio.

## Typography

**Display Font:** Big Shoulders Stencil (with Arial Narrow, sans-serif fallback)
**Body Font:** Barlow Condensed (with Arial Narrow, sans-serif fallback)
**Label/Mono Font:** JetBrains Mono, for numeric readouts only

**Character:** A stenciled, industrial display face over a workhorse condensed body — the pairing reads as equipment silkscreening, not editorial type. All three are self-hosted via `@fontsource` (no CDN or Google Fonts link), matching the product's no-network-dependency-at-runtime principle.

### Hierarchy
- **Display** (700, `clamp(1.6rem, 5vw, 2.4rem)`, line-height 1, letter-spacing 0.06em, uppercase): the panel-plate title only.
- **Body** (500, 17px, line-height 1.4): running/default text via `body`.
- **Chord Input** (600, 1.15rem, letter-spacing 0.02em): the patch-style text field, sized up from body to read as the primary instrument input.
- **Module Label** (700, 1.05rem): each chord card's LED + chord-name header.
- **Label** (600, 0.7–0.85rem, letter-spacing 0.04–0.14em, uppercase): control-module labels, tagline, footswitch text, field-row labels — the silkscreened-caption tier.
- **Mono Readout** (700, 1rem, tabular numerals): the transpose semitone readout — the only place numeric values, not labels, are displayed, kept monospaced so digits don't reflow the knob layout as they change sign/width.

### Named Rules
**The Two-Register Rule.** Only two type roles exist: the stenciled display face (one headline, once per screen) and condensed Barlow Condensed for everything else, switching to JetBrains Mono only for live numeric readouts. No third display-weight face is introduced for emphasis.

## Layout

A single-column instrument rig, capped at 900px and centered (`.rig`, `max-width: 900px`), reflecting a rack of gear rather than a responsive marketing grid. Vertical rhythm stacks fixed instrument modules top to bottom: panel-plate header → patch input + footswitch chord buttons → a two-up control strip (transpose module, mode module) → a rack grid of chord-diagram modules.

The chord rack is a `repeat(auto-fill, minmax(150px, 1fr))` CSS grid (130px minimum on the ≤480px breakpoint), so modules wrap responsively without a JS-driven breakpoint system. The control strip is a flex row of two modules (`flex: 1 1 220px` each) that stacks to a single column under 480px. Spacing runs on an approximate rem rhythm: 0.5rem (tight, within-control gaps), 0.75–1rem (module internal padding, rack gaps), 1.5–1.75rem (between major sections), 2rem (outer page padding on desktop, reduced to 1.25rem on mobile).

## Elevation & Depth

This is a carved-panel system, not a floating-card system: depth comes from inset shadows that read as recessed jacks/screens, plus a top-lit outer bevel on raised panels — never a shadow that lifts an element above the page.

### Shadow Vocabulary
- **Panel bevel** (`0 1px 0 rgba(255,255,255,0.04) inset, 0 6px 16px rgba(0,0,0,0.35)`): the header panel-plate — a bright top edge plus a soft drop into the page.
- **Recessed well** (`inset 0 2px 4px rgba(0,0,0,0.5)` to `inset 0 2px 6px rgba(0,0,0,0.6)`): text input, dropdowns, readout, diagram window — anything meant to read as carved into the chassis rather than sitting on it.
- **Footswitch press** (`0 2px 0 rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.06) inset` at rest, collapsing to `0 0 0` + `translateY(2px)` on `:active`): buttons physically depress when clicked.
- **LED glow** (`0 0 6px 1px` in the state's `-glow` rgba variant): the only shadow that is decorative-emissive rather than structural — it's how an LED reads as lit rather than painted.

### Named Rules
**The Carved, Not Lifted Rule.** Shadows describe material (a bevel, a recess, a switch throw) or a lit LED. Nothing in this system uses a shadow purely to imply a card floating above its neighbors.

## Shapes

Corner radius scales with a control's physical role rather than a flat global default: 4px (`sm`) for carved/recessed elements (input, readout, dropdown, gear-select) that sit flush in the chassis; 6px (`md`) for the header plate and control modules; 8px (`lg`) for chord-rack module panels, the largest discrete unit; and a full pill (`999px`) reserved for footswitch buttons, whose round-ended shape is what reads as "switch" rather than "button." The rotary knob and LEDs are true circles. Four corner "screws" (6px radial-gradient circles) are pinned to the header plate's corners as a literal hardware detail, not repeated elsewhere.

## Components

### Buttons (Footswitches)
- **Shape:** full pill (999px), 0.5rem 1.1rem padding; the transpose +/- stepper variant is smaller and 6px-radius instead of pill (`.footswitch--stepper`).
- **Default:** vertical gradient from panel-edge-bright to panel-bg, 1px panel-edge border, ink text, uppercase Barlow Condensed label (600, 0.85rem, letter-spacing 0.04em).
- **Active/On:** border recolors to the relevant LED color (`.footswitch--on` → green border in Free mode context) and the leading LED dot lights.
- **Hover:** border brightens to panel-edge-bright.
- **Active/press:** translates down 2px and its shadow collapses to flat, simulating a physical switch throw (120ms ease transition).
- **Disabled:** 0.35 opacity, not-allowed cursor.

### Inputs / Fields
- **Patch input** (chord text field): panel-recessed background, 1px panel-edge border, 4px radius, inset shadow (recessed well), 1.15rem semibold text.
- **Gear-select** (target key / capo fret dropdowns): native `<select>` with `appearance: none` and a custom inline-SVG chevron (no native OS chrome), panel-recessed background, 4px radius, inset shadow matching the patch input.
- **Focus:** all interactive elements get a 2px focus-ring-blue outline (`:focus-visible`, 2px offset) — the one place blue appears, deliberately outside the LED law so focus is never mistaken for chord state.
- **Disabled field row:** the whole row (label + control) drops to 0.35 opacity via `.field-row--dim` rather than styling the control alone.

### Cards / Containers (Module Panels)
- **Corner Style:** 8px radius for chord-rack modules; 6px for control-strip modules and the header plate.
- **Background:** grain texture layered under a raised-to-base vertical gradient (`var(--grain), linear-gradient(180deg, panel-raised, panel-bg)`) for header and chord modules; flat grain-over-panel-bg for control modules (no gradient, since they're smaller/flatter units).
- **Border:** 1px solid panel-edge; an unsupported chord module overrides this to led-red.
- **Internal Padding:** 0.75–1rem depending on module size.

### Chord Diagram Module (signature component)
Each resolved chord renders as a self-contained "rack module": an LED + chord-name header, an optional amber "sounds as X" sub-line when capo-adjusted, a recessed SVG diagram window, and its own Play footswitch. The diagram itself draws strings/frets in ink-faint, open/muted-string marks in ink-dim, and fretted-note dots in the module's semantic LED color (green or amber) via an `accent` prop threaded down to the SVG — so the fingering diagram and the LED header always agree on color. Playing a chord (via its own Play button, or the shared "Play All") triggers the diagram window's one authored motion: a 550ms glow pulse in that same LED color (`@keyframes led-pulse`), then settles back to its resting inset shadow. No other element in the system animates.

## Do's and Don'ts

### Do:
- **Do** reserve green/amber/red exclusively for shown-as-played / capo-adjusted / unsupported chord state, per the LED Law.
- **Do** use inset "recessed" shadows for anything meant to be carved into the panel (inputs, readouts, diagram windows), and only the footswitch's flat-press shadow for anything meant to be a physical switch.
- **Do** pair the stencil display face with condensed Barlow Condensed and JetBrains Mono for numerals — no other typeface families.
- **Do** give footswitch buttons a pill shape and a translateY(2px) press state; this is what distinguishes them from a generic button.
- **Do** layer the SVG grain texture under any new large panel surface (header-scale or module-scale); a flat dark-gray panel is not on-brand for this world.

### Don't:
- **Don't** use a drop shadow to lift a card above the page — this is a carved-chassis system, not a floating-card system (see The Carved, Not Lifted Rule).
- **Don't** introduce a fourth accent color, or reuse green/amber/red for anything other than chord state (success toasts, generic highlights, etc.).
- **Don't** use native OS `<select>` chrome; dropdowns get the gear-select treatment (appearance: none + inline SVG chevron).
- **Don't** add motion beyond the single LED-pulse-on-play moment; this system authors exactly one animation, not a general motion language.
