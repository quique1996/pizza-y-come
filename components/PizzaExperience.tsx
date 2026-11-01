'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import catalog from '@/lib/catalog.json';
import SurrealHero from './SurrealHero';
import PlanSelector from './PlanSelector';
import MoodboardHero from './MoodboardHero';
import OrbitHero from './OrbitHero';
import CinematicStory from './CinematicStory';
import {PizzaFormats,EventsSection,FAQSection} from './DiscoverySections';

const Arrow = ({ diagonal = false }: { diagonal?: boolean }) => <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d={diagonal ? 'M5 19 19 5M5 5h14v14' : 'M4 12h16m-7-7 7 7-7 7'} stroke="currentColor" strokeWidth="1.7" strokeLinecap="square"/></svg>;
const Star = () => <svg aria-hidden="true" viewBox="0 0 50 50" fill="currentColor"><path d="m25 0 5 17 15-10-10 15 15 3-16 5 10 15-15-10-4 15-5-16L5 44l10-15L0 25l17-5L7 5l15 10z"/></svg>;

export default function PizzaExperience({orbitVariant=false}:{orbitVariant?:boolean}) {
  const root = useRef<HTMLDivElement>(null);
  const navToggle = useRef<HTMLButtonElement>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [systemReduced, setSystemReduced] = useState(false);
  const [category, setCategory] = useState('pizzas');
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const [menuNavigation, setMenuNavigation] = useState(0);
  const pendingMenuScroll = useRef(false);
  const reduceMotion = systemReduced;
  const filtered = catalog.items.filter(item => item.category === category && `${item.name} ${item.description}`.toLocaleLowerCase('es').includes(query.toLocaleLowerCase('es')));
  const visibleItems = expanded || query ? filtered : filtered.slice(0, 6);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setSystemReduced(media.matches);
    sync(); media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!navOpen) return;
    root.current?.querySelector<HTMLAnchorElement>('#site-nav a')?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setNavOpen(false); navToggle.current?.focus(); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [navOpen]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    el.dataset.gsapVersion = gsap.version;
    const media = gsap.matchMedia();
    media.add({ desktop: '(min-width: 900px)', mobile: '(max-width: 899px)', osReduced: '(prefers-reduced-motion: reduce)' }, context => {
      if (context.conditions?.osReduced) return;
      const desktop = context.conditions?.desktop;
      gsap.to('.read-progress', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top top', end: 'bottom bottom', scrub: .2 } });
      gsap.utils.toArray<HTMLElement>('[data-reveal]:not(.gallery-figure:nth-child(2))', el).forEach(node => gsap.from(node, { y: desktop ? 50 : 24, opacity: 0, duration: .75, ease: 'power2.out', scrollTrigger: { trigger: node, start: 'top 94%', once: true } }));
      if (desktop) {
        gsap.fromTo('.closing-slice img', { y: 25, rotation: -12 }, { y: -25, rotation: 8, ease: 'none', scrollTrigger: { trigger: '.closing', start: 'top bottom', end: 'bottom top', scrub: .7 } });
        gsap.fromTo('.kitchen-photo img', { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: '.kitchen', start: 'top bottom', end: 'bottom top', scrub: .8 } });
        gsap.fromTo('.gallery-figure:nth-child(2)', { y: 55 }, { y: -35, ease: 'none', scrollTrigger: { trigger: '.gallery', start: 'top bottom', end: 'bottom top', scrub: .8 } });
      }
      // Decorative ticker only follows deliberate native scroll; no autonomous loop.
      gsap.to('.ticker-track', { xPercent: -15, ease: 'none', scrollTrigger: { trigger: '.ticker', start: 'top bottom', end: 'bottom top', scrub: .35 } });
    }, el);
    return () => media.revert();
  }, []);

  useEffect(() => {
    const previous = document.documentElement.style.scrollBehavior;
    document.documentElement.classList.toggle('motion-reduced', reduceMotion);
    // Native hash navigation stays instant: long smooth jumps can be interrupted by ScrollTrigger refresh.
    document.documentElement.style.scrollBehavior = 'auto';
    return () => { document.documentElement.style.scrollBehavior = previous; document.documentElement.classList.remove('motion-reduced'); };
  }, [reduceMotion]);

  useEffect(() => {
    let settle = 0;
    const frame = requestAnimationFrame(() => {
      if (!reduceMotion) ScrollTrigger.refresh();
      if (pendingMenuScroll.current) {
        pendingMenuScroll.current = false;
        settle = requestAnimationFrame(() => {
          document.getElementById('menu')?.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth', block: 'start' });
          window.history.replaceState(null, '', '#menu');
          document.getElementById('menu-title')?.focus({ preventScroll: true });
        });
      }
    });
    return () => { cancelAnimationFrame(frame); cancelAnimationFrame(settle); };
  }, [category, expanded, query, menuNavigation, reduceMotion]);

  const changeCategory = (value: string) => { setCategory(value); setExpanded(false); };
  const browseMenu = (category: string, query = '') => { pendingMenuScroll.current = true; changeCategory(category); setQuery(query); setMenuNavigation(value => value + 1); };

  return <div ref={root} className={`experience${reduceMotion ? ' motion-paused' : ''}`} data-motion={reduceMotion ? 'reduced' : 'full'} data-motion-engine="gsap">
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <div className="read-progress" aria-hidden="true"/>
    <div className="review-bar"><span>Propuesta privada · Next.js + GSAP</span><a href="#sobre-esta-vista">No recibe pedidos <span><Arrow diagonal/></span></a></div>
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="Pizza y Come, inicio"><img src="/assets/logo-original.png" alt="Pizza y Come" width="2250" height="2250"/></a>
      <nav id="site-nav" aria-label="Navegación principal" className={navOpen ? 'nav-open' : ''}>
        <a href="#menu" onClick={() => setNavOpen(false)}>El menú <span>01</span></a>
        <a href="#pelicula" onClick={() => setNavOpen(false)}>La película <span>02</span></a>
        <a href="#eventos" onClick={() => setNavOpen(false)}>Eventos <span>03</span></a>
      </nav>
      <div className="header-controls"><button ref={navToggle} className="menu-toggle" aria-controls="site-nav" aria-expanded={navOpen} onClick={() => setNavOpen(!navOpen)}>{navOpen ? 'Cerrar' : 'Menú'}<span aria-hidden="true">{navOpen ? '−' : '+'}</span></button></div>
    </header>
    <main id="contenido">
      {orbitVariant ? <OrbitHero reduced={reduceMotion}/> : <MoodboardHero reduced={reduceMotion}/>}
      <div className="ticker" aria-hidden="true"><div className="ticker-track">{[0,1].map(n => <div className="ticker-group" key={n}><span>PIZZA Y COME</span><Star/><span>FUERA DE ÓRBITA</span><Star/><span>DE OTRO PLAN</span><Star/></div>)}</div></div>
      <CinematicStory reduced={reduceMotion}/>
      <PizzaFormats onExplore={browseMenu}/>
      <section className="menu-section section-shell" id="menu" aria-labelledby="menu-title">
        <div className="section-top" data-reveal><p className="eyebrow">01 / Para empezar el plan</p><span className="section-tag">Catálogo de referencia</span></div>
        <div className="section-heading" data-reveal><h2 id="menu-title" tabIndex={-1}>¿DE QUÉ<br/><em>TRAES ANTOJO?</em></h2><p>Clásicos, especialidades y ese algo extra.<br/>Explora y encuentra tu siguiente elección.</p></div>
        <div className="catalog-controls"><div className="filters" role="group" aria-label="Filtrar menú por categoría">{catalog.categories.map(item => <button key={item.id} className={category===item.id ? 'active' : ''} aria-pressed={category===item.id} onClick={() => changeCategory(item.id)}>{item.label}<span>{catalog.items.filter(product => product.category===item.id).length.toString().padStart(2,'0')}</span></button>)}</div><label className="search-label"><span className="sr-only">Buscar en la categoría</span><input type="search" placeholder="¿Qué se te antoja?" value={query} onChange={e => setQuery(e.target.value)}/><svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg></label></div>
        <p className="results-note" role="status" aria-live="polite">{filtered.length} {filtered.length===1 ? 'opción' : 'opciones'} · {catalog.categories.find(item => item.id===category)?.label}</p>
        <div className="catalog-grid">{catalog.items.map(item => { const index=visibleItems.findIndex(visible=>visible.id===item.id); return <article className="menu-item" key={item.id} hidden={index<0} data-category={item.category}><span className="item-number">{String(index+1).padStart(2,'0')}</span><div><h3>{item.name}</h3><p>{item.description}</p></div></article>; })}</div>
        {filtered.length===0 && <div className="no-results"><h3>No encontramos esa combinación.</h3><p>Prueba otro nombre o cambia de categoría.</p><button onClick={() => setQuery('')}>Limpiar búsqueda</button></div>}
        {filtered.length>6 && !query && <button className="catalog-more" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? 'Ver menos opciones' : `Ver las ${filtered.length} opciones`}<span aria-hidden="true">{expanded ? '−' : '+'}</span></button>}
        <noscript><style>{`.catalog-controls,.catalog-grid,.results-note,.catalog-more{display:none!important}`}</style><section className="catalog-nojs" aria-labelledby="catalog-nojs-title"><h3 id="catalog-nojs-title">Carta de referencia completa</h3><p>Sin JavaScript, puedes leer todas las categorías a continuación.</p>{catalog.categories.map(group=><section key={group.id}><h4>{group.label}</h4><dl>{catalog.items.filter(item=>item.category===group.id).map(item=><div key={item.id}><dt>{item.name}</dt><dd>{item.description}</dd></div>)}</dl></section>)}</section></noscript>
        <div className="catalog-footnote"><span className="mini-cross" aria-hidden="true">+</span><p>Menú documental de septiembre de 2026. Ingredientes, presentaciones y disponibilidad actual por confirmar. Esta propuesta no muestra precios ni permite realizar pedidos.</p></div>
      </section>
      <PlanSelector reduced={reduceMotion} onExplore={browseMenu}/>
      <section className="kitchen" id="cocina" aria-labelledby="kitchen-title"><div className="kitchen-photo"><img src="/assets/manos-masa-960.webp" alt="Manos trabajando tiras de masa sobre una mesa de preparación" width="960" height="1280" loading="lazy"/><span className="photo-caption">Archivo de la marca / En la cocina</span></div><div className="kitchen-copy"><p className="eyebrow" data-reveal>02 / Detrás del antojo</p><h2 id="kitchen-title" data-reveal>ANTES DEL<br/>PRIMER<br/><em>MORDISCO.</em></h2><div className="kitchen-detail" data-reveal><Star/><p>Hay una mesa, unas manos<br/>y un plan que va tomando forma.</p></div><a className="text-link" href="#momentos">Dale una vuelta al plan <Arrow diagonal/></a><span className="kitchen-ghost" aria-hidden="true">COME</span></div></section>
      <section className="gallery section-shell" id="momentos" aria-labelledby="gallery-title"><div className="section-top" data-reveal><p className="eyebrow">03 / El resto lo pones tú</p><span className="section-tag">Momentos de archivo</span></div><div className="section-heading" data-reveal><h2 id="gallery-title">QUE NO FALTE<br/><em>QUÉ COMPARTIR.</em></h2><p>Una pizza al centro.<br/>El pretexto para quedarse un rato más.</p></div><div className="gallery-grid"><figure className="gallery-figure" data-reveal><div className="gallery-photo"><img src="/assets/salsa-masa-960.webp" width="960" height="1280" loading="lazy" alt="Preparación de una base de pizza con salsa"/></div><figcaption><span>EL INICIO DEL PLAN</span><span>01</span></figcaption></figure><figure className="gallery-figure" data-reveal><div className="gallery-photo"><img src="/assets/pizza-cajas-960.webp" width="960" height="1280" loading="lazy" alt="Pizza y cajas de Pizza y Come en una fotografía del archivo de marca"/></div><figcaption><span>AL CENTRO DE LA MESA</span><span>02</span></figcaption></figure><figure className="gallery-figure" data-reveal><div className="gallery-photo"><img src="/assets/palitos-queso-960.webp" width="960" height="1280" loading="lazy" alt="Palitos con queso fotografiados de cerca"/></div><figcaption><span>SIEMPRE CABE ALGO MÁS</span><span>03</span></figcaption></figure></div><p className="gallery-note">Fotografías editoriales de archivo; no representan fichas de producto ni disponibilidad vigente.</p></section>
      <EventsSection/>
      <SurrealHero reduced={reduceMotion}/>
      <FAQSection/>
      <section className="closing"><div className="closing-slice" aria-hidden="true"><div className="closing-ring"/><img src="/assets/flying-slice-concept-660.webp" alt="" width="660" height="660" loading="lazy"/></div><div className="closing-top"><span className="eyebrow">EL SIGUIENTE PLAN</span><Star/></div><h2 data-reveal>¿Y SI<br/>COMPARTIMOS<br/><span>PIZZA?</span></h2><a href="#menu" className="closing-link">Volver al menú <Arrow diagonal/></a></section>
      <section className="review-note section-shell" id="sobre-esta-vista"><h2>Sobre esta propuesta privada</h2><p>Identidad original y fotografías del archivo de Pizza y Come. Rebanada voladora: ilustración conceptual generada con IA, no fotografía del producto. Titulares y estructura: propuesta creativa. Catálogo basado en el menú de septiembre de 2026, sujeto a validación comercial. Sin pedidos, pagos, promociones activas ni datos de contacto no confirmados.</p><p>Animaciones con GSAP vinculadas al recorrido o a tus interacciones. Se respeta la preferencia de movimiento reducido de tu dispositivo; no hay bucles decorativos automáticos continuos.</p></section>
    </main>
    <footer className="site-footer"><a href="#inicio" className="brand footer-brand" aria-label="Pizza y Come, volver al inicio"><img src="/assets/logo-original.png" alt="Pizza y Come" width="2250" height="2250" loading="lazy"/></a><span>Pizza y Come / Propuesta privada 2026</span><a href="#inicio">Hasta arriba <Arrow diagonal/></a></footer>
  </div>;
}
