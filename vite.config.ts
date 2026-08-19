import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  /*
    Rutas relativas en lugar de absolutas.

    GitHub Pages publica este proyecto en un subdirectorio
    (`/marbres-montseny/`), no en la raíz del dominio. Con el valor por
    defecto, el HTML pediría `/assets/…` y el navegador lo buscaría en la raíz
    del dominio, donde no existe: la página cargaría en blanco.

    Usar './' hace que el build no dependa de en qué ruta se publique, así que
    sirve igual en la raíz, en un subdirectorio o abriendo el archivo en local.
  */
  base: './',
})
