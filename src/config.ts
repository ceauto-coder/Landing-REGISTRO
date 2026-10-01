// ---- Configuración editable de la landing ----
export const BRAND = "IA Conferencia"; // nombre de marca (reemplazar)
export const EVENT_DATE = "2026-11-15T18:00:00-05:00"; // fecha/hora del evento (Colombia UTC-5)
export const VIDEO_1 = "https://www.youtube.com/embed/dQw4w9WgXcQ"; // video "conferencia en acción" (reemplazar)
export const VIDEO_2 = "https://www.youtube.com/embed/dQw4w9WgXcQ"; // video del speaker (reemplazar)
// Webhook (Make / n8n / GoHighLevel / CRM). Se define en .env como VITE_WEBHOOK_URL
export const WEBHOOK_URL = (import.meta.env.VITE_WEBHOOK_URL as string | undefined) ?? "";
export const SPEAKER = {
  name: "Nombre del Speaker",
  role: "Fundador de TU MARCA",
  bio: "Educador y emprendedor en inteligencia artificial. Ayuda a personas y empresas a usar la IA de forma práctica, simple y rentable.",
  instagram: "@tu_instagram",
  email: "contacto@tudominio.com",
  phone: "+1 000 000 0000",
};

export const SCHEDULES = [
  ["🇲🇽", "México", "5:00 PM"],
  ["🇨🇴", "Colombia / Perú", "6:00 PM"],
  ["🇻🇪", "Venezuela / Bolivia", "7:00 PM"],
  ["🇦🇷", "Argentina / Chile", "8:00 PM"],
  ["🇺🇸", "Miami / Nueva York", "7:00 PM"],
  ["🇺🇸", "Los Ángeles", "4:00 PM"],
] as const;

export const AGENDA = [
  "Impacto actual de la Inteligencia Artificial",
  "Demostración rápida: Vibe Coding en acción",
  "Presentación del conferencista",
  "Por qué optimizar procesos con IA",
  "Creación de contenido con IA y herramientas clave",
  "Cómo crear soluciones, negocios y cursos en 1 minuto con IA",
  "Clonación de conocimiento para crear cursos",
  "Crecimiento y proyección de la IA",
  "La nueva demanda que generará la IA",
  "Cómo funciona la IA: IA, Machine Learning y Deep Learning",
  "Qué son los LLM (Modelos de Lenguaje)",
  "Evolución de la Inteligencia Artificial",
  "Qué son los Agentes de IA",
  "Por qué los Agentes son el futuro",
  "Actualizaciones recientes en herramientas de IA",
  "Creación de modelos propios con Vibe Coding",
  "Prompt Engineering: cómo hablarle bien a la IA",
  "Privacidad y ética en la era de la IA",
  "Conclusiones",
];
