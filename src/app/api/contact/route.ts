import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional().nullable(),
  company: z.string().optional().nullable(),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
})

// Email configuration
const RESEND_API_KEY = process.env.RESEND_API_KEY
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'sextosistema.ia@gmail.com'

/**
 * POST /api/contact
 * Send contact form email directly without database
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validationResult = contactSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Datos inválidos',
          details: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      )
    }

    const data = validationResult.data

    // Send email with Resend
    if (RESEND_API_KEY) {
      const resend = new Resend(RESEND_API_KEY)
      
      // Email to admin
      await resend.emails.send({
        from: 'Sexto Sistema <onboarding@resend.dev>',
        to: ADMIN_EMAIL,
        subject: `🚀 Nuevo Contacto: ${data.name}`,
        html: `
          <h2>Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.phone ? `<p><strong>Teléfono:</strong> ${data.phone}</p>` : ''}
          ${data.company ? `<p><strong>Empresa:</strong> ${data.company}</p>` : ''}
          <p><strong>Mensaje:</strong></p>
          <p>${data.message}</p>
        `,
        replyTo: data.email,
      })
    }

    return NextResponse.json({
      success: true,
      message: '¡Mensaje enviado! Nos pondremos en contacto pronto.',
    }, { status: 200 })

  } catch (error) {
    console.error('Error in contact form:', error)
    return NextResponse.json(
      { success: false, error: 'Error al enviar el mensaje. Por favor intenta de nuevo.' },
      { status: 500 }
    )
  }
}
