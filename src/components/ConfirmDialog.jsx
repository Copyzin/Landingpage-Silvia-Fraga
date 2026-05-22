import { useEffect } from 'react'
import { ArrowSquareOut, X as XIcon } from '@phosphor-icons/react'
import './ConfirmDialog.css'

function ConfirmDialog({
  open,
  title = 'Você está saindo do site',
  message,
  confirmLabel = 'Continuar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onCancel?.()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onCancel])

  if (!open) return null

  return (
    <div
      className="confirm-dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      onClick={onCancel}
    >
      <div
        className="confirm-dialog__panel bezel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bezel__inner confirm-dialog__inner">
          <button
            type="button"
            className="confirm-dialog__close"
            aria-label="Fechar"
            onClick={onCancel}
          >
            <XIcon size={18} weight="light" />
          </button>

          <span className="confirm-dialog__icon" aria-hidden="true">
            <ArrowSquareOut size={22} weight="light" />
          </span>

          <h3 id="confirm-dialog-title" className="confirm-dialog__title">
            {title}
          </h3>

          {message && <p className="confirm-dialog__message">{message}</p>}

          <div className="confirm-dialog__actions">
            <button
              type="button"
              className="confirm-dialog__btn confirm-dialog__btn--ghost"
              onClick={onCancel}
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              className="confirm-dialog__btn confirm-dialog__btn--primary"
              onClick={onConfirm}
            >
              {confirmLabel}
              <ArrowSquareOut size={14} weight="light" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
