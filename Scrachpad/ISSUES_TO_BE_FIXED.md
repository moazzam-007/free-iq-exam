# FreeIQExam - Pending Issues & Bugs To Be Fixed

This document tracks all outstanding bugs, visual glitches, and code polish items identified during testing of Step 1 (Multi-Domain Assessment Engine).

---

## Issue 1: Empty 200px Grey Stimulus Box on Text Questions (P0 - Visual/UX Bug)

- **Affected Files:**
  - `src/pages/test.astro` (Lines 532-538, 555-558)
  - `src/pages/quick-test.astro` (Lines 506-512, 529-532)
- **Problem Description:**
  - When rendering a text-based question (`promptType === 'text'`, such as quantitative word problems or verbal analogies), the script first appends the question text inside `stimulusContainer`.
  - A few lines later, the script sets `promptText.textContent = q.promptText` and wipes `stimulusContainer.innerHTML = ''`.
  - However, `#stimulus-card` retains a minimum height class (`min-h-[200px] sm:min-h-[260px]`) and is never hidden.
  - Result: On all 64 text-based questions, users see the question text above an enormous 200px-260px empty, blank grey container before the answer choices appear.
- **Required Fix:**
  - On text-based items, either:
    1. Hide `#stimulus-card` completely (`stimulusCard.classList.add('hidden')` or `style.display = 'none'`) so that the prompt text in `#question-prompt-text` sits directly above the choices with clean spacing.
    2. Or render the question text cleanly inside `#stimulus-card` with proper typography, and set the upper `#question-prompt-text` to standard instruction text ("Read the question and select the best answer:").

---

## Issue 2: Static Percentile Subtitle Text Mismatch on Results Page (P1 - Data Accuracy Bug)

- **Affected File:**
  - `src/pages/results.astro` (Line 160, and hydration script around Line 520)
- **Problem Description:**
  - In the Hero score metrics grid, the Percentile card dynamically updates the primary number (e.g., `12.9%`).
  - However, the explanatory subtext beneath the number remained hardcoded as:
    `Exceeds 88.5% of population` (which was the sample placeholder from demo mode).
  - In actual user tests (as observed in screenshot with an 83 IQ), the card displayed `12.9%` with the contradictory subtitle "Exceeds 88.5% of population".
- **Required Fix:**
  - Assign an `id="percentile-subtext"` to the subtitle element.
  - In the hydration script, dynamically update the text:
    `percentileSubtext.textContent = 'Exceeds ' + result.percentile.toFixed(1) + '% of population';`

---

## Issue 3: Raw Snake_Case Display in Question Review Accordion (P2 - UI Polish)

- **Affected File:**
  - `src/pages/results.astro` (Line 716)
- **Problem Description:**
  - In the collapsed row summary of visual questions, the script outputs:
    `[Visual matrix_reasoning]` or `[Visual cube_rotation]`
  - It prints raw database snake_case keys directly to end users.
- **Required Fix:**
  - Convert `q.subType` to human-readable Title Case (e.g., "Matrix Reasoning", "3D Cube Rotation", "Cube Folding Nets", "Pattern Series") or use `q.domainLabel`.

---

## Issue 4: Unused Frontmatter Variables in Results Page (P3 - Code Cleanliness)

- **Affected File:**
  - `src/pages/results.astro` (Lines 9-20)
- **Problem Description:**
  - The frontmatter serializes `bankJson` and `demoFallbackIds`.
  - Neither variable is ever rendered into HTML or used by client scripts because the client script directly imports `QUESTION_BANK` from `../data/questions`.
- **Required Fix:**
  - Remove the unused `bankJson` and `demoFallbackIds` declarations from the Astro server frontmatter.

---

## Issue 5: Navigation Link Asymmetry Between Header & Drawer (P3 - UX Consistency)

- **Affected File:**
  - `src/components/Header.astro` (Lines 8-16, Line 40)
- **Problem Description:**
  - In the desktop header, `navLinks.slice(1, 5)` includes `Quick Test (10 min)` as an inline link, while `Full Test (20 min)` is only in the right CTA button.
  - In the mobile menu drawer, both `Full Test` and `Quick Test` are rendered as text links.
- **Required Fix:**
  - Separate assessment routes from informational reference tools in `navLinks` so desktop links and mobile drawer items maintain consistent naming and hierarchy.

---

## Issue 6: Unclosed HTML Tags Breaking Astro Build (P0 - Build Blocker)

- **Affected File:**
  - `src/pages/results.astro` (Lines 392-393)
- **Problem Description:**
  - An extra `<div class="mb-6"><h2 class="font-heading text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white">` block was opened immediately above `<!-- Section Header -->` without matching closing tags (`</h2></div>`).
  - This unclosed block causes Astro's HTML compiler to fail at line 537 (`</section>`), preventing `npm run build` from succeeding.
- **Required Fix:**
  - Remove duplicate lines 392-393 from `src/pages/results.astro` so that the `<!-- Section Header -->` opens and closes cleanly inside the existing inner wrapper.

---

## Issue 7: Missing Navigation Links for Practice Hub and Mini-Games (P2 - Discoverability)

- **Affected Files:**
  - `src/components/Header.astro`
- **Problem Description:**
  - The new Cognitive Practice Hub (`/practice`) and Cognitive Mini-Games Hub (`/games`) have been successfully implemented, but neither is linked in the main desktop navigation bar or mobile menu drawer.
- **Required Fix:**
  - Add "Practice" (`/practice`) and "Games" (`/games`) to the navigation menu in `Header.astro`.

