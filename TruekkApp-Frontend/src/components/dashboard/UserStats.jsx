function UserStats({ stats }) {
  const cards = [
    { label: 'Servicios activos', value: stats.active, icon: 'bi-lightning-charge', color: 'primary' },
    { label: 'Pendientes revisión', value: stats.pending, icon: 'bi-hourglass-split', color: 'warning' },
    { label: 'Trueques abiertos', value: stats.tradeRequests, icon: 'bi-arrow-left-right', color: 'success' }
  ];

  return (
    <div className="row g-3">
      {cards.map((card) => (
        <div className="col-md-4" key={card.label}>
          <div className="card border-0 stats-card h-100">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <p className="text-muted mb-1 small">{card.label}</p>
                <h3 className="fw-bold mb-0">{card.value}</h3>
              </div>
              <i className={`bi ${card.icon} fs-3 text-${card.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserStats;
