export default function ArrowIcon({direction='up-right'}:{direction?:'up-right'|'down-right'|'down'}){
 const path=direction==='down'?'M12 3v18m-7-7 7 7 7-7':direction==='down-right'?'M5 5 19 19M5 19h14V5':'M5 19 19 5M5 5h14v14';
 return <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none"><path d={path} stroke="currentColor" strokeWidth="1.5"/></svg>;
}
