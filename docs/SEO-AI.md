# Especificación SEO / búsqueda con IA — restaurante, preview Next.js y futuro Wix

Investigación consultada: 28 de octubre de 2026. Alcance: recomendaciones y documentación; no se ha publicado ningún sitio ni cambiado ajustes remotos.

## Decisión inmediata para la preview

1. Mantener la web sin publicación pública o detrás de autenticación si debe ser privada. `noindex` no es control de acceso: cualquier persona con la URL podría verla. No presentar una URL no indexada como una URL privada.
2. Emitir `robots: { index: false, follow: false }` desde Metadata en el layout servidor. Añadir `X-Robots-Tag: noindex, nofollow` a las respuestas del servidor si la modalidad de ejecución lo admite; si se exporta HTML estático, documentar que las cabeceras dependen del hosting.
3. No añadir `Disallow: /` a una URL pública esperando que el buscador lea su `noindex`: el bloqueo de rastreo impide leer la regla. En una preview autenticada la privacidad la proporciona la autenticación, no robots.txt.
4. No generar canonical, `metadataBase` de producción, sitemap público ni identificadores absolutos inventados. No usar un dominio supuesto, localhost o el hostname temporal del proveedor como identidad canónica del negocio.
5. Recomendación del proyecto: omitir JSON-LD en la preview y conservar un generador/plantilla comprobable para la versión aprobada. `Brand`/`WebPage` factuales no serían incorrectos por ser una preview, pero no aportan elegibilidad a rich results mientras noindex y pueden introducir URLs prematuras.
6. La activación futura de indexación debe ser explícita. `NODE_ENV=production` solo indica cómo se compiló el proyecto: **no es autorización para publicar ni indexar**. Tampoco basta con rellenar el dominio.

Google documenta la diferencia entre noindex, rastreo y privacidad, y ofrece tanto meta robots como cabeceras HTTP. [Bloquear indexación](https://developers.google.com/search/docs/crawling-indexing/block-indexing), [Límites de robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro). La API de Next permite configurar robots y URLs canónicas desde componentes servidor. [Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata).

## Contenido y estructura preparados ahora

- Texto esencial en HTML renderizado por servidor: nombre, introducción, carta y contacto confirmado. No depender exclusivamente de imágenes, vídeos, canvas, animaciones o contenido que aparece tras un clic.
- Títulos y descripciones específicos por página; un encabezado principal claro y jerarquía de subtítulos legible. Enlaces reales con `href` y nombres descriptivos, no solo eventos JavaScript.
- Mantener un registro de procedencia y fecha de revisión de nombre, platos, ingredientes, alérgenos, precio/moneda, dirección, teléfono, horarios, zonas de reparto y servicios. Campos sin confirmar se omiten o se señalan como pendientes en documentación, no se rellenan por plausibilidad.
- No afirmar categorías dietéticas, tiempos de entrega, reservas, premios, calidad geográfica, reseñas o popularidad sin respaldo. Las fotos conceptuales/IA no deben confundirse con fotografías verificadas del producto o local.
- Preguntas frecuentes solo si responden dudas reales con información confirmada. Una sección FAQ de contenido no supone que debamos emitir `FAQPage` ni prometer rich results.

Son decisiones editoriales/técnicas para este proyecto. Google recomienda texto accesible, enlaces internos, buena experiencia y concordancia entre datos estructurados y contenido visible; no exige un archivo `llms.txt`, texto especial para IA ni schema adicional para AI Overviews/AI Mode. La elegibilidad requiere indexación y posibilidad de mostrar snippet; no garantiza inclusión. [Google: funciones de IA](https://developers.google.com/search/docs/appearance/ai-features).

## Datos estructurados de producción

Preferir JSON-LD `Restaurant` cuando el negocio y los datos reales estén confirmados. Para el resultado enriquecido LocalBusiness, Google exige `name` y `address`; no sustituir la dirección física por una ciudad inferida. Añadir `telephone`, `openingHoursSpecification`, `servesCuisine`, `menu`, `image`, `url`, `geo` y `priceRange` únicamente si son ciertos, aplicables y coherentes con lo visible. El `menu` debe ser una URL completa del menú real. Cada local debe representarse correctamente, no mezclar sedes.

No añadir `review` ni `aggregateRating` para fabricar estrellas; Google recomienda estas propiedades a sitios que recogen opiniones sobre otros negocios. No marcar pedidos, reservas, disponibilidad u ofertas inexistentes. Validar primero el JSON y después, cuando sea apropiado, Rich Results Test/URL Inspection. El marcado válido no garantiza rich results. [Restaurant / LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business), [Políticas de datos estructurados](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).

## Rendimiento y accesibilidad

- Optimizar dimensiones, formatos y tamaños de imágenes; reservar espacio para evitar saltos. Cargar diferido lo no prioritario y priorizar únicamente el recurso visual principal cuando corresponda.
- Evitar vídeo pesado obligatorio, animaciones bloqueantes y exceso de JavaScript cliente. Respetar `prefers-reduced-motion`, navegación de teclado y contraste.
- Objetivos de medición: LCP dentro de 2,5 s, INP inferior a 200 ms y CLS inferior a 0,1. No reportar estos valores como logrados sin una medición reproducible. Las pruebas de laboratorio no sustituyen los datos reales de usuarios. [Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals).

## Lanzamiento futuro autorizado: checklist

1. Confirmar dominio y versión pública oficial, acceso autorizado y contenido. Conservar preview noindex y privada.
2. Configurar URLs absolutas HTTPS y canonical por ruta; alinear enlaces internos y sitemap con esa misma identidad. Canonical es una señal, no un bloqueo de acceso. No usar noindex como sustituto de canonical para duplicados que sí deben consolidarse. [Canonicalización](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).
3. Activar indexación solo en las páginas públicas aprobadas. Confirmar respuesta HTTP correcta, ausencia de noindex accidental, assets accesibles y ausencia de bloqueos CDN/firewall al rastreador elegido.
4. Publicar únicamente URLs canónicas indexables en sitemap. Revisar redirecciones de URLs reemplazadas al migrar; no modificar el sitio existente antes de aprobar el plan de publicación.
5. Validar el HTML servido y los datos estructurados; comprobar menú, teléfonos y enlaces. Después verificar propiedad y rastreo en Search Console/Bing Webmaster Tools si existe autorización.
6. Para búsqueda en ChatGPT, `OAI-SearchBot` es el rastreador de búsqueda; permitirlo y no bloquear sus rangos oficiales cuando se publique. `GPTBot` es una decisión independiente sobre posible entrenamiento. `ChatGPT-User` no es el control de indexación de Search. No activar robots de entrenamiento por asociación ni asegurar posicionamiento. [Rastreadores OpenAI](https://developers.openai.com/api/docs/bots).
7. Mantener información comercial coherente y actualizada. Bing ofrece métricas de citas en AI Performance; estas no equivalen a posición/ranking ni cubren necesariamente toda respuesta. IndexNow puede notificar cambios en la versión pública, no es una acción necesaria para la preview. [Bing AI Performance](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/).

## Traslado futuro a Wix

Tratar esta especificación como contrato de contenido/SEO que se recrea y valida en Wix; no prometer que Next.js se importe como sitio nativo editable. Revisar primero el marcado que Wix genera para evitar duplicación contradictoria. Wix admite JSON-LD manual en Advanced SEO y documenta un límite de 7.000 caracteres por marcado y hasta cinco marcados por página. Configurar robots meta por página/tipo de página y verificar el HTML final. Mantener separados borrador y producción, sin publicar para "probar SEO". [JSON-LD en Wix](https://support.wix.com/en/article/adding-structured-data-markup-to-your-sites-pages-2546962), [Robots meta en Wix](https://support.wix.com/en/article/using-the-robots-meta-tag).

## Aceptación verificable antes de entregar la preview

- El build final mantiene `noindex`, aunque sea un build de producción.
- La respuesta/HTML no contiene canonical, sitemap público o URL de producción ficticios.
- El contenido esencial aparece sin ejecutar JavaScript.
- La preview no emite Restaurant incompleto, ratings, precios u ofertas no verificados.
- Se comprueban teclado, móvil, reducción de movimiento, enlaces y ausencia de errores.
- Se documenta qué se ha medido y qué sigue pendiente; ninguna promesa de indexación, ranking o citas de IA.

## Estado de este repositorio

Metadata privada emitida por `createPreviewMetadata()`; JSON-LD omitido. `createProductionSeoArtifacts` produce solo Brand/WebSite/WebPage con nombre verificado cuando se confirmen dominio/copy/lanzamiento; Restaurant/LocalBusiness requiere una validación adicional y no se fabrica. OG configurable solo con imagen aprobada del origen confirmado. Sitemap/robots se preparan fuera de carpetas servidas y jamás se activan por NODE_ENV. `_headers` añade directiva X-Robots-Tag para hosting compatible, pendiente de comprobar la cabecera real; no se afirma que Next estático la aplique por sí mismo. [Cloudflare: cabeceras de assets](https://developers.cloudflare.com/workers/static-assets/headers/).
