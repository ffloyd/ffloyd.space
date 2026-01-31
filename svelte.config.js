import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

import svelteMarkdown from './src/lib/markdown/svelte-preprocessor.ts';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [vitePreprocess(), svelteMarkdown()],
  kit: { adapter: adapter() },
  extensions: ['.svelte', '.svelte.md']
};

export default config;
