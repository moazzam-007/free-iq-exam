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
  integrations: [sitemap()]
});