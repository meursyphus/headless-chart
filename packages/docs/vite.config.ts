import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	ssr: {
		noExternal: ['@meursyphus/flitter-svelte']
	},
	resolve: {
		alias: {
			$lib: '/src/lib'
		}
	}
});
