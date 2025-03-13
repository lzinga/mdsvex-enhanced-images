import { mdsvex } from "mdsvex";
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import enhancedImage from 'mdsvex-enhanced-images';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			remarkPlugins: [[
				enhancedImage,
				{
					// Optional: attributes to add to **all** `img` tags
					attributes: {
						fetchpriority: "auto", // browser's default
						loading: "eager", // browser's default
						decoding: "auto", // browser's default
						class: "test-decoration"
					},
					// Optional: imagetools directives to add to **all** `img` tags
					// see https://github.com/JonasKruckenberg/imagetools/blob/main/docs/directives.md#format
					imagetoolsDirectives:{
						effort: 'max',
						normalize: true,
						median: true,
						quality: 100,
						background: "transparent",
						brightness: 0.9,
						contrast: 1.1,
					}
				}
			]]
		})
	],


	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;
