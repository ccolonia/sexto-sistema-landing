'use client'

import { useState } from 'react'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    const form = e.currentTarget
    const formData = new FormData(form)

    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      company: formData.get('company'),
      message: formData.get('message'),
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        setIsSuccess(true)
        form.reset()
        setTimeout(() => setIsSuccess(false), 5000)
      } else {
        setError(result.error || 'Error al enviar')
      }
    } catch {
      setError('Error al enviar el mensaje')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
          Nombre completo <span className="text-[var(--primary-500)]">*</span>
        </label>
        <input
          name="name"
          type="text"
          required
          placeholder="Tu nombre"
          disabled={isSubmitting}
          className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[rgba(6,182,212,0.2)] rounded-xl text-white placeholder-[var(--text-quaternary)] focus:outline-none focus:border-[var(--primary-500)] transition-all disabled:opacity-50"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
          Email <span className="text-[var(--primary-500)]">*</span>
        </label>
        <input
          name="email"
          type="email"
          required
          placeholder="tu@email.com"
          disabled={isSubmitting}
          className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[rgba(6,182,212,0.2)] rounded-xl text-white placeholder-[var(--text-quaternary)] focus:outline-none focus:border-[var(--primary-500)] transition-all disabled:opacity-50"
        />
      </div>

      {/* Phone & Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
            Teléfono
          </label>
          <input
            name="phone"
            type="tel"
            placeholder="+54 9 11 6866-7898"
            disabled={isSubmitting}
            className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[rgba(6,182,212,0.2)] rounded-xl text-white placeholder-[var(--text-quaternary)] focus:outline-none focus:border-[var(--primary-500)] transition-all disabled:opacity-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
            Empresa
          </label>
          <input
            name="company"
            type="text"
            placeholder="Tu empresa"
            disabled={isSubmitting}
            className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[rgba(6,182,212,0.2)] rounded-xl text-white placeholder-[var(--text-quaternary)] focus:outline-none focus:border-[var(--primary-500)] transition-all disabled:opacity-50"
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
          Mensaje <span className="text-[var(--primary-500)]">*</span>
        </label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Cuéntanos sobre tu proyecto..."
          disabled={isSubmitting}
          className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[rgba(6,182,212,0.2)] rounded-xl text-white placeholder-[var(--text-quaternary)] focus:outline-none focus:border-[var(--primary-500)] transition-all disabled:opacity-50 resize-none"
        />
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary text-lg py-4 flex items-center justify-center gap-3 disabled:opacity-50"
      >
        {isSubmitting ? (
          'Enviando...'
        ) : isSuccess ? (
          '¡Enviado!'
        ) : (
          'Enviar Mensaje'
        )}
      </button>

      {isSuccess && (
        <p className="text-center text-[var(--primary-400)]">
          ¡Mensaje enviado! Nos pondremos en contacto pronto.
        </p>
      )}
    </form>
  )
}
