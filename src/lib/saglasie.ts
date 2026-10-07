/**
 * Скриптовете за съгласие като текст. Стоят в обикновен (сървърен) файл,
 * не в "use client" компонента: низ, внесен от клиентски файл в layout,
 * става препратка към клиента и в HTML-а излиза текст за грешка.
 */
export const КЛЮЧ = "mg-consent";

export const СЪГЛАСИЕ_ПО_ПОДРАЗБИРАНЕ = `window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}window.gtag=window.gtag||gtag;
var __mgc=null;try{__mgc=localStorage.getItem('${КЛЮЧ}')}catch(e){}
var __mgg=__mgc==='granted'?'granted':'denied';
gtag('consent','default',{ad_storage:__mgg,ad_user_data:__mgg,ad_personalization:__mgg,analytics_storage:__mgg,wait_for_update:500});
gtag('set','ads_data_redaction',__mgg==='denied');
gtag('set','url_passthrough',true);`;

/** За пиксела на Meta: слага се преди `fbq('init')`. */
export const ПИКСЕЛ_ИЗЧАКВА = `try{if(localStorage.getItem('${КЛЮЧ}')!=='granted')fbq('consent','revoke')}catch(e){fbq('consent','revoke')}`;
