# Configurações

Se as ferramentas do firebase já não estiverem instaladas, executar:
```bash
npm install -g firebase-tools
```

No diretório do projeto:

```bash
# iniciar o projeto
npm init
```

> Escolher:
> *entry point*: test.js 
> *test command*: mocha --exit

```bash
# instalar bibliotecas de teste
npm install mocha --save-dev
npm install @firebase/testing --save-dev
```

Criar o diretório *test* e criar o arquivo *test.js*, onde serão programados os testes. 