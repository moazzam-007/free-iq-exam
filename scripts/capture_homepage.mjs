/**
 * FreeIQExam Homepage Visual Capture (Node.js / Playwright)
 * Captures full-page and sequential sectional screenshots of the homepage.
 *
 * Usage:
 *   node scripts/capture_homepage.mjs [--url http://localhost:4321] [--mode all]
 *   npx --package=playwright node scripts/capture_homepage.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');
const DEFAULT_OUTPUT_DIR = path.join(PROJECT_ROOT, 'screenshots', 'homepage');

// Parse CLI flags
const { values: args } = parseArgs({
  options: {
    url: { type: 'string', default: 'http://localhost:4321' },
    'output-dir': { type: 'string', default: DEFAULT_OUTPUT_DIR },
    mode: { type: 'string', default: 'all' }, // all, fullpage, sections
    sections: { type: 'string', default: '4' },
    width: { type: 'string', default: '1440' },
    height: { type: 'string', default: '900' },
    scale: { type: 'string', default: '2' },
    theme: { type: 'string', default: 'dark' }, // dark, light, both
    'settle-delay': { type: 'string', default: '1500' },
    help: { type: 'boolean', default: false }
  },
  allowPositionals: true
});

if (args.help) {
  console.log(`
FreeIQExam Homepage Visual Capture
Options:
  --url <url>             URL to capture (default: http://localhost:4321)
  --output-dir <path>     Directory to save screenshots (default: screenshots/homepage)
  --mode <mode>           "all", "fullpage", or "sections" (default: "all")
  --sections <n>          Number of sequential sectional slices (default: 4)
  --width <pixels>        Viewport width (default: 1440)
  --height <pixels>       Viewport height (default: 900)
  --scale <factor>        Device scale factor (default: 2)
  --theme <theme>         "dark", "light", or "both" (default: "dark")
  --settle-delay <ms>     Delay in ms to let animations settle (default: 1500)
  `);
  process.exit(0);
}

let playwright;
try {
  playwright = await import('playwright');
} catch {
  console.error(`
[ERROR] Playwright is not installed in node_modules.
You can run:
  npm install -D playwright
or run via npx:
  npx --package=playwright node scripts/capture_homepage.mjs
or run the included Python script:
  python scripts/capture_homepage.py
  `);
  process.exit(1);
}

const { chromium } = playwright;

async function waitForPageReady(page, settleDelayMs) {
  console.log('[PAGE] Waiting for web fonts to load (document.fonts.ready)...');
  try {
    await page.evaluate(() => document.fonts.ready);
  } catch (e) {
    console.log('   [NOTICE] Font readiness check notice:', e.message);
  }

  console.log('[PAGE] Scrolling through page to trigger lazy loading & animations...');
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.75;
    const totalHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    for (let pos = 0; pos < totalHeight; pos += step) {
      window.scrollTo({ top: pos, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 100));
    }
    window.scrollTo({ top: totalHeight, behavior: 'instant' });
    await new Promise((r) => setTimeout(r, 150));
  });

  console.log('[PAGE] Waiting for all images to complete loading...');
  await page.evaluate(async () => {
    const images = Array.from(document.querySelectorAll('img'));
    await Promise.all(
      images.map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.addEventListener('load', resolve, { once: true });
          img.addEventListener('error', resolve, { once: true });
        });
      })
    );
  });

  console.log(`[PAGE] Settling animations and dynamic elements (${settleDelayMs}ms)...`);
  await page.waitForTimeout(settleDelayMs);

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(300);
}

async function capture(theme) {
  const outputDir = path.resolve(args['output-dir']);
  fs.mkdirSync(outputDir, { recursive: true });

  const viewportWidth = parseInt(args.width, 10);
  const viewportHeight = parseInt(args.height, 10);
  const scale = parseInt(args.scale, 10);
  const sectionsCount = parseInt(args.sections, 10);
  const settleDelay = parseInt(args['settle-delay'], 10);

  console.log('='.repeat(60));
  console.log(' FreeIQExam Homepage Visual Capture');
  console.log('='.repeat(60));
  console.log(`Target URL:        ${args.url}`);
  console.log(`Output Directory:  ${outputDir}`);
  console.log(`Mode:              ${args.mode}`);
  console.log(`Viewport:          ${viewportWidth}x${viewportHeight} (Scale: ${scale}x)`);
  console.log(`Theme:             ${theme}`);
  console.log('='.repeat(60));

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: viewportWidth, height: viewportHeight },
    deviceScaleFactor: scale,
    colorScheme: theme === 'light' || theme === 'dark' ? theme : 'no-preference'
  });

  const page = await context.newPage();

  console.log(`\n[NAV] Navigating to ${args.url}...`);
  try {
    await page.goto(args.url, { waitUntil: 'networkidle', timeout: 20000 });
  } catch (e) {
    console.log('   [NOTICE] Networkidle timeout reached, proceeding with loaded page...');
    await page.waitForLoadState('load');
  }

  await waitForPageReady(page, settleDelay);

  const pageTitle = await page.title();
  console.log(`[PAGE] Page Title: "${pageTitle}"`);

  const scrollHeight = await page.evaluate(() =>
    Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
  );
  console.log(`[PAGE] Total Page Scroll Height: ${scrollHeight}px`);

  const now = new Date();
  const timestamp = now.toISOString().replace(/[-:T]/g, '').slice(0, 14);

  // 1. Full Page Screenshot
  if (args.mode === 'all' || args.mode === 'fullpage') {
    const fullFileName = `homepage_${theme}_fullpage_${timestamp}.png`;
    const fullFilePath = path.join(outputDir, fullFileName);
    console.log(`\n[CAPTURE] Capturing full-page screenshot: ${fullFileName}...`);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    await page.screenshot({ path: fullFilePath, fullPage: true });
    const sizeKb = (fs.statSync(fullFilePath).size / 1024).toFixed(1);
    console.log(`   [SAVED] ${fullFilePath} (${sizeKb} KB)`);
  }

  // 2. Sequential Sectional Screenshots
  if (args.mode === 'all' || args.mode === 'sections') {
    console.log(`\n[CAPTURE] Capturing ${sectionsCount} sequential sectional screenshots (top to bottom)...`);
    const maxScroll = Math.max(0, scrollHeight - viewportHeight);
    const sectionLabels = [
      'top_hero',
      'upper_middle_features',
      'lower_middle_details',
      'bottom_footer'
    ];

    for (let i = 0; i < sectionsCount; i++) {
      const scrollY = sectionsCount === 1 ? 0 : Math.round((i / (sectionsCount - 1)) * maxScroll);
      let label = `section_${i + 1}`;
      if (i < sectionLabels.length && sectionsCount === sectionLabels.length) {
        label = sectionLabels[i];
      } else if (i === 0) {
        label = 'top_hero';
      } else if (i === sectionsCount - 1) {
        label = 'bottom_footer';
      }

      const sectionFileName = `homepage_${theme}_part${i + 1}_${label}_${timestamp}.png`;
      const sectionFilePath = path.join(outputDir, sectionFileName);

      await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), scrollY);
      await page.waitForTimeout(400);

      await page.screenshot({ path: sectionFilePath, fullPage: false });
      const sizeKb = (fs.statSync(sectionFilePath).size / 1024).toFixed(1);
      console.log(`   [SAVED] Part ${i + 1}/${sectionsCount} (scroll: ${scrollY}px / ${scrollHeight}px) -> ${sectionFileName} (${sizeKb} KB)`);
    }
  }

  await context.close();
  await browser.close();

  console.log('\n' + '='.repeat(60));
  console.log(`[COMPLETE] Screenshots saved to: ${outputDir}`);
  console.log('='.repeat(60));
}

const themes = args.theme === 'both' ? ['dark', 'light'] : [args.theme];
for (const t of themes) {
  await capture(t);
}
