# Tutorial

Unit testing security rules with the Firebase Emulator Suite [`Link`](https://www.youtube.com/watch?v=VDulvfBpzZE&t=476s);

Intermediate topics in Firebase Security Rules - Firecasts[`Link`](https://www.youtube.com/watch?v=8Mzb9zmnbJs)

Validação inclui a utilização de custom claims.

## Configurar ambiente

```bash
# criar projeto
npm init svelte@next mochaTest
cd mochaTest

# configurar firebase
firebase login
firebase init
```

> Escolher pelo menos *Firestore* e *Emulators*

## Ambiente de teste

```bash
# criar diretório de teste
mkdir test && cd test

# instalar framework e biblioteca de teste
npm install mocha --save-dev
npm install @firebase/testing --save-dev
```

> npm init 
*entry point*: test.js 
*test command*: mocha --exit

Criar o arquivo *test.js* onde serão programados os testes, conforme:
```bash
npm test
```

Iniciar o emulador

```bash
cd ..
firebase emulators:start
```

Setar o arquivo *firebase.rules* com permissões abrangentes:

```bash
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {      
    	allow read, write: if true;
    }
  }
}
```

No diretório *test*, rodar *npm test*.

