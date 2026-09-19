# Accessibility & Human Usability Standards (WCAG 2.1 AA/AAA)

================================================================================
1. TOUCH & TAP TARGETS
================================================================================
- **Minimum Tap Target**: All clickable elements (buttons, carousel arrows, links, tab pills) must have a touch target $\ge 44 \times 44\text{px}$.
- **Spacing between targets**: Minimum 8px gap between adjacent touch targets to prevent mis-clicks.

================================================================================
2. COLOR CONTRAST RATIOS (WCAG AA MINIMUM)
================================================================================
- **Body Text**: Minimum contrast ratio of **4.5:1** against the background.
  - Light mode: `#09090b` (21:1) / `#52525b` (7.3:1) on `#ffffff`.
  - Dark mode: `#ffffff` (21:1) / `#a1a1aa` (7.0:1) on `#000000`.
- **Large Text / Headings ($\ge 24\text{px}$)**: Minimum contrast ratio of **3.0:1**.
- **Interactive UI Components & Borders**: Minimum **3.0:1** contrast for active states.

================================================================================
3. KEYBOARD ACCESSIBILITY & FOCUS RINGS
================================================================================
- Every interactive element must be reachable via `Tab` key in logical reading order.
- Visible focus rings are mandatory:
  `focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0066cc] dark:focus-visible:ring-[#2997ff] focus-visible:ring-offset-2`.

================================================================================
4. MOTION ACCESSIBILITY (PREFERS-REDUCED-MOTION)
================================================================================
Always respect user motion preferences. If reduced motion is requested, disable transform movements and retain gentle opacity transitions:

```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
