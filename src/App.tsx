import { AGENDA, BRAND, SCHEDULES, SPEAKER, VIDEO_2 } from "./config";
import RegisterForm from "./components/RegisterForm";
import Countdown from "./components/Countdown";
import CountUp from "./components/CountUp";

const go = "#registro";
const Cta = ({ children = "Asegurar Mi Lugar Gratis →" }: { children?: string }) => (
  <a href={go} className="btn">{children}</a>
);
const Section = ({ chip, title, sub, children, id }: { chip?: string; title: React.ReactNode; sub?: string; children: React.ReactNode; id?: string }) => (
  <section id={id} className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-10 py-16 sm:py-20">
    <div className="mb-10 text-center">
      {chip && <span className="chip mb-4">{chip}</span>}
      <h2 className="text-3xl font-extrabold sm:text-4xl">{title}</h2>
      {sub && <p className="mx-auto mt-3 max-w-2xl text-mute">{sub}</p>}
    </div>
    {children}
  </section>
);
const Icon = ({ children }: { children: string }) => (
  <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-brand text-2xl shadow-glow">{children}</div>
);
// Video propio (vertical 9:16) con póster; se reproduce con controles nativos
const PromoVideo = () => (
  <div className="mx-auto w-full max-w-[min(100%,320px)] md:max-w-[340px] lg:max-w-[380px] overflow-hidden rounded-3xl border border-violet-deep bg-card shadow-glow">
    <video className="aspect-[9/16] w-full object-cover" src={`${import.meta.env.BASE_URL}video/promo.mp4`} poster={`${import.meta.env.BASE_URL}video/poster.jpg`}
      controls playsInline preload="metadata" />
  </div>
);
const Video = ({ src, title }: { src: string; title: string }) =>
  // En vista previa embebida (VITE_NO_EMBED) no se permiten iframes: se muestra un enlace al video
  import.meta.env.VITE_NO_EMBED ? (
    <a href={src.replace("/embed/", "/watch?v=")} target="_blank" rel="noreferrer"
      className="grid aspect-video place-items-center rounded-2xl border border-line bg-card text-center">
      <span><span className="grad-text block text-5xl">▶</span><span className="mt-2 block text-mute">{title} · ver en YouTube</span></span>
    </a>
  ) : (
    <div className="aspect-video overflow-hidden rounded-2xl border border-line">
      <iframe className="h-full w-full" src={src} title={title} loading="lazy" allowFullScreen />
    </div>
  );

export default function App() {
  return (
    <div className="overflow-x-hidden">
      <div className="bg-card2 px-4 sm:px-8 lg:px-10 py-2 text-center text-xs text-mute sm:text-sm">
        🌎 Conferencia 100% Virtual para Latinoamérica y EE.UU. · Acceso Gratuito · Sin conocimientos previos
      </div>
      <header className="border-b border-line">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-8 lg:px-10 py-4">
          <span className="grad-text text-base font-bold leading-tight sm:text-xl">✦ {BRAND}</span>
          <a href={go} className="shrink-0 whitespace-nowrap rounded-[10px] border border-violet-deep bg-card2 px-4 py-2 text-sm font-semibold text-violet">Registro gratis</a>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_at_top,rgba(157,91,244,.18),transparent_65%)]" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 sm:px-8 lg:px-10 py-14 lg:grid-cols-2 lg:items-start lg:py-20">
          <div className="reveal">
            <div className="mb-5 flex flex-wrap gap-2"><span className="chip">⚡ 100% VIRTUAL · LATAM + EE.UU.</span><span className="chip !text-teal">GRATIS</span></div>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-6xl">
              Curso de Inteligencia Artificial Gratis: <span className="grad-text">Domina la IA</span> en Solo 4 Horas
            </h1>
            <p className="mt-5 text-lg text-mute">Capacitación en IA desde cero: <b className="text-ink">ChatGPT</b>, <b className="text-ink">Claude</b>, <b className="text-ink">Vibe Coding</b>, <b className="text-ink">Agentes de IA</b> y <b className="text-ink">Creación de Contenido</b>, sin necesidad de programar.</p>
            <blockquote className="mt-6 border-l-4 border-violet pl-4 italic text-mute">El conocimiento que el 99% aún no tiene. Quien entienda esto primero, liderará.</blockquote>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[["DURACIÓN", "4 Horas Intensivas"], ["MODALIDAD", "100% Online"], ["ACCESO", "Gratis"], ["REQUISITOS", "Ninguno"]].map(([k, v]) => (
                <div key={k} className="rounded-xl border border-line bg-card p-3"><div className="text-[10px] tracking-widest text-teal">{k}</div><div className="mt-1 text-sm font-semibold">{v}</div></div>
              ))}
            </div>
            <div className="mt-8 lg:hidden"><Cta /></div>
          </div>
          <RegisterForm id="registro" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-10 py-16 sm:py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <PromoVideo />
          <div className="order-first text-center md:order-none md:text-left">
            <span className="chip mb-4">Mira lo que aprenderás</span>
            <h2 className="text-3xl font-extrabold sm:text-4xl">La Conferencia IA <span className="grad-text">en acción</span></h2>
            <p className="mt-3 text-mute">En 40 segundos: cómo una IA puede operar tu negocio en piloto automático. Esto y mucho más lo construimos en vivo.</p>
            <ul className="mx-auto mt-6 grid max-w-md gap-3 text-left md:mx-0">
              {["Agentes de IA que atienden y venden por ti", "Automatizaciones sin escribir código", "Plantillas y prompts listos para usar"].map((x) => (
                <li key={x} className="flex gap-3 rounded-xl border border-line bg-card p-3.5"><span className="text-teal">✓</span><span>{x}</span></li>
              ))}
            </ul>
            <div className="mt-8"><Cta>Quiero Asistir Gratis →</Cta></div>
          </div>
        </div>
      </section>

      <Section chip="Disponible para Latinoamérica y EE.UU." title={<>Conéctate <span className="grad-text">desde tu país</span></>} sub="La conferencia es en vivo. Elige el horario según tu zona horaria.">
        <div className="mb-10"><Countdown /></div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {SCHEDULES.map(([f, c, h]) => (
            <div key={c} className="card p-5 text-center"><div className="text-3xl">{f}</div><div className="grad-text mt-2 text-2xl font-extrabold">{h}</div><div className="text-sm text-mute">{c}</div></div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-mute">* Horario base: 6:00 PM – 10:00 PM Hora Colombia (UTC-5). En EE.UU. puede variar según zona horaria y horario de verano.</p>
      </Section>

      <Section title={<>La IA no viene. <span className="grad-text">Ya está aquí.</span></>} sub="La pregunta no es si debes aprender, sino cuánto tiempo más puedes esperar.">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            [<CountUp to={407} prefix="$" suffix="B" />, "Mercado Global de IA", "Proyección para 2027"],
            [<CountUp to={77} suffix="%" />, "Empresas usando IA", "Ya usan o exploran IA"],
            [<CountUp to={60} suffix="%" />, "Reducción de costos", "Con automatización inteligente"],
            [<CountUp to={37.7} suffix="%" decimals={1} />, "Crecimiento anual", "Expansión del sector"],
          ].map(([n, t, s], i) => (
            <div key={i} className="card p-6 text-center"><div className="grad-text text-4xl font-extrabold">{n}</div><div className="mt-2 font-semibold">{t as string}</div><div className="text-sm text-mute">{s as string}</div></div>
          ))}
        </div>
      </Section>

      <Section title={<>Lo que aprenderás <span className="grad-text">en 4 horas</span></>} sub="Conocimiento práctico y aplicable desde el primer día">
        <div className="grid gap-5 md:grid-cols-3">
          {[["🧠", "Fundamentos de IA", "Qué es la IA, cómo funciona la IA generativa, Machine Learning y Deep Learning. Conceptos claros para cualquier nivel."],
            ["🎨", "IA para Contenido", "Prompting avanzado y generación de textos, imágenes, audio y video con las mejores herramientas."],
            ["🤖", "Chatbots y Automatización", "Flujos no-code, orquestación con herramientas clave y Agentes de IA. Automatiza sin programar."]].map(([i, t, d]) => (
            <div key={t} className="card p-6 text-center"><Icon>{i}</Icon><h3 className="text-lg font-bold">{t}</h3><p className="mt-2 text-sm text-mute">{d}</p></div>
          ))}
        </div>
        <ul className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
          {["Demostraciones en vivo", "Contenido actualizado 2026", "Aplicación práctica inmediata", "Sesión de preguntas en vivo"].map((x) => <li key={x} className="flex gap-2 text-mute"><span className="text-teal">✓</span>{x}</li>)}
        </ul>
      </Section>

      <Section title={<>Cursos de IA <span className="grad-text">incluidos</span></>} sub="Una capacitación desde cero con las herramientas más buscadas de 2026.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[["💬", "Curso de ChatGPT (OpenAI)", "Prompting profesional, GPTs personalizados y uso de ChatGPT para escribir, analizar datos y resolver tareas."],
            ["✨", "Curso de Claude (Anthropic)", "Documentos largos, análisis, redacción y proyectos: cuándo conviene y cómo sacarle el máximo."],
            ["🔎", "Curso de Gemini (Google)", "IA de Google aplicada a productividad, investigación y contenido multimodal."],
            ["🤖", "Curso de agentes de IA", "Agentes y automatizaciones no-code: atención al cliente, ventas, reportes y seguimiento."],
            ["🎬", "IA para creación de contenido", "Textos, imágenes, audio y video con IA para redes, marketing y branding personal."],
            ["⚡", "Vibe Coding", "Crea apps y landing pages describiendo lo que quieres, sin escribir código."]].map(([i, t, d]) => (
            <div key={t} className="card p-6"><Icon>{i}</Icon><h3 className="text-center font-bold">{t}</h3><p className="mt-2 text-center text-sm text-mute">{d}</p></div>
          ))}
        </div>
      </Section>

      <Section chip="Programa completo" title={<>Agenda de la <span className="grad-text">Conferencia</span></>} sub="19 temas desde los fundamentos hasta las aplicaciones más avanzadas, en una sesión virtual de 4 horas.">
        <ol className="grid gap-3 md:grid-cols-2">
          {AGENDA.map((t, i) => (
            <li key={t} className="flex items-center gap-4 rounded-xl border border-line bg-card p-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand text-sm font-bold">{i + 1}</span><span>{t}</span>
            </li>
          ))}
        </ol>
        <div className="mt-8 grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
          {[["19", "Temas"], ["4h", "Duración"], ["100%", "Online"], ["Gratis", "Acceso"]].map(([n, l]) => <div key={l}><div className="grad-text text-3xl font-extrabold">{n}</div><div className="text-sm text-mute">{l}</div></div>)}
        </div>
      </Section>

      <Section chip="¿Para quién es esta conferencia?" title={<>Pensada para <span className="grad-text">ti</span></>} sub="Diseñada para cualquier persona, sin importar su nivel técnico.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[["💼", "Profesional o Ejecutivo", "Quiere mantenerse relevante y ser más productivo con IA."], ["🚀", "Emprendedor o Startup", "Busca crear productos y servicios más rápido con IA."], ["🎥", "Creador de Contenido", "Desea multiplicar su producción con asistentes de IA."], ["🎓", "Educador o Formador", "Quiere crear cursos escalables con inteligencia artificial."], ["🧭", "Curioso o Autodidacta", "Siente que la IA es importante pero no sabe por dónde empezar."]].map(([i, t, d]) => (
            <div key={t} className="card p-6 text-center"><Icon>{i}</Icon><h3 className="font-bold">{t}</h3><p className="mt-2 text-sm text-mute">{d}</p></div>
          ))}
          <div className="card flex flex-col items-center justify-center p-6 text-center"><h3 className="grad-text text-xl font-extrabold">No necesitas saber programar.</h3><p className="mt-2 mb-4 text-sm text-mute">Solo curiosidad y ganas de aprender.</p><Cta>Quiero Asistir Gratis</Cta></div>
        </div>
      </Section>

      <Section chip="Tu guía en este viaje" title={<>¿Quién será el <span className="grad-text">Speaker</span>?</>}>
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <Video src={VIDEO_2} title="Speaker" />
          <div className="card p-6">
            <div className="mb-4 grid h-20 w-20 place-items-center rounded-2xl bg-brand text-3xl">👤</div>
            <h3 className="text-2xl font-bold">{SPEAKER.name}</h3><div className="text-teal">{SPEAKER.role}</div>
            <p className="mt-3 text-mute">{SPEAKER.bio}</p>
            <p className="mt-4 text-sm text-mute">{SPEAKER.instagram} · {SPEAKER.email} · {SPEAKER.phone}</p>
          </div>
        </div>
      </Section>

      <Section chip="CONFERENCIA 100% VIRTUAL · GRATIS" title={<>Asegura tu <span className="grad-text">Pase Gratis</span></>} sub="Completa el formulario y confirma tu asistencia.">
        <div className="mx-auto max-w-xl"><RegisterForm /></div>
      </Section>

      <Section title="Preguntas frecuentes" sub="Todo lo que necesitas saber sobre este curso gratuito de inteligencia artificial">
        <div className="mx-auto max-w-3xl space-y-3">
          {[["¿Es realmente gratis?", "Sí. Es un curso de IA gratis, 100% online y en vivo, de 4 horas. No pides tarjeta ni pagas nada: solo te registras con tu nombre, correo y WhatsApp."],
            ["¿Necesito saber programar?", "No. Es una capacitación desde cero para principiantes, con herramientas no-code y Vibe Coding."],
            ["¿Qué herramientas se enseñan?", "ChatGPT, Claude, Gemini, generadores de imagen, audio y video, y plataformas no-code para agentes y automatizaciones."],
            ["¿Incluye un curso de agentes de IA?", "Sí. Un bloque completo: cómo diseñarlos, conectarlos a tus herramientas y automatizar tareas sin programar."],
            ["¿Desde qué países puedo conectarme?", "Desde cualquier país de Latinoamérica, Estados Unidos y España. Publicamos el horario para cada zona."],
            ["¿Entregan certificado o materiales?", "Sí. Al completar la conferencia recibes tu certificación gratis, además de las plantillas, prompts y recursos usados durante la sesión y acceso a la comunidad."]].map(([q, a]) => (
            <details key={q} className="group rounded-xl border border-line bg-card p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">{q}<span className="text-violet transition group-open:rotate-45">+</span></summary>
              <p className="mt-3 text-mute">{a}</p>
            </details>
          ))}
        </div>
      </Section>

      <footer className="border-t border-line px-4 sm:px-8 lg:px-10 py-10 text-center text-sm text-mute">
        <div className="grad-text mb-2 text-lg font-bold">✦ {BRAND}</div>
        <p>Organizado por TU MARCA · Comunidad · Metodología práctica · Plantillas y prompts · Acompañamiento</p>
        <p className="mt-2">{SPEAKER.email} · {SPEAKER.phone}</p>
      </footer>
    </div>
  );
}
