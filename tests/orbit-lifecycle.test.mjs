import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
import ts from 'typescript';
const source=fs.readFileSync('components/OrbitHero.tsx','utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}}).outputText;
function mount({reduced=false,canvasThrows=false,zeroHeight=false,osReduced=false}={}){
 let cleanup,frames=new Map(),next=0,disconnected=false,reverted=false,tweens=0,draws=0;
 const navigation=[];const heading={focus(options){navigation.push(["focus",options])}},section={scrollIntoView(options){navigation.push(["scroll",options])}};
 const listeners={window:new Map(),document:new Map()};
 const ctx={clearRect(){draws++},save(){},translate(){},rotate(){},strokeStyle:'',lineWidth:0,beginPath(){},ellipse(){},stroke(){},restore(){},setTransform(){}};
 const hero={getBoundingClientRect:()=>({width:375,height:zeroHeight?0:890,top:-90})};
 const canvas={getContext(){if(canvasThrows)throw Error('canvas denied');return ctx},width:0,height:0};
 const image={style:{translate:'',transform:'',opacity:''}};let ref=0;const refs=[hero,canvas,image];
 const window={history:{replaceState(a,b,url){navigation.push(["hash",url])}},devicePixelRatio:3,matchMedia:()=>({matches:osReduced}),addEventListener:(k,f)=>listeners.window.set(k,f),removeEventListener:k=>listeners.window.delete(k)};
 const document={getElementById:id=>id==="menu-title"?heading:id==="menu"?section:null,hidden:false,addEventListener:(k,f)=>listeners.document.set(k,f),removeEventListener:k=>listeners.document.delete(k)};
 const exports={};const sandbox={exports,require(name){if(name==='react')return {useRef:()=>({current:refs[ref++]}),useEffect:fn=>{cleanup=fn()}};if(name==='react/jsx-runtime')return {jsx:(type,props)=>({type,props}),jsxs:(type,props)=>({type,props})};if(name==='gsap')return {gsap:{context(fn){fn();return {revert(){reverted=true}}},fromTo(){tweens++;return {pause(){},resume(){}}}}};return {}},window,document,IntersectionObserver:class{constructor(fn){this.fn=fn}observe(){this.fn([{isIntersecting:true}])}disconnect(){disconnected=true}},requestAnimationFrame:f=>{frames.set(++next,f);return next},cancelAnimationFrame:id=>frames.delete(id)};
 vm.runInNewContext(compiled,sandbox);const tree=exports.default({reduced});
 return {cleanup,frames,listeners,image,canvas,document,tree,navigation,stats:()=>({disconnected,reverted,tweens,draws}),flush(){for(const[id,f]of [...frames]){frames.delete(id);f()}},emit(where,event){listeners[where].get(event)?.()}};
}
test('Orbit initialises one pending frame, caps DPR, and draws without an endless loop',()=>{const h=mount();assert.equal(h.frames.size,1);assert.equal(h.canvas.width,563);h.flush();assert.equal(h.frames.size,0);assert.equal(h.stats().draws,1);h.cleanup()});
test('Orbit hidden document cancels pending render and resumes on visibility',()=>{const h=mount();h.document.hidden=true;h.emit('document','visibilitychange');assert.equal(h.frames.size,0);h.document.hidden=false;h.emit('document','visibilitychange');assert.equal(h.frames.size,1);h.cleanup()});
test('Orbit reduced-motion skips GSAP entrance and scroll translation',()=>{const h=mount({reduced:true});h.emit('window','scroll');assert.equal(h.stats().tweens,0);assert.equal(h.image.style.translate,'');h.cleanup()});
test('Orbit scroll schedules at most one frame and bounded translation',()=>{const h=mount();for(let i=0;i<50;i++)h.emit('window','scroll');assert.equal(h.frames.size,1);assert.ok(!h.image.style.translate.includes('NaN'));h.cleanup()});
test('Orbit canvas denied still cleans up without breaking native content',()=>{const h=mount({canvasThrows:true});assert.equal(h.frames.size,0);h.emit('window','resize');h.cleanup();assert.ok(h.stats().reverted)});
test('Orbit zero-height measurement never creates Infinity/NaN',()=>{const h=mount({zeroHeight:true});h.emit('window','scroll');assert.ok(!/Infinity|NaN/.test(h.image.style.translate));assert.equal(h.canvas.height,2);h.cleanup()});
test('Orbit unmount removes listeners, observer, frame and transforms',()=>{const h=mount();h.emit('window','scroll');h.cleanup();assert.equal(h.listeners.window.size,0);assert.equal(h.listeners.document.size,0);assert.equal(h.frames.size,0);assert.ok(h.stats().disconnected);assert.ok(h.stats().reverted);assert.equal(h.image.style.translate,'')});
test('Orbit remount produces independent lifecycle, not retained globals',()=>{const a=mount();a.cleanup();const b=mount();assert.equal(b.listeners.window.size,2);assert.equal(b.stats().tweens,1);b.cleanup()});

test('Orbit honours OS reduced-motion before parent hydration updates',()=>{const h=mount({reduced:false,osReduced:true});assert.equal(h.stats().tweens,0);h.emit('window','scroll');assert.equal(h.image.style.translate,'');h.cleanup()});

function findCTA(node){if(!node)return null;if(node.type==='a'&&node.props.className==='orbit-pill')return node;for(const child of [node.props?.children].flat(Infinity)){const found=findCTA(child);if(found)return found}return null}
test('A-PIZZA-01: CTA cancels native hash jump then focuses menu title after scroll',()=>{const h=mount();let prevented=false;const a=findCTA(h.tree);assert.equal(a.props.href,'#menu');a.props.onClick({preventDefault(){prevented=true}});assert.ok(prevented);assert.deepEqual(h.navigation.map(x=>x[0]),['hash','scroll','focus']);assert.equal(h.navigation[0][1],'#menu');assert.equal(h.navigation[2][1].preventScroll,true);h.cleanup()});
test('A-PIZZA-01: modified click retains native link semantics and does not steal focus',()=>{const h=mount();let prevented=false;findCTA(h.tree).props.onClick({ctrlKey:true,preventDefault(){prevented=true}});assert.equal(prevented,false);assert.equal(h.navigation.length,0);h.cleanup()});
test('A-PIZZA-01: missing target retains native fallback without claiming focus',()=>{const h=mount();h.document.getElementById=()=>null;let prevented=false;findCTA(h.tree).props.onClick({preventDefault(){prevented=true}});assert.equal(prevented,false);assert.equal(h.navigation.length,0);h.cleanup()});
