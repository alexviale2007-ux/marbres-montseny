/**
 * Recibe el formulario de contacto y lo envía por email.
 *
 * Variables de entorno necesarias en Vercel:
 *   RESEND_API_KEY  -> clave de https://resend.com (obligatoria)
 *   CONTACT_EMAIL   -> destinatario (opcional, por defecto el de la empresa)
 */

export const config = { runtime: 'edge' };

const PROJECT_LABELS: Record<string, string> = {
  cocina: 'Cocina',
  bano: 'Baño',
  escalera: 'Escalera',
  reparacion: 'Reparación',
  otro: 'Otro',
};

const MAX = { name: 100, phone: 40, email: 150, message: 3000 };

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

/** Evita que se inyecte HTML en el email */
function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return json({ error: 'Método no permitido' }, 405);
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'Solicitud no válida' }, 400);
  }

  // Trampa antispam: campo oculto que sólo rellenan los bots.
  // Devolvemos éxito para no darles pistas, pero no enviamos nada.
  if (typeof payload.company === 'string' && payload.company.trim() !== '') {
    return json({ ok: true }, 200);
  }

  const str = (v: unknown, limit: number) =>
    typeof v === 'string' ? v.trim().slice(0, limit) : '';

  const name = str(payload.name, MAX.name);
  const phone = str(payload.phone, MAX.phone);
  const email = str(payload.email, MAX.email);
  const message = str(payload.message, MAX.message);
  const projectType = str(payload.projectType, 20);

  // Validación en servidor: no confiamos sólo en la del navegador
  const invalid: string[] = [];
  if (!name) invalid.push('nombre');
  if (!phone) invalid.push('teléfono');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) invalid.push('email');
  if (!PROJECT_LABELS[projectType]) invalid.push('tipo de proyecto');

  if (invalid.length > 0) {
    return json({ error: `Revisa estos campos: ${invalid.join(', ')}` }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('Falta RESEND_API_KEY en las variables de entorno');
    return json({ error: 'El envío no está configurado' }, 500);
  }

  const to = process.env.CONTACT_EMAIL || 'marbresmontseny2015@gmail.com';
  const projectLabel = PROJECT_LABELS[projectType];

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;color:#2d2a28">
      <p style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#8a8580;margin:0 0 4px">
        Marbres Montseny
      </p>
      <h2 style="font-size:20px;font-weight:600;margin:0 0 20px">
        Nueva solicitud de presupuesto
      </h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #e8e4df;color:#7a7269;width:150px">Nombre</td>
          <td style="padding:10px 0;border-bottom:1px solid #e8e4df;font-weight:600">${esc(name)}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #e8e4df;color:#7a7269">Teléfono</td>
          <td style="padding:10px 0;border-bottom:1px solid #e8e4df">
            <a href="tel:${esc(phone)}" style="color:#2d2a28;font-weight:600">${esc(phone)}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #e8e4df;color:#7a7269">Email</td>
          <td style="padding:10px 0;border-bottom:1px solid #e8e4df">
            <a href="mailto:${esc(email)}" style="color:#2d2a28">${esc(email)}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #e8e4df;color:#7a7269">Tipo de proyecto</td>
          <td style="padding:10px 0;border-bottom:1px solid #e8e4df">${esc(projectLabel)}</td>
        </tr>
      </table>
      ${
        message
          ? `<p style="color:#7a7269;font-size:14px;margin:24px 0 6px">Mensaje</p>
             <p style="white-space:pre-wrap;line-height:1.6;margin:0;font-size:14px">${esc(message)}</p>`
          : ''
      }
      <p style="margin:28px 0 0;font-size:12px;color:#a8a198">
        Puedes responder directamente a este correo para contestar a ${esc(name)}.
      </p>
    </div>
  `;

  const text = [
    'Nueva solicitud de presupuesto — Marbres Montseny',
    '',
    `Nombre: ${name}`,
    `Teléfono: ${phone}`,
    `Email: ${email}`,
    `Tipo de proyecto: ${projectLabel}`,
    message ? `\nMensaje:\n${message}` : '',
  ].join('\n');

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Web Marbres Montseny <onboarding@resend.dev>',
        to: [to],
        reply_to: email,
        subject: `Presupuesto · ${projectLabel} · ${name}`,
        html,
        text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error('Resend devolvió un error:', res.status, detail);
      return json({ error: 'No se pudo enviar el mensaje' }, 502);
    }

    return json({ ok: true }, 200);
  } catch (err) {
    console.error('Fallo al contactar con Resend:', err);
    return json({ error: 'No se pudo enviar el mensaje' }, 502);
  }
}
