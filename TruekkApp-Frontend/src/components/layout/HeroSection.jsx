import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function HeroSection() {
  const { user, isAuthenticated } = useAuth();

  const isAdmin = user?.role === 'ADMIN';

  const heroContent = !isAuthenticated
    ? {
        badge: 'Comunidad · Colaboración · Confianza',
        title: 'Intercambia lo que sabes hacer y recibe lo que necesitas.',
        subtitle:
          'La plataforma donde tu talento tiene valor real. Publica servicios, conecta con personas y vive el trueque en formato digital.',
        primaryText: 'Empieza ahora',
        primaryTo: '/register',
        secondaryText: 'Ver servicios',
        secondaryTo: '#featured-services',
      }
    : isAdmin
      ? {
          badge: `Administración · ${user?.name || 'Admin'}`,
          title: 'Gestiona TruekApp con control, claridad y confianza.',
          subtitle:
            'Revisa servicios pendientes, administra usuarios y mantén la calidad del marketplace desde tu panel.',
          primaryText: 'Ir al panel admin',
          primaryTo: '/admin',
          secondaryText: 'Ver marketplace',
          secondaryTo: '#featured-services',
        }
      : {
          badge: `Bienvenido de nuevo · ${user?.name || 'Usuario'}`,
          title: 'Sigue intercambiando talento dentro de TruekApp.',
          subtitle:
            'Publica nuevos servicios, revisa tus propuestas y conecta con personas que necesitan lo que sabes hacer.',
          primaryText: 'Publicar servicio',
          primaryTo: '/create-service', // ✅ CORRECTA
          secondaryText: 'Mis servicios',
          secondaryTo: '/my-services', // ✅ CORRECTA
        };

  return (
    <section className="hero-section py-5 py-lg-6">
      <div className="container position-relative">
        <div className="row align-items-center g-5">
          <div className="col-lg-7">
            <span className="badge rounded-pill text-bg-light px-3 py-2 mb-3">
              {heroContent.badge}
            </span>

            <h1 className="display-4 fw-bold text-white lh-sm mb-3">
              {heroContent.title}
            </h1>

            <p className="lead text-white-50 mb-4">
              {heroContent.subtitle}
            </p>

            <div className="d-flex flex-wrap gap-2">
              <Link className="btn btn-light btn-lg px-4" to={heroContent.primaryTo}>
                {heroContent.primaryText}
              </Link>

              {heroContent.secondaryTo.startsWith('#') ? (
                <a
                  className="btn btn-outline-light btn-lg px-4"
                  href={heroContent.secondaryTo}
                >
                  {heroContent.secondaryText}
                </a>
              ) : (
                <Link
                  className="btn btn-outline-light btn-lg px-4"
                  to={heroContent.secondaryTo}
                >
                  {heroContent.secondaryText}
                </Link>
              )}
            </div>
          </div>

          <div className="col-lg-5">
            <div className="hero-card p-4 p-lg-5">
              {!isAuthenticated ? (
                <>
                  <h5 className="fw-bold mb-4">¿Cómo funciona?</h5>
                  <ul className="list-unstyled d-grid gap-3 mb-0">
                    <li><i className="bi bi-check2-circle text-success me-2" />Publica tu servicio</li>
                    <li><i className="bi bi-shield-check text-primary me-2" />Moderación por calidad</li>
                    <li><i className="bi bi-people text-warning me-2" />Solicita un trueque</li>
                    <li><i className="bi bi-stars text-info me-2" />Crea red y reputación</li>
                  </ul>
                </>
              ) : isAdmin ? (
                <>
                  <h5 className="fw-bold mb-4">Resumen rápido</h5>
                  <ul className="list-unstyled d-grid gap-3 mb-0">
                    <li><i className="bi bi-hourglass-split text-warning me-2" />Revisa servicios pendientes</li>
                    <li><i className="bi bi-check2-circle text-success me-2" />Aprueba publicaciones válidas</li>
                    <li><i className="bi bi-x-circle text-danger me-2" />Rechaza contenido incorrecto</li>
                    <li><i className="bi bi-people text-primary me-2" />Gestiona usuarios registrados</li>
                  </ul>
                </>
              ) : (
                <>
                  <h5 className="fw-bold mb-4">Tu espacio</h5>
                  <ul className="list-unstyled d-grid gap-3 mb-0">
                    <li><i className="bi bi-plus-circle text-success me-2" />Crea nuevos servicios</li>
                    <li><i className="bi bi-folder-check text-primary me-2" />Consulta tus publicaciones</li>
                    <li><i className="bi bi-arrow-left-right text-warning me-2" />Gestiona solicitudes de trueque</li>
                    <li><i className="bi bi-stars text-info me-2" />Construye reputación en la comunidad</li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;