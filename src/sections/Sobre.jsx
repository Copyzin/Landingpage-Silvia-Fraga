import { useEffect, useRef, useState } from 'react'
import {
  SealCheck,
  GraduationCap,
  Certificate,
  VideoCamera,
  CalendarCheck,
  ChatCircleText,
} from '@phosphor-icons/react'
import ShaderButton from '../components/ShaderButton'
import { CONTATO } from '../constants/contact'
import './Sobre.css'

const CREDENCIAIS = [
  { icon: SealCheck, label: 'OAB/SP', detail: 'Registro ativo' },
  { icon: GraduationCap, label: 'Pós-graduação', detail: 'Direito no Agronegócio' },
  { icon: Certificate, label: '+10 anos', detail: 'de atuação no agronegócio' },
]

const FOCO = [
  'Tributário no Agro',
  'Defesa em Execução Fiscal',
  'Planejamento Sucessório',
]

function Sobre() {
  const sectionRef = useRef(null)
  const [revealed, setRevealed] = useState(false)

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
    className: [base, 'reveal', revealed ? 'is-visible' : ''].filter(Boolean).join(' '),
    style: { transitionDelay: `${index * 90}ms` },
  })

  return (
    <section id="sobre" className="section sobre" ref={sectionRef}>
      <div className="sobre__deco sobre__deco--right" aria-hidden="true">
        <img src="/plantas/rose-1.png" alt="" />
      </div>
      <div className="container sobre__inner">
        {/* Coluna retrato — mesmo Double-Bezel da Hero */}
        <div {...reveal(0, 'sobre__portrait')}>
          <div className="bezel">
            <div className="bezel__inner sobre__portrait-inner">
              <img
                src="/silvia-fraga.jpg"
                alt="Silvia Fraga, advogada"
                className="sobre__portrait-img"
                loading="lazy"
              />
              <div className="sobre__seal" aria-hidden="true">
                <span className="sobre__seal-name">Silvia Fraga</span>
                <span className="sobre__seal-divider" />
                <span className="sobre__seal-foot">Advogada · OAB/SP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna conteúdo */}
        <div className="sobre__content">
          <span {...reveal(1, 'eyebrow')}>
            01 — A profissional
          </span>

          <h2 {...reveal(1, 'sobre__title')}>
            Técnica, proximidade e <em>dedicação ao seu caso</em>.
          </h2>

          <p {...reveal(2, 'sobre__lead')}>
            O escritório Sílvia Fraga Advocacia soma mais de 10 anos de
            atuação. À frente dele, a Dra. Sílvia Fraga conduz pessoalmente
            cada caso, com especialidade em tributário no agro, defesa em
            execução fiscal e planejamento sucessório.
          </p>

          <p {...reveal(2, 'sobre__lead')}>
            Uma equipe parceira, capacitada e dedicada, cuida das suas
            questões jurídicas com competência e agilidade: atendimento
            personalizado e sempre próximo de você.
          </p>

          {/* Áreas de foco */}
          <div {...reveal(3, 'sobre__foco')}>
            {FOCO.map((area) => (
              <span key={area} className="sobre__chip">
                {area}
              </span>
            ))}
          </div>

          {/* Certificações */}
          <ul {...reveal(4, 'sobre__creds')}>
            {CREDENCIAIS.map(({ icon: Icon, label, detail }) => (
              <li key={label} className="sobre__cred">
                <Icon size={22} weight="light" className="sobre__cred-icon" />
                <span className="sobre__cred-text">
                  <span className="sobre__cred-label">{label}</span>
                  <span className="sobre__cred-detail">{detail}</span>
                </span>
              </li>
            ))}
          </ul>

          {/* Atendimento personalizado */}
          <div {...reveal(5, 'sobre__atendimento')}>
            <div className="sobre__atende sobre__atende--featured">
              <VideoCamera size={24} weight="light" />
              <div className="sobre__atende-text">
                <span className="sobre__atende-label">Atendimento online</span>
                <span className="sobre__atende-detail">
                  Para todo o estado de São Paulo
                </span>
              </div>
            </div>
            <div className="sobre__atende">
              <CalendarCheck size={24} weight="light" />
              <div className="sobre__atende-text">
                <span className="sobre__atende-label">
                  Atendimento presencial
                </span>
                <span className="sobre__atende-detail">
                  Em Campinas e São Paulo, somente mediante agendamento prévio
                </span>
              </div>
            </div>
          </div>

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
    </section>
  )
}

export default Sobre
