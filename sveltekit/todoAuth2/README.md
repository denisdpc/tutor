# Configurações

## Instalar bibliotecas
npm install
npm install firebase

## Atualizar o arquivo **svelte.config.js** para incluir o **firebase**, conforme:

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


## Firebase Rules

```bash
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/todos/{document=**} {
    	allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Estrutura da base de dados
users --> userId --> todos --> todoId --> (task: string, isComplete: boolean, createAt: timestamp)

iHfhxvxyIThgzYeRPy93AW4N1lS2