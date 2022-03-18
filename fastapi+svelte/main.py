from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from starlette.responses import RedirectResponse
import random

app = FastAPI()

# Place After All Other Routes
app.mount('/front', StaticFiles(directory="front/public/", html=True), name="static")
app.mount("/build", StaticFiles(directory="front/public/build"), name="build")

@app.get("/rand")
async def rand():
  return random.randint(0, 100)

@app.get('/')
async def front():
   return RedirectResponse(url='front')

