import { CONTATO } from '../constants/contact'
import SedeCard from '../components/SedeCard'
import './VisiteNos.css'

function VisiteNos() {
  return (
    <section id="visite-nos" className="section visite-nos">
      <div className="container">
        <header className="visite-nos__header">
          <span className="eyebrow">03 — Visite-nos</span>
          <h2 className="visite-nos__title">
            Duas sedes prontas para <em>receber você</em>.
          </h2>
          <p className="visite-nos__lead">
            Atendimento presencial em Campinas e em São Paulo. Visite-nos
            para tratar o seu caso com a atenção que ele merece.
          </p>
        </header>

        <div className="visite-nos__grid">
          {CONTATO.sedes.map((sede) => (
            <SedeCard key={sede.cidade} sede={sede} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default VisiteNos
