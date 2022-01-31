# Referências

[Firebase Admin](https://firebase.google.com/docs/admin/setup)
  

## Comandos


```bash
# iniciar o projeto
npm init

# instalar SDK
npm install firebase-admin --save
```

## Ambiente do firebase
Ir em Project settings --> Service accounts --> Firebase Admin SDK

Copiar o código apresentado para o arquivo **index.js** (ou outro escolhido como arquivo de início do projeto)
```bash
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

```

Clicar no botão **Generate new private key** e armazenar o arquivo gerado no diretório do projeto, nomeando-o como **serviceAccountKey**.