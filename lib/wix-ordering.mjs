/** URL-only adapter for a future, verified Wix-hosted ordering page. No cart, API calls or payment processing. */
export const orderingConfig = Object.freeze({
  mode: 'disabled', privatePreview: true, siteId: '', orderingUrl: '', confirmedOrigin: '',
  siteConfirmed: false, orderingPageConfirmed: false, operationalSetupConfirmed: false, activationApproved: false,
});
export function resolveHostedOrdering(config=orderingConfig) {
  const disabled=reason=>({enabled:false,href:null,reason});
  if(config.privatePreview!==false)return disabled('Private preview: ordering is not active.');
  if(config.mode!=='hosted-wix')return disabled('Wix ordering has not been configured.');
  if(!config.siteId||config.siteConfirmed!==true||config.orderingPageConfirmed!==true||config.operationalSetupConfirmed!==true||config.activationApproved!==true)return disabled('The exact Wix site, page, operational setup and activation require confirmation.');
  try {
    const url=new URL(config.orderingUrl);const origin=new URL(config.confirmedOrigin);
    if(url.protocol!=='https:'||url.username||url.password||url.hash||url.search||url.origin!==origin.origin||origin.pathname!=='/'||origin.search||origin.hash||origin.username||origin.password||url.hostname==='localhost'||/^[\d.]+$/.test(url.hostname)||!url.hostname.includes('.'))return disabled('Use the exact verified HTTPS ordering page, without credentials or arbitrary redirect parameters.');
    return {enabled:true,href:url.href,label:'Pedir en Wix',transfersLocalCart:false};
  }catch{return disabled('A verified ordering URL is required.');}
}
