import { useEffect, useLayoutEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../sections/Hero'
import Especialidades from '../sections/Especialidades'
import Publicacoes from '../sections/Publicacoes'
import VisiteNos from '../sections/VisiteNos'
import Contato from '../sections/Contato'
import './Home.css'

function Home() {
  const location = useLocation()
  const { hash } = location
  const fromEsp = location.state?.fromEsp === true
  const [enter, setEnter] = useState(false)

  // When arriving from an Especialidade page: jump to Hero synchronously
  // (before paint) so the fade-in starts at the top — not mid-page.
  useLayoutEffect(() => {
    if (fromEsp) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      setEnter(true)
    }
  }, [fromEsp])

  // Smooth scroll to anchors when arriving with a hash
  useEffect(() => {
    if (!hash) return
    const id = hash.replace('#', '')
    const el = document.getElementById(id)
    if (!el) return
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [hash])

  return (
    <div className={'home-root' + (enter ? ' home-root--enter' : '')}>
      <Hero />
      <Especialidades />
      <Publicacoes />
      <VisiteNos />
      <Contato />
    </div>
  )
}

export default Home
