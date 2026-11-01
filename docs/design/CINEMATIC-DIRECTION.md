# Un plan en cada rebanada — dirección cinematográfica

28 octubre 2026. Se responde a la petición de más secciones, cinematic scroll down con canvas, botones ovalados y mayor fidelidad al moodboard aprobado.

## Composición

1. Portada negra con fotografía real cálida a sangre, logotipo original en variante crema dominante, gesto manuscrito y doble CTA ovalado.
2. Relato de tres capítulos con Canvas2D y scroll nativo: mesa de trabajo → primer plano → punto de encuentro. Referente de ritmo: Kazari Sushi (https://kazarisushi.mx/), observado en navegador; no se toman sus assets ni código.
3. Formatos con selector de cuatro presentaciones y esquemas originales; CTA filtra carta.
4. Carta de 29 registros, búsqueda, categorías pill y expansión; precios ausentes porque no están vigentes confirmados.
5. Selector editorial de planes sobre crema/rojo, cocina y galería fotográfica.
6. Cuatro modalidades de eventos de la fuente de abril de 2026.
7. Interludio rojo con rebanada IA flotante e interacción de vuelo; explícitamente creativo, no producto real.
8. FAQ nativo accesible y cierre editorial.

El amarillo queda como acento. No se repite el esquema orbital-tech como hero principal. Las diagonales y gesto manuscrito están en composición/fotografía, nunca deformando el logo.

## Contrato de movimiento

- GSAP/ScrollTrigger real. Canvas2D dibuja foto, pan/zoom/crossfade y capa IA. No vídeo, WebGL ni supuesta simulación 3D.
- Enlaces hash nativos instantáneos para evitar interrupciones al saltar grandes distancias. Scroll normal del documento; CSS sticky, sin interceptar wheel/touch, sin snap obligatorio. Enlaces para saltar historia y tres botones de capítulo.
- Preferencia de movimiento reducido del dispositivo o viewport de hasta650px de altura (zoom/landscape): tres tarjetas estáticas de fotos + texto HTML. No se carga la secuencia ni se crea tween. Error de context/image mantiene fallback.
- Render bajo invalidación, no loop perpetuo: un RAF pendiente como máximo, solo visible y pestaña activa; cada scroll/update/resize invalida.
- DPR máximo1.25 móvil/1.5 escritorio; backing máximo2400×1600 y2.4M pixels. Observers/tween/RAF/listeners con cleanup.
- Fotos decodificadas async, carga próxima a viewport; hero prioritario, otras fotos lazy. Sin autoplay de vídeo, sin librería3D.
- La segunda escena rotula composición IA durante toda presencia de la rebanada. En la tercera ya no existe capa IA.

Estas son decisiones y límites implementados, no una medición de FPS/Lighthouse. Ver QA para las verificaciones reales.

## Actualización de controles

Se retira el botón visible de pausa por solicitud del usuario. No se dejan bucles automáticos continuos sin control: ticker, flotación y estrella ahora siguen el scroll; vuelo solo por interacción y entradas breves. Preferencia OS reduced-motion preservada. No equivale a una auditoría WCAG completa.
