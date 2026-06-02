import { useEffect, useState, useCallback, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  ChatCircleText,
  InstagramLogo,
  X as XIcon,
  DotsThree,
} from '@phosphor-icons/react'
import { CONTATO } from '../constants/contact'
import ShaderButton from './ShaderButton'
import MaskedShaderIcon from './MaskedShaderIcon'
import './Header.css'

const NAV_LINKS = [
  { label: 'A profissional', anchor: '#sobre' },
  { label: 'Especialidades', anchor: '#especialidades' },
  { label: 'Publicações', anchor: '#publicacoes' },
  { label: 'Visite-nos', anchor: '#visite-nos' },
  { label: 'Contato', anchor: '#contato' },
]

const HIDE_AT = 120 // px scroll antes de começar a esconder
const SCROLL_DELTA = 6 // px mínimo entre amostras pra evitar jitter

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const lastYRef = useRef(0)
  const tickingRef = useRef(false)

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  // Fecha menu ao navegar
  useEffect(() => {
    closeMenu()
  }, [location.pathname, closeMenu])

  // Body scroll lock + ESC para mobile menu
  useEffect(() => {
    if (!menuOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') closeMenu()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen, closeMenu])

  // Hide/show header conforme direção do scroll
  useEffect(() => {
    lastYRef.current = window.scrollY
    const onScroll = () => {
      if (tickingRef.current) return
      tickingRef.current = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        const delta = y - lastYRef.current
        if (Math.abs(delta) > SCROLL_DELTA) {
          if (y < HIDE_AT) {
            setIsHidden(false)
          } else if (delta > 0) {
            setIsHidden(true)
          } else {
            setIsHidden(false)
          }
          lastYRef.current = y
        }
        tickingRef.current = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Quando menu abre, garante header visível por baixo
  useEffect(() => {
    if (menuOpen) setIsHidden(false)
  }, [menuOpen])

  const navHref = (anchor) => (isHome ? anchor : `/${anchor}`)

  return (
    <>
      <header
        className={`island-nav ${isHidden ? 'is-hidden' : ''} ${
          menuOpen ? 'is-open' : ''
        }`}
      >
        <div className="island-nav__inner">
          {/* Logo */}
          <Link to="/" className="island-nav__brand" aria-label="Ir para Início">
            <img src="/logo.png" alt="" className="island-nav__logo" />
            <span className="island-nav__wordmark">Silvia Fraga</span>
          </Link>

          {/* Centro: links âncora (desktop) */}
          <nav className="island-nav__links" aria-label="Navegação principal">
            {NAV_LINKS.map((link) => (
              <a
                key={link.anchor}
                href={navHref(link.anchor)}
                className="island-nav__link"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Direita: ações de contato — ícones recortados do mesmo campo shader (única seed) */}
          <div className="island-nav__actions">
            <MaskedShaderIcon
              href={CONTATO.whatsappMessageUrl}
              icon={ChatCircleText}
              variant="primary"
              size={32}
              ariaLabel="Enviar mensagem no WhatsApp"
              className="island-nav__action island-nav__action--whatsapp"
            />
            <MaskedShaderIcon
              href={CONTATO.instagramUrl}
              icon={InstagramLogo}
              variant="primary"
              size={32}
              ariaLabel="Abrir Instagram"
              className="island-nav__action island-nav__action--instagram"
            />

            {/* Hamburger (mobile) */}
            <button
              type="button"
              className={`island-nav__hamburger ${menuOpen ? 'is-active' : ''}`}
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="hamburger-line hamburger-line--top" />
              <span className="hamburger-line hamburger-line--bottom" />
            </button>
          </div>
        </div>
      </header>

      {/* Floating dock — botão "mais opções" visível só quando a island-nav está escondida (mobile) */}
      <div
        className={`floating-dock ${
          isHidden && !menuOpen ? 'is-visible' : ''
        }`}
        aria-hidden={!(isHidden && !menuOpen)}
      >
        <button
          type="button"
          className="floating-dock__btn floating-dock__btn--menu"
          aria-label="Abrir menu de opções"
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(true)}
          tabIndex={isHidden && !menuOpen ? 0 : -1}
        >
          <DotsThree size={26} weight="bold" />
        </button>
      </div>

      {/* Mobile Overlay Menu */}
      <div
        id="mobile-menu"
        className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className="mobile-menu__close"
          aria-label="Fechar menu"
          onClick={closeMenu}
        >
          <XIcon size={28} weight="light" />
        </button>

        <nav className="mobile-menu__nav" aria-label="Navegação mobile">
          {NAV_LINKS.map((link, idx) => (
            <a
              key={link.anchor}
              href={navHref(link.anchor)}
              className="mobile-menu__link"
              style={{ '--reveal-delay': `${100 + idx * 80}ms` }}
              onClick={closeMenu}
            >
              <span className="mobile-menu__link-index">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span className="mobile-menu__link-label">{link.label}</span>
            </a>
          ))}
        </nav>

        <div
          className="mobile-menu__actions"
          style={{ '--reveal-delay': '420ms' }}
        >
          <ShaderButton
            href={CONTATO.whatsappMessageUrl}
            variant="primary"
            size="lg"
            icon={ChatCircleText}
            sublabel="Mensagem direta"
            onClick={closeMenu}
          >
            WhatsApp
          </ShaderButton>
          <ShaderButton
            href={CONTATO.instagramUrl}
            variant="dark"
            size="lg"
            icon={InstagramLogo}
            sublabel="@silviafraga"
            onClick={closeMenu}
          >
            Instagram
          </ShaderButton>
        </div>
      </div>
    </>
  )
}

export default Header
