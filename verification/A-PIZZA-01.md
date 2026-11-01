# A-PIZZA-01 · parche mínimo v1.1

Hallazgo de Alfred relevado por padre: el CTA de /orbita llegaba al catálogo, pero foco#menu-title terminaba enBODY; reproducido375/1440 normal/reduced. Es QA externa real reportada, no ejecución propia.

Causa en código: focus() dentro deonClick seguido de navegación nativa dehref=#menu. El navegador aplica su comportamiento después y puede mover el foco aBODY al llegar a una sección no enfocable.

Cambio: encontrarheading ysection; si ambos existen, preventDefault(), replaceState#menu, scrollIntoViewinstant y focusheading conpreventScroll. ModificadoresCtrl/Meta/Shift/Alt conservan navegación nativa. Si destino falta, no cancelar el fallback nativo. Sin cambios de diseños, textos, catálogo, pagos niWix.

Evidencia nueva:47testsNodePASS (3regresiones añadidas), typecheckPASS, NextWebpackbuildPASS. Los3casos prueban orden/cancelación, clic modificado y destino ausente conDOMsimulado. No validan foco real de navegador. RetestAlfred375/1440 normal/reducedPENDIENTE.

Entregav1 preservada, no sustituida silenciosamente. Nueva entregaPizza_Orbita_React_Privado_v1.1_Foco.zip. FuenteOrbitHero, testlifecycle y export recompilado.
