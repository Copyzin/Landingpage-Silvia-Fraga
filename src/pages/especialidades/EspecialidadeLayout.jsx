import { useEffect, useState } from 'react'
import { Link, Navigate, useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ChatCircleText } from '@phosphor-icons/react'
import { findEspecialidade, ESPECIALIDADES } from '../../data/especialidades'
import { CONTATO } from '../../constants/contact'
import ShaderButton from '../../components/ShaderButton'
import './EspecialidadeLayout.css'

const LEAVE_MS = 340

function EspecialidadeLayout() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const esp = findEspecialidade(slug)
  const [leaving, setLeaving] = useState(false)

  // Scroll to top on mount/slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [slug])

  if (!esp) return <Navigate to="/" replace />

  const handleBack = (e) => {
    e.preventDefault()
    if (leaving) return
    setLeaving(true)
    window.setTimeout(() => {
      navigate('/', { state: { fromEsp: true } })
    }, LEAVE_MS)
  }

  // Outras especialidades (para sugestão de leitura)
  const outras = ESPECIALIDADES.filter((e) => e.slug !== esp.slug).slice(0, 3)

  return (
    <article className={'esp-page' + (leaving ? ' is-leaving' : '')}>
      <header className="esp-page__hero">
        <div className="container esp-page__hero-inner">
          <a
            href="/"
            className="esp-page__back"
            onClick={handleBack}
            aria-label="Voltar para o início do site"
          >
            <ArrowLeft size={14} weight="light" />
            <span>Voltar para Início</span>
          </a>

          <div className="esp-page__title-row">
            <span
              className="esp-page__ordem"
              aria-label={`Artigo ${esp.ordem}`}
            >
              {esp.ordem}
            </span>
            <h1 className="esp-page__title">{esp.titulo}</h1>
          </div>

          <p className="esp-page__subtitle">{esp.subtitulo}</p>
        </div>
      </header>

      <hr className="hairline esp-page__separator" />

      <div className="container esp-page__body-wrap">
        <div className="esp-page__body">
          {esp.conteudo.map((bloco, idx) => {
            if (bloco.type === 'h2') {
              return <h2 key={idx}>{bloco.text}</h2>
            }
            if (bloco.type === 'quote') {
              return (
                <blockquote key={idx} className="esp-page__quote">
                  <span aria-hidden="true">“</span>
                  {bloco.text}
                </blockquote>
              )
            }
            return <p key={idx}>{bloco.text}</p>
          })}
        </div>

        <aside className="esp-page__cta bezel">
          <div className="bezel__inner esp-page__cta-inner">
            <span className="eyebrow esp-page__cta-eyebrow">Próximo passo</span>
            <h3 className="esp-page__cta-title">
              Pronta para te orientar sobre {esp.titulo}.
            </h3>
            <p className="esp-page__cta-lead">
              Conte o seu caso. Em até 24 horas úteis você recebe um retorno
              direto, com avaliação prática e próximos passos.
            </p>
            <ShaderButton
              href={CONTATO.whatsappMessageWithContext(esp.whatsappContext)}
              variant="primary"
              size="lg"
              icon={ChatCircleText}
              sublabel={`Sobre: ${esp.titulo}`}
            >
              Fale com a Silvia
            </ShaderButton>
          </div>
        </aside>

        {/* Sugestão de outras leituras */}
        <section className="esp-page__outras">
          <h3 className="esp-page__outras-title">Continue lendo</h3>
          <div className="esp-page__outras-grid">
            {outras.map((o) => (
              <Link
                key={o.slug}
                to={`/especialidades/${o.slug}`}
                className="esp-page__outras-link"
              >
                <span className="esp-page__outras-ordem">{o.ordem}</span>
                <span className="esp-page__outras-nome">{o.titulo}</span>
                <span className="esp-page__outras-arrow">→</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </article>
  )
}

export default EspecialidadeLayout
