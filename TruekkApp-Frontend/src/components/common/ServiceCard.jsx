import { Link } from 'react-router-dom';

function ServiceCard({ service }) {
  const isOffer = service?.type === 'OFFER';

  const typeLabel = isOffer ? 'Oferta' : 'Solicitud';

  const typeClass = isOffer
    ? 'bg-success text-white'
    : 'bg-primary text-white';

  const categoryName = service?.category?.name || 'Sin categoría';

  return (
    <article className="card service-card border-0 h-100">
      <div className="card-body d-flex flex-column p-4">
        
        {/* TOP BADGES */}
        <div className="d-flex justify-content-between align-items-start mb-3">
          <span className={`badge px-3 py-2 fw-semibold ${typeClass}`}>
            {typeLabel}
          </span>

          <span className="badge bg-light text-dark border">
            {categoryName}
          </span>
        </div>

        {/* TITLE */}
        <h5 className="fw-bold mb-2">{service?.title}</h5>

        {/* DESCRIPTION */}
        <p className="text-muted flex-grow-1">
          {service?.description
            ? `${service.description.slice(0, 100)}...`
            : 'Sin descripción'}
        </p>

        {/* FOOTER */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <small className="text-muted">
            <i className="bi bi-geo-alt me-1" />
            {service?.location || 'Remoto'}
          </small>

          <Link
            to={`/services/${service?.id}`}
            className="btn btn-sm btn-primary"
          >
            Ver detalle
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ServiceCard;