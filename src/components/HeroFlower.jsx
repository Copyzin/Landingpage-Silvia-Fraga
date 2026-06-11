import { useEffect, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
} from 'motion/react'
import useIsMobile from '../hooks/useIsMobile'

/**
 * Caixa visual do Hero — magnólia institucional com movimento próprio.
 *
 * TODO o movimento vive num ÚNICO integrador (useAnimationFrame), sem estado
 * React e sem useSpring. Ver regra "Flor do Hero" no CLAUDE.md: a posição
 * renderizada nunca pode teleportar.
 *
 * Por que assim: versões anteriores acoplavam a posição a estado React
 * (`following`) que trocava a config do useSpring e era alternado em limiares
 * geométricos. Isso gerava saltos (re-init da mola, dithering na borda) e o
 * idle usava tempo ABSOLUTO, que pula quando o rAF é suspenso (troca de
 * aba/tela). Aqui:
 *  - Idle (órbita elíptica + respiro): tempo acumulado por delta COM CLAMP →
 *    imune a saltos de tempo (aba oculta congela a fase e retoma de onde parou).
 *  - Follow: mola feita à mão, integrada no mesmo loop. O amortecimento muda
 *    por frame (crítico ao seguir; sub-amortecido = 1 quique ao soltar) — sem
 *    troca de config, sem re-render.
 *  - Histerese (ativa dentro da caixa, solta só além da margem) + presença do
 *    cursor (solta ao sair da janela/aba/tela). Mesmo se o estado oscilar, só
 *    muda o ALVO — a posição é sempre integrada, jamais setada com salto.
 *  - Mobile/touch e prefers-reduced-motion: tudo estático.
 */

const ORBIT_X = 13 // raio horizontal da órbita idle (px)
const ORBIT_Y = 8 // raio vertical (px) — elipse → velocidade sempre > 0
const ORBIT_W = 0.55 // rad/s (~11s por volta)
const RAMP_S = 1.2 // s do ramp de entrada (nasce do centro, sem teleporte)

const FOLLOW_MAX = 18 // deslocamento máx do follow (px)
const FOLLOW_ROT = 3 // giro máx (graus)
// Hitbox = exatamente o quadrado do Hero (o `.bezel`). 0 = solta na borda do
// quadrado, sem margem extra. Seguro agora: o integrador não pisca em borda dura.
const RELEASE_MARGIN = 0

const STIFFNESS = 35 // mais baixo = segue com mais atraso/suavidade
const DAMP_FOLLOW = 13 // ζ ≈ 1.10 — segue suave, sem ultrapassar
const DAMP_RELEASE = 6 // ζ ≈ 0.51 — um único quique ao voltar
const DELTA_MAX = 0.05 // s — teto do passo de integração (mata saltos de tempo)

function HeroFlower() {
  const reduce = useReducedMotion()
  const isMobile = useIsMobile()
  const enabled = !reduce && !isMobile

  const panelRef = useRef(null)

  // Valores RENDERIZADOS — plain motion values atualizados todo frame com um
  // passo pequeno; nunca recebem um valor descontínuo → sem teleporte.
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const mrot = useMotionValue(0)
  const mscale = useMotionValue(1)

  // Estado do loop em refs (nada disso dispara re-render)
  const cursor = useRef({ x: 0, y: 0, present: false })
  const activeRef = useRef(false) // histerese: dentro/fora da caixa
  const scrollingRef = useRef(false)
  const elapsedRef = useRef(0) // tempo idle acumulado (s) por delta clamped
  const pos = useRef({ x: 0, y: 0, rot: 0 }) // offset do follow
  const vel = useRef({ x: 0, y: 0, rot: 0 }) // velocidade da mola à mão

  // Listeners (só escrevem em refs — sem estado React)
  useEffect(() => {
    if (!enabled) return

    const onMove = (e) => {
      cursor.current.x = e.clientX
      cursor.current.y = e.clientY
      cursor.current.present = true
    }
    // Cursor saiu da viewport (subiu pras abas / saiu da tela) → solta
    const onLeaveWindow = () => {
      cursor.current.present = false
    }
    // Troca de aba / minimizar → solta (e o idle congela via rAF suspenso)
    const onVisibility = () => {
      if (document.hidden) cursor.current.present = false
    }
    const onBlur = () => {
      cursor.current.present = false
    }

    let idleTimer = 0
    let rafPending = false
    const onScroll = () => {
      scrollingRef.current = true
      if (rafPending) return // rAF-throttle (regra do projeto)
      rafPending = true
      requestAnimationFrame(() => {
        rafPending = false
        clearTimeout(idleTimer)
        idleTimer = setTimeout(() => {
          scrollingRef.current = false
        }, 150)
      })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeaveWindow)
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('blur', onBlur)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeaveWindow)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('blur', onBlur)
      window.removeEventListener('scroll', onScroll)
      clearTimeout(idleTimer)
    }
  }, [enabled])

  // Único integrador: idle (delta acumulado e clamped) + follow (mola à mão)
  useAnimationFrame((_t, delta) => {
    if (!enabled) return
    // Clamp do passo: se o rAF ficou suspenso (aba oculta), o 1º delta ao voltar
    // é enorme — limitamos a um passo pequeno, então nada salta.
    const dt = Math.min(DELTA_MAX, Math.max(0, (delta || 16.7) / 1000))
    elapsedRef.current += dt
    const s = elapsedRef.current

    // Ramp de entrada (smoothstep): a flor cresce do centro até a órbita
    const u = Math.min(1, s / RAMP_S)
    const ramp = u * u * (3 - 2 * u)

    // Idle — órbita elíptica + respiro defasado
    const idleX = Math.cos(s * ORBIT_W) * ORBIT_X * ramp
    const idleY = Math.sin(s * ORBIT_W) * ORBIT_Y * ramp
    const idleRot = Math.sin(s * 0.42) * 1.4 * ramp
    const idleScale = 1 + Math.sin(s * 0.33) * 0.012 * ramp

    // Alvo do follow com histerese + presença do cursor
    let tx = 0
    let ty = 0
    let trot = 0
    const el = panelRef.current
    if (el && cursor.current.present && !scrollingRef.current) {
      const r = el.getBoundingClientRect()
      const { x: cx, y: cy } = cursor.current
      const inside =
        cx >= r.left && cx <= r.right && cy >= r.top && cy <= r.bottom
      const beyond =
        cx < r.left - RELEASE_MARGIN ||
        cx > r.right + RELEASE_MARGIN ||
        cy < r.top - RELEASE_MARGIN ||
        cy > r.bottom + RELEASE_MARGIN
      if (!activeRef.current && inside) activeRef.current = true
      else if (activeRef.current && beyond) activeRef.current = false

      if (activeRef.current) {
        const clamp = (v) => Math.max(-1, Math.min(1, v))
        const ndx = clamp((cx - (r.left + r.width / 2)) / (r.width / 2))
        const ndy = clamp((cy - (r.top + r.height / 2)) / (r.height / 2))
        tx = ndx * FOLLOW_MAX
        ty = ndy * FOLLOW_MAX
        trot = ndx * FOLLOW_ROT
      }
    } else {
      activeRef.current = false
    }

    // Mola à mão (Euler semi-implícito). Amortecimento por fase: seguindo =
    // crítico (sem quique); soltando = sub-amortecido (um quique).
    const damp = activeRef.current ? DAMP_FOLLOW : DAMP_RELEASE
    const step = (axis, target) => {
      const accel = -STIFFNESS * (pos.current[axis] - target) - damp * vel.current[axis]
      vel.current[axis] += accel * dt
      pos.current[axis] += vel.current[axis] * dt
    }
    step('x', tx)
    step('y', ty)
    step('rot', trot)

    // Saída = idle (contínuo) + follow (integrado) → sempre suave
    mx.set(idleX + pos.current.x)
    my.set(idleY + pos.current.y)
    mrot.set(idleRot + pos.current.rot)
    mscale.set(idleScale)
  })

  return (
    <div className="bezel" ref={panelRef}>
      <div className="bezel__inner hero__art-inner">
        {isMobile ? (
          /* Mobile: lockup institucional (logo da cliente) no lugar da flor.
             Decisão do cliente — ver "Flor do Hero" no CLAUDE.md. Desktop
             permanece com a magnólia animada (abaixo). */
          <div className="hero__lockup">
            <img
              src="/logo-hero-branca.png"
              alt="Silvia Fraga — Advocacia e Consultoria Jurídica"
              className="hero__lockup-logo"
              loading="eager"
              fetchPriority="high"
            />
            <span className="hero__lockup-rule" aria-hidden="true" />
            <span className="hero__lockup-name">Silvia Fraga</span>
            <span className="hero__lockup-role">Advocacia &amp; Consultoria</span>
          </div>
        ) : (
          <>
            <motion.img
              src="/plantas/flor-branca.png"
              alt=""
              className="hero__art-img"
              aria-hidden="true"
              loading="eager"
              fetchPriority="high"
              style={{ x: mx, y: my, rotate: mrot, scale: mscale }}
            />
            <div className="hero__seal" aria-hidden="true">
              <span className="hero__seal-name">Silvia Fraga</span>
              <span className="hero__seal-divider" />
              <span className="hero__seal-foot">Advocacia &amp; Consultoria</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default HeroFlower
