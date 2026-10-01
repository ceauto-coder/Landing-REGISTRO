// Carga Meta Pixel y GA4 solo si defines sus IDs en .env (necesarios para remarketing en anuncios)
const w = window as any;

export function initTracking() {
  const pixel = import.meta.env.VITE_META_PIXEL_ID as string | undefined;
  const ga = import.meta.env.VITE_GA4_ID as string | undefined;

  if (pixel) {
    // Snippet oficial de Meta Pixel
    if (!w.fbq) {
      const n: any = (w.fbq = function (...a: unknown[]) { n.callMethod ? n.callMethod(...a) : n.queue.push(a); });
      n.queue = []; n.loaded = true; n.version = "2.0"; n.push = n;
      const s = document.createElement("script");
      s.async = true; s.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(s);
    }
    w.fbq("init", pixel);
    w.fbq("track", "PageView");
  }
  if (ga) {
    const s = document.createElement("script");
    s.async = true; s.src = `https://www.googletagmanager.com/gtag/js?id=${ga}`;
    document.head.appendChild(s);
    w.dataLayer = w.dataLayer || [];
    w.gtag = function () { w.dataLayer.push(arguments); };
    w.gtag("js", new Date());
    w.gtag("config", ga);
  }
}
