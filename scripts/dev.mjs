import {spawn} from 'node:child_process';
// Sites Preview supplies Vite-style flags; translate them for the actual Next dev server.
const args=process.argv.slice(2);
const option=(name,fallback)=>args.includes(name)?args[args.indexOf(name)+1]:fallback;
const child=spawn(process.execPath,['node_modules/next/dist/bin/next','dev','--hostname',option('--host','0.0.0.0'),'--port',option('--port','3000')],{stdio:'inherit',env:{...process.env,NEXT_TELEMETRY_DISABLED:'1'}});
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>child.kill(signal));
child.on('exit',code=>process.exit(code??0));
