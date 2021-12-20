# Tutorial

**Codechips**: Tailwind CSS and SvelteKit - The easy way [`website`](https://codechips.me/tailwindcss-sveltekit-the-easy-way/)
**Tailwind**: Navbar component [`website`](https://tailwindui.com/components/application-ui/navigation/navbars)
**WebJeda**: How to use daisyUI in SvelteKit? [`youtube`](https://www.youtube.com/watch?v=haKnkk6ds20&t=145s)

```bash
npm install
npx svelte-add@latest tailwindcss
npm install
npm install daisyui
```

Altualizar o arquivo *tailwind.config.cjs* conforme:

```bash
const config = {
  mode: "jit",
  purge: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {},
  },

  plugins: [
    require('daisyui'),
  ],
};

module.exports = config;
```