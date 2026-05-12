import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabaseSecretKey = import.meta.env.SUPABASE_SECRET_KEY;

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL;
const resendApiKey = import.meta.env.RESEND_API_KEY || process.env.RESEND_API_KEY;

const supabase = createClient(supabaseUrl, supabaseSecretKey);
const resend = new Resend(resendApiKey);

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Dirección de correo inválida.' }), { status: 400 });
    }

    // 1. GUARDAMOS EN SUPABASE
    const { error } = await supabase
      .from('newsletter_subs') 
      .insert([{ email }]);

    if (error) {
      if (error.code === '23505') {
         return new Response(JSON.stringify({ message: 'Ya eres parte del ecosistema. ¡Atento a las novedades!' }), { status: 200 });
      }
      throw error;
    }

    // 2. DISPARAMOS EL CORREO EDITORIAL (YA CON TU DOMINIO PROPIO)
    await resend.emails.send({
      from: 'PanGGea <newsletter@panggea.site>', // <--- CAMBIO CLAVE: Tu correo oficial
      to: [email],
      subject: 'Bienvenido a PanGGea',
      html: `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark only">
  <title>PanGGea</title>
</head>
<body style="margin: 0; padding: 0; background-color: #000000 !important; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #ffffff;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #000000;">
    <tr>
      <td align="center" style="padding: 60px 20px;">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #0a0a0a; border: 1px solid #1a1a1a; max-width: 600px; width: 100%;">
          
          <tr>
            <td align="center" style="padding: 40px 40px 20px 40px;">
              <h1 style="color: #ffffff; font-size: 28px; font-weight: 900; letter-spacing: -1px; margin: 0; text-transform: uppercase; font-style: italic;">
                PAN<span style="color: #FF4500;">GG</span>EA
              </h1>
              <div style="width: 30px; height: 2px; background-color: #FFD700; margin-top: 10px;"></div>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding: 20px 40px 40px 40px;">
              <h2 style="font-size: 38px; font-weight: 900; line-height: 1.1; margin: 0; color: #ffffff; text-transform: uppercase; letter-spacing: -1px;">
                EL FUTURO ES <br> <span style="color: #FF4500;">DIGITAL</span>.
              </h2>
            </td>
          </tr>

          <tr>
            <td style="padding: 0 50px 40px 50px; color: #a1a1aa; font-size: 15px; line-height: 1.7; text-align: center;">
              <p style="margin: 0;">
                Gracias por sumarte a la comunidad. A partir de ahora, tienes acceso directo a análisis técnicos, filtraciones de hardware y el pulso del meta geek directamente en tu bandeja de entrada.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-top: 1px solid #1a1a1a; border-bottom: 1px solid #1a1a1a;">
                <tr>
                  <td width="33.33%" align="center" style="padding: 20px 10px;">
                    <p style="color: #FFD700; font-size: 10px; font-weight: 900; margin: 0; text-transform: uppercase; letter-spacing: 1px;">Arsenal</p>
                    <p style="color: #ffffff; font-size: 11px; margin: 5px 0 0 0;">Tier List Pro</p>
                  </td>
                  <td width="33.33%" align="center" style="padding: 20px 10px; border-left: 1px solid #1a1a1a; border-right: 1px solid #1a1a1a;">
                    <p style="color: #FFD700; font-size: 10px; font-weight: 900; margin: 0; text-transform: uppercase; letter-spacing: 1px;">Hardware</p>
                    <p style="color: #ffffff; font-size: 11px; margin: 5px 0 0 0;">Leaks Únicos</p>
                  </td>
                  <td width="33.33%" align="center" style="padding: 20px 10px;">
                    <p style="color: #FFD700; font-size: 10px; font-weight: 900; margin: 0; text-transform: uppercase; letter-spacing: 1px;">Cultura</p>
                    <p style="color: #ffffff; font-size: 11px; margin: 5px 0 0 0;">Eventos Geek</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding: 10px 40px 60px 40px;">
              <a href="https://panggea.site/tier" style="background-color: #FF4500; color: #ffffff; padding: 18px 35px; text-decoration: none; font-weight: 900; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; display: inline-block;">
                Explorar Ecosistema
              </a>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding: 40px; background-color: #050505;">
              <img 
                  src="https://i.ibb.co/kVHhXqG0/Gemini-Generated-Image-ng9vz9ng9vz9ng9v.png" 
                  alt="PanGGea Logo" 
                  width="80" 
                  style="margin-bottom: 15px; opacity: 0.9; display: block; border: 0;"
                >
              <p style="font-size: 9px; color: #444444; margin: 0; letter-spacing: 3px; text-transform: uppercase; font-weight: bold;">
                PanGGea - 2026
              </p>
            </td>
          </tr>
        </table>
        
        <p style="color: #222222; font-size: 9px; margin-top: 25px; text-transform: uppercase; letter-spacing: 1px; text-align: center;">
          Para dejar de recibir actualizaciones, <a href="#" style="color: #333333; text-decoration: underline;">haz clic aquí</a>.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });

    return new Response(JSON.stringify({ message: 'ACCESO CONCEDIDO. Revisa tu bandeja.' }), { status: 200 });

  } catch (error) {
    console.error("Error del sistema:", error);
    return new Response(JSON.stringify({ error: 'Fallo de conexión. Sistema inestable.' }), { status: 500 });
  }
};