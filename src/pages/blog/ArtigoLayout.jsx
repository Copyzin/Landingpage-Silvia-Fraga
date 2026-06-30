import { useEffect, useState } from 'react'
import { Link, Navigate, useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ChatCircleText } from '@phosphor-icons/react'
import { findArtigo, artigosDaCategoria } from '../../data/artigos'
import { findEspecialidade } from '../../data/especialidades'
import { CONTATO } from '../../constants/contact'
import ShaderButton from '../../components/ShaderButton'
// Reaproveita o layout/estilo da pagina de especialidade (CSS global)
import '../especialidades/EspecialidadeLayout.css'

const LEAVE_MS = 340

function ArtigoLayout() {
  const { artigo } = useParams()
  const navigate = useNavigate()
  const art = findArtigo(artigo)
  const [leaving, setLeaving] = useState(false)

  // Scroll to top on mount/slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [artigo])

  if (!art) return <Navigate to="/" replace />

  const cat = findEspecialidade(art.categoria)
  const categoriaTitulo = cat ? cat.titulo : 'Especialidades'

  const handleBack = (e) => {
    e.preventDefault()
    if (leaving) return
    setLeaving(true)
    window.setTimeout(() => {
      navigate(`/especialidades/${art.categoria}`)
    }, LEAVE_MS)
  }

  // Outros artigos da mesma categoria (sugestao de leitura)
  const outros = artigosDaCategoria(art.categoria).filter(
    (a) => a.slug !== art.slug
  )

  return (
    <article className={'esp-page' + (leaving ? ' is-leaving' : '')}>
      <header className="esp-page__hero">
        <div className="container esp-page__hero-inner">
          <a
            href={`/especialidades/${art.categoria}`}
            className="esp-page__back"
            onClick={handleBack}
            aria-label={`Voltar para ${categoriaTitulo}`}
          >
            <ArrowLeft size={14} weight="light" />
            <span>Voltar para {categoriaTitulo}</span>
          </a>

          <span className="eyebrow esp-page__artigo-eyebrow">
            Blog · {categoriaTitulo}
          </span>

          <h1 className="esp-page__title">{art.titulo}</h1>

          <p className="esp-page__subtitle">{art.subtitulo}</p>
        </div>
      </header>

      <hr className="hairline esp-page__separator" />

      <div className="container esp-page__body-wrap">
        <div className="esp-page__body">
          {art.conteudo.map((bloco, idx) => {
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
              Pronta para te orientar sobre {art.titulo}.
            </h3>
            <p className="esp-page__cta-lead">
              Conte o seu caso e receba um retorno direto, com avaliação prática e próximos passos.
            </p>
            <ShaderButton
              href={CONTATO.whatsappMessageWithContext(art.whatsappContext)}
              variant="primary"
              size="lg"
              icon={ChatCircleText}
              sublabel={`Sobre: ${art.titulo}`}
            >
              Fale com a Silvia
            </ShaderButton>
          </div>
        </aside>

        {/* Sugestao: outros artigos da mesma categoria */}
        {outros.length > 0 ? (
          <section className="esp-page__outras">
            <h3 className="esp-page__outras-title">
              Mais sobre {categoriaTitulo}
            </h3>
            <div className="esp-page__outras-grid">
              {outros.map((o, i) => (
                <Link
                  key={o.slug}
                  to={`/especialidades/${art.categoria}/${o.slug}`}
                  className="esp-page__outras-link"
                >
                  <span className="esp-page__outras-ordem">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="esp-page__outras-nome">{o.titulo}</span>
                  <span className="esp-page__outras-arrow">→</span>
                </Link>
              ))}
            </div>
          </section>
        ) : (
          <section className="esp-page__outras">
            <div className="esp-page__outras-grid">
              <Link
                to={`/especialidades/${art.categoria}`}
                className="esp-page__outras-link"
              >
                <span className="esp-page__outras-ordem" aria-hidden="true">
                  ←
                </span>
                <span className="esp-page__outras-nome">
                  Voltar para {categoriaTitulo}
                </span>
                <span className="esp-page__outras-arrow">→</span>
              </Link>
            </div>
          </section>
        )}
      </div>
    </article>
  )
}

export default ArtigoLayout
