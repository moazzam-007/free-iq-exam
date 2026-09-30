// @ts-check
process.env.NAPI_RS_FORCE_WASI = 'true';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://freeiqexam.com',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    sitemap({
      filter: (page) => {
        const url = new URL(page, 'https://freeiqexam.com');
        const pathname = url.pathname;

        // Exclude all 404 error pages
        if (pathname.includes('404')) return false;

        // Exclude utility pages in all localized variants
        const excludedUtilityPaths = [
          '/results/',
          '/profile/',
          '/leaderboard/',
          '/id/hasil/',
          '/id/profil/',
          '/id/papan-peringkat/',
          '/id/results/',
          '/id/profile/',
          '/id/leaderboard/',
          '/ru/results/',
          '/ru/profile/',
          '/ru/leaderboard/'
        ];

        if (excludedUtilityPaths.some((p) => pathname === p || pathname === p.replace(/\/$/, ''))) {
          return false;
        }

        return true;
      }
    })
  ]
});