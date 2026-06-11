import { ChatCircleText, ArrowDown } from '@phosphor-icons/react'
import ShaderButton from '../components/ShaderButton'
import HeroFlower from '../components/HeroFlower'
import { CONTATO } from '../constants/contact'
import './Hero.css'

function Hero() {
  return (
    <section className="hero" id="topo">
      <div className="hero__ambient" aria-hidden="true" />

<div className="hero__deco hero__deco--right" aria-hidden="true">
        <img src="/plantas/rose-2.png" alt="" />
      </div>

      <div className="container hero__inner">
        {/* Coluna texto */}
        <div className="hero__text">
          <span className="eyebrow hero__eyebrow">
            Advocacia &amp; Consultoria Jurídica
          </span>

          <h1 className="hero__title">
            Advocacia para o{' '}
            <em className="hero__title-em hero__title-em--agro">agronegócio</em>{' '}
            e<br className="hero__title-break" />{' '}a{' '}
            <em className="hero__title-em">sucessão rural</em>.
          </h1>

          <p className="hero__lead hero__lead--full">
            Mais de 10 anos de atuação em tributário no agro, planejamento
            sucessório, execução fiscal e regularização fundiária.
          </p>
          <p className="hero__lead hero__lead--full">
            Atendimento online em todo o estado de{' '}
            <em className="hero__lead-em">São Paulo</em>.
          </p>
          {/* Lead compacto + CTAs agrupados — no mobile ficam ancorados ao fundo */}
          <div className="hero__bottom-group">
            <p className="hero__lead hero__lead--compact">
              Mais de 10 anos no agronegócio —<br className="hero__lead-break" />{' '}atendimento online em todo o estado de <em className="hero__lead-em">São Paulo</em>.
            </p>

            <div className="hero__ctas">
              <ShaderButton
                href={CONTATO.whatsappMessageUrl}
                variant="primary"
                size="lg"
                icon={ChatCircleText}
                sublabel="Atendimento ágil"
              >
                Fale com o escritório
              </ShaderButton>

              <a className="ghost-btn" href="#sobre">
                Conheça a profissional
                <ArrowDown size={16} weight="light" />
              </a>
            </div>
          </div>

          <div className="hero__meta">
            <div className="hero__meta-item">
              <span className="hero__meta-label">OAB</span>
              <span className="hero__meta-value">SP · registro ativo</span>
            </div>
            <span className="hero__meta-divider" aria-hidden="true" />
            <div className="hero__meta-item">
              <span className="hero__meta-label">Sedes</span>
              <span className="hero__meta-value">Campinas · São Paulo</span>
            </div>
          </div>
        </div>

        {/* Coluna visual — Double-Bezel com arte botânica institucional */}
        <div className="hero__portrait">
          <HeroFlower />
        </div>
      </div>
    </section>
  )
}

export default Hero
