/** Private preview is deliberately not a launch environment, even under NODE_ENV=production. */
export const seoContent = Object.freeze({
  brand: 'Pizza y Come',
  title: 'Pizza y Come | Pizzas, combos y complementos — Vista privada',
  description: 'Explora el catálogo de referencia de Pizza y Come: pizzas, combos, complementos y bebidas. Vista privada de diseño; disponibilidad por confirmar, sin pedidos ni pagos.',
});
export function createPreviewMetadata() {
  return {
    title: { default: seoContent.title, template: '%s | Pizza y Come' },
    description: seoContent.description,
    applicationName: seoContent.brand,
    robots: { index: false, follow: false, noimageindex: true, googleBot: { index: false, follow: false, noimageindex: true } },
    openGraph: { type: 'website', locale: 'es_MX', siteName: seoContent.brand, title: seoContent.title, description: seoContent.description },
    twitter: { card: 'summary', title: seoContent.title, description: seoContent.description },
    // No canonical, metadataBase, OG URL/image, sitemap or JSON-LD until public domain and facts are approved.
  };
}
const escapeXml = value => value.replace(/[<>&"']/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]));
export function validatePublicOrigin(value) {
  const url = new URL(value);
  const host = url.hostname.toLowerCase();
  if(url.protocol!=='https:'||url.username||url.password||url.pathname!=='/'||url.search||url.hash||url.port||host==='localhost'||!host.includes('.')||/^[\d.]+$/.test(host)||host.endsWith('.chatgpt.site')||/(^|\.)(example\.(com|net|org)|vercel\.app|pages\.dev|workers\.dev|netlify\.app)$/.test(host)||/\.(test|invalid|example|localhost)$/.test(host)) throw new Error('Confirmed public HTTPS origin required; preview/placeholder origins are not allowed.');
  return url.origin;
}
/** OFFLINE release preparation only. Never called by app/layout or by npm run build. */
export function createProductionSeoArtifacts(config) {
  if(config?.launchApproved!==true||config?.domainConfirmed!==true||config?.publicCopyApproved!==true) throw new Error('Public launch, domain and public copy must be explicitly approved.');
  const origin=validatePublicOrigin(config.publicOrigin);
  if(typeof config.title!=='string'||!config.title.trim()||typeof config.description!=='string'||!config.description.trim()) throw new Error('Approved title and description required.');
  const image=config.ogImageUrl ? new URL(config.ogImageUrl) : null;
  if(image&&(config.ogImageApproved!==true||image.origin!==origin||image.username||image.password||image.search||image.hash)) throw new Error('OG image must be approved and hosted on the confirmed origin.');
  const metadata={title:config.title,description:config.description,metadataBase:origin,alternates:{canonical:origin+'/'},robots:{index:true,follow:true},openGraph:{type:'website',locale:'es_MX',siteName:seoContent.brand,title:config.title,description:config.description,url:origin+'/',...(image?{images:[{url:image.href,alt:'Pizza y Come'}]}:{})}};
  const structuredData={'@context':'https://schema.org','@graph':[{'@type':'Brand','@id':origin+'/#brand',name:seoContent.brand},{'@type':'WebSite','@id':origin+'/#website',url:origin+'/',name:seoContent.brand,inLanguage:'es'},{'@type':'WebPage','@id':origin+'/#page',url:origin+'/',name:config.title,description:config.description,inLanguage:'es',isPartOf:{'@id':origin+'/#website'},about:{'@id':origin+'/#brand'}}]};
  return {metadata,structuredData,robots:`User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`,sitemap:`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escapeXml(origin)}/</loc></url></urlset>\n`};
}
export const serializeStructuredData=data=>JSON.stringify(data).replace(/</g,'\\u003c');
