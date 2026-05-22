import { useCallback, useEffect, useRef } from 'react'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import './SedeImageCarousel.css'

const SWIPE_THRESHOLD = 50
const SETTLE_MS = 420
const SNAPBACK_MS = 260

function wrapIndex(i, len) {
  if (len <= 0) return 0
  return ((i % len) + len) % len
}

function SedeImageCarousel({
  images,
  index,
  onChange,
  alt = '',
  cityLabel,
  className = '',
}) {
  const len = images.length
  const stageRef = useRef(null)
  const stageWidth = useRef(0)
  const startX = useRef(null)
  const startY = useRef(null)
  const dragRef = useRef(0)
  const lockedAxis = useRef(null)
  const committingRef = useRef(false)
  const indexRef = useRef(index)
  useEffect(() => {
    indexRef.current = index
  }, [index])

  // ===== Measure stage width =====
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const measure = () => {
      stageWidth.current = el.offsetWidth
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // ===== Imperative DOM helpers (no React re-renders during drag) =====
  const writeDrag = useCallback((px) => {
    dragRef.current = px
    if (stageRef.current) stageRef.current.style.setProperty('--drag', `${px}px`)
  }, [])

  const setCommittingClass = useCallback((on) => {
    committingRef.current = on
    if (stageRef.current) stageRef.current.classList.toggle('is-committing', on)
  }, [])

  // Initialize --drag once, outside React's style diff
  useEffect(() => {
    writeDrag(0)
  }, [writeDrag])

  // ===== Commit (sliding animation) =====
  const commit = useCallback(
    (dir) => {
      if (committingRef.current || len < 2) return
      const w = stageWidth.current || stageRef.current?.offsetWidth || 1
      setCommittingClass(true)
      // Two rAFs so the transition has a clean starting frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => writeDrag(dir * -w))
      })
      window.setTimeout(() => {
        // Remove transition class FIRST, then reset --drag to 0 instantly.
        setCommittingClass(false)
        writeDrag(0)
        onChange?.(wrapIndex(indexRef.current + dir, len))
      }, SETTLE_MS)
    },
    [len, onChange, setCommittingClass, writeDrag]
  )

  const goNext = useCallback(() => commit(1), [commit])
  const goPrev = useCallback(() => commit(-1), [commit])

  // ===== Drag handlers =====
  const beginDrag = useCallback(
    (clientX, clientY) => {
      if (committingRef.current || len < 2) return
      startX.current = clientX
      startY.current = clientY
      lockedAxis.current = null
    },
    [len]
  )

  const moveDrag = useCallback(
    (clientX, clientY, ev) => {
      if (startX.current == null) return
      const dx = clientX - startX.current
      const dy = clientY - startY.current
      if (!lockedAxis.current) {
        if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
          lockedAxis.current = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
        } else {
          return
        }
      }
      if (lockedAxis.current === 'y') return
      if (ev?.cancelable) ev.preventDefault()
      writeDrag(dx)
    },
    [writeDrag]
  )

  const endDrag = useCallback(() => {
    if (startX.current == null) return
    startX.current = null
    startY.current = null
    const horizontal = lockedAxis.current === 'x'
    lockedAxis.current = null
    if (!horizontal) return
    const dx = dragRef.current
    if (Math.abs(dx) >= SWIPE_THRESHOLD) {
      commit(dx < 0 ? 1 : -1)
    } else {
      // Snap back gracefully
      setCommittingClass(true)
      writeDrag(0)
      window.setTimeout(() => setCommittingClass(false), SNAPBACK_MS)
    }
  }, [commit, setCommittingClass, writeDrag])

  const onTouchStart = (e) => {
    const t = e.touches[0]
    beginDrag(t.clientX, t.clientY)
  }
  const onTouchMove = (e) => {
    const t = e.touches[0]
    moveDrag(t.clientX, t.clientY, e)
  }
  const onTouchEnd = endDrag

  // ===== Mouse drag (web) =====
  const mouseActive = useRef(false)
  useEffect(() => {
    const onMouseMove = (e) => {
      if (!mouseActive.current) return
      moveDrag(e.clientX, e.clientY, null)
    }
    const onMouseUp = () => {
      if (!mouseActive.current) return
      mouseActive.current = false
      endDrag()
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [moveDrag, endDrag])

  const onMouseDown = (e) => {
    if (e.button !== 0) return
    mouseActive.current = true
    beginDrag(e.clientX, e.clientY)
  }

  // ===== Render =====
  if (len === 0) return null
  const prev = images[wrapIndex(index - 1, len)]
  const cur = images[index] ?? images[0]
  const next = images[wrapIndex(index + 1, len)]
  const showControls = len > 1

  return (
    <div
      ref={stageRef}
      className={'sede-carousel' + (className ? ` ${className}` : '')}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
    >
      <div className="sede-carousel__slide sede-carousel__slide--prev" aria-hidden="true">
        <img
          src={prev}
          alt=""
          className="sede-carousel__img"
          draggable={false}
          loading="lazy"
        />
      </div>

      <div className="sede-carousel__slide sede-carousel__slide--current">
        <img
          src={cur}
          alt={alt}
          className="sede-carousel__img"
          draggable={false}
          loading="lazy"
        />
      </div>

      <div className="sede-carousel__slide sede-carousel__slide--next" aria-hidden="true">
        <img
          src={next}
          alt=""
          className="sede-carousel__img"
          draggable={false}
          loading="lazy"
        />
      </div>

      {cityLabel && (
        <span className="sede-carousel__city" aria-hidden="true">
          {cityLabel}
        </span>
      )}

      {showControls && (
        <>
          <button
            type="button"
            className="sede-carousel__arrow sede-carousel__arrow--prev"
            aria-label="Imagem anterior"
            data-no-fullscreen
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation()
              goPrev()
            }}
          >
            <CaretLeft size={18} weight="light" />
          </button>
          <button
            type="button"
            className="sede-carousel__arrow sede-carousel__arrow--next"
            aria-label="Próxima imagem"
            data-no-fullscreen
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation()
              goNext()
            }}
          >
            <CaretRight size={18} weight="light" />
          </button>

          <div
            className="sede-carousel__dots"
            role="tablist"
            aria-label="Selecionar imagem"
            data-no-fullscreen
            onMouseDown={(e) => e.stopPropagation()}
          >
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                className={
                  'sede-carousel__dot' + (i === index ? ' is-active' : '')
                }
                aria-label={`Ir para imagem ${i + 1}`}
                aria-selected={i === index}
                onClick={(e) => {
                  e.stopPropagation()
                  if (committingRef.current || i === index) return
                  // For non-neighbor jumps, skip the slide animation
                  // (going through the in-between slides would feel busy).
                  const delta = i - index
                  if (Math.abs(delta) === 1) {
                    commit(delta)
                  } else {
                    onChange?.(i)
                  }
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default SedeImageCarousel
