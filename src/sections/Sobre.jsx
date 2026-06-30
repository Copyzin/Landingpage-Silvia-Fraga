import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'motion/react'
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
  // Acentos florais (SVG) so em telas largas: evita download e poluicao
  // visual no layout empilhado do mobile/tablet.
  const [wide, setWide] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(min-width: 961px)').matches
  )

  // Parallax interno ao frame, dirigido por scroll (estilo Sólia, sem hover).
  // A imagem e maior que a moldura e desliza verticalmente; amplitude calibrada
  // para retrato (head-safe): nunca corta a cabeca no topo.
  const portraitRef = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: portraitRef,
    // 0 = topo do card toca a base do viewport; 1 = base do card sai pelo topo
    offset: ['start end', 'end start'],
  })
  // +3% (entrada: cabeca com folga maxima) -> -3% (revela mais da base, cabeca segura)
  const yRaw = useTransform(scrollYProgress, [0, 1], ['3%', '-3%'])
  const y = useSpring(yRaw, { stiffness: 120, damping: 30, mass: 0.4 })

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

  // Renderiza os acentos florais apenas em telas largas
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 961px)')
    const onChange = () => setWide(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const reveal = (index, base = '') => ({
    className: [base, 'reveal', revealed ? 'is-visible' : '']
      .filter(Boolean)
      .join(' '),
    style: { transitionDelay: `${index * 90}ms` },
  })

  return (
    <section id="sobre" className="sobre" ref={sectionRef}>
      {/* Acentos botanicos nas laterais (assinatura discreta). Entrada
          escalonada "crescendo da base" via clip-path, atrelada ao reveal. */}
      {wide && (
        <>
          <img
            src="/flor-4-deco.svg"
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            className={
              'sobre__deco sobre__deco--tl' + (revealed ? ' is-visible' : '')
            }
          />
          <img
            src="/flor-1-deco.svg"
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            className={
              'sobre__deco sobre__deco--br' + (revealed ? ' is-visible' : '')
            }
          />
        </>
      )}

      <div className="sobre__spread">
        {/* Card da Dra. Silvia — espelho do Hero (moldura double-bezel + selo),
            posicionado a esquerda. A foto preenche a moldura (cover) e tem um
            parallax interno por scroll, head-safe (ver Sobre.css / hooks acima). */}
        <div
          ref={portraitRef}
          className={'sobre__portrait' + (revealed ? ' is-visible' : '')}
        >
          <div className="bezel">
            <div className="bezel__inner sobre__art-inner">
              <motion.img
                src="/silvia-foto-nova-bg.webp"
                alt="Dra. Silvia Fraga"
                className="sobre__art-img"
                style={reduce ? undefined : { y }}
                loading="lazy"
              />
              <div className="hero__seal" aria-hidden="true">
                <span className="hero__seal-name">Silvia Fraga</span>
                <span className="hero__seal-divider" />
                <span className="hero__seal-foot">OAB/SP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna de conteúdo */}
        <div className="sobre__content">
          <span {...reveal(0, 'eyebrow')}>A profissional</span>

          <h2 {...reveal(1, 'sobre__title')}>
            Técnica, proximidade e <em>dedicação ao seu caso</em>.
          </h2>

          <p {...reveal(2, 'sobre__lead')}>
            A Dra. Sílvia é fundadora e responsável técnica pelo escritório,
            é especialista em direito tributário no agro, sucessões e direito
            empresarial, com pós-graduação em direito no agronegócio.
          </p>

          <p {...reveal(3, 'sobre__lead')}>
            Está sempre em constante busca por atualizações e aprofundamento
            técnico, possuindo uma visão estratégica e alinhada às necessidades
            dos clientes.
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
