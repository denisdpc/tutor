# Tutorial

[this.Codes()]('https://www.youtube.com/watch?v=3ykknJkYYbE') - Tailwind CSS integration with SvelteKit


## Procedimentos

Instalar bibliotecas
```
npm install
npm install -D tailwindcss postcss autoprefixer
```

Criar o arquivo **postcss.config.cjs** no diretório do projeto, conforme:
```
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

Rodar o comando abaixo para criar o arquivo **tailwind.config.js**:
```
npx tailwindcss init
```

Atualizar o arquivo **tailwind.config.js** para **tailwind.config.cjs**, conforme:
```
module.exports = {
  content: ["./src/**/*.svelte"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```