# Getanchor — Style Reference Adaptado
> Warm Legal Canvas

**Theme:** light com base escura de marca

Este design system preserva a estrutura profissional, direta e espaçada da referência Anchor, mas troca a paleta para uma identidade jurídica mais quente e contrastada. A base de marca usa preto absoluto e vinho profundo, com dourado quente como superfície de destaque e magenta como chamada de ação. O resultado deve parecer sóbrio, premium e legível, sem perder clareza operacional.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Deep Burgundy | `#5d0809` | `--color-text-primary` | Texto principal de marca, headings, bordas fortes, ações institucionais |
| Legal Rose | `#cc3366` | `--color-text-secondary` | CTA principal, links ativos, acentos interativos |
| Graphite Text | `#333333` | `--color-text-tertiary` | Texto neutro, corpo longo, labels secundários |
| Heritage Gold | `#e4e0b4` | `--color-text-inverse` | Texto sobre preto/vinho, detalhes em superfícies escuras |
| Black Canvas | `#000000` | `--color-surface-base` | Fundo base escuro, footer, hero institucional, áreas de alto contraste |
| Warm Gold Surface | `#fcd17d` | `--color-surface-muted` | Superfícies de destaque, tags, fundos de blocos importantes |
| Raised White | `#ffffff` | `--color-surface-raised` | Cards, navegação, formulários, áreas de conteúdo elevado |
| Aged Ivory | `#fbf6e7` | `--color-surface-soft` | Fundo claro secundário sugerido para seções longas |
| Parchment Border | `#e8d7ac` | `--color-border-subtle` | Bordas claras e divisores em superfícies claras |
| Burgundy Wash | `#f3e5df` | `--color-surface-wash` | Fundo claro quente para separar seções sem pesar |
| Deep Wine Surface | `#210304` | `--color-surface-dark-muted` | Variação escura sugerida para cards sobre preto |
| Rose Hover | `#b52b58` | `--color-action-hover` | Hover/pressed de CTAs em Legal Rose |
| Gold Focus | `#f7b84b` | `--color-focus-ring` | Estados de foco acessíveis e contornos de teclado |

## Tokens — Typography

### Archivo — Conteúdo textual, headings, navegação e UI
- **Substitute:** Arial, Helvetica Neue, sans-serif
- **Weights:** 400, 600
- **Sizes:** 11px, 13px, 14px, 15px, 16px, 18px, 36px, 44px, 52px, 68px
- **Line height:** 1.3
- **Letter spacing:** 0, 0.06em
- **Role:** Tipografia principal para preservar leitura clara, com headlines fortes e UI objetiva.

### Type Scale

| Role | Size | Line Height | Letter Spacing | Token |
|------|------|-------------|----------------|-------|
| caption | 11px | 1.5 | 0.06em | `--text-caption` |
| body | 16px | 1.5 | 0 | `--text-body` |
| subheading | 18px | 1.4 | 0 | `--text-subheading` |
| heading-sm | 36px | 1.2 | 0 | `--text-heading-sm` |
| heading | 44px | 1.1 | 0 | `--text-heading` |
| heading-lg | 52px | 1 | 0 | `--text-heading-lg` |
| display | 68px | 0.9 | 0 | `--text-display` |

## Tokens — Spacing & Shapes

**Base unit:** 4px

**Density:** comfortable

| Name | Value | Token |
|------|-------|-------|
| 4 | 4px | `--spacing-4` |
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 20 | 20px | `--spacing-20` |
| 24 | 24px | `--spacing-24` |
| 32 | 32px | `--spacing-32` |
| 40 | 40px | `--spacing-40` |
| 48 | 48px | `--spacing-48` |
| 64 | 64px | `--spacing-64` |
| 80 | 80px | `--spacing-80` |
| 120 | 120px | `--spacing-120` |
| 128 | 128px | `--spacing-128` |

### Border Radius

| Element | Value |
|---------|-------|
| pill | 4800px |
| buttons | 4px |
| default | 4px |
| navigation | 4px |

### Shadows

| Name | Value | Token |
|------|-------|-------|
| subtle | `rgba(0,0,0,0.01) 0px 4px 1px 0px, rgba(0,0,0,0.04) 0px 2px 1px 0px, rgba(0,0,0,0.06) 0px 1px 1px 0px` | `--shadow-subtle` |

## Components

### Primary Action Button
Filled button with `Legal Rose` (`#cc3366`) background and `Raised White` (`#ffffff`) text. Use `Rose Hover` (`#b52b58`) on hover. Border-radius stays at 4px, with 8px vertical and 16px horizontal padding.

### Institutional Button
Button with `Deep Burgundy` (`#5d0809`) background and `Heritage Gold` (`#e4e0b4`) text. Use it for formal brand actions where the CTA should feel more premium and less urgent than the primary conversion button.

### Ghost Button
Transparent button with `Deep Burgundy` text and a `Parchment Border` outline. On hover, use `Burgundy Wash` as background.

### Pill Tag
Pill with `Warm Gold Surface` (`#fcd17d`) background and `Deep Burgundy` text. Use this for credentials, practice areas, status labels and small filters.

### Navigation Item Button
White or `Aged Ivory` background with `Deep Burgundy` text. Active navigation can use `Warm Gold Surface`; primary nav CTA uses `Legal Rose`.

### Card Surface
Default card uses `Raised White` background, `Parchment Border` border, 4px radius and subtle shadow. Cards on dark sections can use `Deep Wine Surface` with `Heritage Gold` text.

### Text Input Field
Inputs use `Raised White` background, `Parchment Border` border and `Graphite Text` content. Focus state uses `Gold Focus` outline plus a darker `Deep Burgundy` border.

## Do's and Don'ts

### Do
- Use `#5d0809` for headings, structural brand text and strong dividers.
- Use `#cc3366` only for clear interactive emphasis: primary CTA, active link, selected state.
- Use `#fcd17d` as a warm supporting surface, not as body text on white.
- Use `#e4e0b4` for text on dark backgrounds, especially over `#000000` and `#5d0809`.
- Keep spacing generous and radii restrained at 4px, matching the original Anchor structure.
- Use `#333333` for long paragraphs when burgundy would feel too heavy.

### Don't
- Do not use `#cc3366` as broad background across full sections; reserve it for action and emphasis.
- Do not place `#5d0809` text over `#000000`; use `#e4e0b4` or `#ffffff` instead.
- Do not use `#fcd17d` behind large blocks of white text; contrast is too weak for accessibility.
- Do not introduce blue, purple or green accents unless a separate status system is required.
- Do not replace all light backgrounds with black; the system still needs raised white content for readability.

## Layout

The page should remain contained and editorial: large heading on a light or dark brand surface, strong whitespace, two-column sections and elevated cards. Use `Black Canvas` for hero/footer or premium institutional bands, then return to `Raised White`, `Aged Ivory` and `Burgundy Wash` for content-heavy sections.

## Quick Start

### CSS Custom Properties

```css
:root {
  --color-text-primary: #5d0809;
  --color-text-secondary: #cc3366;
  --color-text-tertiary: #333333;
  --color-text-inverse: #e4e0b4;
  --color-surface-base: #000000;
  --color-surface-muted: #fcd17d;
  --color-surface-raised: #ffffff;

  --color-surface-soft: #fbf6e7;
  --color-border-subtle: #e8d7ac;
  --color-surface-wash: #f3e5df;
  --color-surface-dark-muted: #210304;
  --color-action-hover: #b52b58;
  --color-focus-ring: #f7b84b;

  --font-archivo: 'Archivo', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  --text-caption: 11px;
  --leading-caption: 1.5;
  --tracking-caption: 0.06em;
  --text-body: 16px;
  --leading-body: 1.5;
  --text-subheading: 18px;
  --leading-subheading: 1.4;
  --text-heading-sm: 36px;
  --leading-heading-sm: 1.2;
  --text-heading: 44px;
  --leading-heading: 1.1;
  --text-heading-lg: 52px;
  --leading-heading-lg: 1;
  --text-display: 68px;
  --leading-display: 0.9;

  --font-weight-regular: 400;
  --font-weight-semibold: 600;

  --spacing-unit: 4px;
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --spacing-40: 40px;
  --spacing-48: 48px;
  --spacing-64: 64px;
  --spacing-80: 80px;
  --spacing-120: 120px;
  --spacing-128: 128px;

  --section-gap: 196px;
  --card-padding: 24px;
  --element-gap: 24px;

  --radius-md: 4px;
  --radius-full: 4800px;
  --radius-pill: 4800px;
  --radius-buttons: 4px;
  --radius-default: 4px;
  --radius-navigation: 4px;

  --shadow-subtle: rgba(0,0,0,0.01) 0px 4px 1px 0px, rgba(0,0,0,0.04) 0px 2px 1px 0px, rgba(0,0,0,0.06) 0px 1px 1px 0px;
}
```

### Tailwind v4

```css
@theme {
  --color-text-primary: #5d0809;
  --color-text-secondary: #cc3366;
  --color-text-tertiary: #333333;
  --color-text-inverse: #e4e0b4;
  --color-surface-base: #000000;
  --color-surface-muted: #fcd17d;
  --color-surface-raised: #ffffff;
  --color-surface-soft: #fbf6e7;
  --color-border-subtle: #e8d7ac;
  --color-surface-wash: #f3e5df;
  --color-surface-dark-muted: #210304;
  --color-action-hover: #b52b58;
  --color-focus-ring: #f7b84b;

  --font-archivo: 'Archivo', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  --text-caption: 11px;
  --leading-caption: 1.5;
  --tracking-caption: 0.06em;
  --text-body: 16px;
  --leading-body: 1.5;
  --text-subheading: 18px;
  --leading-subheading: 1.4;
  --text-heading-sm: 36px;
  --leading-heading-sm: 1.2;
  --text-heading: 44px;
  --leading-heading: 1.1;
  --text-heading-lg: 52px;
  --leading-heading-lg: 1;
  --text-display: 68px;
  --leading-display: 0.9;

  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --spacing-40: 40px;
  --spacing-48: 48px;
  --spacing-64: 64px;
  --spacing-80: 80px;
  --spacing-120: 120px;
  --spacing-128: 128px;

  --radius-md: 4px;
  --radius-full: 4800px;
  --shadow-subtle: rgba(0,0,0,0.01) 0px 4px 1px 0px, rgba(0,0,0,0.04) 0px 2px 1px 0px, rgba(0,0,0,0.06) 0px 1px 1px 0px;
}
```