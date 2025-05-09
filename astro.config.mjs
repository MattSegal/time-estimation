// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://mattsegal.github.io',
  base: '/time-estimation',
  outDir: './docs',
  integrations: [react()]
});