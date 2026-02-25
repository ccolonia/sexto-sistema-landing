import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, message } = body

    // Validate
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    // Send email with Resend API
    const RESEND_API_KEY = process.env.RESEND_API_KEY
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'sextosistema.ia@gmail.com'

    if (RESEND_API_KEY) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Sexto Sistema <onboarding@resend.dev>',
          to: ADMIN_EMAIL,
          subject: `Nuevo Contacto: ${name}`,
          html: `
            <h2>Nuevo mensaje de contacto</h2>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ''}
            ${company ? `<p><strong>Empresa:</strong> ${company}</p>` : ''}
            <p><strong>Mensaje:</strong></p>
            <p>${message}</p>
          `,
          reply_to: email,
        }),
      })

      if (!response.ok) {
        console.error('Resend error:', await response.text())
      }
    }

    return NextResponse.json({
      success: true,
      message: '¡Mensaje enviado!'
    })

  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { success: false, error: 'Error al enviar' },
      { status: 500 }
    )
  }
}
