# Pizza y Come — Kazari confirmado y hallazgos de diseño

Verificado el 28 de octubre de 2026 en navegador Chrome cloud con capturas reales.

## Referencia correcta

**Quique confirmó https://kazarisushi.mx/**. Descarta el candidato anterior kazari-kzr.jp: es otro negocio y no debe orientar el diseño.

Páginas observadas directamente:
- https://kazarisushi.mx/
- https://kazarisushi.mx/menu
- https://kazarisushi.mx/menu#entradas

La herramienta de lectura web no pudo extraer la home, pero la inspección directa de UI solicitada funcionó. No se copiaron imágenes, vídeos, código, textos ni otros activos del referente.

## Home: lo observado

- Negro casi puro a pantalla completa, producto gastronómico fotoreal aislado: pieza de sushi en palillos sobre plato.
- Plano macro fijo con una acción muy pequeña y sensorial: la salsa cae y se acumula. No hay cámara libre ni escena 3D interactiva.
- Marca discreta y textos serif breves se funden al lateral, dejando enorme espacio negativo.
- Guía de scroll inferior y rail de progreso vertical fino a la derecha.
- Cierre con acciones de carta, reserva y localización. La reserva estaba deshabilitada.
- Los enlaces del cierre no son ovalados; radio computado 0px. Los botones pill son una petición adicional de Quique, no algo que haya que copiar de Kazari.

### Evidencia técnica de scroll

Viewport observado: 1180 × 757. Documento: 3179px de altura (aprox. 4,2 pantallas). Un canvas de 1920 × 1058 y un vídeo de 6,041667 segundos. El vídeo permanecía pausado mientras su currentTime seguía al scroll:

| Scroll Y | Tiempo de vídeo observado |
| --- | --- |
| 397px | 1,083333s |
| 1431px | 4,416666s |
| 2407px | 6,0s |

Esto verifica una secuencia audiovisual vinculada al avance del scroll; el lienzo presenta la secuencia. Funcionó en este navegador aun cuando WebGL estaba deshabilitado en otras demos. La técnica precisa de renderizado interno no se inspeccionó ni se debe inventar.

### Capturas reales revisadas

1. Hero: producto completo y salsa inicial.
2. Progreso intermedio: producto persistente, salsa más avanzada y relevo de texto lateral.
3. Final: producto y plato permanecen, aparecen acciones comerciales a la izquierda.

## Carta: componentes observados

En https://kazarisushi.mx/menu:
- Cabecera fija muy discreta con marca, identificador de carta y regreso a experiencia.
- Segundo hero audiovisual: salsa vertida sobre un plato. Fallback/carga inicial visible y luego imagen real renderizada.
- Introducción editorial asimétrica: titular serif enorme a la izquierda y foto vertical de manos del chef a la derecha.
- Índice numerado de 13 categorías.
- Sección ingrediente/origen y una secuencia editorial dedicada al chef.
- Catálogo con navegación lateral sticky, títulos de categoría grandes, filas separadas por líneas y columnas nombre/descripción/precio.
- Fotografías de producto intercaladas como pausas visuales; no un grid repetitivo de cards.
- Notas de disponibilidad y producto al pie.

El click sobre una categoría cambió la URL a #entradas y desplazó la vista a la sección correcta. Se verificó con captura del índice lateral y la tabla editorial de platos.

## Responsive: qué se verificó y qué no

Se observaron reglas CSS entregadas por la página para max-width 980px y 760px, y reglas prefers-reduced-motion. No se realizó captura en viewport móvil: la API de navegador expuesta no ofrece redimensionado/emulación. No afirmar que se ha probado el comportamiento móvil de Kazari.

## Traducción original para Pizza y Come

### Dirección visual corregida

**Cine gastronómico fotoreal + ritmo editorial**, no caricatura ni portfolio de vídeos. Mantener identidad propia de Pizza y Come. Usar fotos o medios propios/autorizados; no descargar ni reutilizar el sushi, la salsa, logos o imágenes de Kazari.

### Hero / relato

Un producto principal sobre un fondo oscuro, encuadre generoso y 3–4 estados controlados por scroll. Ideas originales: pizza o porción con queso; vapor del horno; ingredientes asentándose; corte final. Es preferible una acción sensorial coherente a una explosión de formas/partículas.

Si no hay vídeo propio, un canvas con capas fotográficas propias puede comunicar profundidad y transición; no presentarlo como vídeo fotoreal si no lo es. Usar transformaciones sobrias de escala, recorte, luz y desplazamiento, y evitar un aspecto de pizza ilustrada si se busca el acabado del referente.

Textos laterales cortos en HTML, fundidos por fases; título y CTA accesibles sin esperar toda la animación. Permitir «Saltar historia» o ir a carta. Timeline reversible con scroll normal, no bloqueo de navegación. Aproximadamente 350–450vh es suficiente para un relato breve.

### Ampliación de secciones

1. Hero cinematográfico con producto protagonista.
2. Relato del proceso y su transición a CTA.
3. Introducción editorial sobre la pizza con fotografía asimétrica.
4. Carta por categorías con **pills** (solicitud de Quique).
5. Ingrediente protagonista / detalle de preparación respaldado por datos reales.
6. Sección del horno o equipo, con composición grande y editorial.
7. Galería del producto y ambiente con alternancia de tamaños.
8. Complementos, bebidas o postres existentes en la carta real.
9. Ubicación, horarios y contacto confirmados.
10. FAQ y cierre comercial.

No inventar reseñas, premios, precios, cifras, servicios, horarios ni promociones.

### Componentes y acabado

- Todos los controles de acción ovalados (999px): CTA, tabs, filtros, menú móvil, cerrar/volver y controles de diálogos.
- Jerarquía tipográfica editorial; combinación de serif de carácter para titulares y sans legible para datos; usar tipografías disponibles/autorizadas propias.
- Rail de progreso sobrio, numeración de capítulos discreta, líneas separadoras y mucho espacio negativo.
- Alternar bloques oscuros y cálidos según identidad de Pizza y Come, sin copiar la paleta/composición exacta.
- Carta accesible y comprensible sin efectos; filtros reales y estados vacíos claros.

### QA imprescindible

- Canvas2D o fallback funcional ante falta de WebGL; no loaders infinitos.
- Texto/CTA HTML accesibles; contraste y foco visibles.
- prefers-reduced-motion: contenido completo con vista estática y navegación normal.
- Móvil real del sitio propio: lienzo reencuadrado, texto no superpuesto al producto, acciones táctiles >=44px.
- Limitar DPR; parar requestAnimationFrame fuera de viewport/pestaña; manejar resize.
- Probar scroll hacia delante y atrás, teclado, menú, filtros, enlaces y errores de consola.

