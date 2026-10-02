# Landing-REGISTRO
conferencia en IA con certificacion gratis

## Captura de leads para remarketing

1. Crea una Google Sheet → Extensiones → Apps Script → pega `apps-script/Code.gs`.
2. Implementar → Nueva implementación → Aplicación web → Ejecutar como: **Yo** · Acceso: **Cualquier usuario**. Copia la URL.
3. Copia `.env.example` a `.env` y pon la URL en `VITE_WEBHOOK_URL` (más `VITE_META_PIXEL_ID` / `VITE_GA4_ID` si usas anuncios).
4. En la hoja `Leads` tendrás cada registro con consentimiento y UTM. Exporta email/teléfono a Meta Ads o Google Ads (Audiencias personalizadas) o a tu lista de WhatsApp.

Solo hay filas de personas que marcaron el consentimiento de marketing (casilla obligatoria).
