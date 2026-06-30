import { memo, useCallback, useState } from 'react'
import { SHADER_PRESET, SHADER_PALETTES } from './ShaderButton'
import LazyMeshGradient from './LazyMeshGradient'
import useShaderActivation from '../hooks/useShaderActivation'
import './MaskedShaderIcon.css'

// Seed única compartilhada por todos os MaskedShaderIcons da página: ambos os
// botões mostram o mesmo "instantâneo" do campo de gradiente — efeito de
// recorte da mesma fonte luminosa.
const SHARED_SEED = 7

const PROGRAMMATIC_PROTOCOLS = /^(mailto:|tel:|sms:)/i

function MaskedShaderIconImpl({
  as = 'a',
  href,
  to,
  icon: Icon,
  variant = 'primary',
  size = 38,
  ariaLabel,
  onClick,
  className = '',
  external = undefined,
}) {
  const Tag = as
  const palette = SHADER_PALETTES[variant] || SHADER_PALETTES.primary
  // Performance: WebGL só no desktop; mobile/reduced-motion usam o gradiente CSS
  // de fallback recortado pela máscara do ícone. Fora da viewport, speed=0.
  const { ref: shaderRef, mountWebgl, inView } = useShaderActivation()
  const isExternal =
    external ?? (typeof href === 'string' && /^https?:/.test(href))
  const targetProps = isExternal
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  // Serializa o SVG renderizado do Phosphor para usar como CSS mask-image.
  // Captura uma vez no mount via callback ref (não precisa re-rodar — a forma
  // do ícone é estática).
  const [maskUrl, setMaskUrl] = useState(null)
  const captureMask = useCallback((node) => {
    if (!node) return
    const svg = node.querySelector('svg')
    if (!svg) return
    const xml = new XMLSerializer().serializeToString(svg)
    setMaskUrl(`url("data:image/svg+xml;utf8,${encodeURIComponent(xml)}")`)
  }, [])

  const handleClick = (e) => {
    if (typeof onClick === 'function') onClick(e)
    if (e.defaultPrevented) return
    if (
      typeof href === 'string' &&
      PROGRAMMATIC_PROTOCOLS.test(href) &&
      e.button === 0 &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.shiftKey &&
      !e.altKey
    ) {
      e.preventDefault()
      window.location.href = href
    }
  }

  return (
    <Tag
      className={`masked-shader-icon masked-shader-icon--${variant} ${className}`.trim()}
      href={href}
      to={to}
      onClick={handleClick}
      aria-label={ariaLabel}
      style={{ width: size, height: size }}
      {...targetProps}
    >
      {/* Fonte do mask: ícone renderizado escondido, lido via ref */}
      <span
        ref={captureMask}
        className="masked-shader-icon__src"
        aria-hidden="true"
      >
        <Icon size={size} weight="fill" color="#000" />
      </span>

      {/* Camada visível: shader recortado pela forma do ícone */}
      <span
        ref={shaderRef}
        className="masked-shader-icon__shader"
        style={{
          WebkitMaskImage: maskUrl || 'none',
          maskImage: maskUrl || 'none',
          opacity: maskUrl ? 1 : 0,
        }}
        aria-hidden="true"
      >
        {mountWebgl && (
          <LazyMeshGradient
            colors={palette}
            frame={SHARED_SEED}
            speed={inView ? SHADER_PRESET.speed : 0}
            distortion={SHADER_PRESET.distortion}
            swirl={SHADER_PRESET.swirl}
            offsetX={SHADER_PRESET.offsetX}
            offsetY={SHADER_PRESET.offsetY}
            scale={SHADER_PRESET.scale}
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </span>
    </Tag>
  )
}

export const MaskedShaderIcon = memo(MaskedShaderIconImpl)
export default MaskedShaderIcon
