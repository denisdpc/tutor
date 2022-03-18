# Referências

[Firebase Admin SetUp](https://firebase.google.com/docs/admin/setup)
[Firebase Admin Custom Claims](https://firebase.google.com/docs/auth/admin/custom-claims)

## Instalar bibliotecas

```bash
npm install firebase-admin --save
```

## Ambiente do firebase

Ir em Project settings --> Service accounts --> Firebase Admin SDK

Copiar o código apresentado para o arquivo **admin.js**
```bash
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

```

Clicar no botão **Generate new private key** e armazenar o arquivo gerado no diretório do projeto.
Renomear o arquivo como **serviceAccountKey.json**.