import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMyServices } from '../api/services';
import { getNotifications, markAllNotificationsAsRead } from '../api/notifications';
import EmptyState from '../components/common/EmptyState';
import LoadingSpinner from '../components/common/LoadingSpinner';

const statusMap = {
  PENDING: 'warning',
  APPROVED: 'success',
  REJECTED: 'danger',
};

const notificationColorMap = {
  SERVICE_APPROVED: 'success',
  SERVICE_REJECTED: 'warning',
  SERVICE_DELETED: 'danger',
};

function MyServices() {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const unreadServiceNotifications = notifications.filter(
    (notification) =>
      !notification.read_at &&
      ['SERVICE_APPROVED', 'SERVICE_REJECTED', 'SERVICE_DELETED'].includes(notification.type)
  );

  // En una sola carga traemos servicios y avisos de moderación para esta vista.
  useEffect(() => {
    const loadData = async () => {
      try {
        const [servicesResponse, notificationsResponse] = await Promise.all([
          getMyServices(),
          getNotifications(),
        ]);

        setServices(servicesResponse.data?.data || servicesResponse.data || []);
        setNotifications(notificationsResponse.data?.data || notificationsResponse.data || []);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Marcamos los avisos de moderación como leídos también en estado local.
  const handleMarkNotificationsAsRead = async () => {
    await markAllNotificationsAsRead();

    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        read_at: notification.read_at || new Date().toISOString(),
      }))
    );
  };

  if (loading) return <LoadingSpinner text="Cargando tus servicios..." />;

  return (
    <section className="py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="fw-bold">Mis servicios</h1>
            <p className="text-muted">Gestiona el estado y visibilidad de tus publicaciones.</p>
          </div>

          <button className="btn btn-primary" onClick={() => navigate('/create-service')}>
            + Nuevo servicio
          </button>
        </div>

        {unreadServiceNotifications.length > 0 && (
          <div className="card border-0 shadow-soft rounded-4 p-4 mb-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
              <div>
                <h5 className="fw-bold mb-1">Avisos de moderación</h5>
                <p className="text-muted small mb-0">
                  Tienes novedades sobre tus servicios publicados.
                </p>
              </div>

              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={handleMarkNotificationsAsRead}
              >
                Marcar como leído
              </button>
            </div>

            <div className="d-grid gap-2">
              {unreadServiceNotifications.map((notification) => (
                <div
                  className={`alert alert-${notificationColorMap[notification.type] || 'info'} mb-0`}
                  key={notification.id}
                >
                  <strong>{notification.title}</strong>
                  <div className="small mt-1">{notification.message}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {services.length > 0 ? (
          <div className="card border-0 shadow-soft rounded-4 p-4">
            <h5 className="fw-bold mb-4">Tus servicios</h5>

            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Tipo</th>
                    <th>Estado moderación</th>
                    <th>Activo</th>
                    <th className="text-end">Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {services.map((service) => (
                    <tr key={service.id}>
                      <td>
                        <div className="fw-semibold">{service.title}</div>
                        <small className="text-muted">{service.location || 'Sin localización'}</small>
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
                          <Link
                            className="btn btn-outline-primary"
                            to={`/edit-service/${service.id}`}
                            title="Editar servicio"
                          >
                            <i className="bi bi-pencil-square" />
                          </Link>

                          {service.moderation_status === 'APPROVED' && service.is_active && (
                            <Link
                              className="btn btn-outline-secondary"
                              to={`/services/${service.id}`}
                              title="Ver publicación"
                            >
                              <i className="bi bi-eye" />
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <EmptyState
            title="Aún no tienes servicios"
            description="Publica tu primera oferta o solicitud para comenzar a intercambiar."
          />
        )}
      </div>
    </section>
  );
}

export default MyServices;