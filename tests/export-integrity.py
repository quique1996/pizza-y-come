"""Static export audit, not browser QA. Requires lxml; no network."""
from pathlib import Path
from lxml import html
import json
r=Path(__file__).resolve().parents[1];out={}
for route in ['index.html','orbita/index.html']:
 d=html.parse(str(r/'out'/route));refs=d.xpath('//@src|//link/@href')
 missing=[x for x in refs if x.startswith('/') and not (r/'out'/x.lstrip('/').split('?')[0]).is_file()]
 out[route]={'noindex':any('noindex'in c for c in d.xpath('//meta[@name="robots"]/@content')),'missing_local_assets':missing,'h1_count':len(d.xpath('//h1')),'high_priority_img':len(d.xpath('//img[translate(@fetchpriority,"HIGH","high")="high"]')),'forms':len(d.xpath('//form'))}
 assert out[route]['noindex'] and not missing and out[route]['h1_count']==1 and out[route]['high_priority_img']==1 and not out[route]['forms'],route
print(json.dumps(out,indent=2))
