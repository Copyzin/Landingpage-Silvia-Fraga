import { ChatCircleText, ArrowDown } from '@phosphor-icons/react'
import ShaderButton from '../components/ShaderButton'
import { CONTATO } from '../constants/contact'
import './Hero.css'

function Hero() {
  return (
    <section className="hero" id="topo">
      <div className="hero__ambient" aria-hidden="true" />

      <div className="container hero__inner">
        {/* Coluna texto */}
        <div className="hero__text">
          <span className="eyebrow hero__eyebrow">
            Advocacia &amp; Consultoria Jurídica
          </span>

          <h1 className="hero__title">
            Direito que protege seu{' '}
            <em className="hero__title-em">patrimônio</em> e sua{' '}
            <em className="hero__title-em">história</em>.
          </h1>

          <p className="hero__lead">
            Atuação institucional em tributário no agro, planejamento
            sucessório, defesa em execução fiscal, regularização fundiária
            e holdings rurais — com sedes em Campinas e São Paulo.
          </p>

          <div className="hero__ctas">
            <ShaderButton
              href={CONTATO.whatsappMessageUrl}
              variant="primary"
              size="lg"
              icon={ChatCircleText}
              sublabel="Resposta em até 24h"
            >
              Fale com a Silvia
            </ShaderButton>

            <a className="ghost-btn" href="#especialidades">
              Conheça as áreas
              <ArrowDown size={16} weight="light" />
            </a>
          </div>

          <div className="hero__meta">
            <div className="hero__meta-item">
              <span className="hero__meta-label">OAB</span>
              <span className="hero__meta-value">SP — registro ativo</span>
            </div>
            <span className="hero__meta-divider" aria-hidden="true" />
            <div className="hero__meta-item">
              <span className="hero__meta-label">Sedes</span>
              <span className="hero__meta-value">Campinas · São Paulo</span>
            </div>
          </div>
        </div>

        {/* Coluna foto — Double-Bezel */}
        <div className="hero__portrait">
          <div className="bezel">
            <div className="bezel__inner">
              <img
                src="/silvia-fraga.jpg"
                alt="Sílvia Fraga, advogada"
                className="hero__portrait-img"
                loading="eager"
                fetchpriority="high"
              />
              <div className="hero__seal" aria-hidden="true">
                <span className="hero__seal-name">Silvia Fraga</span>
                <span className="hero__seal-divider" />
                <span className="hero__seal-foot">Advogada</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
