# Next.js externo + Wix Restaurants: rutas y condiciones

Investigación de documentación oficial consultada el 28-oct-2026. No se han conectado, comprado, activado ni modificado servicios. No se ha inspeccionado una cuenta/sitio concreto. Es un diseño de integración, no una certificación de que la cuenta del usuario esté lista para cobrar.

## Recomendación inmediata

**Primera fase: Next.js para marca/contenido + página de pedidos Wix Restaurants Orders alojada por Wix.** La web externa puede enlazar al canal oficial ya existente, una vez verificado sitio, URL y permiso de activación. Wix conserva la selección real, horarios, entrega/recogida, pedido y pago. No transmite automáticamente un carrito local: hasta construir y probar la integración, el visitante deberá elegir sus productos en Wix. Evitar CTA comercial activo en la preview y no afirmar que la muestra crea pedidos.

**Segunda fase opcional: frontend Next.js headless + APIs + checkout Wix alojado.** Wix documenta que un sitio existente puede servir de backend a un frontend externo; no obliga a migrar ni sustituir el sitio Wix. A cambio, el proyecto administra hosting, sesiones y autenticación. [Self-managed headless](https://dev.wix.com/docs/go-headless/self-managed-headless/about-self-managed-headless).

**No recomendar ahora:** recrear cobro con tarjeta en Next.js, importar pedidos como sustituto del checkout, ni migrar el frontend live antes de comprobar compatibilidad. La migración Wix cambia el único frontend vivo, oculta páginas antiguas y exige revisar redirecciones y apps; no es necesaria para la ruta externa. [Migración de frontend](https://support.wix.com/en/article/wix-headless-moving-your-site-to-a-custom-frontend).

## Requisitos para habilitar el enlace alojado

1. Identificar el sitio y restaurante correctos y verificar la URL pública real de pedidos (HTTPS, dominio esperado, sin destinos arbitrarios ni URLs inventadas).
2. Confirmar que están instaladas y configuradas **Wix Restaurants Menus + Wix Restaurants Orders**; el menú solo no crea un sistema de pedidos.
3. Verificar menú/precios/modificadores reales, al menos un método de fulfillment, área y tarifa de entrega, mínimos, horario, anticipación/cierres, impuestos y políticas.
4. Comprobar plan con pedidos/pagos habilitados, proveedor y métodos activos, moneda compatible y estado de verificación/cobros del negocio. No comprar ni activar nada para superar este requisito.
5. Probar el flujo autorizado hasta el paso previo a confirmar un pedido/cargo; solo una prueba explícitamente autorizada puede crear un pedido real. Verificar móvil, volver/abandonar, fuera de horario y dirección no servida.
6. Entonces activar el CTA con copy claro: «Pedir en Wix» / «Continuar al pedido seguro». No presentar confirmación local como pago.

La instalación de Orders incorpora páginas de pedido/seguimiento; se requiere al menos un método de entrega/recogida/dine-in habilitado. [Configuración oficial](https://support.wix.com/en/article/wix-restaurants-adding-and-setting-up-wix-restaurants-orders-new).

## Arquitectura headless si se autoriza posteriormente

### Catálogo y disponibilidad

- `@wix/restaurants`: jerarquía Menus → Sections → Items, con variantes de precio, grupos de extras, modificadores y etiquetas. Tener el elemento visible no equivale a disponible para pedir; disponibilidad de menú, sección e ítem debe permitirlo en conjunto. [Menus API](https://dev.wix.com/docs/api-reference/business-solutions/restaurants/menus/introduction?apiView=SDK).
- Conservar identificadores, ubicación y orden del catálogo; no convertir pizzas a Wix Stores por comodidad. La referencia oficial de Orders usa `appId: 9a5d83fd-8570-482e-81ab-cfa88942ee60`, `catalogItemId` y opciones `operationId`, `menuId`, `sectionId`. Ese ejemplo describe sincronización/importación de pedidos, no prueba que cualquier payload inventado complete un checkout de restaurante. [Sample flows Orders](https://dev.wix.com/docs/api-reference/business-solutions/restaurants/online-orders/sample-flows).
- Consultar operación, método y franja; Operations calcula fechas/franjas disponibles. Para delivery necesita dirección y solo considera métodos que la sirvan. Parte de estos métodos figura **Developer Preview** y con permisos de gestión: tratar el acceso como backend restringido, fijar versión SDK y probar el contrato real. [Operations API](https://dev.wix.com/docs/api-reference/business-solutions/restaurants/online-orders/operations/query-operation?apiView=SDK).
- Menu Ordering Settings vincula cada menú con una operación y expone disponibilidad para una franja. [Disponibilidad por menú](https://dev.wix.com/docs/api-reference/business-solutions/restaurants/online-orders/menu-ordering-settings/query-menu-ordering-settings).

### Carrito, precios y checkout

- **Nuevo desarrollo: evaluar Cart V2.** Wix anuncia retirada de Cart V1 y Checkout V1 el **1-feb-2027**. V2 unifica ambos; no copiar tutoriales antiguos sin migración. [Purchase Flow](https://dev.wix.com/docs/api-reference/business-solutions/e-commerce/purchase-flow/introduction).
- Mantener carrito por identidad de visitante/miembro, referencias de catálogo y cantidades. El servidor/Wix debe ser autoridad de precios, descuentos, impuestos y disponibilidad. Los ítems personalizados omiten validación del catálogo y no son sustituto seguro del menú.
- `Calculate Cart` devuelve totales y violaciones; bloquear errores. `Get Checkout URL` produce la URL Wix predeterminada salvo override. El REST documentado es `POST /ecom/v2/carts/{cartId}/get-checkout-url` (scope `Read Carts V2 (PII)`). [Cart V2](https://dev.wix.com/docs/api-reference/business-solutions/e-commerce/purchase-flow/cart-v2/introduction).
- **No deducir «pagado» de Place Order ni del retorno de navegador.** La guía de migración dice que el cobro directo vía `startPayment()` requiere Velo en Wix, y recomienda checkout hospedado para headless/backend externo. Hay textos genéricos que dicen que Place Order «may charge»; esa diferencia refuerza probar el flujo exacto y no asumir confirmación. [Guía Cart V2](https://dev.wix.com/docs/api-reference/business-solutions/e-commerce/purchase-flow/cart-v2/cart-object).
- Las páginas hospedadas/Redirects permiten volver al frontend. Deben configurarse los dominios de retorno permitidos; callbacks de login requieren URI exacta. Los ejemplos de Redirects aún pueden mostrar Checkout V1: validar V2 antes de implementar. [Páginas Wix](https://dev.wix.com/docs/go-headless/business-solutions/wix-hosted-pages/about-wix-hosted-pages), [allowlist](https://dev.wix.com/docs/go-headless/authentication/setup/allow-redirect-uris-and-domains).

### Autenticación y secretos

Para Next.js no existe autenticación automática de la integración Astro. Cliente OAuth por frontend; client ID público para visitante/miembro. Tokens de visitante mantienen su carrito. Credenciales administrativas (client secret para `client_credentials` o API key con ámbito correcto) solo backend, jamás `NEXT_PUBLIC_*`, bundle, repositorio o logs. Aplicar mínimo permiso y limitar sitio. No usar una identidad admin como carrito compartido de todos los compradores. La documentación reciente recomienda client credentials para administración del propio sitio y API key para casos administrativos adicionales. [Autenticación actual](https://dev.wix.com/docs/go-headless/authentication/about-authentication), [métodos/permisos](https://dev.wix.com/docs/overview/auth-permissions/authentication-methods).

### Confirmación, seguridad y operación

Preferir checkout Wix: Next.js no recibe PAN/CVV. Wix declara cumplimiento PCI DSS; esto no convierte automáticamente toda la app del comerciante en compliant ni elimina sus obligaciones de seguridad/privacidad. [PCI Wix Payments](https://support.wix.com/en/article/wix-payments-and-pci-compliance).

Si se añade sincronización: endpoint HTTPS, verificar JWT firmado de Wix con la clave pública configurada, validar instancia/sitio y tipo de evento; deduplicar por ID, persistir antes de procesar y tolerar orden diferente/reintentos. Consultar estado real del pedido/pago; no confiar en query strings de éxito. Reducir PII y logs. Wix describe entrega al menos una vez; la documentación de webhooks exige respuesta 200 rápida y contempla duplicados. [Eventos](https://dev.wix.com/docs/overview/backend-services/events), [Webhooks](https://dev.wix.com/docs/build-apps/develop-your-app/api-integrations/events-and-webhooks/about-webhooks).

## Límites y costes a verificar en la cuenta

- Wix permite hasta 5 páginas de pedido; un menú pertenece a una página y una compra solo usa una página. [Páginas adicionales](https://support.wix.com/en/article/wix-restaurants-creating-another-online-ordering-page).
- Restaurantes no mezcla sus ítems en una compra con Stores/Bookings; la guía de carrito dice deshabilitar express checkout para Restaurant Orders. No prometer Apple Pay/Google Pay sin verificar disponibilidad concreta del checkout/proveedor. [Carrito](https://support.wix.com/en/article/customizing-your-stores-cart-page).
- Se puede mostrar menú gratis, pero pedidos y pagos requieren upgrade. Headless puede iniciarse gratis; cobros/dominio personalizado requieren plan. Revisar el plan ya contratado y asignado al sitio: no presuponer que una segunda web tiene cubierto otro backend. [Restaurants](https://support.wix.com/en/article/about-wix-restaurants), [Headless overview](https://support.wix.com/en/article/wix-headless-an-overview).
- «Commission-free» describe la comisión de pedidos, **no** elimina suscripción, procesamiento de pagos, dominio, hosting externo, extras, reembolsos/chargebacks, reparto ni impuestos. [Oferta Restaurants](https://www.wix.com/restaurant/website).
- Verificar país, moneda, proveedor, renovación vs promoción, impuestos de factura, dominio y hosting actual. No hay importe mensual único verificable sin mercado/cuenta/ciclo.
- El proveedor necesita configuración/verificación bancaria y empresarial; «Accepting Payments» no necesariamente significa que pueda recibir payouts. Solicitar al propietario completar pasos sensibles si faltan, sin pedir documentos o datos bancarios por chat. [Estados de cuenta](https://support.wix.com/en/article/understanding-the-status-of-your-wix-payments-account).

## Resultado y pendientes reales

La ruta alojada es viable por documentación y reduce alcance/riesgo. La ruta headless es técnicamente plausible con APIs oficiales, pero el contrato exacto Restaurants → Cart V2 (variantes/extras, franja y delivery), permisos disponibles y retorno seguro requieren prueba de integración con el sitio concreto. No afirmar que ya está conectado ni que el checkout funciona. Para la preview actual: adaptador tipado cerrado por defecto; ninguna URL comercial inferida; ningún secreto, llamada de compra o modificación remota.

## Estado implementado en este repositorio

`lib/wix-ordering.mjs` resuelve únicamente un enlace HTTPS verificado. Configuración inicial: disabled/privatePreview=true; no URL comercial. Requiere sitio, origen/página, operación y activación confirmados; rechaza URLs con credenciales, queries de redirect o destino distinto. No hace llamadas, ni simula órdenes/pagos. La UI no lo activa. `tests/seo-ordering.test.mjs` prueba los cierres y los rechazos. El contrato Restaurants→CartV2 queda pendiente de validación real, no implementado.
