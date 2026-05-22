import { useState } from 'react'
import { PUBLICACOES, formatarDataPtBR } from '../data/publicacoes'
import PublicacaoModal from '../components/PublicacaoModal'
import './Publicacoes.css'

const AUTOR_DEFAULT = 'Sílvia Fraga'

function Publicacoes() {
  const [aberta, setAberta] = useState(null)

  return (
    <section id="publicacoes" className="section publicacoes">
      <div className="container">
        <header className="publicacoes__header">
          <span className="eyebrow">02 — Publicações</span>
          <h2 className="publicacoes__title">
            <em>Análises</em> e pareceres.
          </h2>
          <p className="publicacoes__lead">
            Materiais produzidos pelo escritório sobre temas que costumam
            aparecer nas mesas das famílias e empresas que atendemos.
          </p>
        </header>

        <div className="publicacoes__grid">
          {PUBLICACOES.map((pub, idx) => (
            <button
              key={pub.id}
              type="button"
              className={`pub-card ${pub.destaque ? 'pub-card--feature' : ''}`}
              onClick={() => setAberta(pub)}
              style={{ '--pub-index': idx }}
              aria-label={`Abrir publicação: ${pub.titulo}`}
            >
              <span className="pub-card__shell" aria-hidden="true" />
              <div className="pub-card__inner">
                <div className="pub-card__image-wrap">
                  <img
                    src={pub.imagem}
                    alt=""
                    className="pub-card__image"
                    loading="lazy"
                  />
                </div>
                <div className="pub-card__meta">
                  <span className="pub-card__date">
                    {formatarDataPtBR(pub.dataISO)}
                  </span>
                  <h3 className="pub-card__title">{pub.titulo}</h3>
                  <p className="pub-card__autor">
                    Por {pub.autor || AUTOR_DEFAULT}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <PublicacaoModal publicacao={aberta} onClose={() => setAberta(null)} />
    </section>
  )
}

export default Publicacoes
