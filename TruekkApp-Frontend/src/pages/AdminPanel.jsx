import { useEffect, useMemo, useState } from 'react';
import EmptyState from '../components/common/EmptyState';
import {
  approveService,
  deleteAdminService,
  getAdminServices,
  rejectService,
} from '../api/services';
import { blockUser, getAdminUsers, verifyUser } from '../api/users';

const statusMap = {
  PENDING: 'warning',
  APPROVED: 'success',
  REJECTED: 'danger',
};

const userStatusMap = {
  VERIFIED: 'success',
  BLOCKED: 'danger',
  PENDING: 'secondary',
};

function AdminPanel() {
  const [services, setServices] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('services');
  const [filter, setFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Carga inicial del panel: servicios para moderación y listado de usuarios.
  const loadAdminData = async () => {
    try {
      setLoading(true);
      setMessage('');

      const [servicesResponse, usersResponse] = await Promise.all([
        getAdminServices(),
        getAdminUsers(),
      ]);

      setServices(servicesResponse.data?.data || servicesResponse.data || []);
      setUsers(usersResponse.data?.data || usersResponse.data || []);
    } catch (error) {
      console.error(error);
      setMessage('No se pudieron cargar los datos de administración.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const filteredServices = useMemo(() => {
    if (filter === 'ALL') return services;
    return services.filter((service) => service.moderation_status === filter);
  }, [services, filter]);

  const stats = {
    total: services.length,
    pending: services.filter((s) => s.moderation_status === 'PENDING').length,
    approved: services.filter((s) => s.moderation_status === 'APPROVED').length,
    rejected: services.filter((s) => s.moderation_status === 'REJECTED').length,
    users: users.length,
  };

  const handleApprove = async (id) => {
    try {
      await approveService(id);
      await loadAdminData();
    } catch (error) {
      console.error(error);
      setMessage('No se pudo aprobar el servicio.');
    }
  };

  const handleReject = async (id) => {
    const reason = window.prompt('Motivo del rechazo:', 'No cumple las políticas de publicación.');

    if (!reason) return;

    try {
      await rejectService(id, reason);
      await loadAdminData();
    } catch (error) {
      console.error(error);
      setMessage('No se pudo rechazar el servicio.');
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('¿Seguro que quieres eliminar este servicio?');

    if (!confirmDelete) return;

    try {
      await deleteAdminService(id);
      await loadAdminData();
    } catch (error) {
      console.error(error);
      setMessage('No se pudo eliminar el servicio.');
    }
  };

  const handleVerifyUser = async (id) => {
    try {
      const response = await verifyUser(id);
      const updatedUser = response.data?.user;

      setUsers((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, ...updatedUser } : user
        )
      );

      setMessage(response.data?.message || 'Usuario verificado correctamente.');
    } catch (error) {
      console.error(error);
      setMessage('No se pudo verificar el usuario.');
    }
  };

  const handleBlockUser = async (id) => {
    const confirmBlock = window.confirm(
      '¿Seguro que quieres bloquear este usuario? No podrá publicar servicios ni solicitar trueques.'
    );

    if (!confirmBlock) return;

    try {
      const response = await blockUser(id);
      const updatedUser = response.data?.user;

      setUsers((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, ...updatedUser } : user
        )
      );

      setMessage(response.data?.message || 'Usuario bloqueado correctamente.');
    } catch (error) {
      console.error(error);
      setMessage('No se pudo bloquear el usuario.');
    }
  };

  return (
    <section className="py-5 admin-zone">
      <div className="container">
        <div className="admin-banner rounded-4 p-4 p-lg-5 mb-4">
          <p className="text-uppercase small fw-semibold mb-2">Zona de administración</p>
          <h2 className="fw-bold mb-1">Panel de control</h2>
          <p className="text-muted mb-0">
            Gestiona servicios, usuarios y moderación del marketplace.
          </p>
        </div>

        {message && <div className="alert alert-warning">{message}</div>}

        <div className="row g-3 mb-4">
          <StatCard title="Servicios totales" value={stats.total} icon="bi-grid" color="primary" />
          <StatCard title="Pendientes" value={stats.pending} icon="bi-hourglass-split" color="warning" />
          <StatCard title="Aprobados" value={stats.approved} icon="bi-check-circle" color="success" />
          <StatCard title="Rechazados" value={stats.rejected} icon="bi-x-circle" color="danger" />
          <StatCard title="Usuarios" value={stats.users} icon="bi-people" color="dark" />
        </div>

        <div className="card border-0 shadow-soft rounded-4">
          <div className="card-header bg-transparent border-0 p-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
              <div className="btn-group">
                <button
                  className={`btn ${activeTab === 'services' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setActiveTab('services')}
                >
                  Servicios
                </button>

                <button
                  className={`btn ${activeTab === 'users' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setActiveTab('users')}
                >
                  Usuarios
                </button>
              </div>

              {activeTab === 'services' && (
                <select
                  className="form-select w-auto"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="ALL">Todos</option>
                  <option value="PENDING">Pendientes</option>
                  <option value="APPROVED">Aprobados</option>
                  <option value="REJECTED">Rechazados</option>
                </select>
              )}
            </div>
          </div>

          <div className="card-body p-4">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" />
                <p className="text-muted mt-3 mb-0">Cargando administración...</p>
              </div>
            ) : activeTab === 'services' ? (
              filteredServices.length === 0 ? (
                <EmptyState
                  title="No hay servicios"
                  description="No se han encontrado servicios para este filtro."
                  icon="bi-shield-check"
                />
              ) : (
                <ServicesAdminTable
                  services={filteredServices}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  onDelete={handleDelete}
                />
              )
            ) : users.length === 0 ? (
              <EmptyState
                title="No hay usuarios"
                description="Todavía no existen usuarios registrados."
                icon="bi-people"
              />
            ) : (
              <UsersAdminTable
                users={users}
                onVerify={handleVerifyUser}
                onBlock={handleBlockUser}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className="col-12 col-md-6 col-xl">
      <div className="card border-0 shadow-soft rounded-4 h-100">
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <p className="text-muted small mb-1">{title}</p>
            <h3 className="fw-bold mb-0">{value}</h3>
          </div>
          <i className={`bi ${icon} fs-2 text-${color}`} />
        </div>
      </div>
    </div>
  );
}

function ServicesAdminTable({ services, onApprove, onReject, onDelete }) {
  return (
    <div className="table-responsive">
      <table className="table align-middle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Servicio</th>
            <th>Usuario</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th>Activo</th>
            <th className="text-end">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>#{service.id}</td>

              <td>
                <div className="fw-semibold">{service.title}</div>
                <small className="text-muted">{service.location || 'Sin localización'}</small>
              </td>

              <td>
                <div>{service.user?.name || 'Usuario'}</div>
                <small className="text-muted">{service.user?.email}</small>
              </td>

              <td>
                <span className="badge text-bg-light">{service.type}</span>
              </td>

              <td>
                <span className={`badge text-bg-${statusMap[service.moderation_status] || 'secondary'}`}>
                  {service.moderation_status}
                </span>
              </td>

              <td>
                {service.is_active ? (
                  <span className="badge text-bg-success">Activo</span>
                ) : (
                  <span className="badge text-bg-secondary">Inactivo</span>
                )}
              </td>

              <td className="text-end">
                <div className="btn-group btn-group-sm">
                  {service.moderation_status !== 'APPROVED' && (
                    <button className="btn btn-outline-success" onClick={() => onApprove(service.id)}>
                      Aprobar
                    </button>
                  )}

                  {service.moderation_status !== 'REJECTED' && (
                    <button className="btn btn-outline-warning" onClick={() => onReject(service.id)}>
                      Rechazar
                    </button>
                  )}

                  <button className="btn btn-outline-danger" onClick={() => onDelete(service.id)}>
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UsersAdminTable({ users, onVerify, onBlock }) {
  return (
    <div className="table-responsive">
      <table className="table align-middle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Rol</th>
            <th>Estado</th>
            <th className="text-end">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>#{user.id}</td>

              <td>
                <div className="fw-semibold d-flex align-items-center gap-2">
                  <span>{user.name}</span>

                  {user.status === 'VERIFIED' && (
                    <i
                      className="bi bi-patch-check-fill text-primary"
                      title="Usuario verificado"
                    />
                  )}

                  {user.status === 'BLOCKED' && (
                    <i
                      className="bi bi-slash-circle-fill text-danger"
                      title="Usuario bloqueado"
                    />
                  )}
                </div>

                <small className="text-muted">{user.email}</small>
              </td>

              <td>
                <span className={`badge ${user.role === 'ADMIN' ? 'text-bg-warning' : 'text-bg-light'}`}>
                  {user.role}
                </span>
              </td>

              <td>
                <span className={`badge text-bg-${userStatusMap[user.status] || 'secondary'}`}>
                  {user.status || 'SIN ESTADO'}
                </span>
              </td>

              <td className="text-end">
                <div className="btn-group btn-group-sm">
                  <button
                    className="btn btn-outline-success"
                    onClick={() => onVerify(user.id)}
                    disabled={user.status === 'VERIFIED'}
                  >
                    Verificar
                  </button>

                  <button
                    className="btn btn-outline-danger"
                    onClick={() => onBlock(user.id)}
                    disabled={user.status === 'BLOCKED'}
                  >
                    Bloquear
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;