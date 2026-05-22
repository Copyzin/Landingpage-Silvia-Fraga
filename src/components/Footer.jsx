import { Link } from 'react-router-dom'
import {
  InstagramLogo,
  ArrowSquareOut,
  EnvelopeSimple,
  Phone,
} from '@phosphor-icons/react'
import { CONTATO } from '../constants/contact'
import './Footer.css'

const ANO = new Date().getFullYear()

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          {/* Coluna 1 — Brand */}
          <div className="site-footer__brand">
            <Link to="/" className="site-footer__logo-link" aria-label="Início">
              <img src="/logo.png" alt="" className="site-footer__logo" />
              <span className="site-footer__wordmark">Silvia Fraga</span>
            </Link>
            <p className="site-footer__sobre">
              Escritório de advocacia e consultoria jurídica com atuação em
              direito tributário no agro, sucessório, fundiário e empresarial
              rural. Atendimento institucional em Campinas e São Paulo.
            </p>
          </div>

          {/* Coluna 2 — Navegação */}
          <div className="site-footer__col">
            <h4 className="site-footer__col-title">Sobre</h4>
            <ul className="site-footer__list">
              <li><a href="/#especialidades">Especialidades</a></li>
              <li><a href="/#publicacoes">Publicações</a></li>
              <li><a href="/#visite-nos">Visite-nos</a></li>
              <li><a href="/#contato">Contato</a></li>
            </ul>
          </div>

          {/* Coluna 3 — Contato */}
          <div className="site-footer__col">
            <h4 className="site-footer__col-title">Contato</h4>
            <ul className="site-footer__list">
              <li>
                <a href={CONTATO.emailUrl} className="site-footer__link-icon">
                  <EnvelopeSimple size={14} weight="light" />
                  <span>{CONTATO.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={CONTATO.whatsappMessageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-footer__link-icon"
                >
                  <Phone size={14} weight="light" />
                  <span>{CONTATO.telefoneDisplay}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 4 — Sedes */}
          <div className="site-footer__col">
            <h4 className="site-footer__col-title">Sedes</h4>
            <ul className="site-footer__list site-footer__list--sedes">
              {CONTATO.sedes.map((sede) => (
                <li key={sede.cidade}>
                  <a
                    href={sede.mapsSearch}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="site-footer__sede-link"
                  >
                    <span className="site-footer__sede-cidade">
                      {sede.cidade}
                    </span>
                    <span className="site-footer__sede-end">
                      {sede.endereco}
                    </span>
                    <ArrowSquareOut size={12} weight="light" className="site-footer__sede-out" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 5 — Redes */}
          <div className="site-footer__col">
            <h4 className="site-footer__col-title">Redes</h4>
            <ul className="site-footer__list">
              <li>
                <a
                  href={CONTATO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-footer__link-icon"
                >
                  <InstagramLogo size={14} weight="light" />
                  <span>Instagram</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="hairline hairline--gold site-footer__divider" />

        <div className="site-footer__legal">
          <span>© {ANO} Silvia Fraga Advocacia. Todos os direitos reservados.</span>
          <span className="site-footer__credit">
            Site por{' '}
            <a
              href={CONTATO.parceiroSiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer__credit-link"
            >
              {CONTATO.parceiroSiteNome}
              <ArrowSquareOut size={11} weight="light" />
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
