# Silvia Fraga — Advocacia & Consultoria Jurídica

Landing page institucional do escritório **Silvia Fraga Advocacia & Consultoria Jurídica**, com sedes em Campinas e São Paulo. Single Page Application focada em conversão de contato (WhatsApp, Instagram, e-mail), com cinco páginas filhas de leitura aprofundada por área de atuação.

---

## Stack

- **Vite 5** + **React 18** (JavaScript, sem TypeScript)
- **react-router-dom v6** (`BrowserRouter`)
- **@paper-design/shaders-react** — `MeshGradient` WebGL nos CTAs principais
- **@phosphor-icons/react** — biblioteca de ícones (sempre `weight="light"`)
- **CSS puro** com CSS custom properties (sem Tailwind, sem CSS-in-JS)

---

## Pré-requisitos

- Node.js ≥ 18
- npm ≥ 9

## Instalação

```bash
npm install
```

## Scripts

```bash
npm run dev      # Vite dev server (porta 5173 com fallback automático)
npm run build    # build de produção em dist/
npm run preview  # serve o build de produção localmente
```

Não há lint ou testes configurados. Para validar mudanças, use `npm run build` — ele captura imports quebrados, erros de parse e problemas de tipo.

---

## Arquitetura

### Estrutura de páginas

- `/` — **Home** com seções ancoradas (`#topo`, `#especialidades`, `#publicacoes`, `#visite-nos`, `#contato`)
- `/especialidades/:slug` — **Página de área de atuação** (5 slugs disponíveis, dados em [`src/data/especialidades.js`](src/data/especialidades.js))
- `*` — fallback para a Home

`App.jsx` monta uma estrutura compartilhada para todas as rotas:

- `Header` (Fluid Island Nav com auto-hide ao rolar)
- `<main>` com as rotas
- `Footer` institucional
- `WhatsAppFloating` (ícone outline vinho persistente no canto inferior direito)
- `grain-overlay` (textura SVG sutil em `z-index: 50`)

### Composição da Home

Cada seção vive em `src/sections/<Nome>.{jsx,css}` e é totalmente independente:

| Ordem | Arquivo                                        | Âncora            |
|:-----:|------------------------------------------------|-------------------|
| 01    | [Hero.jsx](src/sections/Hero.jsx)              | `#topo`           |
| 02    | [Especialidades.jsx](src/sections/Especialidades.jsx) | `#especialidades` |
| 03    | [Publicacoes.jsx](src/sections/Publicacoes.jsx) | `#publicacoes`    |
| 04    | [VisiteNos.jsx](src/sections/VisiteNos.jsx)    | `#visite-nos`     |
| 05    | [Contato.jsx](src/sections/Contato.jsx)        | `#contato`        |

### Componentes-chave

- **`ShaderButton`** — CTA principal com `MeshGradient` WebGL, paletas pré-definidas (`primary`, `gold`, `dark`), suporte a `Link`, `<a>` e `<button>`, e arquitetura *button-in-button* com ícone aninhado.
- **`SedeImageCarousel`** — carrossel de imagens com track de 3 slides (prev/current/next), arrasto 1:1 com o cursor/dedo, snap por threshold e arrows hover no desktop.
- **`PublicacaoModal`** — modal fullscreen com lightbox de imagem em mobile.
- **`ImageLightbox`** — visualizador de imagem em tela cheia (reutilizável).
- **`ConfirmDialog`** — confirmação genérica antes de redirecionamento externo.
- **`WhatsAppFloating`** — ícone outline vinho fixo, persistente em todas as rotas.

---

## Design System

Tokens em [`src/styles/tokens.css`](src/styles/tokens.css). **Fonte da verdade** — use tokens, nunca valores hardcoded.

### Paleta — *Warm Legal Canvas*

| Token                       | Hex       | Uso                         |
|-----------------------------|-----------|-----------------------------|
| `--color-text-primary`      | `#5d0809` | Vinho institucional         |
| `--color-text-secondary`    | `#cc3366` | Rosa CTA                    |
| `--color-text-tertiary`     | `#333333` | Texto corrido               |
| `--color-text-inverse`      | `#e4e0b4` | Dourado herança             |
| `--color-action-hover`      | `#b52b58` | Rosa hover                  |
| `--color-surface-soft`      | `#fbf6e7` | Ivory                       |
| `--color-surface-muted`     | `#fcd17d` | Dourado quente              |
| `--color-surface-wash`      | `#f3e5df` | Lavagem burgundy            |
| `--color-surface-dark-muted`| `#210304` | Wine profundo               |
| `--color-border-subtle`     | `#e8d7ac` | Borda pergaminho            |

> Paleta estrita — **sem azul, roxo ou verde**. Detalhes em [`DESIGN.md`](DESIGN.md).

### Tipografia

- **Cinzel** (serif variável, mesma fonte da logo) — exclusivo para H1/H2/H3 institucionais
- **Archivo** (sans-serif) — corpo, UI, navegação
- *Inter, Roboto, Helvetica são proibidos*

### Motion

- Sempre `cubic-bezier(0.32, 0.72, 0, 1)` (`--ease-premium`)
- Animar **apenas** `transform` e `opacity`
- `backdrop-filter` apenas em elementos `fixed`/`sticky`
- `prefers-reduced-motion` honrado em toda animação não-essencial

---

## Conteúdo editável

### Áreas de atuação

[`src/data/especialidades.js`](src/data/especialidades.js) — array de objetos com `slug`, `ordem` (romano), `titulo`, `subtitulo`, `resumo`, `destaque`, `whatsappContext`, e `conteudo[]` (blocos `{type: 'p'|'h2'|'quote', text}`).

Adicionar uma nova área = adicionar um item ao array. A rota dinâmica `/especialidades/:slug` cuida do resto.

### Publicações

[`src/data/publicacoes.js`](src/data/publicacoes.js) — id, título, autor, data ISO, imagem, corpo.

### Contato (sedes, WhatsApp, e-mail, Instagram)

[`src/constants/contact.js`](src/constants/contact.js) — fonte única de verdade. Edite endereços, números e handle do Instagram aqui. URLs de WhatsApp já vêm com mensagem pré-preenchida; a função `whatsappMessageWithContext(contexto)` injeta o contexto da especialidade.

Cada sede tem um array `fachadas: []` com múltiplas imagens consumidas pelo `SedeImageCarousel`.

---

## Estrutura de pastas

```
src/
├── App.jsx
├── main.jsx
├── components/         # Componentes reutilizáveis (ShaderButton, modais, header, footer)
├── constants/          # Constantes do projeto (contato)
├── data/               # Conteúdo estático (especialidades, publicações)
├── hooks/              # Hooks customizados (useIsMobile)
├── pages/              # Rotas (Home + EspecialidadeLayout)
├── sections/           # Seções da Home, uma pasta por seção
└── styles/             # tokens, reset, fonts, utilitários globais
```

```
public/
├── favicon.png
├── silvia-fraga.jpg     # Foto institucional do Hero
├── whatsapp-icon.png    # Outline usado pelo botão flutuante
├── logo.png
└── fonts/
    └── Cinzel-VariableFont_wght.ttf
```

Tudo em `public/` é servido na raiz pelo Vite. Referencie sempre com `/path`.

---

## Convenções e regras de projeto

- Use os tokens de `tokens.css`, nunca cores ou tamanhos hardcoded.
- `min-height: 100dvh` em seções fullscreen (nunca `100vh` — quebra no Safari iOS).
- Scroll listeners sempre `passive: true` + `requestAnimationFrame` para throttle.
- Não adicione links `tel:` de ligação direta — política do cliente.
- Para emojis/símbolos, use **Phosphor Light**, nunca emoji nativo.
- Imagens mocadas vêm de `picsum.photos/seed/<slug>/W/H` — trocar por reais editando as URLs em `data/publicacoes.js` e `constants/contact.js`.

---

## Deploy

O build em `dist/` é estático e pode ser servido por qualquer provider (Vercel, Netlify, Cloudflare Pages, S3 + CloudFront, etc.). Como é uma SPA com `BrowserRouter`, configure o provider para fazer fallback de 404 → `index.html`.

### Vercel / Netlify

Comando: `npm run build` · Output: `dist`. O fallback de SPA é automático.

### Servidor próprio

Adicione no nginx:

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

---

## Créditos

- **Cliente:** Silvia Fraga Advocacia & Consultoria Jurídica
- **Desenvolvimento:** [Almeida Escala Digital](https://almeidaescaladigital.com/)
