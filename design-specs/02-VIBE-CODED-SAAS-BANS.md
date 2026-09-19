# Human Studio Standards & Anti-Vibe-Code Manifesto
# Derived from: Kole Jain (kolejain.com/resources) & Human Studio Craft Standards

The single rule that matters most:
> **If a stranger could glance at the page for two seconds and say "an AI made this," you have failed, regardless of whether the code works.** Distinctiveness and restraint are the job, not a bonus.

---

## 1. Hard Bans (Never Ship These)

These are the unmistakable fingerprints of a vibe-coded site. Do not use them.

1. **No purple/violet/indigo as the primary brand color.**
   - Avoid `#7c3aed`, `#8b5cf6`, `#a855f7`, `#6366f1` and their neighbors as dominant hues.
2. **No purple-to-blue or purple-to-pink gradients** anywhere — backgrounds, buttons, or text.
3. **No gradient-filled headline words** (e.g. one word in the headline tinted with a color gradient while the rest is dark).
4. **No meaningless stat blocks** — the "25% · 95% · 2025" row of giant numbers with vague labels. Only show real, sourced data.
5. **No emoji inside headings or section titles** (🚀 ✨ 🔒 etc.). Use real iconography instead, and use it sparingly.
6. **No "Why Choose [Brand]?" sections.** Same for "Transform your X into Y," "Start it. Build it. Launch it." and other interchangeable SaaS slogans.
7. **No glassmorphism by default** — frosted translucent cards with heavy blur and soft glow.
8. **No pill-badge clutter** ("99.9% Uptime", "GDPR Compliant", "24/7 Support 🔒") stacked under the hero.
9. **No default centered-everything layout** with a single column of centered text from top to bottom. Use real composition.
10. **No raw system font / unstyled Inter** as the entire type system.
11. **No rainbow of soft drop shadows** on every card. Shadow is an accent, not a texture.

---

## 2. Intentional Typography

Type carries personality. Never leave it as a default.

- **Pair two faces with intent**: a characterful display/heading face used with restraint, plus a clean, legible body face.
- **Set a real type scale**: Define explicit sizes, weights, line-heights, and letter-spacing.
  - Headlines: Tighter leading (`1.05 – 1.15`) and tracking (`-0.025em`).
  - Body copy: Generous line-height (`1.55 – 1.65`) and large legibility (17px standard).
- **Fallbacks & font-display**: Always set `font-display: swap` and declare clear fallbacks.

---

## 3. Asymmetric Composition & Layout

- **The hero is a thesis**: Open with the most characteristic thing about the subject, not a centered slogan + two buttons + stat row.
- **Use real composition**: Asymmetry, editorial grids, intentional whitespace (`py-20` to `py-28`).
- **Structural devices encode truth**: Don't add `01 / 02 / 03` unless the content is genuinely sequential.

---

## 4. Responsive Floor: Desktop AND Mobile

- **Build mobile-first**, then scale up. Test at minimum **375px, 768px, 1024px, 1440px**.
- Tap targets $\ge$ 44×44px; no horizontal scroll on viewports; no overlapping elements.
- Navigation collapses cleanly into a functioning mobile drawer/menu.

---

## 5. The Vibe-Code Audit Checklist (Every item must be NO)

- [ ] ❌ Is purple/violet the dominant color?
- [ ] ❌ Are there any purple/blue/pink gradients?
- [ ] ❌ Are any headline words gradient-filled?
- [ ] ❌ Is there a row of giant meaningless stats?
- [ ] ❌ Are there emoji in headings?
- [ ] ❌ Is there a "Why Choose us?" or generic SaaS-slogan section?
- [ ] ❌ Is everything centered in one column?
- [ ] ❌ Is the type just default unstyled Inter with no display hierarchy?
- [ ] ❌ Do cards have frosted-glass + soft-glow clutter?
- [ ] ❌ Does it break or look unstyled on mobile?

---

## 6. Chanel's Rule
Before considering any page finished: **Look at the finished page and remove one element or decoration that isn't earning its place.**
