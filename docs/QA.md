# QA — 28 octubre 2026

## Ejecutado

- Instalación real de dependencias desde npm. Primer intento falló por caché fuera del directorio permitido; se corrigió a `/tmp/pizza-next-npm-cache`, instalación final exitosa.
- `next build`: compilación, TypeScript y exportación de `/` y 404 completadas.
- `npm run typecheck`: sin errores.
- `npm audit --omit=dev --audit-level=high`: cero vulnerabilidades conocidas reportadas por el registro en esta comprobación (no equivale a una auditoría de seguridad).
- `npm test`: 12/12 pruebas pasadas (la primera corrida tuvo una expectativa literal incorrecta `no permite`/`ni permite`, corregida; no era fallo de la aplicación).
- GSAP instalado 3.15.0, importado y registrado con ScrollTrigger. No se usa motor nativo como sustituto.
- Hashes de logo y siete archivos de imagen utilizados iguales al candidato V3.
- Catálogo 29 registros, sin precios; cantidades por categoría 13/5/7/4.
- No rutas de checkout/pagos, contactos operativos, formularios, fetch de negocio o campañas activas.
- Site nuevo: acceso `custom`, propietario único, cero visitantes externos/grupos/editors, verificado antes de publicar.

## Navegador

Revisión independiente en Chromium mediante Sites Preview:

- Escritorio: portada, menú y recorrido cocina/galería/cierre.
- Reflow a 391 y 320 píxeles CSS mediante redimensionado normal y zoom: sin overflow horizontal ni recortes de headings, botones o inputs; scrollWidth igual a clientWidth. No es emulación de hardware móvil.
- Filtros de categoría, búsqueda, resultado vacío y limpiar: operativos.
- Menú móvil abre/cierra; Escape devuelve foco al control.
- Pausa y persistencia tras recarga: operativas.
- CTA corregido a tinta #020303 sobre rojo #e52321: contraste calculado/verificado 4.52:1.
- Eliminados signos + decorativos de las fichas para no aparentar desplegables.
- Recalculo ScrollTrigger tras cambios de catálogo.

No se ejecutó emulación de prefers-reduced-motion en el navegador; su rama, matchMedia y reglas CSS se verificaron en código/pruebas estáticas. No equivale a Safari/iPhone físico.

## Límites

Sin auditoría formal WCAG/Lighthouse. No se probaron teléfonos físicos, Safari, lectores de pantalla ni condiciones de red móvil. Los productos y derechos requieren validación antes de una versión pública.

## Iteración surreal — pruebas técnicas

- 16/16 pruebas: las 12 anteriores adaptadas a componentes separados, más condición móvil real, controles nativos, transparencia de ambas imágenes responsive, etiquetado conceptual y navegación coordinada con el catálogo.
- TypeScript revalidado sin errores tras reanudación.
- Condición `mobile` explícita para que MotionPath funcione en dispositivos de puntero grueso; `fine` solo controla la respuesta al puntero.
- WebP con alpha real, original PNG privado preservado; no se alteraron fotografías ni logo original.
- Pausa persistida comprobada en lógica de los tres componentes, no solo en hero.
- Revisión independiente de esta iteración en Chromium: escritorio, 390 y 320 píxeles CSS mediante redimensionado + zoom, sin overflow horizontal, controles mínimos de 44 px.
- Enter en Hazla volar: transformación real y estado Vuelo 1. Pausa por Space: bob, vuelo y satélites detenidos; botón en modo reducido mantiene feedback textual sin movimiento.
- Selector con teclado cambia ARIA, fotografía y copy. CTA cambia categoría, aterriza a la primera en #menu y enfoca título tanto activo como pausado (posición superior aproximadamente 84 px en móvil).
- Menú retesteado tras corrección: Enter enfoca El menú; Tab llega a La cocina; Escape cierra y devuelve foco a Menú.
- Flechas reemplazadas por SVG para eliminar cuadros tofu detectados en el navegador de QA. Separación «Gira el plan. No...» corregida para móvil.
- La preferencia manual de pausa fuerza scroll-behavior auto y evita refresh de ScrollTrigger; se verificó auto a 320 px.
- Emulación OS de prefers-reduced-motion mediante DevTools: DENEGADA por política de la organización. No se intentó bypass. La rama OS queda verificada en código, no probada dinámicamente; la pausa manual sí fue ejercitada.
- Sin bloqueadores visuales graves en recorrido, cierre legible a 320 px. No prueba de Safari/iPhone físico.

- Revisor independiente ejecutó `npm test`: 16/16 PASS. QA de la iteración cerrado antes del build final.

## Iteración cinematográfica — Canvas, moodboard y ampliación

### Verificado técnicamente

- `next build`: Next16.4.3, compilación y exportación estática completadas. TypeScript sin errores.
- 24/24 pruebas automatizadas: catálogo/activos previos, modelo de3 capítulos y límites de progreso, etiqueta IA durante toda presencia de capa, backing store máximo2.4M píxeles, DPR1.25/1.5, lifecycle/fallback estático, controles semánticos, vista de baja altura, fuentes y contenido documentado.
- HTML exportado inicial contiene tres tarjetas fotográficas completas sin depender de JavaScript y un solo H1. Es verificación de salida, no una prueba de navegación con JS deshabilitado.
- Canvas2D sin WebGL; RAF por invalidación y visibilidad, cancelación y limpieza de observers/tween/listeners. No se afirma FPS/Lighthouse medido.
- Nuevas fotos siguen siendo binariamente las del V3; no se extrajeron assets del referente Kazari.
- Permanent Marker se distribuye bajo Apache-2.0, no OFL. Licencia y atribución incluidas. Anton mantiene SIL OFL.

### Correcciones de la revisión independiente

- Capa IA desaparece antes de que la leyenda cambie a foto real de mesa; se testea el rango con2000 muestras.
- Continuidad matemática de escala/desplazamiento al final de crossfade.
- Viewport corto observado389×505 CSS: los botones quedaban bajo el recorte del sticky. Corregido con fallback estático CSS y matchMedia a altura≤650px, sin tween/canvas activo. No se fuerzan controles fuera de la ventana.
- Etiquetas móviles aumentadas: controles capítulo10px, párrafo12px, nota9px; números activos en tinta sobre crema.
- Retest baja altura389×505: fallback visible, sticky oculto y canvas1×1. Eliminado el consumo de canvas fuera de uso.
- Navegación larga desde FAQ a inicio tras resize detectó interrupción de smooth nativo. Se eliminó smooth global: enlaces hash nativos instantáneos y predecibles, conservando el relato scrub al scroll normal; no se añade interceptación de rueda/touch.
- A320 CSS: logo/copy legibles, overflow horizontal0. FAQ abre con Enter; menú móvil Enter enfoca primer enlace, Tab siguiente y Escape devuelve foco.

### Cierre independiente de navegador

- Revisor independiente:24/24 pruebas PASS.
- Chromium1180/389/320 píxeles CSS mediante ventana/zoom: overflow horizontal0; menú, FAQ y formato→catálogo operativos.
- Regreso desde FAQ a#inicio a320×432: PASS, heroTop84/y24 con scroll-behavior auto.
- Canvas recupera modo enhanced al volver a561×757 (breakpoint móvil); controles dentro del viewport, capítulo02 mediante Enter PASS. Escritorio permite capítulos01/02/03 y scroll normal adelante/atrás.
- Pausa dentro del relato: tarjetas estáticas, canvas1×1, sin sticky vacío. Preferencia de OS reduced-motion verificada en código, no emulada por restricción del entorno.
- Composición revisada contra moodboard: más cercana por fotografía cálida a sangre, logotipo original dominante, brush y negro/crema/rojo; no se afirma reproducción exacta.
- Sin bloqueadores observados al cerrar; se restauró viewport1180×757, zoom100% y animaciones activas. Sin benchmark FPS/Core Web Vitals ni prueba de Safari/teléfonos físicos.

## Ajuste puntual: logo de navbar sin fondo

- Cambio de aplicación limitado a dos declaraciones CSS: fondo transparente del contenedor y variante blanca del PNG original para contraste sobre negro. No se altera archivo, tamaño, layout, hero, footer, contenido ni animaciones.
- QA independiente Chromium a1180/390/320px: fondo computed transparente; logo legible, sin recorte; cajas conservadas146×71,116×62 y97×58. Overflow horizontal0.
- Enlace menú→logo con Enter vuelve a#inicio/top84. Menú móvil Enter enfoca primer enlace, Tab llega a película y Escape regresa al control. Hero visualmente intacto.
- 25/25 pruebas de regresión; nueva comprobación específica de fondo transparente y variante clara. Mismos límites de navegador físico/auditoría descritos arriba.

## Controles de movimiento, SEO privado y preparación Wix

- Se inspeccionó la captura IMG_3531.jpeg: muestra la navbar móvil de la versión anterior, con pastilla crema y Pausar. La navbar actual mantiene fondo transparente y geometría original clara en todos los breakpoints.
- Eliminado botón global, estado manual y almacenamiento de pausa. No quedan repeat:-1: ticker, flotación y estrella siguen el scroll; entradas breves y vuelo iniciado por el visitante terminan antes de 5 s. Preferencia OS reduced-motion permanece; no se afirma conformidad WCAG completa.
- Build exportado con robots y googlebot noindex,nofollow,noimageindex; OG factual sin URL/imagen no confirmadas; un H1; sin canonical, JSON-LD, robots.txt, sitemap.xml o llms.txt servidos.
- Catálogo de 29 presente en HTML, artículos filtrados con hidden; añadido noscript desde la misma fuente para carta completa sin JavaScript. La variante sinJS se valida estructuralmente, no mediante deshabilitación en navegador.
- Revisión SEO independiente aprobó metadata/HTML; guard de script offline corregido para anclar carpetas servidas a raíz del repo incluso ejecutado desde otro CWD. Dominios placeholder/proveedor-preview rechazados. Preparación no activa publicación/indexación ni se ejecuta con build.
- _headers solicita X-Robots-Tag para static hosting compatible; no se da por comprobada la cabecera HTTP entregada. La protección real sigue siendo acceso owner-only y meta noindex como directiva adicional.
- Adaptador Wix probado inerte por defecto y bloqueado en preview, sin SDK, solicitudes, credenciales, pedidos o cobros. Guía oficial documenta pendientes de sitio/canal, plan/proveedor y contrato Restaurants→CartV2.

### Cierre de QA de esta entrega

- Revisión independiente: desktop 1180×757, 390×505 y 320×432 CSS; logo blanco sin placa, control de pausa ausente, overflow horizontal 0.
- Menú Enter→primer enlace, Tab→segundo, Escape→control; logo vuelve a inicio. Catálogo: 29 artículos HTML, 6 visibles iniciales; Combos 5, búsqueda vacía 0, limpiar 5, expandir Pizzas 13.
- Vuelo mediante Enter mantiene feedback y termina. Ticker, bob, estrella y satélites permanecen idénticos en dos muestras separadas aproximadamente 15 segundos sin interacción.
- Revisor ejecutó 34/34 pruebas PASS; se añade prueba final de prioridad exclusiva del hero y lazy loading de ilustración inferior (35 en total).
- Último build verifica además noscript completo en HTML. No se emuló JS-off ni OS-reduced por restricciones del entorno; no benchmark FPS/Core Web Vitals. X-Robots-Tag está configurado, no verificado como cabecera HTTP efectiva.
