"""
Homepage Visual Design Capture Script
Uses Playwright to capture high-fidelity full-page and sequential sectional screenshots
of the website's homepage, ensuring fonts, lazy-loaded images, and animations are fully rendered.
"""

import os
import sys
import time
import argparse
from pathlib import Path

# Ensure UTF-8 output on Windows consoles
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

from playwright.sync_api import sync_playwright

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DEFAULT_OUTPUT_DIR = PROJECT_ROOT / "screenshots" / "homepage"


def wait_for_page_ready(page, settle_delay_ms: int = 1500):
    """
    Ensures that fonts, lazy-loaded images, dynamic UI elements,
    and layout shifts are completely loaded and settled.
    """
    print("[PAGE] Waiting for web fonts to load (document.fonts.ready)...")
    try:
        page.evaluate("() => document.fonts.ready")
    except Exception as e:
        print(f"   [NOTICE] Font check warning: {e}")

    print("[PAGE] Scrolling through page to trigger lazy loading & intersection observers...")
    page.evaluate("""async () => {
        const step = window.innerHeight * 0.75;
        const totalHeight = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight
        );
        for (let pos = 0; pos < totalHeight; pos += step) {
            window.scrollTo({ top: pos, behavior: 'instant' });
            await new Promise(r => setTimeout(r, 100));
        }
        window.scrollTo({ top: totalHeight, behavior: 'instant' });
        await new Promise(r => setTimeout(r, 150));
    }""")

    print("[PAGE] Waiting for all images to complete loading...")
    page.evaluate("""async () => {
        const images = Array.from(document.querySelectorAll('img'));
        await Promise.all(images.map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise((resolve) => {
                img.addEventListener('load', resolve, { once: true });
                img.addEventListener('error', resolve, { once: true });
            });
        }));
    }""")

    print(f"[PAGE] Settling animations and dynamic elements ({settle_delay_ms}ms)...")
    time.sleep(settle_delay_ms / 1000.0)

    # Scroll back to top
    page.evaluate("window.scrollTo({ top: 0, behavior: 'instant' })")
    time.sleep(0.3)


def capture_screenshots(
    url: str,
    output_dir: Path,
    mode: str = "all",
    sections_count: int = 4,
    viewport_width: int = 1440,
    viewport_height: int = 900,
    scale_factor: int = 2,
    theme: str = "dark",
    settle_delay_ms: int = 1500,
    headful: bool = False
):
    output_dir.mkdir(parents=True, exist_ok=True)
    captured_files = []

    print("=" * 60)
    print(" FreeIQExam Homepage Visual Design Capture")
    print("=" * 60)
    print(f"Target URL:        {url}")
    print(f"Output Directory:  {output_dir}")
    print(f"Mode:              {mode}")
    print(f"Viewport:          {viewport_width}x{viewport_height} (Scale: {scale_factor}x -> {viewport_width * scale_factor}x{viewport_height * scale_factor})")
    print(f"Theme / Scheme:    {theme}")
    print("=" * 60)

    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=not headful,
        )

        context = browser.new_context(
            viewport={"width": viewport_width, "height": viewport_height},
            device_scale_factor=scale_factor,
            color_scheme=theme if theme in ["light", "dark"] else "no-preference"
        )

        page = context.new_page()

        print(f"\n[NAV] Navigating to {url}...")
        try:
            page.goto(url, wait_until="networkidle", timeout=20000)
        except Exception as e:
            print(f"   [NOTICE] Navigation wait condition notice ({e}). Continuing with loaded DOM...")
            page.wait_for_load_state("load")

        # Wait for all assets, fonts, dynamic elements
        wait_for_page_ready(page, settle_delay_ms=settle_delay_ms)

        page_title = page.title()
        print(f"[PAGE] Page Title: \"{page_title}\"")

        # Measure page height
        scroll_height = page.evaluate("() => Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)")
        print(f"[PAGE] Total Page Scroll Height: {scroll_height}px")

        timestamp = time.strftime("%Y%m%d_%H%M%S")

        # 1. Full Page Screenshot
        if mode in ("all", "fullpage"):
            fullpage_filename = f"homepage_{theme}_fullpage_{timestamp}.png"
            fullpage_path = output_dir / fullpage_filename
            print(f"\n[CAPTURE] Capturing full-page screenshot: {fullpage_filename}...")
            page.evaluate("window.scrollTo(0, 0)")
            time.sleep(0.3)
            page.screenshot(path=str(fullpage_path), full_page=True)
            size_kb = os.path.getsize(fullpage_path) / 1024
            print(f"   [SAVED] {fullpage_path} ({size_kb:.1f} KB)")
            captured_files.append(fullpage_path)

        # 2. Sequential Sectional Screenshots
        if mode in ("all", "sections"):
            print(f"\n[CAPTURE] Capturing {sections_count} sequential sectional screenshots (top to bottom)...")
            max_scroll = max(0, scroll_height - viewport_height)

            section_labels = [
                "top_hero",
                "upper_middle_features",
                "lower_middle_details",
                "bottom_footer"
            ]

            for i in range(sections_count):
                if sections_count == 1:
                    scroll_y = 0
                else:
                    scroll_y = int((i / (sections_count - 1)) * max_scroll)

                # Assign descriptive label
                if i < len(section_labels) and sections_count == len(section_labels):
                    label = section_labels[i]
                elif i == 0:
                    label = "top_hero"
                elif i == sections_count - 1:
                    label = "bottom_footer"
                else:
                    label = f"middle_section_{i + 1}"

                section_filename = f"homepage_{theme}_part{i+1}_{label}_{timestamp}.png"
                section_path = output_dir / section_filename

                # Scroll to target position
                page.evaluate(f"window.scrollTo({{ top: {scroll_y}, behavior: 'instant' }})")
                time.sleep(0.4)

                page.screenshot(path=str(section_path), full_page=False)
                size_kb = os.path.getsize(section_path) / 1024
                print(f"   [SAVED] Part {i+1}/{sections_count} (scroll: {scroll_y}px / {scroll_height}px) -> {section_filename} ({size_kb:.1f} KB)")
                captured_files.append(section_path)

        context.close()
        browser.close()

    print("\n" + "=" * 60)
    print(f"[COMPLETE] Successfully captured {len(captured_files)} screenshot(s)!")
    print(f"[LOCATION] {output_dir}")
    print("=" * 60)
    return captured_files


def main():
    parser = argparse.ArgumentParser(
        description="Capture full-page and sectional screenshots of FreeIQExam homepage."
    )
    parser.add_argument(
        "--url",
        default="http://localhost:4321",
        help="URL of the homepage to capture (default: http://localhost:4321)"
    )
    parser.add_argument(
        "--output-dir",
        default=str(DEFAULT_OUTPUT_DIR),
        help=f"Output directory for screenshots (default: {DEFAULT_OUTPUT_DIR})"
    )
    parser.add_argument(
        "--mode",
        choices=["all", "fullpage", "sections"],
        default="all",
        help="Screenshot mode: 'all' (default, both fullpage and sections), 'fullpage', or 'sections'"
    )
    parser.add_argument(
        "--sections",
        type=int,
        default=4,
        help="Number of sequential sectional screenshots to take (default: 4)"
    )
    parser.add_argument(
        "--width",
        type=int,
        default=1440,
        help="Viewport width in pixels (default: 1440)"
    )
    parser.add_argument(
        "--height",
        type=int,
        default=900,
        help="Viewport height in pixels (default: 900)"
    )
    parser.add_argument(
        "--scale",
        type=int,
        default=2,
        help="Device pixel scale factor for crisp retina screenshots (default: 2)"
    )
    parser.add_argument(
        "--theme",
        choices=["dark", "light", "both"],
        default="dark",
        help="Color scheme preference: 'dark', 'light', or 'both' (default: dark)"
    )
    parser.add_argument(
        "--settle-delay",
        type=int,
        default=1500,
        help="Extra settling delay in milliseconds after scrolling (default: 1500)"
    )
    parser.add_argument(
        "--headful",
        action="store_true",
        help="Run browser with visible GUI window instead of headless"
    )

    args = parser.parse_args()
    out_dir = Path(args.output_dir)

    themes = ["dark", "light"] if args.theme == "both" else [args.theme]
    all_captured = []
    for t in themes:
        captured = capture_screenshots(
            url=args.url,
            output_dir=out_dir,
            mode=args.mode,
            sections_count=args.sections,
            viewport_width=args.width,
            viewport_height=args.height,
            scale_factor=args.scale,
            theme=t,
            settle_delay_ms=args.settle_delay,
            headful=args.headful
        )
        all_captured.extend(captured)


if __name__ == "__main__":
    main()
