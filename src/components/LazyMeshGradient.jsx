import { lazy, Suspense } from 'react'

/**
 * MeshGradient carregado sob demanda (code-splitting).
 *
 * @paper-design/shaders e uma lib WebGL pesada. Como o shader so e montado no
 * desktop (ver useShaderActivation), mante-la no bundle principal faz o mobile
 * baixar/parsear/executar codigo que nunca usa — inflando o tempo de JS critico
 * que trava o LCP. Em chunk separado, a lib so e buscada quando um MeshGradient
 * realmente monta (desktop). No mobile, nunca e baixada.
 *
 * Fallback null: ate o chunk carregar, aparece o gradiente CSS de fundo do
 * componente (ShaderButton/MaskedShaderIcon) — transicao suave, sem buraco.
 */
const MeshGradient = lazy(() =>
  import('@paper-design/shaders-react').then((m) => ({ default: m.MeshGradient }))
)

export default function LazyMeshGradient(props) {
  return (
    <Suspense fallback={null}>
      <MeshGradient {...props} />
    </Suspense>
  )
}
