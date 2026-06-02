import { ChatCircleText, LinkedinLogo } from '@phosphor-icons/react'
import ShaderButton from '../components/ShaderButton'
import { CONTATO } from '../constants/contact'
import './Contato.css'

function Contato() {
  return (
    <section id="contato" className="contato">
      <div className="contato__ambient" aria-hidden="true" />
      <div className="contato__flor" aria-hidden="true">
        <img src="/plantas/flor-branca.png" alt="" />
      </div>
      <div className="contato__planta-direita" aria-hidden="true">
        <img src="/plantas/close-up-plant-leaves.png" alt="" />
      </div>
      <div className="container contato__inner">
        <header className="contato__header">
          <span className="eyebrow eyebrow--dark">05 — Fale com a Silvia</span>
          <h2 className="contato__title">
            Pronta para defender o <em>que importa</em>.
          </h2>
          <p className="contato__lead">
            Atendimento ágil e direto com a advogada: sem intermediários, sem ruído.
          </p>
        </header>

        <div className="contato__grid">
          <ShaderButton
            href={CONTATO.whatsappMessageUrl}
            variant="primary"
            size="xl"
            icon={ChatCircleText}
            sublabel="Atendimento ágil"
            className="contato__cta"
          >
            Enviar WhatsApp
          </ShaderButton>
        </div>

        <p className="contato__email">
          <span>Atendimento: </span>
          <a href={CONTATO.emailUrl} className="contato__email-link">
            {CONTATO.email}
          </a>
        </p>

        <a
          href={CONTATO.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="contato__linkedin"
        >
          <LinkedinLogo size={16} weight="light" />
          <span>Conecte-se no LinkedIn</span>
        </a>
      </div>
    </section>
  )
}

export default Contato
