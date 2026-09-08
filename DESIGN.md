---
version: 1.0.0
name: FreeIQExam-Hybrid-Design-System
description: >
  A hybrid design system combining the precision and developer-grade polish of Vercel (Geist monochrome, 1px hairlines, subtle mesh gradients, technical monospace badges),
  the cinematic white-space, bold typography, and smooth interaction feel of Apple (SF-style tracking-tight display headlines, full pill CTAs, tactile spring transitions),
  and the warm, distraction-free content clarity of Notion (calm background surfaces, structured callouts, readable editorial layouts for test questions and score charts).

sources:
  apple: ./apple/DESIGN.md
  vercel: ./vercel/DESIGN.md
  notion: ./notion/DESIGN.md

design_philosophy:
  vercel_pillar:
    role: "Structural Precision & Tech Authority"
    rules:
      - Deep true-black dark canvas (#09090b / #000000) and crisp clean-white light canvas (#fafafa / #ffffff).
      - Strict 1px hairline borders (border-slate-200 dark:border-zinc-800/80) defining cards and sections.
      - Monospace technical labels (font-mono uppercase text-xs) for psychometric stats (SEM, θ-score, percentile, item counter).
      - Subtle mesh/gradient accents reserved strictly for high-impact focal points (Hero H1 highlight, Start CTA, Final Score Badge).
  apple_pillar:
    role: "Cinematic Polish & Tactile Interaction"
    rules:
      - Generous whitespace around content blocks — let the matrix puzzles breathe.
      - Bold display headlines with tight negative letter-spacing (tracking-tight to tracking-tighter).
      - Smooth pill-shaped primary action buttons (rounded-full) with subtle hover scale (scale-[1.015]) and active feedback.
      - Ultra-fluid 200ms ease-out transitions on all interactive states. No jarring shifts.
  notion_pillar:
    role: "Distraction-Free Focus & Cognitive Calm"
    rules:
      - Test taking environment (/test) must eliminate all promotional noise, banners, and sidebar distractions.
      - Clear, readable callout cards (bg-slate-50 dark:bg-zinc-900/60 border rounded-xl p-4) for exam instructions and methodology notes.
      - Elegant, scannable data tables for IQ score charts and age distributions.

color_tokens:
  canvas:
    light: "#fafafa"
    dark: "#09090b"
  surface:
    light: "#ffffff"
    light_muted: "#f4f4f5"
    dark: "#121216"
    dark_muted: "#18181c"
  border:
    light: "#e4e4e7"
    light_soft: "#f1f1f4"
    dark: "#27272a"
    dark_soft: "#1f1f23"
  ink:
    primary_light: "#09090b"
    primary_dark: "#f8fafc"
    secondary_light: "#52525b"
    secondary_dark: "#a1a1aa"
    muted_light: "#71717a"
    muted_dark: "#71717a"
  accent:
    blue: "#2563eb"
    blue_hover: "#1d4ed8"
    indigo: "#4f46e5"
    violet: "#7c3aed"
    gradient_cta: "linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #7c3aed 100%)"
    gradient_text: "linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #a855f7 100%)"
  status:
    success: "#10b981"
    warning: "#f59e0b"
    error: "#ef4444"

typography_rules:
  headings:
    family: "Outfit, Inter, system-ui, sans-serif"
    weights: "600 (semi-bold) or 700 (bold)"
    letter_spacing: "tracking-tight"
  body:
    family: "Inter, system-ui, sans-serif"
    weights: "400 (regular) or 500 (medium)"
    line_height: "leading-relaxed (1.65)"
  monospace_stats:
    family: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    weights: "500 (medium) or 600 (semi-bold)"
    letter_spacing: "tracking-wider uppercase"

component_guidelines:
  header:
    style: "Vercel sticky glassmorphic navigation bar (backdrop-blur-md bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800/80)"
    elements: "Logo with subtle brain/matrix glyph, Clean nav links, Theme toggle (sun/moon), Pill 'Start Test' CTA"
  hero_section:
    style: "Apple-style monumental hero centered layout with Vercel gradient kicker badge ('2026 STANDARDIZED FLUID INTELLIGENCE EXAM')"
    elements: "H1 with gradient text span, Subtitle addressing user friction ('Instant Results • No Email • 100% Free'), Large pill CTA, 4 micro-trust guarantee bullets"
  value_cards:
    style: "Vercel 1px hairline border cards with Notion icon badges and Apple typography"
    layout: "4-column responsive grid (1 col mobile, 2 col tablet, 4 col desktop)"
  test_workspace:
    style: "Notion distraction-free canvas with Vercel item progress tracker"
    elements: "Sticky header with live countdown timer (25:00) and item dot matrix (1-25), Centered 3x3 matrix puzzle viewport, 6-option answer selector with tactile hover/select states"
  results_report:
    style: "Apple executive summary card with Vercel data metrics"
    elements: "Prominent IQ Score badge (SD 15 scale), Bell Curve normal distribution visualizer with user's position pinned, Cognitive domain breakdown bars, Clear percentile statement ('Top 8.2% of population'), Instant PDF print/share button"
  faq_section:
    style: "Notion collapsible toggle accordions with crisp Vercel borders and FAQPage Schema markup"

animation_spec:
  duration_fast: "150ms"
  duration_normal: "200ms"
  duration_slow: "350ms"
  easing: "cubic-bezier(0.16, 1, 0.3, 1)"
  button_tap: "transform: scale(0.98)"
  card_hover: "transform: translateY(-2px); border-color: rgba(59, 130, 246, 0.4)"
---
