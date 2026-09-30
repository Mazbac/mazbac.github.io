---
name: "Mertcan Özbek Portfolio"
description: "A preserved violet terminal identity with a naturally scrolling career narrative and light/dark reading modes."
colors:
  bg: "#0a0910"
  bg-soft: "#0e0c17"
  surface: "#13101d"
  surface-2: "#181425"
  border: "#262038"
  border-strong: "#3a3054"
  text: "#e9e5f2"
  muted: "#9d94b3"
  faint: "#6b6380"
  accent: "#a78bfa"
  accent-strong: "#8b5cf6"
  accent-soft: "rgba(139, 92, 246, 0.14)"
  finale-action: "#7545db"
  action-text: "#fff"
typography:
  display:
    fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(2.1rem, 1.4rem + 2.2vw, 4.2rem)"
    fontWeight: 800
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(2rem, 4.2vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  chapter-title:
    fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.7rem, 2.6vw, 2.8rem)"
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  narrative-body:
    fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "1.15rem"
    lineHeight: 1.75
  terminal:
    fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Consolas, monospace"
    fontSize: "13.5px"
    lineHeight: 1.65
  button:
    fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Consolas, monospace"
    fontSize: "13px"
  chip:
    fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Consolas, monospace"
    fontSize: "12px"
rounded:
  control: "9px"
  button: "9px"
  container: "12px"
  hero: "14px"
  pill: "999px"
  square: "0"
spacing:
  tight: "4px"
  small: "8px"
  control-gap: "12px"
  card-gap: "18px"
  compact: "20px"
  gutter: "24px"
  mobile-column-gap: "32px"
  narrative-column-gap: "70px"
  chapter-gap: "90px"
components:
  button-primary:
    backgroundColor: "{colors.accent-strong}"
    textColor: "{colors.action-text}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "10px 18px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "10px 18px"
  button-finale:
    backgroundColor: "{colors.finale-action}"
    textColor: "{colors.action-text}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "10px 18px"
  chip:
    backgroundColor: "{colors.bg-soft}"
    textColor: "{colors.muted}"
    typography: "{typography.chip}"
    rounded: "{rounded.pill}"
    padding: "5px 11px"
  terminal:
    backgroundColor: "#0a0910"
    rounded: "{rounded.hero}"
  diagram:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.container}"
    padding: "30px"
---

# Design System: Mertcan Özbek Portfolio

## Overview

**Creative North Star: "The preserved terminal, opened into a career journey"**

The incumbent near-black and violet terminal/BIOS identity remains authoritative. The optional light mode uses lavender-tinted reading surfaces with a deeper violet accent while the boot and interactive terminal stay dark. Inter carries the human story; JetBrains Mono carries commands, metadata and technical evidence. Recomposition creates distinct reading moments without introducing a new brand.

The preserved boot, interactive terminal and portrait lead into spacious narrative chapters, optional native disclosures, a credential checkpoint, schematic personal builds and a single contact destination. The hero and footer no longer repeat its actions; the interactive terminal retains its own contact/CV commands as an intentional alternate register.

**Key Characteristics:**
- Preserved terminal identity and original skippable BIOS opening.
- Natural scrolling with a bounded desktop career stage.
- Readable summaries with native optional detail.
- Truthful portrait, credentials and explicitly conceptual diagrams.

Documentation scope: `css/styles.css`, its later cascade in `css/journey.css`, `index.html`, and generated markup in `js/app.js`, `js/content.js` and `js/journey.js`. `.impeccable` is ignored and local development-only; this root document is the portable system record.

## Colors

Violet illumination sits on purple-tinted near-black surfaces in dark mode; readable lavender neutrals carry the story. Light mode uses `#f6f4fb` for the page, white for raised surfaces, `#241f33` for text, and `#7c3aed` for links and accents. Its deep-violet filled actions use white text. All project diagrams and credentials follow the page theme; only the boot and terminal retain the dark console palette.

### Primary
- **Terminal Violet** (`accent`): prompts, links, summaries, focus outlines, chapter numbers, active progress segments and diagram connectors.
- **Action Violet** (`accent-strong`): filled action styling and its glow.
- **Soft Violet Wash** (`accent-soft`): incumbent accent backing, not a new full-page surface.
- **Finale Violet** (`finale-action`): the deeper email-action fill used in the closing contact area.

### Neutral
- **Terminal Black / Soft Black** (`bg`, `bg-soft`): page and boot ground; chip backing.
- **Console Surface / Raised Console** (`surface`, `surface-2`): portrait, facts, diagrams, credential checkpoint and terminal chrome.
- **Quiet / Strong Stroke** (`border`, `border-strong`): rules, container edges and stronger hover boundaries.
- **Pale Lavender / Reading Lavender** (`text`, `muted`): principal text and long-form supporting text.
- **Dim Console Ink** (`faint`): low-emphasis incumbent chrome, not the default narrative or evidence label color.
- **White Action Ink** (`action-text`): filled action labels.

Terminal traffic-light dots and magenta/cyan glitch fragments are preserved local effects, not secondary brand palettes. Credential issuer and contact-directory labels use reading lavender rather than dim console ink.

**The Readable Chapter Rule.** Active phase feedback changes the progress and chapter border, never the opacity of an entire readable chapter.

## Typography

**Display and body:** Inter with the system sans fallback stack in the frontmatter. **Terminal and technical labels:** JetBrains Mono with native monospace fallbacks. Both families are requested from Google Fonts in the existing HTML; no new font assets are introduced.

The bold human headline is distinct from restrained monospaced machinery. Narrative headline and chapter-title roles use balanced, tightly tracked type; the preserved name display keeps its existing glitch treatment.

### Hierarchy
- **Display:** the name, using the frontmatter display role; the BIOS finale has its own larger fluid name treatment (`clamp(2.4rem, 8vw, 5rem)`, weight `800`).
- **Headline:** opening thesis, career-stage heading, proof/workbench titles and closing invitation.
- **Chapter title:** four phase headings. Project titles use a smaller fluid range (`clamp(1.5rem, 2.1vw, 2.2rem)`, line-height `1.25`).
- **Narrative body:** introductory and closing prose, capped at `55ch`; phase summaries use line-height `1.65`. Introductory prose and phase summaries drop to `1rem` at the small-screen breakpoint.
- **Detail body:** about detail (`1.02rem`, line-height `1.75`), project detail (`0.93rem`, line-height `1.8`, maximum `65ch`), disclosure paragraphs and list items (line-height `1.75`).
- **Technical metadata:** role metadata (`0.85rem/1.8`), phase jumps and numbers (`0.85rem`), terminal title (`12px`), chips and compact evidence labels.
- **Orbit number:** tabular numerals (`clamp(4rem, 7vw, 6rem)`, line-height `1`) identify progress; they do not substitute for chapter headings.

## Layout

The hero and name block share a centered maximum width (`1120px`); narrative sections and footer use `1080px`, with horizontal gutters (`24px`). Desktop hero columns are `1.15fr / 0.85fr` with a `36px` gap. The opening uses `1.5fr / 1fr` and a `70px` gap; the career uses `1fr / 1.1fr` and a `90px` gap. Narrative sections, including the toolkit, have `90px` top and bottom padding on desktop. The closing contact section has `40px` below its last directory row before the footer surface; the footer has no extra margin above it.

Four career chapters run alongside a bounded sticky stage (`top: 105px`, `align-self: start`). Chapters use a desktop minimum height of `max(55vh, 36rem)`, approximately matching or exceeding the stage's intrinsic height, with natural document scrolling and real anchor links. On short desktop viewports (`700px` high or less) the stage is static so it cannot stick outside the visible area. No scroll hijacking or mandatory expanded content. The obsolete vertical timeline line is suppressed. Credentials are a two-column ruled list; the contact directory is a single-column ruled list. The workbench changes composition by project: automation hub with integrations beside its introduction, remote transmission route beside notes, and a full-width component spread below the PC-build introduction.

### Responsive behavior
| Threshold | Actual behavior |
| --- | --- |
| `1024px` and below | Header chapter indicator shows the number only; the reading-progress line stays visible. |
| `960px` and below | Hero becomes one column with portrait first (`280px` maximum); terminal minimum height becomes `320px`. Buttons/language control have a `44px` minimum height. Narrative sections use `60px` vertical padding. Opening/career become single-column with `32px` gaps; career stage is static, orbit is hidden, phase jumps form two columns, chapter minimum heights are removed. |
| `560px` and below | Portrait maximum is `200px`; its path caption is hidden; terminal body is fixed at `250px`. Hero gap/name-block top padding become `20px`. Narrative section padding becomes `48px`; toolkit, credentials, projects and contact directory stack. Each project introduces itself before its own diagram; integration hub, connection route and component board adapt individually. Chapter padding contracts to `26px 0 30px`. |
| `640px` and below | Logo text disappears; its terminal prompt remains. |
| `500px` and below | Navigation horizontal padding contracts to `16px` and gaps to `10px`. Chapter number and contact shortcut disappear; the index menu retains contact access, with full-size language and theme controls in the header. |

An incumbent `760px` rule also reduces the logo font to `13px`. Facts retain their incumbent maximum width (`420px`) after the `960px` rule. At small widths, schematic labels, chapter headings and tags wrap rather than force overflow.

### Reduced motion
The career stage is static even on desktop and chapter minimum heights are removed. All chapter text stays fully opaque. Smooth scrolling becomes automatic; glitch pseudo-elements disappear, caret/skip blinking stops and JS-gated reveals become immediately visible. Application guards suppress ambient/glitch animation and bypass the boot in reduced-motion mode. This does not imply every incumbent hover transition has been removed.

## Elevation & Depth

The preserved hero has genuine terminal depth: dark console chrome, an ambient shadow and violet glow. Background matrix texture remains subtle (`opacity: 0.10`), beneath the pointer-transparent CRT treatment. The fixed navigation uses blur (`12px`) and becomes more opaque after scrolling. Narrative depth is primarily tonal and ruled, not a repeated collection of floating cards.

### Shadow Vocabulary
- **Terminal:** `0 24px 60px rgba(0, 0, 0, 0.5), 0 0 48px rgba(139, 92, 246, 0.10)`.
- **Portrait:** `0 18px 48px rgba(0, 0, 0, 0.45)`; hover adds the existing violet glow.
- **Action:** `0 4px 18px rgba(139, 92, 246, 0.35)`; hover brightens and increases glow.
- **Shared glow:** `0 0 24px rgba(139, 92, 246, 0.35)`.

Credential and contact-directory rows have no hover shadow or lift in the finished cascade. Preserve that distinction from the dimensional hero.

## Shapes

The terminal window uses the `14px` hero radius; portrait, facts, framed icons, the automation hub, the remote route and the component board use the `12px` container radius; buttons and compact navigation controls use `9px`. Chips are fully rounded. Schematic nodes use square edges; the component board shares the rounded container radius of the other diagram cards. All list dividers, internal facts, menu rows, footer rules and the diagram airflow line are solid, one-pixel strokes. Native disclosure markers remain visible.

## Components

### Original boot and terminal
The full-screen BIOS overlay, log, centered name, “ACCESS GRANTED” finale and click/key skip remain preserved. One horizontal sync line traverses the BIOS before it closes to a narrow horizontal strip via `clip-path` (`0.2s`); the hero terminal settles into place by 8px without carrying the glitch onto the page. Both consoles share the same opaque `#0a0910` ground in either theme. The page becomes visible in about 1.4 seconds; terminal commands finish shortly afterward. Skip bypasses the glitch and fades quickly, even when requested immediately; reduced-motion users bypass the boot entirely. The overlay is decorative and marked `aria-hidden`.

The terminal retains traffic-light chrome, monospaced log, scrollable output and a transparent command input with violet caret. Desktop body padding is `20px 22px`, height range `360–430px`; responsive overrides are recorded above. The input is disabled/hidden during initialization and the output has `role="log"`. No conventional contact form is introduced.

### Portrait and provenance
`assets/headshot.jpg` is the existing **user-supplied portrait of Mertcan Özbek**, not a generated or stock asset. Its provenance is user supplied as confirmed for this pass; no photographer or license is inferred. The binary is untouched. HTML uses meaningful portrait alt text; the image is square, cover-cropped, with the incumbent saturation/contrast filter. The decorative caption path `~/assets/mertcan.jpg` is terminal styling, not the actual source path.

### Actions and navigation
Primary and ghost buttons use monospaced labels, a thin border, compact horizontal padding and slight hover lift (`-1px`); pressed controls scale (`0.97`). The closing email action uses the deeper finale fill. Focus-visible links, buttons and summaries get a violet outline (`2px`, offset `5px`). The fixed header (`58px`) is a status bar: logo, current chapter number/name, a thin scroll-progress line, a contact anchor where space permits, language and theme controls. The menu button opens the six-section index at every width: a compact dropdown below the header on screens `961px` and wider, a full-screen sheet on smaller ones. The theme icon is 44px and the menu has a labeled theme row whose state comes from NL/EN translations; first visit follows `prefers-color-scheme`, explicit choice persists, and the short theme fade is disabled for reduced motion.

### Native disclosures and toolkit
About, full role bullets, complete toolkit and project detail use actual `<details>/<summary>` elements, not simulated accordions. Summaries are monospaced violet, have `14px` vertical padding and a `44px` minimum height; an open summary has `12px` bottom separation. The toolkit uses a stronger summary (`1.1rem`, `24px` vertical padding), ruled edges and two columns, stacking on small screens. Native keyboard semantics and markers remain intact. Language rerender preserves open disclosure indices.

### Four-phase career stage
Foundations → operations → enterprise → ServiceNow specialization. The operations phase groups the overlapping OGD and Port of Rotterdam roles and explicitly explains their overlap, rather than inventing a sequential employment history. Summaries and tools are visible; detailed role bullets remain optional. The current phase updates a four-segment indicator, tabular chapter number, phase label, active anchor (`aria-current="step"`) and chapter border. Its selection threshold is the last chapter top above `55%` of viewport height. Every chapter remains readable at full opacity, active or not.

### Proof checkpoint
Real credential links form ruled rows on the console-surface section. Issuer and date metadata accompany the credential name and verification affordance. Hover changes emphasis without turning each row into a raised card. Contact rows use the same flat evidence-directory rhythm, with glyph icons hidden.

### Workbench diagrams
Three personal builds use distinct HTML/CSS schematics drawn from existing descriptions. Home Assistant is a branching hub connecting Node-RED, a smart thermostat and M5Stack voice control. Sunshine/Moonlight is a horizontal host-to-client path with configuration annotations, set in the same surface card as the automation hub. Mini-ITX is a wide component inventory board showing CPU, GPU, RAM, PSU and an airflow indicator. Every diagram has a visible **“Conceptual overview · based on project description”** caption (localized in Dutch). These are conceptual explanations, **not screenshots, production architecture evidence or client work**. No fabricated raster assets or performance metrics are implied. Each project keeps its actual name, one-line hook, tags and optional full description.

### Contact finale
A large human invitation, email and language-aware CV actions precede a single column with phone, LinkedIn and GitHub. Email appears once as the primary action, not again as a directory row. The heading is capped at `16ch`; the closing section begins with a violet rule. The footer keeps only the signature and return-to-top link. The terminal's `contact`, `cv` and `sudo hire-me` commands remain complete by deliberate exception. There is no invented form, submission flow or backend.

## Do's and Don'ts

### Do:
- **Do** preserve the existing terminal/BIOS identity, portrait and bilingual direct actions.
- **Do** use natural scrolling, bounded desktop stickiness and static mobile/reduced-motion chapters.
- **Do** keep role detail in native disclosures and every chapter fully readable.
- **Do** label schematic project illustrations as conceptual and retain truthful overlapping dates.
- **Do** keep credential and contact rows flat while preserving depth in the original hero.

### Don't:
- **Don't** replace the incumbent palette or type pairing as part of extending the narrative.
- **Don't** turn chapter progress into whole-chapter fading or scroll hijacking.
- **Don't** invent screenshots, asset provenance, results, client projects or a contact form.
- **Don't** copy incumbent decorative glyphs or low-emphasis chrome treatments into essential narrative labels.

Not canonized: incumbent decorative glyphs and dim terminal/footer chrome are recorded as existing artifact details, not mandatory patterns for future interfaces. The finish reviewer reports the project-label and whole-chapter-opacity findings fixed and desktop stickiness confirmed at `105px`; this pass records the finished system without reopening or repairing UI code.
