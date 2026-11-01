# Recorrido para Jorge y Hermes

Privado, no aprobado visualmente. Elegir variante después de verla, no fusionar automáticamente.

1. Comparar `/` y `/orbita/` a375x900 y1440x900, capturar portada y menú; comprobar scrollWidth<=clientWidth.
2. Identificar que es una propuesta sin pedidos/cobros; logo sin placa de fondo y rebanada declarada conceptual.
3. Tab/Shift+Tab por navegación/CTA; abrir y cerrar menú conEscape. El foco debe ser visible y volver al control.
4. ActivarCTA de portada: llegar al catálogo, leer heading/filtro/resultados; navegación nunca depende del canvas.
5. Activar reduced-motion antes de cargar y durante sesión. Sin entrada/parallax; contenido permanece.
6. Simular getContext nulo/error: texto/CTA/catalogo siguen visibles. No llamar «PASS» hasta ejecutarlo en navegador.
7. Ocultar/mostrar pestaña y salir/volver a ruta: sin animación sostenida ni listeners duplicados; comprobar Performance real.
8. Medir red local, LCP/CLS y coste de scroll con herramientas del navegador. Tamaño de export no equivale a estas métricas.
9. DesactivarJS: el catálogo completo y los límites siguen legibles; no aparentar filtros activos.
10. Verificar que no hay requests de negocio, forms, correo, WhatsApp ni checkout. Wix permanece desactivado.

## Material de René
`docs/CONTENT-SOURCES.md` referencia menú, portafolio, identidad y activos recuperados antes. El documento exacto de requisitos de René NO fue localizado/abierto en este trabajo: cobertura contra ese documento BLOCKED. No declarar «todos los requisitos». Hay29registros sin precios,4formatos, eventos documentales, FAQ y fotos; vigencia comercial requiere revisión.

## Frontera Wix
`lib/wix-ordering.mjs` permanece byte a byte igual al baseline, modo disabled/privatePreview. Ya tiene gates de sitio/URL/origen/configoperativa/activación. No crear otro checkout ni transferir carrito ficticio. La interfaz actual sólo explora catálogo. Antes de habilitar: confirmar sitio y producto contratado, URL/página, menú/precios/impuestos/entrega/pagos, prueba controlada y autorización explícita. Estos son pendientes, no comprobaciones realizadas ni nuevas conexiones.
