'use client';
import {useEffect, useRef, useState} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {MotionPathPlugin} from 'gsap/MotionPathPlugin';
import ArrowIcon from './ArrowIcon';

export default function SurrealHero({reduced}: {reduced: boolean}) {
  const scene = useRef<HTMLElement>(null);
  const launch = useRef<null | (() => void)>(null);
  const [flights,setFlights] = useState(0);
  const [status,setStatus] = useState('Haz que el antojo despegue.');

  useEffect(() => {
    const el=scene.current;
    if(!el)return;
    gsap.registerPlugin(ScrollTrigger,MotionPathPlugin);
    const mm=gsap.matchMedia();
    mm.add({desktop:'(min-width: 900px)',mobile:'(max-width: 899px)',fine:'(pointer: fine)',osReduced:'(prefers-reduced-motion: reduce)'},ctx=>{
      if(reduced||ctx.conditions?.osReduced){launch.current=null;return;}
      const stage=el.querySelector<HTMLElement>('.orbit-stage')!;
      const flight=el.querySelector<HTMLElement>('.pizza-flight')!;
      const pointer=el.querySelector<HTMLElement>('.pizza-pointer')!;
      const entry=gsap.timeline({defaults:{ease:'power3.out'}});
      entry.from('.surreal-line > span',{yPercent:115,rotate:3,duration:1.05,stagger:.11})
        .from('.pizza-arrival',{opacity:0,scale:.65,rotate:-18,y:70,duration:1.5},.1)
        .from('.surreal-intro, .surreal-actions, .orbit-controls',{opacity:0,y:18,duration:.7,stagger:.1},.6)
        .from('.orbit-ring, .orbit-caption',{opacity:0,duration:1},.3);
      // No perpetual autoplay: floating and accent motion follow native scroll only.
      gsap.fromTo('.pizza-bob',{y:12,rotation:-3},{y:-12,rotation:3,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:.6}});
      gsap.to('.orbit-star',{rotation:-70,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:.6}});
      const flightTimeline=gsap.timeline({paused:true}).to(flight,{
        motionPath:{path:[{x:0,y:0},{x:stage.clientWidth*.09,y:-55},{x:-stage.clientWidth*.1,y:-90},{x:-25,y:22},{x:0,y:0}],curviness:1.3},
        duration:2.3,ease:'power1.inOut'
      }).to(flight,{scale:1.07,rotation:-11,duration:.75,ease:'sine.inOut',yoyo:true,repeat:1},0);
      launch.current=()=>flightTimeline.restart();
      let move: ((event: PointerEvent)=>void)|undefined;
      let leave: (()=>void)|undefined;
      if(ctx.conditions?.desktop&&ctx.conditions?.fine){
        const xTo=gsap.quickTo(pointer,'x',{duration:.75,ease:'power3.out'});
        const yTo=gsap.quickTo(pointer,'y',{duration:.75,ease:'power3.out'});
        move=event=>{const r=stage.getBoundingClientRect();xTo(((event.clientX-r.left)/r.width-.5)*24);yTo(((event.clientY-r.top)/r.height-.5)*20);};
        leave=()=>{xTo(0);yTo(0);};
        stage.addEventListener('pointermove',move);stage.addEventListener('pointerleave',leave);
      }
      return()=>{launch.current=null;if(move)stage.removeEventListener('pointermove',move);if(leave)stage.removeEventListener('pointerleave',leave);};
    },el);
    return()=>mm.revert();
  },[reduced]);

  const fly=()=>{
    const next=flights+1;setFlights(next);
    const osReduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduced||osReduced||!launch.current){setStatus(`Órbita ${next} lista. El movimiento está desactivado.`);return;}
    launch.current();setStatus(`Vuelo ${next}. La gravedad puede esperar.`);
  };

  return <section ref={scene} className="surreal-hero" id="vuelo" aria-labelledby="flight-title" data-concept="surreal-illustration">
    <div className="cosmic-grid" aria-hidden="true"/>
    <div className="surreal-copy"><p className="eyebrow surreal-intro"><span className="short-rule"/> Un interludio / Imaginación en movimiento</p><h2 id="flight-title"><span className="surreal-line"><span>ANTOJO</span></span><span className="surreal-line"><span>FUERA DE</span></span><span className="surreal-line"><span><em>ÓRBITA.</em></span></span></h2><p className="surreal-description surreal-intro">Los pies en la tierra.<br/>La pizza, donde la imaginación quiera.</p><div className="surreal-actions"><a className="button button-yellow" href="#menu">Aterrizar en el menú <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 12h16m-7-7 7 7-7 7"/></svg></a><a className="surreal-text-link" href="#plan">Cambiar de dimensión <span><ArrowIcon direction="down-right"/></span></a></div></div>
    <div className="orbit-stage">
      <div className="orbit-disk" aria-hidden="true"/>
      <div className="orbit-ring ring-one" aria-hidden="true"/><div className="orbit-ring ring-two" aria-hidden="true"/>
      <div className="orbit-satellites" aria-hidden="true"><span className="satellite satellite-a"/><span className="satellite satellite-b"/><span className="satellite-label">SIN GRAVEDAD</span></div>
      <span className="orbit-coordinate coordinate-top" aria-hidden="true">PYC / 00:00</span><span className="orbit-coordinate coordinate-right" aria-hidden="true">EL ANTOJO NO TIENE ÓRBITA FIJA</span>
      <div className="pizza-arrival"><div className="pizza-pointer"><div className="pizza-flight"><div className="pizza-bob"><img src="/assets/flying-slice-concept.webp" srcSet="/assets/flying-slice-concept-660.webp 660w, /assets/flying-slice-concept.webp 1100w" sizes="(max-width: 599px) 90vw, (max-width: 899px) 70vw, 48vw" width="1100" height="1100" loading="lazy" decoding="async" alt="Ilustración conceptual generada con IA: una rebanada de pizza flota con hilos de queso. No es fotografía del producto."/></div></div></div></div>
      <svg className="orbit-star" aria-hidden="true" viewBox="0 0 50 50"><path d="m25 0 5 17 15-10-10 15 15 3-16 5 10 15-15-10-4 15-5-16L5 44l10-15L0 25l17-5L7 5l15 10z"/></svg><div className="orbit-caption" aria-hidden="true"><span>LA GRAVEDAD</span><strong>PUEDE ESPERAR.</strong></div>
      <div className="orbit-controls"><button className="launch-button" onClick={fly}><svg aria-hidden="true" viewBox="0 0 28 28"><path d="m5 23 18-18M5 5h18v18"/></svg><span>{reduced ? 'Activar otra órbita' : 'Hazla volar'}<small>{reduced ? 'Modo sin movimiento' : 'Toca y cambia la trayectoria'}</small></span></button><p className="flight-status" role="status" aria-live="polite">{status}</p></div>
    </div>
    <div className="surreal-footer"><a href="#plan"><span><ArrowIcon direction="down"/></span> Aquí empieza otra cosa.</a><p>Visual creativo con IA · no es fotografía de producto</p><span aria-hidden="true">SCROLL TO EXPLORE / 01</span></div>
  </section>;
}
