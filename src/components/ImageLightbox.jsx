import { useEffect } from 'react'
import { X as XIcon, CaretLeft, CaretRight } from '@phosphor-icons/react'
import './ImageLightbox.css'

function ImageLightbox({
  open,
  src,
  alt = '',
  onClose,
  images,
  index = 0,
  onPrev,
  onNext,
}) {
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.()
      if (e.key === 'ArrowLeft' && onPrev) onPrev()
      if (e.key === 'ArrowRight' && onNext) onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose, onPrev, onNext])

  if (!open) return null

  const list = images && images.length > 0 ? images : [src]
  const current = list[index] || src
  const hasMultiple = list.length > 1

  return (
    <div
      className="img-lightbox"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <button
        type="button"
        className="img-lightbox__close"
        aria-label="Fechar imagem"
        onClick={(e) => {
          e.stopPropagation()
          onClose?.()
        }}
      >
        <XIcon size={22} weight="light" />
      </button>

      {hasMultiple && onPrev && (
        <button
          type="button"
          className="img-lightbox__nav img-lightbox__nav--prev"
          aria-label="Imagem anterior"
          onClick={(e) => {
            e.stopPropagation()
            onPrev()
          }}
        >
          <CaretLeft size={22} weight="light" />
        </button>
      )}

      {hasMultiple && onNext && (
        <button
          type="button"
          className="img-lightbox__nav img-lightbox__nav--next"
          aria-label="Próxima imagem"
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
        >
          <CaretRight size={22} weight="light" />
        </button>
      )}

      <img
        src={current}
        alt={alt}
        className="img-lightbox__img"
        onClick={(e) => e.stopPropagation()}
      />

      {hasMultiple && (
        <div className="img-lightbox__counter" aria-hidden="true">
          {index + 1} / {list.length}
        </div>
      )}
    </div>
  )
}

export default ImageLightbox
