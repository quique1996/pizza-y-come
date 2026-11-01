'use client';

import { useState } from 'react';
import catalog from '@/lib/catalog.json';

const menuItem = (id: string) => catalog.items.find(item => item.id === id);
const formats = [
  {
    id: 'clasica', label: 'Clásica', title: 'EL PUNTO\nDE PARTIDA.', query: '',
    name: 'Clásica', description: 'Pepperoni y Hawaiana aparecen entre las opciones clásicas del menú de referencia.',
    detail: 'Pepperoni: salsa clásica de tomate, mezcla de quesos y pepperoni. Hawaiana: la misma base, con jamón y piña.',
    caption: 'Dos opciones documentadas', action: 'Ver las pizzas',
  },
  {
    id: 'sarten', label: 'Sartén', title: 'OTRA FORMA\nDE ELEGIR.', query: 'Sartén',
    name: menuItem('pizzas-05')?.name ?? 'Sartén',
    description: menuItem('pizzas-05')?.description ?? '',
    detail: 'El documento no especifica aquí diámetro, grosor o equivalencias entre presentaciones.',
    caption: 'Siete opciones en la referencia', action: 'Ver Sartén',
  },
  {
    id: 'bocaditos', label: 'Orilla bocaditos', title: 'EL BORDE\nTAMBIÉN CUENTA.', query: 'Orilla bocaditos',
    name: menuItem('pizzas-13')?.name ?? 'Orilla bocaditos',
    description: menuItem('pizzas-13')?.description ?? '',
    detail: 'La composición de la ficha individual y su disponibilidad actual requieren confirmación.',
    caption: 'Una presentación por explorar', action: 'Ver Orilla bocaditos',
  },
  {
    id: 'cuatro', label: '4x4', title: 'CUATRO\nEN EL MISMO PLAN.', query: '4x4',
    name: menuItem('pizzas-12')?.name ?? '4x4',
    description: menuItem('pizzas-12')?.description ?? '',
    detail: 'No se asignan sabores a los cuadrantes: el menú no identifica la combinación.',
    caption: 'Cuatro especialidades por confirmar', action: 'Ver 4x4',
  },
];

function OutwardArrow() {
  return <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.6"/></svg>;
}

function FormatDiagram({ variant }: { variant: string }) {
  return <svg className="discovery-diagram" aria-hidden="true" viewBox="0 0 360 360" fill="none">
    <circle cx="180" cy="180" r="135" stroke="currentColor" strokeWidth={variant === 'sarten' ? 15 : 4}/>
    <circle cx="180" cy="180" r="115" stroke="currentColor" strokeWidth="1.5" strokeDasharray={variant === 'bocaditos' ? '3 11' : undefined}/>
    {variant === 'bocaditos' ? Array.from({ length: 16 }, (_, index) => {
      const angle = index * Math.PI / 8;
      return <ellipse key={index} cx={180 + Math.cos(angle) * 135} cy={180 + Math.sin(angle) * 135} rx="13" ry="7" transform={`rotate(${index * 22.5 + 90} ${180 + Math.cos(angle) * 135} ${180 + Math.sin(angle) * 135})`} fill="var(--red)" stroke="currentColor" strokeWidth="2"/>;
    }) : null}
    {variant === 'cuatro' ? <><path d="M180 64v232M64 180h232" stroke="currentColor" strokeWidth="3"/><path d="M196 82a100 100 0 0 1 82 82M278 196a100 100 0 0 1-82 82M164 278a100 100 0 0 1-82-82M82 164a100 100 0 0 1 82-82" stroke="currentColor" strokeWidth="8"/></> : <><path d="m180 180 94-94M180 180 128 128M180 180 315 180M180 180 105 285M180 180 60 145" stroke="currentColor" strokeWidth="1.5"/><circle cx="139" cy="113" r="12" stroke="currentColor" strokeWidth="2"/><circle cx="232" cy="154" r="15" stroke="currentColor" strokeWidth="2"/><circle cx="155" cy="240" r="14" stroke="currentColor" strokeWidth="2"/></>}
    <path d="M34 51h31M49 36v31M294 306h31M309 291v31" stroke="currentColor" strokeWidth="2"/>
  </svg>;
}

export function PizzaFormats({ onExplore }: { onExplore: (category: string, query?: string) => void }) {
  const [selected, setSelected] = useState(0);
  const format = formats[selected];
  return <section className="discovery-formats" id="formatos" aria-labelledby="formats-title">
    <div className="discovery-format-head" data-reveal><p className="eyebrow">EL MENÚ, DESDE OTRO ÁNGULO</p><h2 id="formats-title">UN ANTOJO.<br/><span>DISTINTAS FORMAS.</span></h2><p>No todo se decide por el sabor.<br/>Explora las presentaciones documentadas.</p></div>
    <div className="discovery-format-picker" role="group" aria-label="Explorar formatos de pizza">{formats.map((item, index) => <button key={item.id} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}><span>0{index + 1}</span>{item.label}</button>)}</div>
    <div className="discovery-format-spread" data-format={format.id}>
      <figure className="discovery-format-art"><span className="discovery-format-number" aria-hidden="true">0{selected + 1}</span><FormatDiagram variant={format.id}/><figcaption>Diagrama esquemático · no representa tamaño ni presentación</figcaption></figure>
      <div className="discovery-format-copy"><p className="discovery-hand">{format.caption}</p><div aria-live="polite" aria-atomic="true"><h3>{format.name}</h3><p className="discovery-format-description">{format.description}</p><p className="discovery-format-detail">{format.detail}</p></div><button type="button" className="discovery-pill discovery-pill-light" onClick={() => onExplore('pizzas', format.query)}>{format.action}<OutwardArrow/></button></div>
    </div>
    <p className="discovery-source-note">Referencia: menú de septiembre de 2026. Productos, ingredientes y presentaciones sujetos a validación comercial. Sin precios operativos.</p>
  </section>;
}

const eventFormats = [
  { name: 'Catering corporativo', description: 'El portafolio contempla capacitaciones, workshops, cursos, retiros, reuniones, eventos internos y activaciones de marca.' },
  { name: 'Estación en vivo', description: 'Modalidad descrita como instalación de una pizzería en el evento.' },
  { name: 'Catering programado', description: 'El documento presenta una modalidad de comida caliente lista para servir.' },
  { name: 'Coffee Break Upgrade', description: 'La propuesta documentada incluye mini pizzas, snacks calientes y opciones saladas y dulces.' },
];

export function EventsSection() {
  return <section className="discovery-events" id="eventos" aria-labelledby="events-title"><div className="discovery-event-intro" data-reveal><p className="eyebrow">TAMBIÉN HAY PLANES EN GRANDE</p><h2 id="events-title">LA PIZZA<br/>TAMBIÉN<br/><span>SE REÚNE.</span></h2><p className="discovery-event-lead">Cuatro formatos aparecen en el portafolio de eventos de abril de 2026. Aquí puedes conocerlos, sin asumir que ya están disponibles para reservar.</p><span className="discovery-event-status">Formatos documentados,<br/>disponibilidad por confirmar</span></div><div className="discovery-event-list">{eventFormats.map((format, index) => <article key={format.name}><span className="discovery-event-index">0{index + 1}</span><div><h3>{format.name}</h3><p>{format.description}</p></div></article>)}<p className="discovery-event-limit">Precios, mínimo de personas, plazo de reserva y canal oficial actual pendientes de confirmar. Esta vista no recibe solicitudes ni confirma eventos.</p></div></section>;
}

const questions = [
  { question: '¿Por qué no aparecen precios?', answer: 'El menú localizado no acredita precios operativos actuales por canal o sucursal. Esta propuesta los omite hasta contar con una validación comercial.' },
  { question: '¿Todo el catálogo está disponible?', answer: 'No se confirma disponibilidad en tiempo real. Los nombres y descripciones proceden del menú de referencia de septiembre de 2026; presentaciones, ingredientes y disponibilidad actual deben validarse.' },
  { question: '¿La lista de ingredientes informa sobre alérgenos?', answer: 'No. Las descripciones no sustituyen una ficha de alérgenos ni informan sobre contacto cruzado. No hay información suficiente en las fuentes para afirmar que un producto sea apto para una alergia o restricción alimentaria.' },
  { question: '¿Puedo realizar un pedido o reservar un evento aquí?', answer: 'No. Es una vista privada de diseño: permite explorar contenido de referencia, pero no procesa pedidos, reservas, formularios ni pagos. Los canales de contacto no se activan hasta confirmarlos.' },
];

export function FAQSection() {
  return <section className="discovery-faq" id="preguntas" aria-labelledby="faq-title"><div className="discovery-faq-heading" data-reveal><p className="eyebrow">ANTES DEL SIGUIENTE PLAN</p><h2 id="faq-title">LO QUE<br/><span>SÍ CONVIENE SABER.</span></h2><p>El antojo puede improvisarse.<br/>La información, no.</p></div><div className="discovery-faq-list">{questions.map((item, index) => <details key={item.question}><summary><span className="discovery-question-index">0{index + 1}</span><span>{item.question}</span><svg className="discovery-disclosure" aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 12h16" stroke="currentColor" strokeWidth="1.5"/><path className="discovery-plus-stem" d="M12 4v16" stroke="currentColor" strokeWidth="1.5"/></svg></summary><p>{item.answer}</p></details>)}</div></section>;
}
