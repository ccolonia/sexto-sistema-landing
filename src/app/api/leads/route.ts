import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendLeadEmails } from '@/lib/email'

// Validation schema for lead creation
const createLeadSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional().nullable(),
  company: z.string().optional().nullable(),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
  source: z.string().optional().nullable(),
})

/**
 * POST /api/leads
 * Create a new lead and send emails
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validationResult = createLeadSchema.safeParse(body)
    
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

    // Send notification emails
    try {
      await sendLeadEmails({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        message: data.message,
      })
    } catch (emailError) {
      console.error('Error sending lead emails:', emailError)
      // Continue even if email fails - we'll still return success
    }

    return NextResponse.json({
      success: true,
      message: '¡Mensaje enviado! Nos pondremos en contacto pronto.',
      data: {
        name: data.name,
        email: data.email
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating lead:', error)
    return NextResponse.json(
      { success: false, error: 'Error al enviar el mensaje. Por favor intenta de nuevo.' },
      { status: 500 }
    )
  }
}
