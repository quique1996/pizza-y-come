'use client';
import {useEffect,useRef,useState} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {cinemaScenes,getCinemaFrame,getCanvasBackingSize} from '@/lib/cinema-model.mjs';
import ArrowIcon from './ArrowIcon';

export default function CinematicStory({reduced}:{reduced:boolean}){
 const section=useRef<HTMLElement>(null),stage=useRef<HTMLDivElement>(null),canvas=useRef<HTMLCanvasElement>(null),bar=useRef<HTMLDivElement>(null);
 const [enhanced,setEnhanced]=useState(false),[active,setActive]=useState(0),[compact,setCompact]=useState(false);
 useEffect(()=>{const query=window.matchMedia('(max-height: 650px)');const sync=()=>setCompact(query.matches);sync();query.addEventListener('change',sync);return()=>query.removeEventListener('change',sync);},[]);
 const jump=useRef<null|((index:number)=>void)>(null);
 useEffect(()=>{
  const root=section.current,view=stage.current,el=canvas.current;
  if(!root||!view||!el)return;
  const os=window.matchMedia('(prefers-reduced-motion: reduce)');
  setEnhanced(false);jump.current=null;
  if(reduced||os.matches||compact)return;
  const ctx=el.getContext('2d',{alpha:false});if(!ctx)return;
  gsap.registerPlugin(ScrollTrigger);
  let disposed=false,visible=false,raf=0,ready=false,cssWidth=1,cssHeight=1,ratio=1,lastActive=-1;
  let resizeObserver:ResizeObserver|undefined,tween:gsap.core.Tween|undefined,refreshFrame=0;
  const proxy={progress:0};
  const images:HTMLImageElement[]=[];
  const slice=new Image();slice.decoding='async';slice.src='/assets/flying-slice-concept-660.webp';
  const imageLoad=(src:string)=>new Promise<HTMLImageElement>((resolve,reject)=>{const image=new Image();image.decoding='async';image.onload=()=>resolve(image);image.onerror=()=>reject(new Error('image'));image.src=src;});
  const cover=(image:HTMLImageElement,zoom:number,pan:number,opacity:number)=>{
   if(!image.complete||!image.naturalWidth||opacity<=0)return;
   const scale=Math.max(cssWidth/image.naturalWidth,cssHeight/image.naturalHeight)*zoom;
   const width=image.naturalWidth*scale,height=image.naturalHeight*scale;
   ctx.globalAlpha=opacity;ctx.drawImage(image,(cssWidth-width)/2+pan,(cssHeight-height)/2,width,height);ctx.globalAlpha=1;
  };
  const draw=()=>{
   raf=0;if(disposed||!ready||!visible||document.hidden)return;
   const f=getCinemaFrame(proxy.progress);ctx.setTransform(ratio,0,0,ratio,0,0);ctx.fillStyle='#020303';ctx.fillRect(0,0,cssWidth,cssHeight);
   cover(images[f.index],1.05+f.local*.13,(f.local-.5)*cssWidth*.035,1);
   if(f.mix>0)cover(images[f.next],1.13-f.mix*.08,(.5-f.mix)*cssWidth*.035,f.mix);
   const shadow=ctx.createLinearGradient(0,0,cssWidth,0);shadow.addColorStop(0,'rgba(2,3,3,.86)');shadow.addColorStop(.5,'rgba(2,3,3,.18)');shadow.addColorStop(1,'rgba(2,3,3,.05)');ctx.fillStyle=shadow;ctx.fillRect(0,0,cssWidth,cssHeight);
   if(f.slice>0&&slice.complete&&slice.naturalWidth){const size=Math.min(cssWidth*.6,cssHeight*.86);ctx.save();ctx.translate(cssWidth*.68,cssHeight*(.58-(proxy.progress-.4)*.48));ctx.rotate((proxy.progress-.5)*-.45);ctx.globalAlpha=f.slice*.95;ctx.drawImage(slice,-size/2,-size/2,size,size);ctx.restore();}
   const bottom=ctx.createLinearGradient(0,cssHeight*.4,0,cssHeight);bottom.addColorStop(0,'rgba(2,3,3,0)');bottom.addColorStop(1,'rgba(2,3,3,.8)');ctx.fillStyle=bottom;ctx.fillRect(0,0,cssWidth,cssHeight);
   el.dataset.scene=cinemaScenes[f.active].id;el.dataset.progress=proxy.progress.toFixed(3);
   if(bar.current)bar.current.style.transform=`scaleY(${proxy.progress})`;
   if(f.active!==lastActive){lastActive=f.active;setActive(f.active);}
  };
  const schedule=()=>{if(!raf&&visible&&ready&&!document.hidden)raf=requestAnimationFrame(draw);};
  const resize=()=>{const r=view.getBoundingClientRect();cssWidth=r.width;cssHeight=r.height;const backing=getCanvasBackingSize(cssWidth,cssHeight,devicePixelRatio||1);el.width=backing.width;el.height=backing.height;ratio=backing.ratio;el.dataset.backingPixels=String(el.width*el.height);schedule();};
  const visibility=()=>{if(document.hidden&&raf){cancelAnimationFrame(raf);raf=0;}else schedule();};
  let started=false;
  const near=new IntersectionObserver(entries=>{
   if(!entries.some(entry=>entry.isIntersecting)||started)return;started=true;
   Promise.all(cinemaScenes.map(scene=>imageLoad(scene.src))).then(loaded=>{
    if(disposed)return;images.push(...loaded);ready=true;setEnhanced(true);
    refreshFrame=requestAnimationFrame(()=>{
     if(disposed)return;resize();resizeObserver=new ResizeObserver(resize);resizeObserver.observe(view);
     tween=gsap.to(proxy,{progress:1,ease:'none',onUpdate:schedule,scrollTrigger:{trigger:root,start:()=>`top top+=${window.innerWidth<900?78:88}`,end:'bottom bottom',scrub:.35,invalidateOnRefresh:true}});
     jump.current=index=>{const trigger=tween?.scrollTrigger;if(!trigger)return;const position=(index+.08)/3;window.scrollTo({top:trigger.start+(trigger.end-trigger.start)*position,behavior:'smooth'});};
     ScrollTrigger.refresh();schedule();
    });
   }).catch(()=>{if(!disposed){setEnhanced(false);root.dataset.canvasFallback='image-error';}});
  },{rootMargin:'800px 0px'});
  near.observe(root);
  const visibilityObserver=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(!visible&&raf){cancelAnimationFrame(raf);raf=0;}schedule();},{threshold:0});visibilityObserver.observe(view);
  document.addEventListener('visibilitychange',visibility);slice.onload=schedule;
  return()=>{disposed=true;ready=false;jump.current=null;if(raf)cancelAnimationFrame(raf);if(refreshFrame)cancelAnimationFrame(refreshFrame);near.disconnect();visibilityObserver.disconnect();resizeObserver?.disconnect();document.removeEventListener('visibilitychange',visibility);slice.onload=null;tween?.scrollTrigger?.kill();tween?.kill();el.width=1;el.height=1;};
 },[reduced,compact]);
 return <section ref={section} id="pelicula" className={`cinema-section ${enhanced&&!reduced&&!compact?'cinema-enhanced':'cinema-static'}`} aria-labelledby="cinema-title" data-renderer="canvas2d"><h2 id="cinema-title" className="sr-only">Del archivo al antojo: tres capítulos</h2><div className="cinema-sticky" ref={stage}><canvas ref={canvas} aria-hidden="true"/><div className="cinema-top"><span>UN PEQUEÑO RECORRIDO / TRES CAPÍTULOS</span><a href="#formatos">Saltar la historia <ArrowIcon direction="down"/></a></div><div className="cinema-rail" aria-hidden="true"><div ref={bar}/></div><div className="cinema-caption" aria-live="polite"><p className="eyebrow">{cinemaScenes[active].number} / {cinemaScenes[active].label}</p><h3>{cinemaScenes[active].title.map(line=><span key={line}>{line}</span>)}</h3><p>{cinemaScenes[active].description}</p><small>{cinemaScenes[active].note}</small></div><div className="cinema-controls" role="group" aria-label="Ir a un capítulo">{cinemaScenes.map((scene,index)=><button key={scene.id} aria-pressed={active===index} onClick={()=>jump.current?.(index)}><span>{scene.number}</span>{scene.label}</button>)}</div><div className="cinema-scroll-hint" aria-hidden="true">SIGUE BAJANDO<ArrowIcon direction="down"/></div></div><div className="cinema-fallback"><div className="cinema-fallback-intro"><p className="eyebrow">EL RECORRIDO, SIN MOVIMIENTO</p><h3>DEL ARCHIVO<br/><em>AL ANTOJO.</em></h3><a href="#formatos">Saltar la historia <ArrowIcon direction="down"/></a></div>{cinemaScenes.map(scene=><article key={scene.id} className="cinema-static-card"><img src={scene.src} width="960" height="1280" loading="lazy" alt={scene.alt}/><div><span>{scene.number} / {scene.label}</span><h3>{scene.title.join(' ')}</h3><p>{scene.description}</p><small>{scene.id==='pizza'?'Fotografía real del archivo de la marca':scene.note}</small></div></article>)}</div></section>
}
