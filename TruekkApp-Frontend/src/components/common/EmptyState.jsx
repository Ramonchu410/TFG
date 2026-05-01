function EmptyState({ title = 'Sin resultados', description = 'No hay información para mostrar.', icon = 'bi-inbox' }) {
  return (
    <div className="text-center py-5 bg-white rounded-4 border">
      <i className={`bi ${icon} fs-1 text-primary`} />
      <h5 className="fw-bold mt-3">{title}</h5>
      <p className="text-muted mb-0">{description}</p>
    </div>
  );
}

export default EmptyState;
