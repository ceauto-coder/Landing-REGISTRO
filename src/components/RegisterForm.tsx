import { FormEvent, useMemo, useState } from "react";
import { COUNTRIES } from "../countries";
import { WEBHOOK_URL } from "../config";

const AREAS = [
  "Emprendedor / Dueño de negocio",
  "Profesional / Empleado",
  "Freelancer / Consultor",
  "Creador de contenido",
  "No tengo ingresos aún pero quiero empezar",
];

// Lee los UTM de la URL para atribución de campañas
const utm = () => {
  const p = new URLSearchParams(window.location.search);
  return Object.fromEntries(
    ["utm_source", "utm_campaign", "utm_medium", "utm_content"].map((k) => [k, p.get(k) ?? ""])
  );
};

export default function RegisterForm({ id }: { id?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  const [country, setCountry] = useState(0);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(
    () => COUNTRIES.map((c, i) => ({ c, i })).filter(({ c }) => (c[1] + c[2]).toLowerCase().includes(q.toLowerCase())),
    [q]
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (f.get("website")) return; // honeypot: los bots lo rellenan
    const email = String(f.get("email")).trim();
    const phone = String(f.get("whatsapp")).replace(/\D/g, "");
    if (!/^\S+@\S+\.\S+$/.test(email)) return fail("Ingresa un correo válido.");
    if (phone.length < 7 || phone.length > 15) return fail("Ingresa un WhatsApp válido.");

    setStatus("loading");
    const [flag, pais, code] = COUNTRIES[country];
    const payload = {
      nombre: f.get("nombre"), apellidos: f.get("apellidos"),
      whatsapp: `${code}${phone}`, email, pais: `${flag} ${pais}`,
      area_interes: f.get("area"), consentimiento_marketing: true, pagina: location.href.split("?")[0],
      user_agent: navigator.userAgent, ...utm(),
    };
    try {
      if (WEBHOOK_URL) {
        // Google Apps Script no responde CORS: se envía como text/plain y se asume éxito si no hay error de red
        const gas = WEBHOOK_URL.includes("script.google.com");
        const r = await fetch(WEBHOOK_URL, {
          method: "POST", body: JSON.stringify(payload),
          ...(gas ? { mode: "no-cors" as const, headers: { "Content-Type": "text/plain;charset=utf-8" } } : { headers: { "Content-Type": "application/json" } }),
        });
        if (!gas && !r.ok) throw new Error("webhook");
      } else console.info("[lead] (sin VITE_WEBHOOK_URL)", payload);
      // Stubs de tracking
      (window as any).fbq?.("track", "Lead");
      (window as any).gtag?.("event", "generate_lead");
      setStatus("ok");
    } catch {
      fail("No pudimos registrarte. Intenta de nuevo.");
    }
  }
  const fail = (m: string) => { setError(m); setStatus("error"); };

  if (status === "ok")
    return (
      <div id={id} className="card p-8 text-center">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-brand text-2xl">✓</div>
        <h3 className="text-2xl font-bold">¡Listo! Estás registrado</h3>
        <p className="mt-2 text-mute">Revisa tu correo y WhatsApp: ahí te enviaremos el acceso a la conferencia.</p>
      </div>
    );

  return (
    <form id={id} onSubmit={onSubmit} className="card scroll-mt-24 space-y-4 p-6 sm:p-8">
      <h3 className="text-xl font-bold">Registrarme <span className="grad-text">GRATIS</span></h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">Nombre *<input name="nombre" required maxLength={100} className="input mt-1.5" autoComplete="given-name" /></label>
        <label className="block text-sm">Apellidos *<input name="apellidos" required maxLength={100} className="input mt-1.5" autoComplete="family-name" /></label>
      </div>
      <div className="text-sm">
        <span>Número de WhatsApp *</span>
        <div className="relative mt-1.5 flex gap-2">
          <button type="button" onClick={() => setOpen(!open)} className="input !w-auto shrink-0 whitespace-nowrap">
            {COUNTRIES[country][0]} {COUNTRIES[country][2]}
          </button>
          <input name="whatsapp" required inputMode="tel" maxLength={20} className="input" placeholder="300 123 4567" autoComplete="tel-national" />
          {open && (
            <div className="absolute left-0 top-full z-20 mt-2 w-72 rounded-xl border border-line bg-card p-2 shadow-xl">
              <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar país…" className="input mb-2" />
              <ul className="max-h-56 overflow-auto">
                {filtered.map(({ c, i }) => (
                  <li key={i}>
                    <button type="button" onClick={() => { setCountry(i); setOpen(false); setQ(""); }}
                      className="flex w-full justify-between rounded-lg px-3 py-2 text-left hover:bg-card2">
                      <span>{c[0]} {c[1]}</span><span className="text-mute">{c[2]}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <label className="block text-sm">Correo electrónico *<input name="email" type="email" required maxLength={255} className="input mt-1.5" autoComplete="email" /></label>
      <label className="block text-sm">¿En qué área de IA te interesa más especializarte? *
        <select name="area" required defaultValue="" className="input mt-1.5">
          <option value="" disabled>Selecciona una opción</option>
          {AREAS.map((a) => <option key={a}>{a}</option>)}
        </select>
      </label>
      <label className="flex items-start gap-3 text-xs text-mute">
        <input name="consent" type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 accent-violet" />
        <span>Acepto recibir información, recordatorios y promociones por correo y WhatsApp, y el tratamiento de mis datos para fines de marketing. Puedo darme de baja cuando quiera. *</span>
      </label>
      {/* honeypot oculto */}
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {status === "error" && <p role="alert" className="text-sm text-red-400">{error}</p>}
      <button className="btn w-full" disabled={status === "loading"}>{status === "loading" ? "Enviando…" : "Registrarme"}</button>
      <p className="text-center text-xs text-mute">Sin costo ni tarjeta. Tus datos solo se usan para enviarte el acceso.</p>
    </form>
  );
}
