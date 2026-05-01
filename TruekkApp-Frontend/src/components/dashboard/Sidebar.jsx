import { NavLink } from 'react-router-dom';

const links = [
  { to: '/dashboard', icon: 'bi-speedometer2', label: 'Resumen' },
  { to: '/my-services', icon: 'bi-briefcase', label: 'Mis servicios' },
  { to: '/saved-services', icon: 'bi-bookmark-heart', label: 'Guardados' },
  { to: '/create-service', icon: 'bi-plus-circle', label: 'Crear servicio' },
];

function Sidebar() {
  return (
    <aside className="dashboard-sidebar p-3 rounded-4 h-100">
      <p className="text-uppercase small fw-semibold text-muted mb-3">Workspace</p>

      <nav className="nav flex-column gap-2">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} className="nav-link dashboard-link">
            <i className={`bi ${link.icon} me-2`} />
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;