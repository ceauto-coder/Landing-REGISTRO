import { useEffect, useState } from "react";
import { EVENT_DATE } from "../config";

// Cuenta regresiva a la fecha del evento
export default function Countdown() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  const d = Math.max(0, new Date(EVENT_DATE).getTime() - now);
  const parts = [["Días", Math.floor(d / 864e5)], ["Horas", Math.floor(d / 36e5) % 24], ["Min", Math.floor(d / 6e4) % 60], ["Seg", Math.floor(d / 1e3) % 60]] as const;
  return (
    <div className="mx-auto grid max-w-md grid-cols-4 gap-3">
      {parts.map(([l, v]) => (
        <div key={l} className="rounded-xl border border-line bg-card p-3 text-center">
          <div className="grad-text text-3xl font-extrabold tabular-nums">{String(v).padStart(2, "0")}</div>
          <div className="text-xs text-mute">{l}</div>
        </div>
      ))}
    </div>
  );
}
