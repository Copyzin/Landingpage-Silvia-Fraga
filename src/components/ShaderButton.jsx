import { memo, useRef } from 'react'
import { MeshGradient } from '@paper-design/shaders-react'
import { ArrowUpRight } from '@phosphor-icons/react'
import './ShaderButton.css'

const PALETTES = {
  // vinho → rosa (CTA primário, urgência discreta)
  primary: ['#5d0809', '#b52b58', '#cc3366', '#210304'],
  // vinho → dourado (CTA institucional)
  gold: ['#5d0809', '#fcd17d', '#e4e0b4', '#210304'],
  // pretos profundos (zona dark/contato)
  dark: ['#000000', '#210304', '#5d0809', '#3a0405'],
}

// Preset compartilhado entre todos os ShaderButtons.
// Inspirado nos presets cinematic do shaders.com: distortion alta + swirl
// moderado + speed lento → sensação de respiração orgânica. Seeds diferentes
// por instância garantem que cada botão tenha um "instantâneo" único do mesmo
// campo de gradiente.
export const SHADER_PRESET = {
  speed: 0.18,
  distortion: 1.25,
  swirl: 0.35,
  offsetX: 0,
  offsetY: 0,
  scale: 1.3,
}

export const SHADER_PALETTES = PALETTES

// Protocolos que precisam de fallback programático (lift de OS handler).
// Em alguns navegadores, o click default no <a href="mailto:..."> falha em
// silêncio quando algo intercepta o evento. Forçamos via window.location.
const PROGRAMMATIC_PROTOCOLS = /^(mailto:|tel:|sms:)/i

function ShaderButtonImpl({
  as = 'a',
  href,
  to,
  children,
  sublabel,
  variant = 'primary',
  size = 'md',
  icon: Icon = ArrowUpRight,
  iconOnly = false,
  ariaLabel,
  onClick,
  className = '',
  external = undefined,
  seed,
}) {
  const Tag = as
  const palette = PALETTES[variant] || PALETTES.primary
  // Seed estável por instância: gerado uma vez no mount, persiste entre re-renders.
  // Aceita override via prop pra casos onde o consumidor quer controlar.
  const seedRef = useRef(seed ?? Math.floor(Math.random() * 10000))
  const isExternal =
    external ?? (typeof href === 'string' && /^https?:/.test(href))
  const targetProps = isExternal
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  const classes = [
    'shader-btn',
    `shader-btn--${variant}`,
    `shader-btn--${size}`,
    iconOnly ? 'is-icon-only' : '',
    sublabel ? 'has-sublabel' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  // Click handler defensivo: para mailto:/tel:, garante navegação programática.
  // Preserva onClick custom + middle/ctrl-click (não fazem sentido em mailto, mas
  // mantemos o anchor para acessibilidade).
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
      className={classes}
      href={href}
      to={to}
      onClick={handleClick}
      aria-label={ariaLabel || (iconOnly ? undefined : undefined)}
      {...targetProps}
    >
      <span className="shader-btn__shader" aria-hidden="true">
        <MeshGradient
          colors={palette}
          speed={SHADER_PRESET.speed}
          distortion={SHADER_PRESET.distortion}
          swirl={SHADER_PRESET.swirl}
          offsetX={SHADER_PRESET.offsetX}
          offsetY={SHADER_PRESET.offsetY}
          scale={SHADER_PRESET.scale}
          frame={seedRef.current}
          style={{ width: '100%', height: '100%' }}
        />
      </span>
      <span className="shader-btn__overlay" aria-hidden="true" />
      {!iconOnly && (
        <span className="shader-btn__text">
          <span className="shader-btn__label">{children}</span>
          {sublabel && <span className="shader-btn__sublabel">{sublabel}</span>}
        </span>
      )}
      <span className="shader-btn__icon-wrap" aria-hidden="true">
        <Icon size={iconOnly ? 18 : 16} weight="light" />
      </span>
    </Tag>
  )
}

export const ShaderButton = memo(ShaderButtonImpl)
export default ShaderButton
