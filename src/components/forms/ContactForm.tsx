'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'

// Validation schema - simplified without service and budget
const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre es muy largo'),
  email: z.string()
    .email('Por favor ingresa un email válido')
    .max(255, 'El email es muy largo'),
  phone: z.string()
    .optional()
    .refine(val => !val || /^[\d\s\-+()]{7,20}$/.test(val), {
      message: 'Por favor ingresa un teléfono válido'
    }),
  company: z.string()
    .max(100, 'El nombre de la empresa es muy largo')
    .optional(),
  message: z.string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(2000, 'El mensaje es muy largo (máximo 2000 caracteres)')
})

type ContactFormData = z.infer<typeof contactFormSchema>

interface ContactFormProps {
  onSuccess?: () => void
  className?: string
}

export function ContactForm({ onSuccess, className = '' }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      message: ''
    }
  })

  const message = watch('message', '')
  const messageLength = message.length

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          source: 'website'
        })
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Error al enviar el mensaje')
      }

      // Success!
      setIsSuccess(true)
      toast.success('¡Mensaje enviado!', {
        description: 'Nos pondremos en contacto en menos de 24 horas.'
      })
      reset()
      onSuccess?.()

      // Reset success state after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000)

    } catch (error) {
      console.error('Form submission error:', error)
      toast.error('Error al enviar', {
        description: error instanceof Error ? error.message : 'Por favor intenta de nuevo.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-6 ${className}`}>
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
          Nombre completo <span className="text-[var(--primary-500)]">*</span>
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          placeholder="Tu nombre"
          disabled={isSubmitting}
          className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[rgba(6,182,212,0.2)] rounded-xl text-white placeholder-[var(--text-quaternary)] focus:outline-none focus:border-[var(--primary-500)] focus:ring-2 focus:ring-[rgba(6,182,212,0.2)] transition-all disabled:opacity-50"
        />
        {errors.name && (
          <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
          Email <span className="text-[var(--primary-500)]">*</span>
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          placeholder="tu@email.com"
          disabled={isSubmitting}
          className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[rgba(6,182,212,0.2)] rounded-xl text-white placeholder-[var(--text-quaternary)] focus:outline-none focus:border-[var(--primary-500)] focus:ring-2 focus:ring-[rgba(6,182,212,0.2)] transition-all disabled:opacity-50"
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>
        )}
      </div>

      {/* Phone & Company - Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
            Teléfono
          </label>
          <input
            {...register('phone')}
            type="tel"
            id="phone"
            placeholder="+54 9 11 6866-7898"
            disabled={isSubmitting}
            className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[rgba(6,182,212,0.2)] rounded-xl text-white placeholder-[var(--text-quaternary)] focus:outline-none focus:border-[var(--primary-500)] focus:ring-2 focus:ring-[rgba(6,182,212,0.2)] transition-all disabled:opacity-50"
          />
          {errors.phone && (
            <p className="mt-2 text-sm text-red-400">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
            Empresa
          </label>
          <input
            {...register('company')}
            type="text"
            id="company"
            placeholder="Tu empresa"
            disabled={isSubmitting}
            className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[rgba(6,182,212,0.2)] rounded-xl text-white placeholder-[var(--text-quaternary)] focus:outline-none focus:border-[var(--primary-500)] focus:ring-2 focus:ring-[rgba(6,182,212,0.2)] transition-all disabled:opacity-50"
          />
          {errors.company && (
            <p className="mt-2 text-sm text-red-400">{errors.company.message}</p>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
          Mensaje <span className="text-[var(--primary-500)]">*</span>
        </label>
        <textarea
          {...register('message')}
          id="message"
          rows={5}
          placeholder="Cuéntanos sobre tu proyecto o necesidades..."
          disabled={isSubmitting}
          className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[rgba(6,182,212,0.2)] rounded-xl text-white placeholder-[var(--text-quaternary)] focus:outline-none focus:border-[var(--primary-500)] focus:ring-2 focus:ring-[rgba(6,182,212,0.2)] transition-all disabled:opacity-50 resize-none"
        />
        <div className="flex justify-between mt-2">
          {errors.message ? (
            <p className="text-sm text-red-400">{errors.message.message}</p>
          ) : (
            <span></span>
          )}
          <span className={`text-xs ${messageLength > 1800 ? 'text-yellow-400' : 'text-[var(--text-quaternary)]'}`}>
            {messageLength}/2000
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary text-lg py-4 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Enviando...
          </>
        ) : isSuccess ? (
          <>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            ¡Enviado!
          </>
        ) : (
          <>
            Enviar Mensaje
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </>
        )}
      </button>

      <p className="text-center text-sm text-[var(--text-quaternary)]">
        Al enviar este formulario, aceptas nuestra{' '}
        <a href="#" className="text-[var(--primary-400)] hover:underline">Política de Privacidad</a>.
      </p>
    </form>
  )
}
