# Instalar bibliotecas
```bash
pip install --user fastapi
pip install --user uvicorn
```
# Instalar svelte
No diretório do projeto:
```bash
npx degit sveltejs/template front
cd front
npm run build
cd ..
```

# Testar aplicativo

## Iniciar servidor
```bash
python -m uvicorn main:app --reload
```
## Iniciar svelte
```bash
cd front
npm run dev
```

## Visualizar site
http://localhost:8000/

## Visualizar documentação
http://127.0.0.1:8000/docs#/default
