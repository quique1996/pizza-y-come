# Dirección: Antojo fuera de órbita

## Componentes considerados

1. **Escena hero por capas**: rebanada flotante protagonista, disco rojo translúcido, órbitas finas, satélites geométricos y sello editorial. La silueta tiene alpha real y no necesita fondos pintados ni un logo inventado.
2. **Vuelo interactivo**: botón nativo accesible por teclado/touch, MotionPathPlugin real. El desplazamiento está acotado al área artística para no invadir navegación ni CTA. Capas separadas de entrada, puntero, vuelo y bob evitan animar simultáneamente la misma propiedad del mismo nodo.
3. **Selector de universos**: tres ideas editoriales de plan, no paquetes o recomendaciones comerciales. Selección cambia frase, foto de archivo y ticket; CTA selecciona una categoría existente y aterriza en el menú.
4. **Collage editorial**: fotografías originales en marcos inclinados y parallax moderado. El menú permanece tipográfico para no atribuir una imagen dudosa a cada receta.
5. **Regreso de la rebanada**: un eco visual en el cierre, no otra imagen redundante generada.

Se descartaron WebGL/canvas pesado, scroll hijacking, cursores personalizados que interfieren con controles, física continua sobre todo el documento y una librería visual adicional. GSAP existente cubre el movimiento con menor complejidad. MotionPath usa puntos acotados al tamaño de escena; quickTo se aplica solo con puntero fino y escritorio. `matchMedia` incluye una condición móvil explícita, además de desktop y reduced-motion.

## Accesibilidad y rendimiento

- El movimiento decorativo se pausa fuera de viewport y con pestaña oculta; contextos y listeners se revierten/retiran al cambiar preferencia.
- Control global de pausa y preferencia OS. En modo reducido, el botón de vuelo mantiene feedback textual sin mover la imagen. Ninguna animación oculta contenido de forma permanente.
- Imagen WebP 1100 px: aproximadamente 319 KB; alternativa móvil 660 px: aproximadamente 122 KB. Transparencia conservada (alpha 0–255). PNG original preservado solo en docs, no servido.
- No fondos de vídeo, dependencias nuevas ni llamadas a servicios en ejecución.

## Asset generado

Se eligió `exec-04566df2-7f8a-4275-b6e5-878afbeed472.png`, generado con la herramienta integrada image_gen. El original es RGBA, 1254 × 1254, alpha 0–255. Copia: `docs/design/flying-slice-original.png`. Se reencodificaron copias responsive a WebP con Sharp, sin cambios semánticos, preservando alpha. La alternativa facilitada por el coordinador (`libfile_ab82c32536008191a4fe1be18110150f`) se materializó e inspeccionó, pero no se incluyó: la seleccionada tiene una silueta limpia más adecuada para órbitas.

### Prompt final de la generación seleccionada

Use case: stylized-concept. Asset type: transparent-background hero cutout for a surreal pizza brand website. Primary request: a single delicious oversized slice of pepperoni pizza floating in zero gravity, dynamically lifted and slightly curled, tip toward lower left and golden crust toward upper right, seen in dramatic three-quarter view, full silhouette visible. A few elegant elastic mozzarella strands curl in open air under its tip, no connection to another pizza. Style: premium hyperreal 3D advertising still life, surreal and sculptural rather than a literal product photograph. Beautiful deeply baked golden crust, glossy rich tomato sauce, warm melted ivory cheese, 5 or 6 red pepperoni disks. Lighting: bold cinematic softbox highlights from upper left and subtle warm rim on the right, detailed tactile surface, no harsh black shadows. Composition: one slice occupies 85 percent of square image, centered with ample clean padding on all sides, diagonal upward energy, entire slice and cheese strands in frame. Background: truly transparent alpha; no ground plane, no plate, no solid backdrop, no cast shadow on a background. Constraints: no words, no branding, no logo, no people, no hands, no smoke, no fire, no extra floating toppings, no whole pizza, no utensils. This is an imaginative design illustration and not an actual product claim.

## Documentación primaria consultada

- https://gsap.com/docs/v3/GSAP/gsap.quickTo()/
- https://gsap.com/docs/v3/Plugins/MotionPathPlugin/
- https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/
- Documentación instalada de Next.js 16.4.3: static-exports.md y use-client.md.
