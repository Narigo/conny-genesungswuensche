import preprocess from 'svelte-preprocess';
import adapterStatic from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

		adapter: adapterStatic(),

		vite: {
			define: {
				'import.meta.env.AIRTABLE_API_TOKEN': process.env['AIRTABLE_API_TOKEN'],
				'import.meta.env.AIRTABLE_BASE': process.env['AIRTABLE_BASE']
			},
			server: {
				hmr: {
					port: 3001
				}
			}
		}
	}
};

export default config;
