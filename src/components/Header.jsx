import { useEffect, useState, useCallback, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  ChatCircleText,
  InstagramLogo,
  X as XIcon,
  DotsThree,
  CaretDown,
} from '@phosphor-icons/react'
import { CONTATO } from '../constants/contact'
import { ESPECIALIDADES } from '../data/especialidades'
import ShaderButton from './ShaderButton'
import MaskedShaderIcon from './MaskedShaderIcon'
import './Header.css'

const NAV_LINKS = [
  { label: 'Sobre', anchor: '#quem-somos' },
  { label: 'Especialidades', anchor: '#especialidades', articles: true },
  { label: 'Publicações', anchor: '#publicacoes' },
  { label: 'Sedes', anchor: '#visite-nos' },
  { label: 'Contato', anchor: '#contato' },
]

// Rotas de artigo (paginas de especialidade) — fonte unica: data/especialidades.
// Novas especialidades entram automaticamente no dropdown e no acordeao.
const ARTICLES = ESPECIALIDADES.map((e) => ({
  label: e.titulo,
  ordem: e.ordem,
  to: `/especialidades/${e.slug}`,
}))

const HIDE_AT = 120 // px scroll antes de começar a esconder
const SCROLL_DELTA = 6 // px mínimo entre amostras pra evitar jitter
const OPEN_DELAY = 120 // ms — exige dwell; flick de passagem NAO abre
const CLOSE_DELAY = 220 // ms — tolerancia ao sair; re-entrada cancela

// Dropdown de nav (desktop) — adaptacao React do Dropdown Patterns.md:
// painel e filho do grupo (hover tolerante), bridge transparente no CSS,
// delays de dwell, foco abre na hora e Esc fecha. Card vidro-claro coeso
// com a island-nav. So aparece no desktop (a nav some < 1024px).
function NavDropdown({ label, href, articles }) {
  const [open, setOpen] = useState(false)
  const openT = useRef(null)
  const closeT = useRef(null)
  const groupRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(
    () => () => {
      clearTimeout(openT.current)
      clearTimeout(closeT.current)
    },
    []
  )

  const onEnter = () => {
    clearTimeout(closeT.current) // re-entrada rapida cancela o fechamento
    if (open) return
    clearTimeout(openT.current)
    openT.current = setTimeout(() => setOpen(true), OPEN_DELAY)
  }
  const onLeave = () => {
    clearTimeout(openT.current) // cancela abertura pendente (flick)
    closeT.current = setTimeout(() => setOpen(false), CLOSE_DELAY)
  }
  const onFocus = () => {
    clearTimeout(closeT.current)
    setOpen(true) // teclado: foco abre na hora, sem dwell
  }
  const onBlur = (e) => {
    if (!groupRef.current?.contains(e.relatedTarget)) {
      clearTimeout(closeT.current)
      closeT.current = setTimeout(() => setOpen(false), CLOSE_DELAY)
    }
  }
  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      clearTimeout(openT.current)
      clearTimeout(closeT.current)
      setOpen(false)
      triggerRef.current?.focus()
    }
  }
  const hide = () => {
    clearTimeout(openT.current)
    clearTimeout(closeT.current)
    setOpen(false)
  }

  return (
    <span
      ref={groupRef}
      className={`nav-group ${open ? 'is-open' : ''}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    >
      <a
        ref={triggerRef}
        href={href}
        className="island-nav__link nav-group__trigger"
        aria-haspopup="true"
        aria-expanded={open}
      >
        {label}
        <span className="nav-caret" aria-hidden="true" />
      </a>

      <div className="nav-dropdown" role="menu">
        <div className="nav-dropdown__inner">
          <p className="nav-dropdown__eyebrow">Áreas de atuação</p>
          <div className="nav-dropdown__grid">
            {articles.map((a) => (
              <Link
                key={a.to}
                to={a.to}
                className="nav-dropdown__item"
                role="menuitem"
                onClick={hide}
              >
                <span className="nav-dropdown__index">{a.ordem}</span>
                <span className="nav-dropdown__label">{a.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </span>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [espOpen, setEspOpen] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const lastYRef = useRef(0)
  const tickingRef = useRef(false)

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    setEspOpen(false)
  }, [])

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

          {/* Centro: links âncora (desktop) — "Especialidades" vira dropdown */}
          <nav className="island-nav__links" aria-label="Navegação principal">
            {NAV_LINKS.map((link) =>
              link.articles ? (
                <NavDropdown
                  key={link.anchor}
                  label={link.label}
                  href={navHref(link.anchor)}
                  articles={ARTICLES}
                />
              ) : (
                <a
                  key={link.anchor}
                  href={navHref(link.anchor)}
                  className="island-nav__link"
                >
                  {link.label}
                </a>
              )
            )}
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
          {NAV_LINKS.map((link, idx) => {
            const delay = { '--reveal-delay': `${100 + idx * 80}ms` }
            const index = String(idx + 1).padStart(2, '0')

            if (link.articles) {
              // Acordeao: label navega para a secao; caret expande os artigos
              return (
                <div
                  key={link.anchor}
                  className="mobile-menu__item mobile-menu__group"
                  style={delay}
                >
                  <div className="mobile-menu__row">
                    <a
                      href={navHref(link.anchor)}
                      className="mobile-menu__link mobile-menu__link--group"
                      onClick={closeMenu}
                    >
                      <span className="mobile-menu__link-index">{index}</span>
                      <span className="mobile-menu__link-label">
                        {link.label}
                      </span>
                    </a>
                    <button
                      type="button"
                      className={`mobile-menu__toggle ${
                        espOpen ? 'is-open' : ''
                      }`}
                      aria-expanded={espOpen}
                      aria-controls="mobile-articles"
                      aria-label={
                        espOpen
                          ? 'Recolher áreas de atuação'
                          : 'Expandir áreas de atuação'
                      }
                      onClick={() => setEspOpen((v) => !v)}
                    >
                      <CaretDown size={20} weight="bold" />
                    </button>
                  </div>

                  <div
                    id="mobile-articles"
                    className={`mobile-menu__sublist ${
                      espOpen ? 'is-open' : ''
                    }`}
                  >
                    <div className="mobile-menu__sublist-inner">
                      {ARTICLES.map((a) => (
                        <Link
                          key={a.to}
                          to={a.to}
                          className="mobile-menu__sublink"
                          onClick={closeMenu}
                        >
                          <span className="mobile-menu__sublink-index">
                            {a.ordem}
                          </span>
                          <span className="mobile-menu__sublink-label">
                            {a.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )
            }

            return (
              <a
                key={link.anchor}
                href={navHref(link.anchor)}
                className="mobile-menu__item mobile-menu__link"
                style={delay}
                onClick={closeMenu}
              >
                <span className="mobile-menu__link-index">{index}</span>
                <span className="mobile-menu__link-label">{link.label}</span>
              </a>
            )
          })}
        </nav>

        <div
          className="mobile-menu__actions"
          style={{ '--reveal-delay': '520ms' }}
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
