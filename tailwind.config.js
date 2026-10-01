/** Paleta tomada de registro-gratis.lovable.app */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#030511",        // fondo base
        card: "#070B1A",      // tarjetas
        card2: "#0B091C",     // tarjetas secundarias / chips
        line: "#1A2135",      // bordes
        violet: { DEFAULT: "#9D5BF4", deep: "#311F55" },
        teal: "#00AAB5",
        ink: "#F2F5FC",       // texto principal
        mute: "#9BA4BE",      // texto secundario
      },
      backgroundImage: {
        // degradado de marca violeta -> teal
        brand: "linear-gradient(90deg,#B04FD8 0%,#00AAB5 100%)",
      },
      boxShadow: { glow: "0 10px 30px -8px rgba(157,91,244,.45)" },
    },
  },
};
