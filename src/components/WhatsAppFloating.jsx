import { CONTATO } from '../constants/contact'
import './WhatsAppFloating.css'

function WhatsAppFloating() {
  return (
    <a
      className="wa-floating"
      href={CONTATO.whatsappMessageUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com Silvia Fraga pelo WhatsApp"
      title="Falar pelo WhatsApp"
    >
      <span className="wa-floating__ring" aria-hidden="true" />
      <span className="wa-floating__icon" aria-hidden="true" />
    </a>
  )
}

export default WhatsAppFloating
