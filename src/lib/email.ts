/**
 * Email Service for Sexto Sistema
 * Uses Resend for email delivery
 */

import { Resend } from 'resend'

interface EmailData {
  to: string | string[]
  subject: string
  html: string
  text?: string
  replyTo?: string
}

interface LeadEmailData {
  name: string
  email: string
  phone?: string | null
  company?: string | null
  service?: string | null
  budget?: string | null
  message: string
}

// Email configuration
const EMAIL_CONFIG = {
  // This will be the verified sender email in Resend
  // During testing, Resend only allows sending to the verified email
  from: 'Sexto Sistema <onboarding@resend.dev>',
  // Your admin email where you'll receive notifications
  adminEmail: process.env.ADMIN_EMAIL || 'sextosistema.ia@gmail.com',
}

// Initialize Resend client
const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is not set')
  }
  return new Resend(apiKey)
}

/**
 * Generate HTML email template for new lead notification
 */
function generateLeadEmailTemplate(lead: LeadEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nuevo Lead - Sexto Sistema</title>
</head>
<body style="margin: 0; padding: 0; background-color: #09090B; font-family: 'Inter', Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #09090B; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(6, 182, 212, 0.04) 100%); border: 1px solid rgba(6, 182, 212, 0.15); border-radius: 24px; padding: 40px;">
          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom: 30px;">
              <h1 style="margin: 0; font-size: 28px; color: #FFFFFF; font-weight: 700;">
                🚀 Nuevo Lead Recibido
              </h1>
            </td>
          </tr>
          
          <!-- Lead Info -->
          <tr>
            <td style="background: rgba(0, 0, 0, 0.3); border-radius: 16px; padding: 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding-bottom: 20px;">
                    <span style="color: #06B6D4; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Nombre</span>
                    <p style="margin: 5px 0 0 0; color: #FFFFFF; font-size: 18px; font-weight: 600;">${lead.name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 20px;">
                    <span style="color: #06B6D4; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</span>
                    <p style="margin: 5px 0 0 0; color: #FFFFFF; font-size: 16px;">
                      <a href="mailto:${lead.email}" style="color: #22D3EE; text-decoration: none;">${lead.email}</a>
                    </p>
                  </td>
                </tr>
                ${lead.phone ? `
                <tr>
                  <td style="padding-bottom: 20px;">
                    <span style="color: #06B6D4; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Teléfono</span>
                    <p style="margin: 5px 0 0 0; color: #FFFFFF; font-size: 16px;">${lead.phone}</p>
                  </td>
                </tr>
                ` : ''}
                ${lead.company ? `
                <tr>
                  <td style="padding-bottom: 20px;">
                    <span style="color: #06B6D4; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Empresa</span>
                    <p style="margin: 5px 0 0 0; color: #FFFFFF; font-size: 16px;">${lead.company}</p>
                  </td>
                </tr>
                ` : ''}
                ${lead.service ? `
                <tr>
                  <td style="padding-bottom: 20px;">
                    <span style="color: #06B6D4; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Servicio de Interés</span>
                    <p style="margin: 5px 0 0 0; color: #FFFFFF; font-size: 16px;">${lead.service}</p>
                  </td>
                </tr>
                ` : ''}
                ${lead.budget ? `
                <tr>
                  <td style="padding-bottom: 20px;">
                    <span style="color: #06B6D4; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Presupuesto</span>
                    <p style="margin: 5px 0 0 0; color: #FFFFFF; font-size: 16px;">${lead.budget}</p>
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td>
                    <span style="color: #06B6D4; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Mensaje</span>
                    <p style="margin: 5px 0 0 0; color: #E4E4E7; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${lead.message}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- CTA -->
          <tr>
            <td align="center" style="padding-top: 30px;">
              <a href="mailto:${lead.email}" style="display: inline-block; background: linear-gradient(135deg, #0891B2 0%, #06B6D4 50%, #22D3EE 100%); color: #FFFFFF; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 16px;">
                Responder a ${lead.name}
              </a>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top: 40px; border-top: 1px solid rgba(6, 182, 212, 0.1); margin-top: 20px;">
              <p style="margin: 0; color: #71717A; font-size: 14px;">
                Sexto Sistema - Agencia de Inteligencia Artificial
              </p>
              <p style="margin: 10px 0 0 0; color: #52525B; font-size: 12px;">
                Este email fue generado automáticamente desde tu landing page.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

/**
 * Generate confirmation email for the lead
 */
function generateConfirmationEmailTemplate(lead: LeadEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmación - Sexto Sistema</title>
</head>
<body style="margin: 0; padding: 0; background-color: #09090B; font-family: 'Inter', Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #09090B; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(6, 182, 212, 0.04) 100%); border: 1px solid rgba(6, 182, 212, 0.15); border-radius: 24px; padding: 40px;">
          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom: 30px;">
              <h1 style="margin: 0; font-size: 28px; color: #FFFFFF; font-weight: 700;">
                ¡Gracias por contactarnos! 🎉
              </h1>
            </td>
          </tr>
          
          <!-- Message -->
          <tr>
            <td style="padding: 0 20px;">
              <p style="margin: 0 0 20px 0; color: #E4E4E7; font-size: 16px; line-height: 1.6;">
                Hola <strong style="color: #FFFFFF;">${lead.name}</strong>,
              </p>
              <p style="margin: 0 0 20px 0; color: #E4E4E7; font-size: 16px; line-height: 1.6;">
                Hemos recibido tu mensaje y nuestro equipo lo está revisando. Nos pondremos en contacto contigo en menos de 24 horas.
              </p>
              <p style="margin: 0 0 20px 0; color: #E4E4E7; font-size: 16px; line-height: 1.6;">
                Mientras tanto, puedes explorar nuestros servicios o seguirnos en nuestras redes sociales.
              </p>
            </td>
          </tr>
          
          <!-- Summary -->
          <tr>
            <td style="background: rgba(0, 0, 0, 0.3); border-radius: 16px; padding: 25px; margin: 20px 0;">
              <span style="color: #06B6D4; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Tu mensaje</span>
              <p style="margin: 10px 0 0 0; color: #A1A1AA; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${lead.message}</p>
            </td>
          </tr>
          
          <!-- CTA -->
          <tr>
            <td align="center" style="padding-top: 30px;">
              <a href="https://sextosistema.com" style="display: inline-block; background: linear-gradient(135deg, #0891B2 0%, #06B6D4 50%, #22D3EE 100%); color: #FFFFFF; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 16px;">
                Visitar Website
              </a>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top: 40px; border-top: 1px solid rgba(6, 182, 212, 0.1); margin-top: 20px;">
              <p style="margin: 0; color: #FFFFFF; font-size: 16px; font-weight: 600;">
                Sexto Sistema
              </p>
              <p style="margin: 5px 0 0 0; color: #A1A1AA; font-size: 14px;">
                Agencia de Inteligencia Artificial
              </p>
              <p style="margin: 15px 0 0 0; color: #52525B; font-size: 12px;">
                Soluciones simples a tus necesidades complejas
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

/**
 * Send email using Resend
 */
export async function sendEmail({ to, subject, html, text, replyTo }: EmailData): Promise<{ success: boolean; message: string }> {
  try {
    const resend = getResendClient()
    
    const { data, error } = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      text,
      replyTo: replyTo,
    })

    if (error) {
      console.error('Resend API error:', error)
      return { success: false, message: `Error sending email: ${error.message}` }
    }

    console.log(`✅ Email sent successfully to ${to}. ID: ${data?.id}`)
    return { success: true, message: 'Email sent successfully', id: data?.id }
    
  } catch (error) {
    console.error('Email sending error:', error)
    
    // If Resend is not configured, log for development
    if (!process.env.RESEND_API_KEY) {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('📧 RESEND_API_KEY not set - Email Preview:')
      console.log(`To: ${to}`)
      console.log(`Subject: ${subject}`)
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      return { success: true, message: 'Email logged (no API key configured)' }
    }
    
    return { success: false, message: 'Failed to send email' }
  }
}

/**
 * Send notification email to admin when new lead is received
 */
export async function sendLeadNotificationEmail(lead: LeadEmailData): Promise<{ success: boolean; message: string }> {
  const html = generateLeadEmailTemplate(lead)
  
  return sendEmail({
    to: EMAIL_CONFIG.adminEmail,
    subject: `🚀 Nuevo Lead: ${lead.name} - ${lead.company || 'Sin empresa'}`,
    html,
    text: `
Nuevo Lead Recibido

Nombre: ${lead.name}
Email: ${lead.email}
${lead.phone ? `Teléfono: ${lead.phone}` : ''}
${lead.company ? `Empresa: ${lead.company}` : ''}
${lead.service ? `Servicio: ${lead.service}` : ''}
${lead.budget ? `Presupuesto: ${lead.budget}` : ''}

Mensaje:
${lead.message}
    `.trim(),
    replyTo: lead.email, // So you can reply directly to the lead
  })
}

/**
 * Send confirmation email to the lead
 * Note: During Resend testing, this will only work if the lead's email is verified
 * In production with a verified domain, it will work for any email
 */
export async function sendLeadConfirmationEmail(lead: LeadEmailData): Promise<{ success: boolean; message: string }> {
  const html = generateConfirmationEmailTemplate(lead)
  
  // For testing with Resend, we send to admin email instead of lead email
  // In production, change this to: to: lead.email
  const recipientEmail = process.env.NODE_ENV === 'production' ? lead.email : EMAIL_CONFIG.adminEmail
  
  return sendEmail({
    to: recipientEmail,
    subject: '¡Gracias por contactar a Sexto Sistema! 🚀',
    html,
    text: `
¡Gracias por contactarnos!

Hola ${lead.name},

Hemos recibido tu mensaje y nuestro equipo lo está revisando. Nos pondremos en contacto contigo en menos de 24 horas.

Tu mensaje:
${lead.message}

Sexto Sistema - Agencia de Inteligencia Artificial
    `.trim()
  })
}

/**
 * Send both admin notification and lead confirmation emails
 */
export async function sendLeadEmails(lead: LeadEmailData): Promise<{
  admin: { success: boolean; message: string }
  confirmation: { success: boolean; message: string }
}> {
  const [admin, confirmation] = await Promise.all([
    sendLeadNotificationEmail(lead),
    sendLeadConfirmationEmail(lead)
  ])
  
  return { admin, confirmation }
}
