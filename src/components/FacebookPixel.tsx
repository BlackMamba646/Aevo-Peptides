"use client";

import Script from "next/script";

export function FacebookPixel() {
  return (
    <>
      <Script id="fb-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '962145213303436');
fbq('track', 'PageView');
document.addEventListener('click',function(e){
var link=e.target.closest('a');
if(link&&link.href&&(link.href.includes('wa.me')||link.href.includes('api.whatsapp'))&&window.fbq){fbq('track','InitiateCheckout');}
},true);`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=962145213303436&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
    </>
  );
}
