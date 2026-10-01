/**
 * Recibe los registros de la landing y los guarda en la hoja "Leads".
 * - Evita duplicados por correo (actualiza la fila existente).
 * - Columnas pensadas para exportar a Meta Ads / Google Ads (Audiencias personalizadas)
 *   y para listas de WhatsApp.
 */
const SHEET = "Leads";
const HEADERS = [
  "fecha", "nombre", "apellidos", "email", "whatsapp", "pais", "area_interes",
  "consentimiento_marketing", "utm_source", "utm_medium", "utm_campaign", "utm_content", "pagina", "user_agent",
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000); // evita filas pisadas si llegan registros simultáneos
  try {
    const d = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET) || ss.insertSheet(SHEET);
    if (sh.getLastRow() === 0) sh.appendRow(HEADERS);

    const row = [
      new Date(), d.nombre, d.apellidos, String(d.email).toLowerCase(), "'" + d.whatsapp, d.pais, d.area_interes,
      d.consentimiento_marketing ? "SI" : "NO", d.utm_source, d.utm_medium, d.utm_campaign, d.utm_content, d.pagina, d.user_agent,
    ];

    // Busca el correo en la columna D para no duplicar
    const emails = sh.getRange(2, 4, Math.max(sh.getLastRow() - 1, 1), 1).getValues().flat();
    const idx = emails.indexOf(row[3]);
    if (idx >= 0) sh.getRange(idx + 2, 1, 1, row.length).setValues([row]);
    else sh.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
