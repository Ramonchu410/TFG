import { useEffect, useState } from 'react';
import { getSavedServices } from '../api/savedServices';
import ServiceCard from '../components/common/ServiceCard';
import EmptyState from '../components/common/EmptyState';
import LoadingSpinner from '../components/common/LoadingSpinner';

function SavedServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSavedServices()
      .then((res) => setServices(res.data?.data || res.data || []))
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner text="Cargando servicios guardados..." />;

  return (
    <section className="py-5">
      <div className="container">
        <div className="mb-4">
          <p className="text-uppercase text-primary small fw-bold mb-1">
            Tu colección
          </p>
          <h1 className="fw-bold mb-1">Servicios guardados</h1>
          <p className="text-muted mb-0">
            Accede rápidamente a los servicios que te interesan para futuros trueques.
          </p>
        </div>

        {services.length === 0 ? (
          <EmptyState
            title="No tienes servicios guardados"
            description="Cuando encuentres un servicio interesante, guárdalo para verlo más tarde."
            icon="bi-bookmark-heart"
          />
        ) : (
          <div className="row g-4">
            {services.map((service) => (
              <div className="col-md-6 col-xl-4" key={service.id}>
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default SavedServices;