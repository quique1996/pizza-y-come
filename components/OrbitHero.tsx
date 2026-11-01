'use client';
import {useEffect,useRef} from 'react';
import {gsap} from 'gsap';
import ArrowIcon from './ArrowIcon';
import './orbit-hero.css';

/** Private v1.3 study port. Decorative canvas never owns navigation or business state. */
export default function OrbitHero({reduced}:{reduced:boolean}) {
 const hero=useRef<HTMLElement>(null),canvas=useRef<HTMLCanvasElement>(null),slice=useRef<HTMLImageElement>(null);
 useEffect(()=>{
  const host=hero.current,c=canvas.current,img=slice.current;if(!host||!c||!img)return;
  let ctx:CanvasRenderingContext2D|null=null;try{ctx=c.getContext('2d')}catch{/* native content remains usable */}
  const motionReduced=reduced||window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let entrance:ReturnType<typeof gsap.fromTo>|undefined;
  let frame=0,visible=true,width=1,height=1,progress=0;
  const draw=()=>{frame=0;if(!ctx)return;ctx.clearRect(0,0,width,height);ctx.save();ctx.translate(width*.69,height*.52);ctx.rotate(-.35+(motionReduced?0:progress*.15));ctx.strokeStyle='rgba(238,65,43,.38)';ctx.lineWidth=1;for(let i=0;i<3;i++){ctx.beginPath();ctx.ellipse(0,0,width*(.28+i*.045),height*(.16+i*.065),0,0,Math.PI*2);ctx.stroke()}ctx.restore()};
  const requestDraw=()=>{if(ctx&&!frame&&visible&&!document.hidden)frame=requestAnimationFrame(draw)};
  const resize=()=>{const box=host.getBoundingClientRect();width=Math.max(1,box.width);height=Math.max(1,box.height);const dpr=Math.min(window.devicePixelRatio||1,1.5);c.width=Math.round(width*dpr);c.height=Math.round(height*dpr);ctx?.setTransform(dpr,0,0,dpr,0,0);requestDraw()};
  const scroll=()=>{if(!visible||document.hidden)return;progress=Math.min(1,Math.max(0,-host.getBoundingClientRect().top/height));if(!motionReduced){img.style.translate=`0 ${progress*-95}px`;requestDraw()}};
  const visibility=()=>{if(document.hidden){entrance?.pause();if(frame){cancelAnimationFrame(frame);frame=0}}else{entrance?.resume();requestDraw()}};
  const observer=typeof IntersectionObserver!=='undefined'?new IntersectionObserver(es=>{visible=es[0]?.isIntersecting??false;if(visible)requestDraw();else if(frame){cancelAnimationFrame(frame);frame=0}}):null;
  observer?.observe(host);window.addEventListener('resize',resize,{passive:true});window.addEventListener('scroll',scroll,{passive:true});document.addEventListener('visibilitychange',visibility);
  // Motion is scroll-driven only; no autonomous decorative loop and no animation control to expose.
  const context=gsap.context(()=>{if(!motionReduced&&!document.hidden)entrance=gsap.fromTo(img,{y:28,rotation:-17,opacity:0},{y:0,rotation:-12,opacity:1,duration:1.35,ease:'power3.out',clearProps:'transform,opacity'})},host);
  resize();
  return()=>{context.revert();observer?.disconnect();window.removeEventListener('resize',resize);window.removeEventListener('scroll',scroll);document.removeEventListener('visibilitychange',visibility);if(frame)cancelAnimationFrame(frame);img.style.translate='';img.style.transform='';img.style.opacity=''};
 },[reduced]);
 return <section ref={hero} className="orbit-study" id="inicio" aria-labelledby="orbit-title">
  <canvas ref={canvas} aria-hidden="true"/>
  <p className="orbit-eyebrow">Pizza y Come / Estudio privado Órbita</p>
  <div className="orbit-headline"><h1 id="orbit-title">FUERA DE<br/><em>ÓRBITA.</em></h1><p className="orbit-sub">Una nueva forma de<br/>abrir el apetito.</p><a className="orbit-pill" href="#menu" onClick={event=>{
   if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
   const heading=document.getElementById('menu-title'),section=document.getElementById('menu');
   if(!heading||!section)return; // Keep native hash fallback when hydration/target is unavailable.
   event.preventDefault(); // Native #menu navigation would move focus back off #menu-title.
   window.history.replaceState(null,'','#menu');
   section.scrollIntoView({behavior:'instant',block:'start'});
   heading.focus({preventScroll:true});
  }}>Explorar menú de referencia <ArrowIcon/></a></div>
  <div className="orbit-scene" aria-hidden="true"><div className="orbit-glow"/><img ref={slice} className="orbit-slice" src="/assets/orbita-study-pizza.webp" alt="" width="1100" height="1100" fetchPriority="high" decoding="async"/><span className="orbit-crumb orbit-c1"/><span className="orbit-crumb orbit-c2"/><span className="orbit-crumb orbit-c3"/></div>
  <div className="orbit-foot"><span>Desliza para explorar</span><span>Imagen conceptual · Sin pedidos ni cobros</span></div>
 </section>
}
