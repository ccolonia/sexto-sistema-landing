import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { sendLeadEmails } from '@/lib/email'

// Validation schema for lead creation
const createLeadSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional().nullable(),
  company: z.string().optional().nullable(),
  service: z.string().optional().nullable(),
  budget: z.string().optional().nullable(),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
  source: z.string().optional().nullable(),
})

// Services list for validation
const SERVICES = [
  'Desarrollo de IA',
  'Automatización',
  'Consultoría IA',
  'Chatbots & Asistentes',
  'Análisis de Datos',
  'Integraciones',
  'Otro'
] as const

const BUDGETS = [
  'Menos de $5,000',
  '$5,000 - $15,000',
  '$15,000 - $50,000',
  'Más de $50,000',
  'Por definir'
] as const

/**
 * GET /api/leads
 * Get all leads (for admin dashboard)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    const where = status ? { status } : {}

    const [leads, total] = await Promise.all([
      db.lead.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      db.lead.count({ where })
    ])

    return NextResponse.json({
      success: true,
      data: leads,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + leads.length < total
      }
    })
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json(
      { success: false, error: 'Error al obtener los leads' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/leads
 * Create a new lead
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

    // Check for duplicate email in last 24 hours
    const existingLead = await db.lead.findFirst({
      where: {
        email: data.email,
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // 24 hours ago
        }
      }
    })

    if (existingLead) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Ya recibimos tu mensaje recientemente. Nos pondremos en contacto pronto.' 
        },
        { status: 400 }
      )
    }

    // Create lead in database
    const lead = await db.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        service: data.service,
        budget: data.budget,
        message: data.message,
        source: data.source || 'website',
      }
    })

    // Send notification emails (async, don't wait for it)
    sendLeadEmails({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      service: lead.service,
      budget: lead.budget,
      message: lead.message,
    }).catch(error => {
      console.error('Error sending lead emails:', error)
    })

    return NextResponse.json({
      success: true,
      message: '¡Mensaje enviado! Nos pondremos en contacto pronto.',
      data: {
        id: lead.id,
        name: lead.name,
        email: lead.email
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

/**
 * PATCH /api/leads
 * Update lead status or notes
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status, notes, contactedAt } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID de lead requerido' },
        { status: 400 }
      )
    }

    const updateData: Record<string, unknown> = {}
    if (status) updateData.status = status
    if (notes !== undefined) updateData.notes = notes
    if (contactedAt) updateData.contactedAt = new Date(contactedAt)

    const lead = await db.lead.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json({
      success: true,
      data: lead
    })
  } catch (error) {
    console.error('Error updating lead:', error)
    return NextResponse.json(
      { success: false, error: 'Error al actualizar el lead' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/leads
 * Delete a lead
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID de lead requerido' },
        { status: 400 }
      )
    }

    await db.lead.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'Lead eliminado correctamente'
    })
  } catch (error) {
    console.error('Error deleting lead:', error)
    return NextResponse.json(
      { success: false, error: 'Error al eliminar el lead' },
      { status: 500 }
    )
  }
}
