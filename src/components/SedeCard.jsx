import { useState } from 'react'
import {
  MapPin,
  NavigationArrow,
  ArrowSquareOut,
  Clock,
} from '@phosphor-icons/react'
import ShaderButton from './ShaderButton'
import ConfirmDialog from './ConfirmDialog'
import SedeImageCarousel from './SedeImageCarousel'
import { CONTATO } from '../constants/contact'
import './SedeCard.css'

const HORARIO_LABEL = 'Atendimento presencial somente com agendamento prévio'
const AGENDAMENTO_URL = CONTATO.whatsappMessageWithContext(
  'agendamento de uma consulta (vim pelo site)'
)

function SedeCard({ sede }) {
  const fachadas =
    Array.isArray(sede.fachadas) && sede.fachadas.length > 0
      ? sede.fachadas
      : [sede.fachada].filter(Boolean)

  const [imgIndex, setImgIndex] = useState(0)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const handleVerRotasClick = (e) => {
    e.preventDefault()
    setConfirmOpen(true)
  }

  const confirmRedirect = () => {
    setConfirmOpen(false)
    window.open(sede.mapsDirections, '_blank', 'noopener,noreferrer')
  }

  const carouselAlt = `Fachada da sede de ${sede.cidade}`

  return (
    <>
      <article className="sede-card bezel">
        <div className="bezel__inner sede-card__inner">
          <div className="sede-card__image-wrap">
            <SedeImageCarousel
              images={fachadas}
              index={imgIndex}
              onChange={setImgIndex}
              alt={carouselAlt}
            />
          </div>

          <div className="sede-card__body">
            <div className="sede-card__head">
              <MapPin size={22} weight="light" className="sede-card__pin" />
              <h3 className="sede-card__title">{sede.cidade}</h3>
              <a
                href={AGENDAMENTO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="sede-card__hours sede-card__hours--link"
                aria-label="Agendar horário via WhatsApp"
                data-no-fullscreen
              >
                <Clock size={12} weight="light" aria-hidden="true" />
                <span>{HORARIO_LABEL}</span>
              </a>
            </div>

            <a
              href={sede.mapsSearch}
              target="_blank"
              rel="noopener noreferrer"
              className="sede-card__endereco"
            >
              {sede.endereco}
              <ArrowSquareOut size={14} weight="light" />
            </a>

            <div className="sede-card__map">
              <iframe
                src={sede.mapsEmbed}
                title={`Mapa da sede de ${sede.cidade}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen=""
              />
              {/* Mask que encobre o badge "Maps" da Google no canto superior esquerdo */}
              <span className="sede-card__map-mask" aria-hidden="true" />
              <a
                href={sede.mapsSearch}
                target="_blank"
                rel="noopener noreferrer"
                className="sede-card__map-open"
                aria-label="Abrir mapa no Google Maps"
              >
                <ArrowSquareOut size={16} weight="light" />
              </a>
            </div>

            <div className="sede-card__cta-wrap">
              <ShaderButton
                as="button"
                variant="primary"
                size="md"
                icon={NavigationArrow}
                onClick={handleVerRotasClick}
              >
                ver rotas
              </ShaderButton>
            </div>
          </div>
        </div>
      </article>

      <ConfirmDialog
        open={confirmOpen}
        title="Abrir Google Maps?"
        message={`Você será redirecionado para o Google Maps em uma nova aba para ver a rota até a sede ${sede.cidade}. Deseja continuar?`}
        confirmLabel="Ir para o Google Maps"
        cancelLabel="Cancelar"
        onConfirm={confirmRedirect}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  )
}

export default SedeCard
