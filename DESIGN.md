---
name: Chord Transposer
description: A full-width, photographic music-reference tool for transposing chord progressions and comparing free vs. capo fingerings.
colors:
  bg: "#111214"
  surface: "#1b1c1f"
  surface-raised: "#232427"
  border: "#313337"
  border-bright: "#46484d"
  ink: "#f2f2f0"
  ink-dim: "#a3a5a9"
  ink-faint: "#6b6d71"
  accent: "#1ed760"
  accent-ink: "#05150a"
  led-green: "#1ed760"
  led-amber: "#ff9d2e"
  led-red: "#ff5252"
  led-off: "#46484d"
  focus-ring: "#6fd0ff"
typography:
  display:
    fontFamily: "'Open Sans', -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "normal"
  body:
    fontFamily: "'Open Sans', -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "'Open Sans', -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 700
    letterSpacing: "0.08em"
  mono:
    fontFamily: "'JetBrains Mono', ui-monospace, monospace"
    fontWeight: 700
    fontSize: "1rem"
rounded:
  sm: "2px"
  md: "4px"
spacing:
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "1.75rem"
components:
  button-footswitch:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0.6rem 1.1rem"
  button-footswitch-on:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.sm}"
    padding: "0.6rem 1.1rem"
  input-patch:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1rem"
  select-gear:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0.45rem 1.7rem 0.45rem 0.6rem"
  readout-mono:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.accent}"
    typography: "{typography.mono}"
    rounded: "{rounded.sm}"
    padding: "0.4rem 0.7rem"
  panel-module:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "1rem"
---

# Design System: Chord Transposer

## Overview

**Creative North Star: "The Real Music Site"**

This is a redesign, pinned directly by the user, that replaces the project's entire prior visual identity: first a generic centered-card AI-tool look, then a brushed-graphite "pedalboard/effects panel" skin the user rejected as looking "too AI" and "mechanical and dead." In their place is a full-width, flat, near-black page built to match the actual computed styles of Ultimate Guitar, Songsterr, and Spotify — sites this user researched directly rather than an abstract mood board. Nothing here is a metaphorical instrument or chassis; it is an ordinary, trustworthy web tool that happens to be about guitar chords.

The page is flat and solid at every surface: no gradients, no texture, no bevels. A single saturated accent — a Spotify-green flat fill — carries every primary interactive and "shown as played" state; everything else is near-black or a step of gray. Corners are sharp (2–4px) everywhere except genuinely circular controls (the knob, LED dots). A full-bleed photographic guitar hero, properly licensed and credited on the page, replaces any abstract panel art, anchoring the whole system in a real instrument rather than an illustrated one. The LED semantic law — green/amber/red mapped exclusively to chord state — is the one rule that survives unchanged from the prior world, because it was never the thing the user objected to.

**Key Characteristics:**
- Flat, solid near-black surfaces at every layer; zero gradients, zero texture, zero embossing
- One solid brand accent (`#1ed760`) as flat fill, never a tint or gradient
- Sharp 2–4px corners everywhere; no pill shapes except true circles (knob, LEDs)
- Single font family (Open Sans, every weight) across the entire UI; JetBrains Mono isolated to the transpose readout's digits
- A full-bleed, credited photographic hero replaces all illustrated/panel imagery
- LED color is law: green/amber/red map 1:1 to chord state, never used decoratively

## Colors

A near-monochrome near-black palette with one solid saturated accent and the LED trio, both used only for defined meanings — never as generic decoration.

### Primary
- **Signal Green** (`#1ed760`): the single brand accent — active/"on" footswitches (e.g. the Free-mode toggle), input focus borders, the knob's position notch, and the mono readout's digits. It is also `led-green` (see LED Law); the two roles are the same color because "primary accent" and "chord shown as played" are the same everyday-good state in this product.

### Neutral
- **Page Ground** (`#111214`): the page background and every "sunk" surface — the numeric readout, gear-select dropdowns, and diagram windows.
- **Surface** (`#1b1c1f`): the base panel fill for the chord input, control modules, and chord-rack cards.
- **Surface Raised** (`#232427`): default (non-active) footswitch buttons and the knob body.
- **Border** (`#313337`) / **Border Bright** (`#46484d`): panel and control borders; "bright" is reserved for hover states and the knob's ring.
- **Ink** (`#f2f2f0`) / **Ink Dim** (`#a3a5a9`) / **Ink Faint** (`#6b6d71`): text at three legibility tiers — primary labels and headings, secondary/dim labels (tagline, control labels, chevrons), and diagram fretboard lines.

### LED Trio (semantic, not palette)
- **LED Amber** (`#ff9d2e`): "capo-adjusted / sounds different than shown" — capo-mode chord LEDs, diagram accent dots, and the capo-mode toggle's LED.
- **LED Red** (`#ff5252`): "unsupported chord" exclusively — the unsupported module's LED, border, and label text.
- **Focus Ring** (`#6fd0ff`): the one color outside both the accent and the LED law, reserved for `:focus-visible`, so keyboard focus is never confused with chord state.

### Named Rules
**The LED Law.** Green, amber, and red exist nowhere in this system except as chord-state signals (shown-as-played / capo-adjusted / unsupported). No badge, toast, or hover state may borrow an LED color for a meaning outside this trio — including green, even though it doubles as the brand accent.

**The One Accent Rule.** Exactly one saturated brand color (`#1ed760`) exists outside the LED trio and focus ring. It is a flat fill only — never a gradient, tint, or tonal ramp — on primary/active interactive elements.

## Typography

**Display Font:** Open Sans (with -apple-system, Segoe UI, Helvetica, Arial fallback)
**Body Font:** Open Sans (same stack, all weights)
**Label/Mono Font:** JetBrains Mono, for the transpose readout's digits only

**Character:** One humanist grotesque, self-hosted via `@fontsource` at every weight the UI uses (400, 600, 700, 800), matching what Ultimate Guitar, Songsterr, and Spotify actually ship. There is no display face distinct from body type — weight and size carry hierarchy, not a second family. JetBrains Mono is the sole exception, isolated to live numeric output so digits don't reflow as they change sign or width.

### Hierarchy
- **Display** (800, `clamp(2rem, 4vw, 3rem)`, line-height 1.1): the hero page title only.
- **Body** (400, 16px, line-height 1.5): running/default text, the tagline.
- **Chord Input** (400, 1.1rem, line-height 1.3): the patch-style text field, sized up from body as the primary instrument input.
- **Module Label** (700, 1.1rem): each chord card's LED + chord-name header.
- **Label** (700, 0.72–0.75rem, letter-spacing 0.04–0.08em, uppercase): control-module labels, field-row labels.
- **Footswitch Label** (600, 0.9rem): button text.
- **Mono Readout** (700, 1rem, tabular numerals): the transpose semitone readout — the only place JetBrains Mono appears.

### Named Rules
**The One-Family Rule.** Open Sans is the only typeface used for every role — headline, body, label, button — at whatever weight the role needs. JetBrains Mono is carved out for exactly one purpose: the live numeric transpose readout. No third face is introduced for emphasis or display.

## Layout

A full-width page (`.page`, `max-width: 1600px`, centered) — deliberately not locked to a small centered card, refusing both the prior pedalboard-rig layout and the generic-AI-tool centered-card layout before it. A full-bleed photographic hero spans the entire viewport width with a dark scrim, carrying the title, tagline, and photo credit. Below it, content sits in a generously wide column (`clamp(1rem, 4vw, 3rem)` side padding) stacked top to bottom: chord text input + click-to-add chord buttons → a two-up control strip (transpose module, mode module, `flex: 1 1 240px` each) → a "Play all" button → the chord-diagram rack.

The chord rack is a `repeat(auto-fill, minmax(160px, 1fr))` CSS grid (140px minimum under 480px), so cards wrap responsively without JS breakpoints. The control strip stacks to a single column under 480px. Spacing runs a rem rhythm: 0.5rem (tight/within-control gaps), 0.75–1rem (module internal padding, rack gaps), 1.5–1.75rem (between major sections), and the hero/content side padding scales with viewport via `clamp()`.

## Elevation & Depth

Flat by default: no shadows anywhere on static surfaces. Panels, buttons, and inputs are distinguished from their background by a 1px border and a fill-color step (bg → surface → surface-raised), not by elevation. The only shadow in the system is the LED glow (`0 0 6px 1px` in the state's glow color) on lit LED dots — an emissive effect describing a lit indicator, not a lifted card — and the one authored motion moment described below.

### Named Rules
**The Flat-By-Default Rule.** No `box-shadow` is used to lift any card, panel, button, or input above the page. Depth, where it exists at all, is a border and a fill-step, or (for LEDs only) an emissive glow.

## Shapes

Corners are sharp and near-square throughout: 2px (`sm`) for buttons, dropdowns, and the numeric readout; 4px (`md`) for the chord input, control modules, and chord-rack panels. No pill shapes exist anywhere in the button system — a deliberate reversal of the prior pedalboard world's pill-shaped footswitches. The rotary transpose knob and the LED dots are the only true circles in the system, reserved for controls that are physically round in real life.

## Components

### Buttons (Footswitches)
- **Shape:** 2px radius, 0.6rem 1.1rem padding (`.footswitch`); no pill variant.
- **Default:** flat `surface-raised` fill, 1px `border`, ink text, 600-weight 0.9rem label.
- **Hover:** border brightens to `border-bright`, fill shifts to `border`.
- **Active/press:** fill shifts to `border-bright`.
- **On/active state** (`.footswitch--on`, e.g. the Free-mode toggle): flat `accent` fill, `accent-ink` text — the one place the brand accent appears as a full button fill rather than an outline or text color.
- **Disabled:** 0.4 opacity, not-allowed cursor.

### Inputs / Fields
- **Patch input** (chord text field): `surface` background, 1px `border`, 4px radius, no inset shadow; border recolors to `accent` on focus.
- **Gear-select** (target key / capo fret dropdowns): native `<select>` with `appearance: none` and a custom inline-SVG chevron, `bg` background, 2px radius, border recolors to `accent` on focus.
- **Focus:** all interactive elements get a 2px `focus-ring` (`#6fd0ff`) outline via `:focus-visible`, 2px offset — kept outside both the accent and LED colors so keyboard focus is never mistaken for chord state.
- **Disabled field row:** the whole row (label + control) drops to 0.35 opacity via `.field-row--dim`.

### Cards / Containers (Module Panels)
- **Corner Style:** 4px radius, uniform across control modules and chord-rack modules (no radius-by-size tiering).
- **Background:** flat `surface` fill, no gradient, no texture.
- **Border:** 1px solid `border`; an unsupported chord module overrides this to `led-red`.
- **Internal Padding:** 1rem (rack/control modules).

### Chord Diagram Module (signature component)
Each resolved chord renders as a self-contained card: an LED + chord-name header, an optional amber "sounds as X" sub-line when capo-adjusted, an SVG diagram window on the flat `bg` ground, and its own Play footswitch. The diagram draws strings/frets in `ink-faint`, open/muted-string marks in `ink-dim`, and fretted-note dots in the module's semantic LED color (green or amber) via an `accent` prop threaded to the SVG — so the fingering diagram and the LED header always agree on color. Playing a chord triggers the one authored motion in the system: a 550ms glow pulse on the diagram window in that same LED color (`@keyframes led-pulse`), settling back to flat. No other element animates.

## Do's and Don'ts

### Do:
- **Do** reserve green/amber/red exclusively for shown-as-played / capo-adjusted / unsupported chord state, per the LED Law.
- **Do** keep every surface flat — solid fill plus a 1px border — with no gradients, texture, or drop shadows, per the Flat-By-Default Rule.
- **Do** use Open Sans for every text role at whatever weight the role needs; reserve JetBrains Mono for the live numeric transpose readout only.
- **Do** keep corners sharp (2–4px); reserve true circles for controls that are physically round (the knob, LED dots).
- **Do** use the full-bleed, credited photographic hero as the system's imagery convention — real photography, not illustration or abstract panel art.

### Don't:
- **Don't** reintroduce a pill-shaped button or any rounded shape beyond 4px; the prior pedalboard world's pill footswitches are explicitly superseded, not an option to fall back to.
- **Don't** add a metallic gradient, bevel, grain texture, or inset "carved" shadow to any surface; this build's whole point was removing that identity.
- **Don't** introduce a fourth accent color, or reuse green/amber/red for anything other than chord state (success toasts, generic highlights, etc.).
- **Don't** lock content to a small centered card; the layout is deliberately full-width.
- **Don't** add motion beyond the single LED-pulse-on-play moment; this system authors exactly one animation, not a general motion language.
