# Marbres Montseny

Web corporativa de Marbres Montseny, marmolería a medida en Vilalba Sasserra
(Baix Montseny, Barcelona).

**Publicada en:** https://alexviale2007-ux.github.io/marbres-montseny/

## Poner en marcha

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # compila a dist/
npm run preview  # sirve lo compilado
```

Stack: Vite + React + TypeScript + Tailwind + Framer Motion.

Cada cambio en `main` se publica automáticamente mediante el flujo de trabajo
`.github/workflows/deploy.yml`. No hay que subir `dist/` al repositorio.

## Cómo sustituir las imágenes por fotografías propias

**Esto es lo más importante que queda pendiente.** Todas las imágenes se
declaran en un único archivo: [`src/data/images.ts`](src/data/images.ts).
Ningún componente incrusta una URL.

Para cada foto:

1. Copia el archivo en `public/img/` (por ejemplo `public/img/cocina-01.jpg`).
2. Busca el hueco correspondiente en `src/data/images.ts`.
3. Sustituye su origen por `{ kind: 'local', src: '/img/cocina-01.jpg' }`.
4. Reescribe el `alt` describiendo el trabajo real.

No hay que tocar ningún componente.

### Huecos a la espera de fotografía

Los huecos sin fotografía propia se muestran como un panel de marca rotulado,
no como una imagen de archivo que aparente ser un trabajo de la empresa:

| Hueco | Fotografía que necesita |
|---|---|
| `sobreNosotros` | El taller, o alguien trabajando una pieza |
| `servicios.escaleras` | Una escalera o peldaños ya instalados |
| `servicios.restauracion` | Una superficie restaurada, mejor con antes y después |
| `materiales.granito` | Macro de una losa de granito |
| `proyectos` (2 piezas) | Una escalera y una restauración terminadas |
| `ctaFondo` | Detalle de mármol oscuro |

La pieza de mayor impacto sería una **macro de una losa**: veteado, grano y
tono a corta distancia. Alimentaría la animación de entrada y la sección
interactiva, que hoy se apoyan en el color de marca y en un detalle recortado
de otra fotografía.

## Pendiente de datos de la empresa

- **Textos legales.** Un negocio español con formulario de contacto necesita
  aviso legal, política de privacidad y política de cookies. Redactarlos exige
  razón social, NIF, domicilio fiscal y correo de contacto. Los enlaces del pie
  se retiraron en lugar de dejarlos apuntando a ninguna parte.
- **Ficha de Google.** El enlace de opiniones lleva a una búsqueda en Maps. Con
  la dirección directa de la ficha se puede sustituir en
  `src/components/Testimonials.tsx`.
- **Otros compactos.** El brief solo autoriza mencionarlos cuando estén
  confirmados, así que la sección de materiales lista mármol, granito y cuarzo.

## Formulario de contacto

La web es estática y no tiene servidor donde recibir los envíos. El formulario
redacta la solicitud y la entrega por WhatsApp, que ya es el canal habitual del
negocio.

Conviene tener presente que **la solicitud no está enviada cuando el visitante
pulsa el botón, sino cuando confirma el mensaje dentro de WhatsApp**. El texto
de la pantalla de confirmación lo dice de forma explícita.

Para recibirlas por correo, basta dar de alta un servicio de formularios
(Formspree, Basin o Netlify Forms) y sustituir el cuerpo de `handleSubmit` en
`src/components/Contact.tsx` por una petición a su dirección. El resto del
componente no cambia.
