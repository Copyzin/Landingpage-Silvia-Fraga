import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChatCircleText, ArrowUpRight } from '@phosphor-icons/react'
import ShaderButton from '../components/ShaderButton'
import { CONTATO } from '../constants/contact'
import './Sobre.css'

// Áreas de foco → cada chip leva à sua sub-rota de especialidade
const FOCO = [
  { label: 'Tributário no Agro', slug: 'tributario-no-agro' },
  { label: 'Defesa em Execução Fiscal', slug: 'defesa-em-execucao-fiscal' },
  { label: 'Planejamento Sucessório', slug: 'planejamento-sucessorio' },
]

// Faixa de credibilidade (dois níveis: destaque dourado + detalhe)
const STATS = [
  { primary: '+10 anos', detail: 'de atuação no agronegócio' },
  { primary: 'OAB/SP', detail: 'registro ativo na ordem' },
  { primary: 'Pós-graduação', detail: 'Direito no Agronegócio' },
  { primary: 'Atendimento online', detail: 'em todo o estado de São Paulo' },
]

function Sobre() {
  const sectionRef = useRef(null)
  const [revealed, setRevealed] = useState(false)

  // Reveal on scroll (mesmo padrão das outras seções)
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
    <section id="sobre" className="sobre" ref={sectionRef}>
      <div className="sobre__spread">
        {/* Arte institucional — grande, estática, ancorada à esquerda da tela,
            com a base exatamente no topo da faixa escura. A imagem já traz
            moldura dourada, flores e o nome; exibida inteira. */}
        <div className={'sobre__portrait' + (revealed ? ' is-visible' : '')}>
          <img
            src="/sobre-profissional.jpg"
            alt="Silvia Fraga — Advocacia & Consultoria Jurídica"
            className="sobre__portrait-img"
            loading="lazy"
          />
        </div>

        {/* Coluna de conteúdo */}
        <div className="sobre__content">
          <span {...reveal(0, 'eyebrow')}>01 — A profissional</span>

          <h2 {...reveal(1, 'sobre__title')}>
            Técnica, proximidade e <em>dedicação ao seu caso</em>.
          </h2>

          <p {...reveal(2, 'sobre__lead')}>
            O escritório Sílvia Fraga Advocacia soma mais de 10 anos de
            atuação. À frente dele, a Dra. Sílvia Fraga conduz pessoalmente
            cada caso, com especialidade em tributário no agro, defesa em
            execução fiscal e planejamento sucessório.
          </p>

          <p {...reveal(3, 'sobre__lead')}>
            Uma equipe parceira, capacitada e dedicada, cuida das suas
            questões jurídicas com competência e agilidade: atendimento
            personalizado e sempre próximo de você.
          </p>

          <div {...reveal(4, 'sobre__foco')}>
            {FOCO.map((area) => (
              <Link
                key={area.slug}
                to={`/especialidades/${area.slug}`}
                className="sobre__chip"
              >
                {area.label}
                <ArrowUpRight size={14} weight="light" aria-hidden="true" />
              </Link>
            ))}
          </div>

          <p {...reveal(5, 'sobre__note')}>
            <span className="sobre__note-dot" aria-hidden="true" />
            Atendimento presencial em Campinas e São Paulo, somente mediante
            agendamento prévio.
          </p>

          <div {...reveal(6, 'sobre__cta')}>
            <ShaderButton
              href={CONTATO.whatsappMessageWithContext(
                'um atendimento com um especialista'
              )}
              variant="primary"
              size="lg"
              icon={ChatCircleText}
              sublabel="Atendimento ágil"
            >
              Fale com um especialista
            </ShaderButton>
          </div>
        </div>
      </div>

      {/* Faixa de credibilidade — full-bleed, vinho profundo */}
      <div className="sobre__band">
        {STATS.map((stat, i) => (
          <div
            key={stat.primary}
            className={'sobre__stat reveal' + (revealed ? ' is-visible' : '')}
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            <span className="sobre__stat-primary">{stat.primary}</span>
            <span className="sobre__stat-detail">{stat.detail}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Sobre
