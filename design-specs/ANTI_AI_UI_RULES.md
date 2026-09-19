# Anti-AI-Slop & Anti-Vibe-Coding Master Rules
# Authoritative Quality Gate for all AI Coding Agents (Antigravity / Claude / Cursor / Codex)
# Core Principle: Eliminate generic AI signatures and enforce deliberate, human-studio craftsmanship.

================================================================================
THE CORE LAW
================================================================================
> **If a visitor can glance at the page for two seconds and recognize it as "AI-generated", the design has failed.**
> Do not allow the AI to default to the statistical average of its training data. Every visual choice must be intentional, product-specific, and governed by explicit constraints.

================================================================================
1. THE 20 FORBIDDEN AI SIGNATURES (NEVER SHIP THESE)
================================================================================

| # | Forbidden AI Signature | Why It Looks AI-Generated | The Human-Designed Solution |
|---|---|---|---|
| 1 | **Purple/Indigo/Pink Gradients** (`#6366f1` $\rightarrow$ `#8b5cf6` $\rightarrow$ `#ec4899`) | Most ubiquitous AI default cliché. | Anchor on Monochrome Duet (Black/White/Zinc) + single Action Blue (`#0066cc`/`#2997ff`). |
| 2 | **Unstyled Inter Default Everywhere** | Identical font weights and scale across all components. | Explicit font pairing & engineered scale (display face + clean body + mono captions). |
| 3 | **Mechanical Radius (`rounded-2xl` on everything)** | Cards, buttons, inputs, modals all using 16px. | Radius hierarchy: Base flat, cards 16px–20px, inputs 8px, buttons pill/8px. |
| 4 | **Centered Hero + Giant Title + 2 Buttons** | Stock AI template layout. | Product-specific thesis: interactive preview, editorial split, or cognitive matrix hero. |
| 5 | **Identical 3-Card Feature Grids** (`[icon] [title] [2 lines]`) | Lazy AI layout pattern repeated across sections. | Diverse composition: asymmetric 2+1, timeline, horizontal sequence, interactive slider. |
| 6 | **Glassmorphism + Neon Aurora Blobs** (`backdrop-blur` + `blur-3xl`) | Overused dark-mode filler creating visual noise. | Solid surfaces with crisp 1px hairlines (`rgba(255,255,255,0.08)`) and top bevel highlights. |
| 7 | **Excessive Floating Shadows** (`shadow-2xl` on every card) | Makes the entire page float without grounding. | Flat surfaces with 1px hairline borders; shadows reserved for floating modals only. |
| 8 | **Generic Line Icon Grid Overload** | Decorative Lucide icons with no semantic meaning. | Purposeful SVG illustrations or data glyphs that communicate real instrument metrics. |
| 9 | **Generic AI Marketing Slogans** ("Unlock your potential", "Supercharge") | Interchangeable SaaS template copy. | Plain, evidence-backed, clinical language with specific scientific metrics. |
| 10 | **Fake Social Proof** ("Trusted by 5,000+ teams" with dummy logos) | Fabricated credibility destroys trust. | Real clinical instrument citations (WHO ASRS v1.1, PHQ-9, GAD-7, Ishihara). |
| 11 | **Uniform Section Spacing (`py-20` on every section)** | Mechanically spaced blocks with no dynamic tempo. | Varied section rhythms: `py-16`, `py-24`, `py-28`, with alternating parchment backgrounds. |
| 12 | **Same Container Max-Width Everywhere (`max-w-7xl`)** | Monotonous grid box. | Varied widths: `max-w-4xl` for editorial text, `max-w-7xl` for bento grids, `100vw` for carousels. |
| 13 | **Gradient-Filled Headline Words** (`background-clip: text`) | Classic 2023 vibe-coded gimmick. | Crisp, solid high-contrast typography in ink-primary (`#09090b` light / `#ffffff` dark). |
| 14 | **Universal Fade-Up Animation** (`opacity: 0` $\rightarrow$ `translateY(20px)`) | Stock animated template feel. | Intentional motion: tactile press feedback, layout tab sliding, scroll-linked reels. |
| 15 | **`hover:scale-105` Applied Everywhere** | Every button, card, and image growing on hover. | Subtle `scale-[1.01]` on hover; tactile `scale(0.97)` on `:active` press. |
| 16 | **Everything Boxed as a Card** (Nested cards inside cards) | Over-fragmented layout creating boxed cage feeling. | Direct typography on canvas, divider lines, and alternating section surfaces. |
| 17 | **Tilted 3D Dashboard Mockups** (`rotateY(-5deg)`) | Generic SaaS placeholder trope. | Real, functional interactive tool previews rendered natively in browser. |
| 18 | **Unrequested Dark Mode with Purple Glow** | Default AI black + neon aesthetic. | Full-fidelity Light and Dark modes with clinical authority and high contrast. |
| 19 | **Over-Engineered Symmetry** | Everything centered and identically proportioned. | Controlled intentional asymmetry: editorial sidebars, split heroes, data callouts. |
| 20 | **Zero Error / Empty State Design** | AI models only generate the "happy path". | Fully engineered empty states, loading skeletons, and validation error messages. |

================================================================================
2. THE 6-LAYER ANTI-SLOP ARCHITECTURE
================================================================================

### Layer 1: Explicit Visual Identity
Never let the AI generate ad-hoc styles. All styling must resolve to tokens:
- Primary Canvas: `#ffffff` (Light) / `#000000` (Dark)
- Parchment Alternation: `#f5f5f7` (Light) / `#090a0f` (Dark)
- Action Accent: Single Action Blue `#0066cc` / `#2997ff`
- Hairlines: `1px solid #e4e4e7` (Light) / `1px solid rgba(255,255,255,0.08)` (Dark)

### Layer 2: Component & Radius Hierarchy
- **Base Canvas & Sections**: `rounded-none` (0px)
- **Feature Cards**: `rounded-2xl` (16px–20px) with 1px border
- **Inputs & Search Bars**: `rounded-lg` (8px–10px)
- **Primary CTAs**: `rounded-full` (9999px pill)
- **Badges & Keycaps**: `rounded-md` (4px–6px)

### Layer 3: Product-Specific Hero Architecture
The hero must communicate **Cognitive Assessment & Scientific Rigor**:
- Interactive demo puzzle stepper with real instant feedback.
- Clinical trust dock displaying validated protocols (WHO ASRS, PHQ-9, Ishihara).
- Dual pill CTAs (High intent Blue + Translucent Secondary).

### Layer 4: Asymmetric & Diverse Layout Composition
Replace 3-card grids with:
- **100vw Full-Bleed Interactive Card Carousel** (Raycast multi-modal grab drag physics).
- **Asymmetric Bento Grids** (Large featured tool + 2 supporting diagnostic drills).
- **Clinical Table Matrix** with scientific metadata chips.

### Layer 5: Deliberate Typography Scale
- **Display H1**: `48px–64px` (`text-4xl sm:text-5xl md:text-6xl`), weight 800, tight `-0.025em` tracking.
- **Section H2**: `32px–44px`, weight 700, tracking `-0.02em`.
- **Body Standard**: **17px** (`text-[17px]`), line-height 1.6, weight 400.
- **Monospace Eyebrows**: `font-mono text-xs uppercase tracking-widest text-zinc-500`.

### Layer 6: Meaningful Motion & Accessibility
- **The 250ms Rule**: UI transitions must finish in 120ms–250ms with `cubic-bezier(0.23, 1, 0.32, 1)`.
- **Tactile Button Grammar**: `active:scale-[0.97]` on all pressable controls.
- **Reduced Motion**: Strictly honor `@media (prefers-reduced-motion: reduce)`.

================================================================================
3. MANDATORY ANTI-SLOP AUDIT CHECKLIST (PRE-DELIVERY GATE)
================================================================================
Before presenting ANY frontend code, the AI agent MUST verify:

- [ ] ❌ Are there any purple/indigo gradients or aurora blobs?
- [ ] ❌ Are any headline words gradient-clipped?
- [ ] ❌ Is `rounded-2xl` blindly applied to every element?
- [ ] ❌ Is the hero a generic centered template with fake slogans?
- [ ] ❌ Are multiple sections using identical 3-card grids?
- [ ] ❌ Are cards nested inside cards with double borders?
- [ ] ❌ Does any text fall below 13px?
- [ ] ❌ Are all buttons tactile (`active:scale-[0.97]`) with tap targets $\ge$ 44px?
- [ ] ❌ Does the layout work seamlessly at 375px, 768px, 1024px, 1440px?
- [ ] ❌ Is `prefers-reduced-motion` respected in CSS?
