// Asset pipeline: converte imagens pesadas de public/ para WebP (com cap de
// dimensao) e encolhe o favicon. One-off, mas reutilizavel ao adicionar imagens.
// Rodar: node scripts/optimize-images.mjs  (precisa de `sharp` em devDeps)
//
// Estrategia: WebP q~80 (foto) / q~85 (decorativo com alpha + bordas nitidas),
// cap de largura para nao guardar resolucoes absurdas. Nao apaga os originais —
// a remocao e feita depois, manualmente, apos atualizar as referencias.
import sharp from 'sharp'
import { stat } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUB = resolve(__dirname, '..', 'public')

// { arquivo, qualidade, larguraMax }
const TO_WEBP = [
  ['sede-sp-interior.png', 80, 1920],
  ['sede-campinas-interior.png', 80, 1920],
  ['sede-sp-fachada.jpg', 80, 1600],
  ['sede-campinas-fachada.jpg', 80, 1600],
  ['plantas/close-up-plant-leaves.png', 82, 1600],
  ['plantas/flor-branca.png', 88, 1400], // hero: bordas nitidas + alpha
  ['plantas/planta-contato.png', 84, 1200],
  ['plantas/vazo-planta.png', 84, 1200],
  ['logo-hero-branca.png', 90, 900], // LCP mobile + alpha
  ['publicacoes/funrural.jpg', 78, 1600],
  ['publicacoes/holding.jpg', 78, 1600],
  ['publicacoes/usucapiao.jpg', 78, 1600],
  ['publicacoes/execucao.jpg', 78, 1600],
  ['publicacoes/itr-car.jpg', 78, 1600],
]

const kb = (n) => (n / 1024).toFixed(1).padStart(8) + ' KB'

let beforeTotal = 0
let afterTotal = 0

for (const [rel, quality, maxW] of TO_WEBP) {
  const src = join(PUB, rel)
  const out = src.replace(/\.(png|jpe?g)$/i, '.webp')
  const before = (await stat(src)).size
  const meta = await sharp(src).metadata()
  let pipe = sharp(src)
  if (meta.width && meta.width > maxW) pipe = pipe.resize({ width: maxW, withoutEnlargement: true })
  await pipe.webp({ quality, effort: 6 }).toFile(out)
  const after = (await stat(out)).size
  beforeTotal += before
  afterTotal += after
  console.log(`${kb(before)} -> ${kb(after)}  (${meta.width}px, q${quality})  ${rel}`)
}

// Favicon: 502KB -> 64x64 PNG (sobrescreve, mantem a referencia .png)
{
  const fav = join(PUB, 'favicon.png')
  const before = (await stat(fav)).size
  const buf = await sharp(fav).resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png({ compressionLevel: 9 }).toBuffer()
  await sharp(buf).toFile(fav)
  const after = (await stat(fav)).size
  beforeTotal += before
  afterTotal += after
  console.log(`${kb(before)} -> ${kb(after)}  favicon.png (64x64)`)
}

console.log(`\nTOTAL: ${kb(beforeTotal)} -> ${kb(afterTotal)}  (economia ${kb(beforeTotal - afterTotal)})`)
