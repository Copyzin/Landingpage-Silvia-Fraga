import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import useIsMobile from './useIsMobile'

/**
 * Decide o estado de um shader WebGL de fundo (MeshGradient) equilibrando
 * estetica e performance.
 *
 * Cada <MeshGradient> cria um contexto WebGL proprio + um requestAnimationFrame
 * perpetuo (ver @paper-design/shaders/dist/shader-mount.js -> render()). Com ~12
 * instancias na Home, no mobile (CPU 4x throttle) isso pega a main thread o
 * tempo todo (TBT ~19s no PageSpeed). Estrategia:
 *
 *  - Mobile ou prefers-reduced-motion: NAO monta WebGL. O fundo usa o gradiente
 *    CSS estatico definido no CSS do componente (visualmente quase identico, ja
 *    que a animacao do shader e lenta/sutil). Zero contexto WebGL, zero rAF.
 *  - Desktop: monta o WebGL, mas so anima quando o elemento esta na viewport
 *    (IntersectionObserver). Fora da tela, speed=0 -> o shader-mount NAO reagenda
 *    o rAF e congela o frame, sem custo de main thread.
 *
 * Retorna { ref, mountWebgl, inView }:
 *  - ref: anexar ao container do shader (alvo do IntersectionObserver).
 *  - mountWebgl: se deve renderizar o <MeshGradient> (desktop, sem reduced-motion).
 *  - inView: se esta visivel; usar para `speed={inView ? PRESET.speed : 0}`.
 */
export default function useShaderActivation() {
  const reduce = useReducedMotion()
  const isMobile = useIsMobile()
  const mountWebgl = !reduce && !isMobile

  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!mountWebgl) return
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      // Sem suporte a IO: anima sempre (comportamento antigo) para nao congelar.
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => setInView(entries[0].isIntersecting),
      { rootMargin: '200px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [mountWebgl])

  return { ref, mountWebgl, inView }
}
