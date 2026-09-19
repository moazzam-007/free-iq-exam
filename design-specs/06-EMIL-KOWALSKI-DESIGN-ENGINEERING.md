# Emil Kowalski Design Engineering & UI Polish Craft
# Foundations: Micro-interactions, Tactile Button Scale(0.97), Custom Easings, Compounding Polish

> *"All those unseen details combine to produce something that's just stunning, like a thousand barely audible voices all singing in tune."* — Paul Graham

---

## 1. The Core Philosophy

1. **Taste is trained, not innate**:
   - Good taste is not subjective preference. It is a trained instinct: the ability to recognize what elevates a UI. Study why great interfaces feel great; reverse-engineer their motion and spacing.
2. **Unseen details compound**:
   - Most details users never consciously notice. But in the aggregate, invisible correctness creates software people love without knowing why.
3. **Beauty is leverage**:
   - When functionality is commoditized, craft and taste are the ultimate differentiators.

---

## 2. The Animation Decision Framework

Before animating any UI element, answer these in order:

### A. Should this animate at all?
- **100+ times/day** (keyboard shortcuts, command palettes, escape dismissals): **Never animate.** Instant feedback is required.
- **Tens of times/day** (hover effects, list navigation): Drastically reduce duration (< 150ms).
- **Occasional** (modals, drawers, toasts): Standard animation (200ms – 280ms).
- **Rare / First-time** (onboarding reveals, celebratory feedback): Can add rich motion.

### B. What easing to use?
- **Entering / Exiting**: Always `ease-out` (starts fast, feels immediately responsive).
- **On-screen morphing**: `ease-in-out` (natural acceleration/deceleration).
- **Never use `ease-in` for UI**: It delays initial movement and feels sluggish.

### C. Recommended Custom Curves
```css
/* Strong ease-out for entering elements */
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);

/* Strong ease-in-out for canvas movement */
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);

/* iOS / Apple spring feel */
--ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
```

---

## 3. Essential UI Craft Rules

| Practice | Bad | Good | Why |
|---|---|---|---|
| **Button press** | No active state | `transform: scale(0.97)` on `:active` | Buttons must feel tactile and responsive to clicks. |
| **Entrance** | `transform: scale(0)` | `transform: scale(0.95); opacity: 0` | Nothing in reality emerges from a zero point. |
| **Transitions** | `transition: all 300ms` | `transition: transform 160ms ease-out` | Specify exact properties; avoid unexpected layout thrashing. |
| **Popovers** | `transform-origin: center` | `transform-origin: var(--transform-origin)` | Popovers should scale from their trigger origin (modals stay centered). |
| **Tooltips** | Delayed on every item | Skip delay once first tooltip is open | Rapid toolbar inspection feels instantaneous. |
| **Stagger** | Elements appear simultaneously | Stagger delay `30ms – 60ms` per child | Creates an organic cascading flow. |

---

## 4. The Sonner Principles
1. **Zero-friction DX**: Insert provider once, trigger anywhere.
2. **Exemplary defaults**: Ship flawless timing and easing out of the box.
3. **Handle edge cases invisibly**: Pause timers on tab hide, maintain hover hitboxes on stacked elements.
4. **Use CSS transitions for interruptibility**: Keyframes restart from 0; CSS transitions retarget smoothly.
