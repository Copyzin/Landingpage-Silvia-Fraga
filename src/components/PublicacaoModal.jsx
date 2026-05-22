import { useEffect, useState } from 'react'
import { X as XIcon, MagnifyingGlassPlus } from '@phosphor-icons/react'
import { formatarDataPtBR } from '../data/publicacoes'
import ImageLightbox from './ImageLightbox'
import useIsMobile from '../hooks/useIsMobile'
import './PublicacaoModal.css'

const AUTOR_DEFAULT = 'Sílvia Fraga'

function PublicacaoModal({ publicacao, onClose }) {
  const isMobile = useIsMobile()
  const [lightboxOpen, setLightboxOpen] = useState(false)

  // Close lightbox whenever publication changes / modal closes
  useEffect(() => {
    if (!publicacao) setLightboxOpen(false)
  }, [publicacao])

  // ESC + body scroll lock
  useEffect(() => {
    if (!publicacao) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape' && !lightboxOpen) onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [publicacao, onClose, lightboxOpen])

  if (!publicacao) return null

  const autor = publicacao.autor || AUTOR_DEFAULT
  const data = formatarDataPtBR(publicacao.dataISO)

  const handleImageClick = () => {
    if (isMobile) setLightboxOpen(true)
  }

  return (
    <div
      className="pub-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pub-modal-title"
      onClick={onClose}
    >
      <div
        className="pub-modal__dialog bezel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bezel__inner pub-modal__inner">
          <button
            type="button"
            className="pub-modal__close"
            aria-label="Fechar publicação"
            onClick={onClose}
          >
            <XIcon size={20} weight="light" />
          </button>

          {isMobile ? (
            <button
              type="button"
              className="pub-modal__image-wrap pub-modal__image-wrap--button"
              onClick={handleImageClick}
              aria-label="Ver imagem em tela cheia"
            >
              <img
                src={publicacao.imagem}
                alt=""
                className="pub-modal__image"
              />
              <span className="pub-modal__image-hint" aria-hidden="true">
                <MagnifyingGlassPlus size={16} weight="light" />
              </span>
            </button>
          ) : (
            <div className="pub-modal__image-wrap">
              <img
                src={publicacao.imagem}
                alt=""
                className="pub-modal__image"
              />
            </div>
          )}

          <div className="pub-modal__content">
            <span className="eyebrow eyebrow--ghost pub-modal__eyebrow">
              Publicação · {data}
            </span>

            <h3 id="pub-modal-title" className="pub-modal__title">
              {publicacao.titulo}
            </h3>

            <p className="pub-modal__autor">
              Por <strong>{autor}</strong>
            </p>

            <hr className="hairline pub-modal__divider" />

            <div className="pub-modal__body">
              {publicacao.corpo.map((paragrafo, idx) => (
                <p key={idx}>{paragrafo}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ImageLightbox
        open={lightboxOpen}
        src={publicacao.imagem}
        alt={publicacao.titulo}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  )
}

export default PublicacaoModal
