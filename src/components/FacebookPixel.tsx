// Facebook Pixel — rendered as a plain inline script so it ships in the
// server-rendered HTML and executes on first paint (matching the original
// TanStack app, which emitted this snippet as a root <script>).
const FB_PIXEL = `!function(f,b,e,v,n,t,s)
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
},true);`;

export function FacebookPixel() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: FB_PIXEL }} />
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
