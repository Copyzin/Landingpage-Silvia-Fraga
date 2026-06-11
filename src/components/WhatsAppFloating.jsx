import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowUpRight, X as XIcon } from '@phosphor-icons/react'
import { CONTATO } from '../constants/contact'
import { PUBLICACOES } from '../data/publicacoes'
import useIsMobile from '../hooks/useIsMobile'
import './WhatsAppFloating.css'

// Conteúdo do chat: os artigos publicados (fonte única: data/publicacoes.js).
// Chip = título do artigo; resposta = resumo + ação de abrir o artigo.
const ARTIGOS = PUBLICACOES.map((pub) => ({
  id: pub.id,
  pergunta: pub.titulo,
  resposta: pub.resumo,
}))

// Boas-vindas sorteadas (1ª bolha quando o chat abre) ≠ texto do teaser
const BOAS_VINDAS = [
  'Olá! Sou a assistente virtual do escritório. Abaixo estão os artigos publicados pela Dra. Sílvia e equipe — toque num título para ver um resumo.',
  'Oi, tudo bem? A Dra. Sílvia escreve artigos sobre os temas que mais chegam ao escritório. Escolha um abaixo para saber do que se trata.',
  'Olá! Quer adiantar sua leitura? Estes são os artigos publicados no site — toque num deles e eu mostro um resumo rápido.',
]
const FIM_DA_LISTA =
  'Esses são todos os artigos por enquanto. Ficou com alguma dúvida sobre o seu caso? Fale com a gente no WhatsApp.'

const TEASER_DELAY = 10000
const CLOSE_DELAY = 260
const REOPEN_DELAY = 600
const TYPING_DELAY = 750

function WhatsAppFloating() {
  const isMobile = useIsMobile()
  const location = useLocation()
  const navigate = useNavigate()

  const [canHover] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches
  )
  const [reduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const [welcome] = useState(
    () => BOAS_VINDAS[Math.floor(Math.random() * BOAS_VINDAS.length)]
  )

  const [chatOpen, setChatOpen] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [teaserReady, setTeaserReady] = useState(false)
  const [thread, setThread] = useState([])
  const [usedIds, setUsedIds] = useState([])

  const fabRef = useRef(null)
  const widgetRef = useRef(null)
  const teaserRef = useRef(null)
  const scrollRef = useRef(null)

  // Estado de interação fora do render (timers leem valores atuais, não stale)
  const dismissedRef = useRef(false)
  const pinnedRef = useRef(false)
  const overFabRef = useRef(false)
  const overPanelRef = useRef(false)
  const builtRef = useRef(false)
  const keyRef = useRef(0)
  const closeTimerRef = useRef(null)
  const reopenTimerRef = useRef(null)
  const typingTimerRef = useRef(null)

  const appendBubble = (side, text, pubId) => {
    keyRef.current += 1
    const key = keyRef.current
    setThread((prev) => [...prev, { key, side, text, pubId }])
  }

  const say = (text, pubId) => {
    if (reduced) {
      appendBubble('in', text, pubId)
      return
    }
    appendBubble('typing')
    typingTimerRef.current = setTimeout(() => {
      keyRef.current += 1
      const key = keyRef.current
      setThread((prev) => [
        ...prev.filter((m) => m.side !== 'typing'),
        { key, side: 'in', text, pubId },
      ])
    }, TYPING_DELAY)
  }

  const openChat = () => {
    if (dismissedRef.current) return
    clearTimeout(closeTimerRef.current)
    setTeaserReady(true)
    setChatOpen(true)
    if (!builtRef.current) {
      builtRef.current = true
      say(welcome)
    }
  }

  const backToTeaser = () => {
    pinnedRef.current = false
    setChatOpen(false)
  }

  const scheduleClose = () => {
    clearTimeout(closeTimerRef.current)
    closeTimerRef.current = setTimeout(() => {
      if (!overFabRef.current && !overPanelRef.current && !pinnedRef.current) {
        backToTeaser()
      }
    }, CLOSE_DELAY)
  }

  // Dispensa só em memória: recarregar a página traz o teaser de volta
  const dismiss = () => {
    dismissedRef.current = true
    pinnedRef.current = false
    setDismissed(true)
    setChatOpen(false)
  }

  const handleFabEnter = () => {
    overFabRef.current = true
    clearTimeout(closeTimerRef.current)
    if (dismissedRef.current) {
      // Pausa de 600ms sobre o FAB reativa o chat depois de dispensado
      clearTimeout(reopenTimerRef.current)
      reopenTimerRef.current = setTimeout(() => {
        dismissedRef.current = false
        setDismissed(false)
        openChat()
      }, REOPEN_DELAY)
      return
    }
    openChat()
  }

  const handleFabLeave = () => {
    overFabRef.current = false
    clearTimeout(reopenTimerRef.current)
    scheduleClose()
  }

  const handlePanelEnter = () => {
    overPanelRef.current = true
    clearTimeout(closeTimerRef.current)
  }

  const handlePanelLeave = () => {
    overPanelRef.current = false
    scheduleClose()
  }

  // stopPropagation: o chip é removido do DOM no re-render antes do listener
  // de clique-fora rodar; sem isso o contains(e.target) falha e o chat fecha
  const handleChip = (e, artigo) => {
    e.stopPropagation()
    pinnedRef.current = true
    setUsedIds((prev) => [...prev, artigo.id])
    appendBubble('out', artigo.pergunta)
    say(artigo.resposta, artigo.id)
  }

  const handleTeaserOpen = (e) => {
    e.stopPropagation()
    pinnedRef.current = true
    openChat()
  }

  const abrirArtigo = (pubId) => {
    backToTeaser()
    if (location.pathname === '/') {
      window.dispatchEvent(
        new CustomEvent('sf:abrir-publicacao', { detail: pubId })
      )
    } else {
      navigate('/#publicacoes')
    }
  }

  // Teaser após 10s — o FAB deste site é sempre visível, então conta do mount
  useEffect(() => {
    if (isMobile) return undefined
    const t = setTimeout(() => setTeaserReady(true), TEASER_DELAY)
    return () => clearTimeout(t)
  }, [isMobile])

  // Clique fora fecha o chat (volta ao teaser)
  useEffect(() => {
    if (!chatOpen) return undefined
    const onDocClick = (e) => {
      if (!document.contains(e.target)) return
      if (widgetRef.current?.contains(e.target)) return
      if (fabRef.current?.contains(e.target)) return
      if (teaserRef.current?.contains(e.target)) return
      backToTeaser()
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [chatOpen])

  // Mantém a mensagem mais recente à vista
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [thread, usedIds])

  useEffect(
    () => () => {
      clearTimeout(closeTimerRef.current)
      clearTimeout(reopenTimerRef.current)
      clearTimeout(typingTimerRef.current)
    },
    []
  )

  const last = thread[thread.length - 1]
  const chipsVisible = !!last && last.side === 'in'
  const restantes = ARTIGOS.filter((a) => !usedIds.includes(a.id))
  const teaserShown = teaserReady && !dismissed && !chatOpen

  const fabHoverProps =
    !isMobile && canHover
      ? { onPointerEnter: handleFabEnter, onPointerLeave: handleFabLeave }
      : {}

  return (
    <>
      <a
        ref={fabRef}
        className="wa-floating"
        href={CONTATO.whatsappMessageUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com Silvia Fraga pelo WhatsApp"
        title="Falar pelo WhatsApp"
        {...fabHoverProps}
      >
        <span className="wa-floating__ring" aria-hidden="true" />
        <span className="wa-floating__icon" aria-hidden="true" />
      </a>

      {!isMobile && (
        <>
          <div
            ref={widgetRef}
            className={'wa-chat' + (chatOpen ? ' is-open' : '')}
            onPointerEnter={handlePanelEnter}
            onPointerLeave={handlePanelLeave}
          >
            <div className="wa-chat__panel">
              <div className="wa-chat__scroll" ref={scrollRef}>
                <div className="wa-chat__thread" aria-live="polite">
                  {thread.map((m) =>
                    m.side === 'typing' ? (
                      <div
                        key={m.key}
                        className="wa-chat__bubble wa-chat__bubble--in wa-chat__bubble--typing"
                      >
                        <span className="wa-chat__dots" aria-hidden="true">
                          <span />
                          <span />
                          <span />
                        </span>
                      </div>
                    ) : (
                      <div
                        key={m.key}
                        className={'wa-chat__bubble wa-chat__bubble--' + m.side}
                      >
                        {m.text}
                        {m.side === 'in' && m.pubId && (
                          <button
                            type="button"
                            className="wa-chat__ler"
                            onClick={() => abrirArtigo(m.pubId)}
                          >
                            Ler artigo completo
                            <ArrowUpRight size={13} weight="light" />
                          </button>
                        )}
                      </div>
                    )
                  )}
                </div>

                {chipsVisible && (
                  <div className="wa-chat__quick" aria-label="Artigos publicados">
                    {restantes.map((a) => (
                      <button
                        key={a.id}
                        type="button"
                        className="wa-chat__chip"
                        onClick={(e) => handleChip(e, a)}
                      >
                        {a.pergunta}
                      </button>
                    ))}
                    {restantes.length === 0 && (
                      <p className="wa-chat__quick-end">{FIM_DA_LISTA}</p>
                    )}
                  </div>
                )}
              </div>

              <a
                className="wa-chat__cta"
                href={CONTATO.whatsappMessageUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar no WhatsApp
              </a>
            </div>

            <button
              type="button"
              className="wa-chat__close"
              aria-label="Fechar conversa"
              onClick={dismiss}
            >
              <XIcon size={13} weight="light" />
            </button>
          </div>

          <div
            ref={teaserRef}
            className={'wa-teaser' + (teaserShown ? ' is-shown' : '')}
          >
            <button
              type="button"
              className="wa-teaser__bubble"
              onClick={handleTeaserOpen}
            >
              Olá! Quer conhecer os artigos da Dra. Sílvia?
            </button>
            <button
              type="button"
              className="wa-teaser__x"
              aria-label="Dispensar mensagem"
              onClick={dismiss}
            >
              <XIcon size={11} weight="light" />
            </button>
          </div>
        </>
      )}
    </>
  )
}

export default WhatsAppFloating
