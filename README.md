# Pizza y Come · Órbita React v1.1

Código para revisión y edición privada de la propuesta web Pizza y Come. Esta entrega conserva la portada anterior en `/` y añade la variante Órbita en `/orbita/`, con corrección de foco del CTA. No es una tienda operativa ni una aprobación de lanzamiento.

## Para Jorge: empezar aquí

1. Clona este repositorio privado y entra a su carpeta.
2. Usa Node.js 20.9 o posterior y ejecuta:

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 3000
```

3. Abre `http://127.0.0.1:3000/orbita/`. Compara con `http://127.0.0.1:3000/`.
4. Cambia código en una rama y abre un pull request; explica qué cambiaste y adjunta capturas de escritorio/móvil. No hace falta publicar para revisar.

`npm ci` descarga las dependencias fijadas en `package-lock.json`; no se necesita ninguna clave de API. No añadas credenciales ni `.env` al repositorio. El comando anterior limita el servidor a tu equipo; `npm run dev` sin `--host` no lo limita.

## Validación y exportación

```sh
npm run typecheck
npm test
npx --no-install next build --webpack
python3 -m http.server 8765 --bind 127.0.0.1 --directory out
```

El build genera `out/`; revisa `http://127.0.0.1:8765/orbita/`. La raíz del proyecto no debe servirse como sitio. Webpack permite la verificación con dependencias locales enlazadas. La instalación limpia de dependencias no se ha repetido en esta revisión.

Revisión del 1 de noviembre de 2026: 47 pruebas automáticas y TypeScript pasan. Son pruebas Node/contratos/estructura, no 47 pruebas de navegador. La evidencia histórica está en `verification/`; el recorrido manual está en `verification/ACEPTACION_JORGE.md`. No se certifica todavía accesibilidad completa, rendimiento real ni aceptación visual.

## Dónde editar

- Hero Órbita: `components/OrbitHero.tsx` y `components/orbit-hero.css`.
- Ruta de la variante: `app/orbita/page.tsx`.
- Navegación y experiencia común: `components/PizzaExperience.tsx`.
- Portada anterior: `components/MoodboardHero.tsx` y `components/SurrealHero.tsx`.
- Secciones y catálogo: `components/DiscoverySections.tsx`, `lib/catalog.json`.
- Estilos compartidos: `app/globals.css`, `app/cinema.css`, `app/discovery.css`.
- Activos locales: `public/assets/`; licencias y trazabilidad: `docs/`.

## Estado y límites

- Catálogo documental de 29 registros, sin precios ni disponibilidad confirmada. Validar vigencia con el negocio antes de publicar.
- Logo y fotografías de referencia suministrados; la rebanada ilustrada es conceptual, no foto comercial del producto.
- Wix permanece desconectado y el adaptador desactivado. No hay pedidos, carrito, cobros, formularios ni analítica activos.
- No se han cambiado Wix, dominios ni servicios de producción al preparar esta entrega.
- El repositorio debe permanecer privado. `noindex` no protege el acceso; una futura preview compartida requiere control de acceso real.
- Derechos de publicación de fotos/fuentes, contactos, requisitos exactos del negocio y aprobación de lanzamiento siguen pendientes. No copiar material de otros proyectos.

## Siguientes pasos

1. Revisar ambas portadas en móvil, iPad y escritorio; decidir cuál continuar sin reemplazar automáticamente la anterior.
2. Comprobar teclado, foco del CTA/menú, overflow, movimiento reducido, fallo de canvas y navegación sin JavaScript según la guía.
3. Confirmar catálogo, identidad, requisitos y derechos con el negocio.
4. Medir LCP/CLS, coste de animación y accesibilidad en navegador real.
5. Si se decide conectar Wix, verificar sitio y plan existentes, URL de pedidos, configuración comercial y una prueba controlada. No activar pagos ni publicación como parte de una revisión de diseño.

## Comentarios y colaboración

Crea un Issue por cambio o problema: ruta/pantalla, dispositivo y tamaño, pasos, resultado esperado/actual y captura. Para cambios de código usa un pull request y comentarios sobre líneas concretas. No pongas claves, información de clientes ni datos personales en Issues o capturas. Quien mantenga el repositorio debe revisar y fusionar los cambios; no se necesita force-push.

## Procedencia

Base exacta: `Pizza_Orbita_React_Privado_v1.1_Foco.zip`, SHA-256 `473f6e4019f91ba5cda8b276b9963bc2270f5c8d6d0c20ea2983018f907fc151`.

La preparación para GitHub cambia documentación, no la aplicación. `README_ORBITA.md` describe la variante; `README_BASE_HISTORICO.md` conserva el README previo. `manifest.json` es el inventario histórico del ZIP original, no un inventario de esta preparación. No se incluyen dependencias instaladas ni productos de compilación en Git.
