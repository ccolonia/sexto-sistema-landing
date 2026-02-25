'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { ContactForm } from '@/components/ContactForm'

// Types
interface Service {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
}

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  quote: string
  avatar: string
}

// Data
const services: Service[] = [
  {
    id: 1,
    title: 'Desarrollo de IA',
    description: 'Creamos modelos personalizados de machine learning y redes neuronales diseñados específicamente para resolver los desafíos únicos de tu negocio.',
    image: '/images/service_1.png',
    tags: ['ML', 'Deep Learning', 'NLP']
  },
  {
    id: 2,
    title: 'Automatización',
    description: 'Implementamos flujos de trabajo automatizados que ahorran tiempo y recursos, permitiendo que tu equipo se enfoque en lo que realmente importa.',
    image: '/images/service_2.png',
    tags: ['RPA', 'Workflows', 'Efficiency']
  },
  {
    id: 3,
    title: 'Consultoría IA',
    description: 'Desarrollamos estrategias personalizadas para implementar inteligencia artificial en tu organización con un enfoque en ROI medible.',
    image: '/images/service_3.png',
    tags: ['Strategy', 'Roadmap', 'ROI']
  },
  {
    id: 4,
    title: 'Chatbots & Asistentes',
    description: 'Diseñamos asistentes virtuales inteligentes disponibles 24/7 que mejoran la experiencia de tus clientes y optimizan la atención.',
    image: '/images/service_4.png',
    tags: ['NLP', 'Conversational AI', 'Support']
  },
  {
    id: 5,
    title: 'Análisis de Datos',
    description: 'Transformamos tus datos en insights accionables utilizando técnicas avanzadas de análisis predictivo y visualización inteligente.',
    image: '/images/service_5.png',
    tags: ['Analytics', 'BI', 'Predictions']
  },
  {
    id: 6,
    title: 'Integraciones',
    description: 'Conectamos soluciones de IA con tus sistemas existentes, asegurando una implementación fluida y sin interrupciones operativas.',
    image: '/images/service_6.png',
    tags: ['API', 'Cloud', 'Migration']
  }
]

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'María García',
    role: 'CEO',
    company: 'TechVentures',
    quote: 'Sexto Sistema transformó nuestra operación con un chatbot que redujo los tiempos de respuesta en un 80%. La implementación fue impecable.',
    avatar: 'MG'
  },
  {
    id: 2,
    name: 'Carlos Mendoza',
    role: 'Director de Innovación',
    company: 'DataCorp',
    quote: 'Su enfoque de consultoría nos ayudó a identificar oportunidades de automatización que no habíamos considerado. ROI del 300% en el primer año.',
    avatar: 'CM'
  },
  {
    id: 3,
    name: 'Ana Rodríguez',
    role: 'CTO',
    company: 'InnovateLab',
    quote: 'El modelo de predicción que desarrollaron para nosotros superó todas las expectativas. Precisión del 95% en pronósticos de demanda.',
    avatar: 'AR'
  }
]

const stats = [
  { value: 50, suffix: '+', label: 'Proyectos Completados' },
  { value: 30, suffix: '+', label: 'Clientes Satisfechos' },
  { value: 5, suffix: '+', label: 'Años de Experiencia' },
  { value: 98, suffix: '%', label: 'Tasa de Éxito' }
]

const navLinks = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#testimonios', label: 'Testimonios' },
  { href: '#contacto', label: 'Contacto' }
]

// Components
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <Image 
              src="/images/logo.png" 
              alt="Sexto Sistema" 
              width={40} 
              height={40}
              className="rounded-lg"
            />
            <span className="font-bold text-xl hidden sm:block" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
              Sexto Sistema
            </span>
          </a>
          
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <a 
                key={link.href}
                href={link.href} 
                className="nav-link text-sm font-medium text-[var(--text-secondary)] hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          
          <div className="hidden lg:block">
            <a href="#contacto" className="btn-primary text-sm px-6 py-3 inline-block">
              Empezar Proyecto
            </a>
          </div>
          
          <button 
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-white transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        {navLinks.map(link => (
          <a 
            key={link.href}
            href={link.href}
            onClick={() => setMobileMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a href="#contacto" className="btn-primary mt-4" onClick={() => setMobileMenuOpen(false)}>
          Empezar Proyecto
        </a>
      </div>
    </>
  )
}

// Pre-generated particle positions to avoid hydration mismatch
// Using golden ratio distribution for natural-looking placement
const PARTICLE_POSITIONS = Array.from({ length: 50 }, (_, i) => {
  const goldenRatio = 1.618033988749895
  const angle = i * goldenRatio * Math.PI * 2
  const radius = Math.sqrt(i / 50)
  return {
    left: `${50 + radius * 50 * Math.cos(angle)}%`,
    top: `${50 + radius * 50 * Math.sin(angle)}%`,
    animationDelay: `${(i * 0.4) % 20}s`,
    animationDuration: `${15 + (i % 10)}s`
  }
})

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLE_POSITIONS.map((pos, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: pos.left,
            top: pos.top,
            animationDelay: pos.animationDelay,
            animationDuration: pos.animationDuration
          }}
        />
      ))}
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-radial">
      <Particles />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 lg:py-0 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(6,182,212,0.1)] border border-[rgba(6,182,212,0.2)] mb-8 animate-fade-in-up">
            <span className="text-lg">🚀</span>
            <span className="text-sm font-medium text-[var(--primary-400)]">Agencia de Inteligencia Artificial</span>
          </div>
          
          <h1 
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 animate-fade-in-up"
            style={{ 
              fontFamily: 'var(--font-plus-jakarta)',
              animationDelay: '0.2s'
            }}
          >
            <span className="text-white">Sexto </span>
            <span className="text-gradient">Sistema</span>
          </h1>
          
          <p 
            className="text-xl sm:text-2xl text-[var(--text-secondary)] mb-4 max-w-2xl animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            Todo lo que estamos haciendo muere a cada instante, para evitarlo hay que seguir creando
          </p>
          
          <p 
            className="text-lg text-[var(--text-tertiary)] mb-10 max-w-xl animate-fade-in-up"
            style={{ animationDelay: '0.5s' }}
          >
            Una agencia de soluciones simples a tus necesidades complejas, donde tus proyectos se hacen realidad.
          </p>
          
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up"
            style={{ animationDelay: '0.6s' }}
          >
            <a href="#contacto" className="btn-primary animate-pulse-glow text-center">
              Comenzar Ahora
            </a>
            <a href="#servicios" className="btn-secondary text-center">
              Ver Servicios
            </a>
          </div>
        </div>
        
        <div className="flex-1 relative flex justify-center items-center">
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[450px] lg:h-[450px]">
            {/* Glow background */}
            <div className="absolute inset-0 bg-gradient-radial-strong rounded-full blur-3xl" />
            
            {/* Main image */}
            <div className="relative w-full h-full animate-float">
              <Image
                src="/images/hero_visual.png"
                alt="Sexto Sistema AI"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
            
            {/* Decorative rings */}
            <div className="absolute inset-0 border-2 border-[rgba(6,182,212,0.2)] rounded-full animate-spin-slow" />
            <div className="absolute inset-4 border border-[rgba(6,182,212,0.1)] rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-[var(--text-quaternary)]">Scroll</span>
        <div className="w-6 h-10 border-2 border-[rgba(6,182,212,0.3)] rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-[var(--primary-500)] rounded-full" />
        </div>
      </div>
    </section>
  )
}

function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 border-y border-[rgba(6,182,212,0.1)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="text-center"
              style={{ 
                animation: isVisible ? `fade-in-up 0.6s ease forwards ${index * 0.1}s` : 'none',
                opacity: isVisible ? 0 : 1
              }}
            >
              <div className="text-4xl lg:text-5xl font-extrabold text-gradient mb-2" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
                {isVisible && <Counter value={stat.value} suffix={stat.suffix} />}
              </div>
              <div className="text-sm text-[var(--text-tertiary)] uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    const duration = 2000
    const increment = value / (duration / 16)
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.round(current))
      }
    }, 16)
    
    return () => clearInterval(timer)
  }, [value])
  
  return <span className="counter">{count}{suffix}</span>
}

function FlipCard({ service, index }: { service: Service; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div 
      ref={cardRef}
      className={`flip-card ${isFlipped ? 'flipped' : ''}`}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ 
        animation: isVisible ? `fade-in-up 0.6s ease forwards ${index * 0.1}s` : 'none',
        opacity: isVisible ? 0 : 1
      }}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
              {service.title}
            </h3>
          </div>
        </div>
        
        <div className="flip-card-back">
          <h3 className="text-xl font-bold text-gradient mb-4" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
            {service.title}
          </h3>
          <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
            {service.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {service.tags.map(tag => (
              <span key={tag} className="feature-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ServicesSection() {
  return (
    <section id="servicios" className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-radial opacity-50" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-[var(--primary-400)] uppercase tracking-wider mb-4">
            Nuestros Servicios
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
            Soluciones de <span className="text-gradient">IA</span> para tu Negocio
          </h2>
          <p className="text-lg text-[var(--text-tertiary)] max-w-2xl mx-auto">
            Transformamos tus desafíos más complejos en soluciones simples con inteligencia artificial
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <FlipCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const projects = [
    {
      image: '/images/showcase_1.png',
      title: 'Dashboard Predictivo',
      client: 'DataCorp',
      metric: '+85% eficiencia',
      description: 'Sistema de análisis predictivo que transformó la toma de decisiones'
    },
    {
      image: '/images/showcase_2.png',
      title: 'Asistente Virtual 24/7',
      client: 'TechVentures',
      metric: '-80% tiempo respuesta',
      description: 'Chatbot inteligente que revolucionó la atención al cliente'
    }
  ]

  return (
    <section id="proyectos" ref={sectionRef} className="py-24 lg:py-32 bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-[var(--primary-400)] uppercase tracking-wider mb-4">
            Casos de Éxito
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
            Proyectos que <span className="text-gradient">Transforman</span>
          </h2>
          <p className="text-lg text-[var(--text-tertiary)] max-w-2xl mx-auto">
            Cada proyecto es una historia de transformación digital
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.title}
              className="glass-card overflow-hidden group"
              style={{ 
                animation: isVisible ? `fade-in-up 0.6s ease forwards ${index * 0.2}s` : 'none',
                opacity: isVisible ? 0 : 1
              }}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-[var(--primary-500)] text-black px-3 py-1 rounded-full text-sm font-medium">
                  {project.metric}
                </div>
              </div>
              <div className="p-6">
                <span className="text-sm text-[var(--primary-400)]">{project.client}</span>
                <h3 className="text-xl font-bold mt-2 mb-3" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
                  {project.title}
                </h3>
                <p className="text-[var(--text-tertiary)]">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="nosotros" ref={sectionRef} className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-radial opacity-30" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div 
            className="relative"
            style={{ 
              animation: isVisible ? 'fade-in-up 0.8s ease forwards' : 'none',
              opacity: isVisible ? 0 : 1
            }}
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-radial-strong rounded-3xl blur-3xl" />
              
              <div className="relative h-full rounded-3xl overflow-hidden border border-[rgba(6,182,212,0.2)]">
                <Image
                  src="/images/about_image.png"
                  alt="Sexto Sistema Team"
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border border-[var(--primary-500)] rounded-2xl opacity-30" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-[var(--primary-500)] rounded-full opacity-20" />
            </div>
          </div>
          
          <div
            style={{ 
              animation: isVisible ? 'fade-in-up 0.8s ease forwards 0.2s' : 'none',
              opacity: isVisible ? 0 : 1
            }}
          >
            <span className="inline-block text-sm font-medium text-[var(--primary-400)] uppercase tracking-wider mb-4">
              Sobre Nosotros
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
              Creando el <span className="text-gradient">Futuro</span> con IA
            </h2>
            
            <div className="space-y-4 text-[var(--text-secondary)]">
              <p>
                En Sexto Sistema creemos que la inteligencia artificial no es solo tecnología, es una forma de amplificar el potencial humano. Somos una agencia que nació de la pasión por resolver problemas complejos con soluciones elegantes y simples.
              </p>
              <p>
                Nuestro equipo combina décadas de experiencia en desarrollo de software, ciencia de datos y estrategia de negocio. No solo implementamos IA, transformamos organizaciones.
              </p>
              <p>
                Cada proyecto es una oportunidad de crear algo significativo. Trabajamos codo a codo con nuestros clientes para entender sus desafíos únicos y desarrollar soluciones que generen impacto real.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="glass-card p-6 text-center">
                <div className="text-3xl font-bold text-gradient mb-2" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
                  100%
                </div>
                <div className="text-sm text-[var(--text-tertiary)]">Compromiso</div>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="text-3xl font-bold text-gradient mb-2" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
                  24/7
                </div>
                <div className="text-sm text-[var(--text-tertiary)]">Soporte</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="testimonios" ref={sectionRef} className="py-24 lg:py-32 bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-[var(--primary-400)] uppercase tracking-wider mb-4">
            Testimonios
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
            Lo que Dicen <span className="text-gradient">Nuestros Clientes</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="testimonial-card"
              style={{ 
                animation: isVisible ? `fade-in-up 0.6s ease forwards ${index * 0.15}s` : 'none',
                opacity: isVisible ? 0 : 1
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[var(--primary-400)]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <p className="text-[var(--text-secondary)] mb-6 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary-500)] to-[var(--primary-700)] flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-[var(--text-tertiary)]">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="contacto" ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial-strong" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start"
          style={{ 
            animation: isVisible ? 'fade-in-up 0.8s ease forwards' : 'none',
            opacity: isVisible ? 0 : 1
          }}
        >
          {/* Left Column - Text */}
          <div className="text-center lg:text-left">
            <span className="inline-block text-sm font-medium text-[var(--primary-400)] uppercase tracking-wider mb-4">
              Contáctanos
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
              ¿Listo para <span className="text-gradient">Transformar</span> tu Negocio?
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-8">
              Agenda una consulta gratuita y descubre cómo la inteligencia artificial puede llevar tu empresa al siguiente nivel.
            </p>
            
            {/* Benefits */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[rgba(6,182,212,0.2)] flex items-center justify-center">
                  <svg className="w-4 h-4 text-[var(--primary-400)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[var(--text-secondary)]">Respuesta en menos de 24 horas</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[rgba(6,182,212,0.2)] flex items-center justify-center">
                  <svg className="w-4 h-4 text-[var(--primary-400)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[var(--text-secondary)]">Consulta gratuita sin compromiso</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[rgba(6,182,212,0.2)] flex items-center justify-center">
                  <svg className="w-4 h-4 text-[var(--primary-400)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[var(--text-secondary)]">Propuesta personalizada para tu negocio</span>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary-500)] to-[var(--primary-700)] flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-[var(--text-tertiary)]">Email directo</p>
                  <a href="mailto:sextosistema.ia@gmail.com" className="text-[var(--primary-400)] hover:underline font-medium">
                    sextosistema.ia@gmail.com
                  </a>
                </div>
              </div>
              <p className="text-sm text-[var(--text-quaternary)]">
                Preferible usar el formulario para una respuesta más rápida.
              </p>
            </div>
          </div>
          
          {/* Right Column - Form */}
          <div className="glass-card p-8 lg:p-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const footerLinks = {
    servicios: [
      { label: 'Desarrollo de IA', href: '#servicios' },
      { label: 'Automatización', href: '#servicios' },
      { label: 'Consultoría', href: '#servicios' },
      { label: 'Chatbots', href: '#servicios' }
    ],
    recursos: [
      { label: 'Blog', href: '#' },
      { label: 'Casos de Éxito', href: '#proyectos' },
      { label: 'Guías', href: '#' }
    ],
    empresa: [
      { label: 'Sobre Nosotros', href: '#nosotros' },
      { label: 'Contacto', href: '#contacto' }
    ]
  }

  return (
    <footer className="py-16 border-t border-[rgba(6,182,212,0.1)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Image 
                src="/images/logo.png" 
                alt="Sexto Sistema" 
                width={40} 
                height={40}
                className="rounded-lg"
              />
              <span className="font-bold text-xl" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
                Sexto Sistema
              </span>
            </div>
            <p className="text-[var(--text-tertiary)] mb-6 max-w-xs">
              Una agencia de soluciones simples a tus necesidades complejas, donde tus proyectos se hacen realidad.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-[rgba(6,182,212,0.2)] flex items-center justify-center hover:bg-[rgba(6,182,212,0.1)] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[rgba(6,182,212,0.2)] flex items-center justify-center hover:bg-[rgba(6,182,212,0.1)] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[rgba(6,182,212,0.2)] flex items-center justify-center hover:bg-[rgba(6,182,212,0.1)] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>Servicios</h4>
            <ul className="space-y-3">
              {footerLinks.servicios.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-[var(--text-tertiary)] hover:text-[var(--primary-400)] transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>Recursos</h4>
            <ul className="space-y-3">
              {footerLinks.recursos.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-[var(--text-tertiary)] hover:text-[var(--primary-400)] transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-[var(--text-tertiary)] hover:text-[var(--primary-400)] transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[rgba(6,182,212,0.1)] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[var(--text-quaternary)]">
            © {new Date().getFullYear()} Sexto Sistema. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm text-[var(--text-quaternary)]">
            <a href="#" className="hover:text-[var(--primary-400)] transition-colors">Privacidad</a>
            <a href="#" className="hover:text-[var(--primary-400)] transition-colors">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// WhatsApp Button Component
function WhatsAppButton() {
  const phoneNumber = '5491168667898' // +54 9 11 6866-7898 (without special characters)
  const message = encodeURIComponent('¡Hola! Me interesa conocer más sobre sus servicios de IA.')
  
  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-[#06B6D4] to-[#0891b2] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
      aria-label="Contactar por WhatsApp"
    >
      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full bg-[#06B6D4] animate-ping opacity-30" />
      
      {/* WhatsApp Icon */}
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8 text-white relative z-10"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-3 py-2 bg-[#1a1a2e] text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg border border-[rgba(6,182,212,0.2)]">
        ¿Hablamos por WhatsApp?
      </span>
    </a>
  )
}

// Main Component
export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-x-hidden custom-scrollbar">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <ProjectsSection />
      <AboutSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
