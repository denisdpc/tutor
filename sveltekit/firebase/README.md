# Configurações:

1) Atualizar o arquivo **svelte.config.js** para incluir o **firebase**, conforme:
```bash
/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: {
			ssr: {
				external: ['firebase']
			}
		},
	}
};

export default config;
```
Vide: https://githubmemory.com/repo/firebase/firebase-js-sdk/issues/5140

