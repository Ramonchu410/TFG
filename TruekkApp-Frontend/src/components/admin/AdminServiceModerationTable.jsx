import { useState } from 'react';

function AdminServiceModerationTable({ services, onApprove, onReject }) {
  const [reason, setReason] = useState({});

  return (
    <div className="card border-0 shadow-soft rounded-4">
      <div className="card-header bg-transparent border-0 px-4 pt-4">
        <h4 className="fw-bold mb-0">Moderación de servicios pendientes</h4>
      </div>
      <div className="table-responsive p-4">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Servicio</th>
              <th>Usuario</th>
              <th>Tipo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>
                  <p className="fw-semibold mb-0">{service.title}</p>
                  <small className="text-muted">{service.location}</small>
                </td>
                <td>{service.user?.name || `User ${service.user_id}`}</td>
                <td><span className="badge text-bg-light">{service.type}</span></td>
                <td>
                  <div className="d-grid gap-2">
                    <button className="btn btn-sm btn-success" onClick={() => onApprove(service.id)}>
                      <i className="bi bi-check-circle me-1" /> Aprobar
                    </button>
                    <input
                      className="form-control form-control-sm"
                      placeholder="Motivo de rechazo"
                      value={reason[service.id] || ''}
                      onChange={(e) => setReason((prev) => ({ ...prev, [service.id]: e.target.value }))}
                    />
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onReject(service.id, reason[service.id])}
                    >
                      <i className="bi bi-x-circle me-1" /> Rechazar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminServiceModerationTable;
