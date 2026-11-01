# Pizza y Come — Un plan en cada rebanada

Propuesta cinematográfica privada del 28 de octubre de 2026. Iteración ampliada con Canvas2D, composición más fiel al moodboard, botones ovalados y referencia de ritmo a Kazari Sushi (kazarisushi.mx). Proyecto independiente de Wix y del candidato V3. No se usa el logo generado, las fotografías sintéticas ni las afirmaciones no confirmadas del moodboard.

## Ejecutar

Node.js 20.9 o posterior (comprobado con 24.22.1).

```sh
npm ci
npm run dev
npm run typecheck
npm test
npm run build
```

`next build` produce `out/` mediante `output: 'export'`. React y Next.js auténticos; no se sustituyeron por una simulación estática. El servidor de desarrollo traduce las opciones de Sites Preview a Next. Para producción solo se sirve `out/`, nunca la raíz del proyecto.

Versiones comprobadas: Next.js 16.4.3, React 19.3.1, GSAP 3.15.0, Anton/@fontsource 5.3.0. `package-lock.json` fija las versiones instaladas.

## Edición

- Composición e interacción: `components/PizzaExperience.tsx`
- Interludio surreal, despegue y capas de movimiento: `components/SurrealHero.tsx`
- Selector interactivo de tres ideas de plan: `components/PlanSelector.tsx`
- Hero fotográfico con marca original: `components/MoodboardHero.tsx`
- Historia Canvas2D: `components/CinematicStory.tsx`, modelo puro `lib/cinema-model.mjs`
- Formatos, eventos y FAQ: `components/DiscoverySections.tsx`
- Diseño, breakpoints y movimiento reducido: `app/globals.css`, `app/cinema.css`, `app/discovery.css`
- 29 registros y categorías de catálogo: `lib/catalog.json`
- Logo y fotos reales, sin alteración binaria: `public/assets/`
- Hashes y pesos de activos: `docs/asset-manifest.json`
- Pruebas de contenido, estructura, dependencias, activos y salida estática: `tests/site.test.mjs`, `tests/cinema.test.mjs`

## Movimiento real

GSAP + ScrollTrigger importados de npm, incluidos en el bundle local; no hay CDN ni fallback presentado como GSAP. Entrada escalonada del titular y rebanada, bob flotante, órbitas SVG/CSS, trayectoria de vuelo real con MotionPathPlugin, respuesta sutil al puntero con quickTo, reveals, parallax de cocina/galería/cierre, progreso de lectura y ticker ligado al scroll. Capas de transformación separadas para entrada, puntero, vuelo y flotación, sin conflictos entre tweens. Scroll nativo sin hijacking; el relato Canvas2D usa un escenario CSS sticky. Se conserva contenido HTML estático ante falta de canvas, error de imágenes o preferencia de movimiento reducido o viewport de hasta650px de altura.

`gsap.matchMedia()` respeta `prefers-reduced-motion` del dispositivo, incluido cuando cambia durante la visita. Se retiró el botón global de animación y su preferencia manual almacenada. Ticker, flotación y estrella ya no se repiten automáticamente: dependen del scroll. Entradas breves y vuelo iniciado por el visitante terminan en menos de 5 segundos. Se limpian listeners, observers y animaciones; no se afirma conformidad WCAG completa sin auditoría. El contenido permanece legible sin movimiento.

## Veracidad y alcance

Logo suministrado, paleta oficial del brandbook y cinco fotografías documentales del archivo V3. Se añade una rebanada generada con IA, explícitamente conceptual y no presentada como fotografía o ficha comercial. Original RGBA y prompt: `docs/design/`; WebP responsive con alpha: `public/assets/flying-slice-concept*.webp`. Anton se sirve localmente bajo SIL OFL y Permanent Marker bajo Apache-2.0; no se distribuyen las fuentes comerciales Salted/Asphalt/Remora con licencia web pendiente. Los titulares son propuesta creativa, no claims comerciales.

Catálogo basado en `PyC Menú Oficio 07.pdf` (modificado el 12 de septiembre de 2026, sin vigencia impresa): 13 pizzas, 5 combos, 7 complementos, 4 bebidas. Datos de referencia sujetos a confirmación. Sin precios, carrito, compra, pagos, campañas activas, formularios, analytics, APIs o contactos no validados. Las fotos no se atribuyen a fichas de producto.

La publicación de Sites debe permanecer **solo propietario**, con protección de la aplicación y sus assets; noindex es una precaución adicional, no el mecanismo de seguridad. Antes de cualquier versión pública: validar catálogo, contactos y derechos de fotografía/fuentes. No hubo modificaciones en Wix ni en el sitio anterior.

## Documentación técnica consultada

- https://nextjs.org/docs/app/guides/static-exports
- https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/
- https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- https://gsap.com/docs/v3/Plugins/MotionPathPlugin/
- https://gsap.com/docs/v3/GSAP/gsap.quickTo()/

Las pruebas estáticas no equivalen a pruebas de navegador ni a una auditoría de accesibilidad o rendimiento. Ver `docs/QA.md` para lo efectivamente verificado.

## Canvas y secciones ampliadas

Tres capítulos visuales con fotos reales y una capa IA explicitada; avance por scroll y botones de capítulo, progreso lateral y enlace saltar. Canvas2D funciona sin WebGL. No es una secuencia de vídeo. Render por invalidación/visibilidad, DPR y memoria acotados; modelo y lifecycle descritos en `docs/design/CINEMATIC-DIRECTION.md`.

Formas de pizza documentadas con diagramas esquemáticos; cuatro modalidades de eventos sustentadas en el portafolio de abril de2026; FAQ con límites de catálogo/alérgenos. Fuentes trazables en `docs/CONTENT-SOURCES.md`. No se incluyen servicios inventados ni contactos no confirmados.

## SEO preparado, no publicado para buscadores

`lib/seo.mjs` genera metadata factual y Open Graph sin dominios inventados; la app usa siempre `createPreviewMetadata()` con noindex/nofollow/noimageindex. No hay canonical, sitemap, robots público, JSON-LD servido ni llms.txt. Los 29 productos de referencia existen en HTML, con visibilidad gobernada por filtros/búsqueda y una carta completa alternativa en noscript para visitas sin JavaScript. No se promete ranking ni presencia en respuestas de IA.

`public/_headers` solicita X-Robots-Tag para hosting compatible con Cloudflare Static Assets; su aplicación depende del hosting y no sustituye ni la autenticación owner-only ni el meta noindex. No se usa next.config.headers en export estático.

`config/production-seo.example.json` está cerrado por defecto. `node scripts/prepare-production-seo.mjs CONFIG_JSON STAGING_DIRECTORY` solo genera archivos offline tras aprobación explícita de lanzamiento, dominio y copy; rechaza directorios servidos/build. No se ejecuta en build ni publica/modifica acceso. Revisar `docs/SEO-AI.md` antes del futuro lanzamiento.

## Wix: preparado, todavía no conectado

`lib/wix-ordering.mjs` es un adaptador puro de URL para una futura página de pedidos Wix alojada; está desactivado en preview. No importa SDK, no llama APIs, no crea carrito/pedido ni procesa pagos. La selección de esta carta no se transfiere por un simple enlace. No hay CTA de compra activo.

Identificar el sitio/URL correctos y validar menú, métodos, configuración y permisos antes de activar. El plan ya contratado debe verificarse, no se contrata otro. Guía oficial y requisitos headless/CartV2/checkout hospedado en `docs/integrations/WIX-RESTAURANTS.md`. No se ha cambiado Wix.
