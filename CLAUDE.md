# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Landing page de marketing para **Silvia Fraga Advocacia & Consultoria Jurídica**. Focada em gerar contato (WhatsApp/Instagram/e-mail). Single Page Application: Home com âncoras de scroll + 5 rotas filhas `/especialidades/:slug` para leitura aprofundada.

## Stack

- **Vite** + **React 18** + **JavaScript** (sem TypeScript)
- **react-router-dom v6** (BrowserRouter)
- **@paper-design/shaders-react** — WebGL MeshGradient nos CTAs
- **@phosphor-icons/react** — ícones, sempre `weight="light"` para alinhar à estética editorial
- **CSS puro** com CSS custom properties (sem Tailwind/CSS-in-JS)

## Commands

```bash
npm run dev      # Vite dev server (porta 5173; fallback automático se em uso)
npm run build    # build de produção em dist/
npm run preview  # serve dist/ localmente
```

Não há lint/test configurados; valide alterações via `npm run build` (catch de imports quebrados e parse errors).

## Architecture

### Layout do app (`src/main.jsx` → `src/App.jsx`)

`App.jsx` monta uma estrutura única para todas as rotas:
- `<div className="grain-overlay">` — textura SVG noise global fixa em z-50
- `<Header />` — Fluid Island Nav fixa (auto-hide on scroll)
- `<Routes>` — Home na `/`, EspecialidadeLayout em `/especialidades/:slug`, fallback `*` → Home
- `<Footer />` — institucional escuro

Por estar fora das rotas, Header/Footer/grain são compartilhados entre Home e páginas de especialidade — qualquer mudança neles afeta todo o site.

### Home como composição de seções (`src/pages/Home.jsx`)

Seções renderizadas em ordem com `id` para âncoras: `#topo` (Hero) → `#especialidades` → `#publicacoes` → `#visite-nos` → `#contato`. Cada seção vive em `src/sections/<Nome>.{jsx,css}` e é independente. Home também trata navegação por hash (ex: voltando de uma especialidade para `/#contato` rola até a âncora).

### Páginas de especialidade (`src/pages/especialidades/EspecialidadeLayout.jsx`)

Uma única rota dinâmica `/especialidades/:slug` reutiliza `EspecialidadeLayout` que consome `src/data/especialidades.js` via `findEspecialidade(slug)`. Slug inválido faz `<Navigate to="/" replace />`. Conteúdo é dirigido por dados — para adicionar/editar uma área de atuação, edite o array em `data/especialidades.js` (campos `slug`, `ordem` em romano, `titulo`, `subtitulo`, `resumo`, `destaque`, `whatsappContext`, `conteudo[]` com blocos `{type: 'p'|'h2'|'quote', text}`).

A `whatsappContext` é usada por `CONTATO.whatsappMessageWithContext()` para gerar uma mensagem pré-preenchida contextual no CTA da página.

### Design System (`src/styles/`)

Carregado em ordem por `global.css` (importado uma vez em `main.jsx`):
1. `fonts.css` — `@font-face Cinzel` local + import Archivo do Google Fonts
2. `tokens.css` — todas as CSS custom properties (cores, tipografia, espaçamento, raios, sombras, motion). **Fonte da verdade** — use os tokens, nunca cores/tamanhos hardcoded.
3. `reset.css` — reset moderno + `prefers-reduced-motion`
4. `global.css` — base + utilitários (`.container`, `.eyebrow`, `.eyebrow--dark`, `.eyebrow--ghost`, `.section`, `.ghost-btn`, `.hairline`, `.grain-overlay`, `.reveal`)

**Paleta (Warm Legal Canvas)**: vinho `#5d0809`, rosa CTA `#cc3366`, dourado `#fcd17d`, ivory `#fbf6e7`, preto institucional. Está em `DESIGN.md` (raiz). **Sem azul/roxo/verde** — paleta strict.

**Tipografia**: `Cinzel` (serif variável, mesma da logo) apenas para H1/H2/H3 institucionais; `Archivo` para body/UI. Inter é proibido.

### Padrões visuais reutilizáveis

- **Double-Bezel** (`.bezel` + `.bezel__inner`, definido em `Hero.css`): wrapper externo vinho com `padding: 8px` + core interno com radius concêntrico (`calc(2rem - 8px)`). Usado em Hero portrait, sede cards, pub modal, CTA da especialidade. Para criar um novo bezel, herde dessas classes.
- **Eyebrow tag**: pill micro acima de cada H2 (`<span className="eyebrow">01 — Áreas de atuação</span>`). Variantes: padrão (dourada), `--dark` (zona preta), `--ghost`.
- **Asymmetrical Bento Grid**: 12-col CSS Grid com `col-span` variável (ver Especialidades e Publicações). Card destaque ocupa 7/12 + 2 rows; demais ocupam 5/12 ou 6/12.
- **Editorial Split** (Hero): grid 1.15fr/0.85fr texto/imagem.

### ShaderButton (`src/components/ShaderButton.jsx`)

Componente memoizado central para todo CTA principal. Combina:
- `MeshGradient` do Paper Shaders com 3 paletas pré-definidas (`primary` vinho→rosa, `gold` vinho→dourado, `dark` profundidades) — cores extraídas estritamente do DESIGN.md
- Overlay escuro `rgba(0,0,0,0.18)` para contraste WCAG AA
- Arquitetura **Button-in-Button**: ícone aninhado num círculo interno (`shader-btn__icon-wrap`) — no hover translate `+2,-2` e scale 1.05
- Variantes de tamanho: `sm`, `md`, `lg`, `xl` + `iconOnly`
- Aceita `as` ("a" ou "button"), `href`, `to` (router), detecta links externos automaticamente para `target="_blank" rel="noopener noreferrer"`
- Honra `prefers-reduced-motion` matando o canvas e usando gradient CSS fallback

**Use ShaderButton para CTAs principais**. Para ações secundárias use `.ghost-btn` (em `global.css`).

### Header (`src/components/Header.jsx`) — Fluid Island Nav

Não é sticky tradicional. É uma pill flutuante (`position: fixed; top: 20px; transform: translateX(-50%)`) com glass + hairline. Comportamentos:
- **Auto-hide on scroll**: `requestAnimationFrame` + `passive: true` scroll listener detecta direção; acima de 120px de scroll, descendo → `transform: translateY(-160%)` (`.is-hidden`). Subindo → volta. No topo da página sempre visível.
- **Mobile hamburger** vira **X** com rotações `±45deg`. Overlay full-screen `.mobile-menu` com staggered reveal dos links (`--reveal-delay` por CSS var).
- **Floating "mais opções"** (`.floating-menu`, `DotsThree`) aparece deslizando da direita quando a island-nav está hidden em mobile. Click → abre o mesmo overlay.
- **Sem botão de ligação `tel:`** — política do projeto: contato é via WhatsApp/Instagram/e-mail apenas. Não adicione `tel:` links.

### Mobile fullscreen modals

`useIsMobile()` hook (`src/hooks/useIsMobile.js`) usa `matchMedia('(max-width: 768px)')` para detectar mobile reativamente.

- **PublicacaoModal**: no mobile a modal é tela inteira (`100dvh`, sem bezel, sem backdrop blur, slide-up). Imagem vira botão que abre `ImageLightbox` (z-120, acima da modal z-80). **Importante**: o ESC handler da modal tem guarda `!lightboxOpen` para que ESC com lightbox aberto só feche o lightbox, retornando à publicação — não feche os dois.
- **SedeCard**: no mobile, tocar o card (exceto em elementos com `data-no-fullscreen`) abre fullscreen com carrossel + swipe. Use `data-no-fullscreen` em qualquer filho interativo para bloquear o trigger.
- **ConfirmDialog**: usado antes de redirects externos (ex: "Como chegar" → Google Maps).

### Contatos (`src/constants/contact.js`)

Fonte única de verdade para WhatsApp/e-mail/endereços/Instagram. **Nunca hardcoded em componentes**. O `whatsappMessageWithContext(contexto)` injeta a especialidade na mensagem WA.

Endereços de Campinas e São Paulo geram automaticamente URLs de embed iframe, search e directions (sem chave de API).

### Motion

Sempre `cubic-bezier(0.32, 0.72, 0, 1)` (var `--ease-premium`). Banidos `ease-in-out` e `linear` (exceto em loops perpétuos como o shader). Anima só `transform` e `opacity` — nunca `top/left/width/height`. `backdrop-filter` apenas em fixed/sticky.

## Anti-padrões e regras de projeto

- Não use Tailwind/CSS-in-JS — vanilla CSS com tokens.
- Não use Inter, Roboto, Helvetica — apenas Cinzel + Archivo.
- Não adicione `tel:` links de ligação direta (decisão do cliente).
- Não use cores fora da paleta DESIGN.md.
- Não use `h-screen` — sempre `min-height: 100dvh` (iOS Safari fix).
- Não adicione `scroll` event listeners sem `passive: true` e rAF throttle.
- Para emojis/símbolos use sempre Phosphor Light, nunca emoji nativo.

## Imagens mocadas

Publicações e fachadas usam `picsum.photos/seed/<slug>/W/H`. Para trocar por imagens reais, edite as URLs em `src/data/publicacoes.js` e `src/constants/contact.js` (campo `fachadas[]` por sede — array suporta carrossel).

## Assets em `public/`

- `logo.png`, `foto-dona.jpeg` — copiados da raiz do projeto
- `fonts/Cinzel-VariableFont_wght.ttf` — fonte variável local

Referencie sempre com `/path` (Vite serve `public/` na raiz).
