import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import { getNotifications } from '../../api/notifications';

function MainNavbar() {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const navigate = useNavigate();

  const [unreadNotifications, setUnreadNotifications] = useState(0);

  useEffect(() => {
  const loadNotifications = async () => {
    try {
      if (!isAuthenticated) {
        setUnreadNotifications(0);
        return;
      }

      const response = await getNotifications();

      const notifications =
        response.data?.data || response.data || [];

      const unreadCount = notifications.filter(
        (notification) => !notification.read_at
      ).length;

      setUnreadNotifications(unreadCount);
    } catch (error) {
      console.error('No se pudieron cargar las notificaciones:', error);
    }
  };

  loadNotifications();

  //Escuchamos cambios globales.
  window.addEventListener('notificationsUpdated', loadNotifications);

  return () => {
    window.removeEventListener('notificationsUpdated', loadNotifications);
  };
}, [isAuthenticated]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top glass-nav py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
          <i className="bi bi-arrow-repeat brand-icon" />
          <span className="brand-gradient">TruekApp</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">

            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Inicio
              </NavLink>
            </li>

            {/* Evita render raro mientras carga */}
            {loading ? null : isAuthenticated ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/dashboard">
                    Dashboard
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/my-services">
                    Mis servicios
                  </NavLink>
                </li>

                {/* SOLO ADMIN */}
                {user?.role === 'ADMIN' && (
                  <li className="nav-item">
                    <NavLink
                      className="nav-link fw-semibold text-warning"
                      to="/admin"
                    >
                      <i className="bi bi-shield-lock me-1" />
                      Admin
                    </NavLink>
                  </li>
                )}

                {/* Campana notificaciones */}
                <li className="nav-item ms-lg-2">
                  <Link
                    to="/my-services"
                    className="position-relative text-decoration-none text-dark d-flex align-items-center justify-content-center"
                    title="Notificaciones"
                    style={{
                      width: '38px',
                      height: '38px',
                    }}
                  >
                    <i className="bi bi-bell fs-5" />

                    {unreadNotifications > 0 && (
                      <span
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                        style={{
                          fontSize: '0.65rem',
                        }}
                      >
                        {unreadNotifications}
                      </span>
                    )}
                  </Link>
                </li>

                {/* Usuario clickable con avatar */}
                <li className="nav-item">
                  <Link
                    to={`/users/${user?.id}`}
                    className="badge text-bg-light user-badge text-decoration-none text-dark d-inline-flex align-items-center gap-2"
                  >
                    {user?.avatar_url ? (
                      <img
                        src={user.avatar_url}
                        alt={user?.name || 'Usuario'}
                        className="rounded-circle"
                        style={{
                          width: 20,
                          height: 20,
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      <i className="bi bi-person-circle" />
                    )}

                    {user?.name || 'Usuario'}
                  </Link>
                </li>

                {/* Logout */}
                <li className="nav-item">
                  <button
                    className="btn btn-outline-dark btn-sm ms-lg-2"
                    onClick={handleLogout}
                  >
                    Salir
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Entrar
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className="btn btn-primary ms-lg-2 px-3"
                    to="/register"
                  >
                    Empieza gratis
                  </NavLink>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default MainNavbar;