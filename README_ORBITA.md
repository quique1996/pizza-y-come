> Revisión v1.1: parche A-PIZZA-01 de foco del CTA.47tests offline + typecheck/buildPASS. Retest de navegadorPENDIENTE. Ver verification/A-PIZZA-01.md. Los44tests descritos abajo corresponden a la entrega v1 histórica.

# Pizza y Come · Órbita React · candidato privado aislado

Ejecución 30oct2026 UTC. Nueva variante `/orbita/` sobre copia del candidato Next existente; `/` sigue seleccionando el hero previo. **No reemplaza la versión aprobada, no está publicado, no conecta Wix ni recibe pedidos/cobros.**

## Ver sin instalar
`out/` es exportación estática completa ya compilada. En una máquina autorizada, servir esa carpeta sólo en loopback: `python3 -m http.server 8765 --bind 127.0.0.1 --directory out`. Abrir `http://127.0.0.1:8765/orbita/`; comparación anterior en `/`. No abrir acceso público/túneles. Noindex no sustituye autenticación. Para detener un servidor iniciado con este comando, Ctrl+C en su propia terminal; no tocar servicios previos.

## Fuentes y reconstrucción
Código React/Next/TypeScript/GSAP, lockfile y assets locales incluidos. Sin node_modules, .next, credenciales ni datos personales. `npm ci` restaura dependencias del lockfile y necesita registro/red; NO se ejecutó una instalación nueva en esta entrega. Aquí se reutilizaron dependencias existentes, verificación con Next16.4.3/React19.3.1/GSAP3.15.0/TS5.9.3. Comprobar lockfile antes de restaurar.

Pruebas: `npm run typecheck`; `npm test`; `npx --no-install next build --webpack`. Webpack se eligió porque Turbopack rechazó la resolución de dependencia enlazada fuera de raíz. No se bajó versión ni se instalaron paquetes. El source admite instalaciones locales normales; la prueba no certifica todos los entornos.

## Delta
- Port de la composición Órbita v1.3 a componente cliente React con refs y cleanup.
- Nueva ruta privada para comparar, sin cambiar el entrypoint de `/`.
- Mantiene catálogo documental29registros, cocina, formatos, eventos y límites del candidato existente. Sin precios ni disponibilidad inventados.
- CTA ovalado al menú de referencia y foco al heading. No botón de animación.
- Canvas decorativo, DPR máximo1.5, render por eventos sin loop continuo, cancela frame con pestaña oculta; GSAP de entrada pausa/reanuda al ocultar/mostrar.
- Respeta movimiento reducido también antes de que el estado padre se actualice tras hidratación. Fallo de canvas no elimina HTML/CTA.
- Rebanada conceptual original del estudio; no fotografía real del producto. PNG logo original/no fondo permanece.
- Selectores CSS prefijados; no sustituyen paleta ni tipografía oficial. Port conserva colores/Impact de estudio; candidato base usa Anton editorial con licencia, no font oficial. Revisión visual pendiente antes de escoger portada.

## Evidencia y límites
Build/export + typecheck completados;44tests Node pasan,9nuevos prueban lifecycle con DOM simulado. Los otros35 cubren contratos/estáticos del candidato y export. **No44pruebas de navegador ni WCAG.** El harness anterior sumaba prioridades de dos componentes mutuamente excluyentes; se corrigió para comprobar una imagen de alta prioridad por hero y por HTML exportado. Se conserva el fallo inicial y diff, no se ocultó.

Navegador375/1440, teclado real, Lighthouse/LCP y coste real de animación: **BLOCKED/NOT_RUN aquí**, restricción Chromium previa. No se repitió ni eludió el bloqueo. Un test de44px/DOM no mide tacto real. Guía de revisión: `verification/ACEPTACION_JORGE.md`.

`verification/provenance.json` acredita que los52archivos baseline comprobados en original permanecieron intactos. `docs/QA.md` y demás documentos base son históricos, NO QA nueva de esta variante. `verification/` contiene resultados nuevos y mapa de tareas.
