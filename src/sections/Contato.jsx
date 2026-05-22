import { ChatCircleText } from '@phosphor-icons/react'
import ShaderButton from '../components/ShaderButton'
import { CONTATO } from '../constants/contact'
import './Contato.css'

function Contato() {
  return (
    <section id="contato" className="contato">
      <div className="contato__ambient" aria-hidden="true" />
      <div className="container contato__inner">
        <header className="contato__header">
          <span className="eyebrow eyebrow--dark">04 — Fale com a Silvia</span>
          <h2 className="contato__title">
            Pronta para defender o <em>que importa</em>.
          </h2>
          <p className="contato__lead">
            Resposta em até 24 horas úteis. Atendimento direto com a
            advogada — sem intermediários, sem ruído.
          </p>
        </header>

        <div className="contato__grid">
          <ShaderButton
            href={CONTATO.whatsappMessageUrl}
            variant="primary"
            size="xl"
            icon={ChatCircleText}
            sublabel="Resposta em até 24h úteis"
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
      </div>
    </section>
  )
}

export default Contato
