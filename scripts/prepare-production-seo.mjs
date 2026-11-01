import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {resolve,relative} from 'node:path';
import {fileURLToPath} from 'node:url';
const repoRoot=fileURLToPath(new URL('../',import.meta.url));
import {createProductionSeoArtifacts,serializeStructuredData} from '../lib/seo.mjs';
const [configPath,outputPath]=process.argv.slice(2);
if(!configPath||!outputPath)throw new Error('Usage: node scripts/prepare-production-seo.mjs CONFIG_JSON STAGING_DIRECTORY. Offline preparation only.');
const destination=resolve(outputPath);
for(const directory of ['public','out','app','.next']){const rel=relative(resolve(repoRoot,directory),destination);if(rel===''||(!rel.startsWith('..')&&!rel.startsWith('/')))throw new Error('Output must stay outside all served/build directories.');}
const artifacts=createProductionSeoArtifacts(JSON.parse(await readFile(configPath,'utf8')));
await mkdir(destination,{recursive:true});
for(const [name,value] of Object.entries({'robots.txt':artifacts.robots,'sitemap.xml':artifacts.sitemap,'metadata.json':JSON.stringify(artifacts.metadata,null,2),'structured-data.json':serializeStructuredData(artifacts.structuredData)}))await writeFile(resolve(destination,name),value);
process.stdout.write('Prepared offline artifacts only; nothing enabled, published or submitted to search engines.\n');
