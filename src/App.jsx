import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppFloating from './components/WhatsAppFloating'
import Home from './pages/Home'
import EspecialidadeLayout from './pages/especialidades/EspecialidadeLayout'

function App() {
  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/especialidades/:slug"
            element={<EspecialidadeLayout />}
          />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFloating />
    </>
  )
}

export default App
