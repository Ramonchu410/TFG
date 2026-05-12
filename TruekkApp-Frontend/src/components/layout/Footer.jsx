import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer-shell mt-5 py-5">
      <div className="container">
        <div className="row g-4 align-items-start">
          {/* Marca */}
          <div className="col-md-4">
            <h5 className="fw-bold brand-gradient">TruekApp</h5>
            <p className="text-muted mb-3">
              Intercambia talento, crea comunidad y transforma tiempo en valor
              compartido.
            </p>

            <Link to="/create-service" className="btn btn-sm btn-primary">
              Publicar servicio
            </Link>
          </div>

          {/* Navegación */}
          <div className="col-md-4">
            <h6 className="fw-semibold mb-3">Navegación</h6>

            <ul className="list-unstyled small d-grid gap-2">
              <li>
                <Link to="/" className="footer-link">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/" className="footer-link">
                  Servicios
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="footer-link">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/my-services" className="footer-link">
                  Mis servicios
                </Link>
              </li>
              <li>
                <Link to="/admin" className="footer-link">
                  Administración
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="col-md-4">
            <h6 className="fw-semibold mb-3">Contacto</h6>

            <p className="text-muted small mb-2">
              <i className="bi bi-envelope me-2" />
              support@truekapp.local
            </p>

            <div className="d-flex gap-3 fs-5">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="footer-social"
              >
                <i className="bi bi-github" />
              </a>

              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="footer-social"
              >
                <i className="bi bi-linkedin" />
              </a>

              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noreferrer"
                className="footer-social"
              >
                <i className="bi bi-twitter-x" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4" />

        {/* Legal */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 small text-muted">
          <span>
            © {new Date().getFullYear()} TruekApp · TFG Plataforma de Trueque de
            Servicios
          </span>

          <div className="d-flex gap-3">
            <Link to="/privacy" className="footer-link">
              Privacidad
            </Link>
            <Link to="/terms" className="footer-link">
              Términos
            </Link>
            <Link to="/support" className="footer-link">
              Soporte
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
