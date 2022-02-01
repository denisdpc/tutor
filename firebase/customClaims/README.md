# Referências

[Firebase Admin SetUp](https://firebase.google.com/docs/admin/setup)
[Firebase Admin Custom Claims](https://firebase.google.com/docs/auth/admin/custom-claims)

## Comandos


```bash
# instalar ferramentas do firebase
sudo npm install firebase-tools -g

# logar em um projeto
firebase login

# criar functions
firebase init functions

# instalar SDK
npm install firebase-admin --save
```

## Ambiente do firebase
Ir em Project settings --> Service accounts --> Firebase Admin SDK

Copiar o código apresentado para o arquivo **functions/index.js**
```bash
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

```

Clicar no botão **Generate new private key** e armazenar o arquivo gerado no diretório do projeto, nomeando-o como **serviceAccountKey**.