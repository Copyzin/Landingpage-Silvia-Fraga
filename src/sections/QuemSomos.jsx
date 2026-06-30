import { useEffect, useRef, useState } from 'react'
import './QuemSomos.css'

// Linhas de apoio (dois pilares: equipe + atendimento)
const APOIO = [
  {
    titulo: 'Equipe técnica especializada',
    texto: 'Profissionais e advogados com vasta experiência, dedicados a cada demanda.',
  },
  {
    titulo: 'Atendimento personalizado',
    texto: 'Próximo e dedicado — online e presencial, mediante agendamento.',
  },
]

function QuemSomos() {
  const sectionRef = useRef(null)
  const [revealed, setRevealed] = useState(false)

  // Reveal on scroll — mesmo padrao das outras secoes (IntersectionObserver +
  // classes .reveal / .is-visible, escalonadas por transitionDelay).
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReduced || !('IntersectionObserver' in window)) {
      setRevealed(true)
      return
    }
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRevealed(true)
          obs.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const reveal = (index, base = '') => ({
    className: [base, 'reveal', revealed ? 'is-visible' : '']
      .filter(Boolean)
      .join(' '),
    style: { transitionDelay: `${index * 90}ms` },
  })

  return (
    <section id="quem-somos" className="quem-somos" ref={sectionRef}>
      <div className="quem-somos__inner">
        <span {...reveal(0, 'eyebrow')}>Quem somos</span>

        <h2 {...reveal(1, 'quem-somos__headline')}>
          Soluções jurídicas <em>sob medida</em> para cada cliente.
        </h2>

        <p {...reveal(2, 'quem-somos__lead')}>
          Mais de 10 anos de experiência em planejamento sucessório,
          inventário extrajudicial e judicial, questões tributárias do
          agronegócio e regularização de imóveis. Atuação especializada nos
          âmbitos consultivo e contencioso.
        </p>

        <span {...reveal(3, 'quem-somos__rule')} aria-hidden="true" />

        <div className="quem-somos__pillars">
          {APOIO.map((item, i) => (
            <div key={item.titulo} {...reveal(4 + i, 'quem-somos__pillar')}>
              <span className="quem-somos__pillar-title">{item.titulo}</span>
              <span className="quem-somos__pillar-text">{item.texto}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default QuemSomos
