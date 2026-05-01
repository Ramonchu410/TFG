const moderationMap = {
  PENDING: 'warning',
  APPROVED: 'success',
  REJECTED: 'danger'
};

function MyServicesList({ services }) {
  return (
    <div className="card border-0 shadow-soft rounded-4">
      <div className="card-header bg-transparent border-0 pt-4 px-4">
        <h5 className="fw-bold mb-0">Tus servicios</h5>
      </div>
      <div className="table-responsive p-4">
        <table className="table align-middle mb-0">
          <thead>
            <tr>
              <th>Título</th>
              <th>Tipo</th>
              <th>Estado moderación</th>
              <th>Activo</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td className="fw-semibold">{service.title}</td>
                <td><span className="badge text-bg-light">{service.type}</span></td>
                <td>
                  <span className={`badge text-bg-${moderationMap[service.moderation_status] || 'secondary'}`}>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyServicesList;
