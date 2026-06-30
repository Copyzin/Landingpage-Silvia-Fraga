import { Link } from 'react-router-dom'
import { ArrowUpRight } from '@phosphor-icons/react'
import { ESPECIALIDADES } from '../data/especialidades'
import './Especialidades.css'

function Especialidades() {
  return (
    <section id="especialidades" className="section especialidades">
      <div className="esp__deco esp__deco--right" aria-hidden="true">
        <img src="/plantas/vazo-planta.webp" alt="" loading="lazy" decoding="async" />
      </div>
      <div className="container">
        <header className="especialidades__header">
          <span className="eyebrow">Áreas de atuação</span>
          <h2 className="especialidades__title">
            Diversas frentes, uma <em>defesa estratégica</em>.
          </h2>
          <p className="especialidades__lead">
            Atuamos onde a complexidade jurídica encontra a vida real:
            do agronegócio ao direito de família, do contrato bem escrito
            à regularização do seu imóvel.
          </p>
        </header>

        <div className="especialidades__grid">
          {ESPECIALIDADES.map((esp, idx) => (
            <Link
              key={esp.slug}
              to={`/especialidades/${esp.slug}`}
              className={`esp-card ${esp.destaque ? 'esp-card--feature' : ''}`}
              style={{ '--card-index': idx }}
            >
              <span className="esp-card__shell" aria-hidden="true" />
              <div className="esp-card__inner">
                {esp.destaque && (
                  <svg
                    className="esp-card__bg-art"
                    viewBox="0 0 400 300"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                        <stop offset="0" stopColor="#5d0809" stopOpacity="0.08" />
                        <stop offset="1" stopColor="#fcd17d" stopOpacity="0.18" />
                      </linearGradient>
                    </defs>
                    <circle cx="320" cy="60" r="140" fill="url(#g1)" />
                    <line x1="20" y1="240" x2="380" y2="200" stroke="#5d0809" strokeWidth="0.8" strokeOpacity="0.15" />
                    <line x1="20" y1="260" x2="380" y2="220" stroke="#5d0809" strokeWidth="0.8" strokeOpacity="0.1" />
                    <line x1="20" y1="280" x2="380" y2="240" stroke="#5d0809" strokeWidth="0.8" strokeOpacity="0.08" />
                  </svg>
                )}

                <div className="esp-card__top">
                  <span className="esp-card__ordem">{esp.ordem}</span>
                  <span className="esp-card__arrow" aria-hidden="true">
                    <ArrowUpRight size={18} weight="light" />
                  </span>
                </div>

                <div className="esp-card__body">
                  <h3 className="esp-card__title">{esp.titulo}</h3>
                  <p className="esp-card__resumo">{esp.resumo}</p>
                </div>

                <div className="esp-card__foot">
                  <span>Saiba mais</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Especialidades
