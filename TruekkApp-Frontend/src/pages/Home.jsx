import { useEffect, useMemo, useState } from "react";
import {
  getCategories,
  getPublicServices,
  getRecommendations,
  getTopServices,
} from "../api/services";
import { useAuth } from "../context/AuthContext";

import HeroSection from "../components/layout/HeroSection";
import SectionTitle from "../components/common/SectionTitle";
import ServiceCard from "../components/common/ServiceCard";
import EmptyState from "../components/common/EmptyState";
import LoadingSpinner from "../components/common/LoadingSpinner";

const initialFilters = {
  search: "",
  category_id: "",
  type: "",
  location: "",
};

function Home() {
  const { isAuthenticated } = useAuth();

  const [services, setServices] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [categories, setCategories] = useState([]);

  const [filters, setFilters] = useState(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);

  const [loading, setLoading] = useState(true);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);

  const hasActiveFilters = useMemo(
    () => Object.values(appliedFilters).some(Boolean),
    [appliedFilters],
  );

  // Carga principal del marketplace con filtros limpios para no enviar campos vacíos.
  const loadServices = async (params = appliedFilters) => {
    try {
      setLoading(true);

      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([, value]) => value !== ""),
      );

      const response = await getPublicServices(cleanParams);
      setServices(response.data?.data || response.data || []);
    } finally {
      setLoading(false);
    }
  };

  // Recomendaciones personalizadas solo para usuarios autenticados.
  const loadRecommendations = async () => {
    try {
      setLoadingRecommendations(true);

      const response = await getRecommendations();
      setRecommendations(response.data?.recommendations || []);
    } catch {
      setRecommendations([]);
    } finally {
      setLoadingRecommendations(false);
    }
  };

  // Primera carga: categorías + servicios públicos, y recomendaciones si hay sesión.
  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data?.data || res.data || []))
      .catch(() => setCategories([]));

    loadServices(initialFilters);

    if (isAuthenticated) {
      loadRecommendations();
    }
  }, [isAuthenticated]);

  const handleChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAppliedFilters(filters);
    loadServices(filters);
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
    setAppliedFilters(initialFilters);
    loadServices(initialFilters);
  };

  const [topServices, setTopServices] = useState([]);

  useEffect(() => {
    const loadTop = async () => {
      try {
        const res = await getTopServices();
        setTopServices(res.data?.data || res.data || []);
      } catch (e) {
        console.error(e);
      }
    };

    loadTop();
  }, []);

  return (
    <>
      <HeroSection />

      <section className="py-5">
        <div className="container">
          <SectionTitle
            icon="bi-trophy"
            kicker="Ranking"
            title="Servicios mejor valorados"
            subtitle="Los usuarios con mejor reputación en la comunidad"
          />

          {topServices.length === 0 ? (
            <p className="text-muted">Aún no hay valoraciones.</p>
          ) : (
            <div className="row g-4">
              {topServices.slice(0, 3).map((service, index) => (
                <div className="col-md-4" key={service.id}>
                  <div className="position-relative">
                    {/* MEDALLA 🔥 */}
                    <span
                      className={`badge position-absolute top-0 start-0 m-2 ${
                        index === 0
                          ? "bg-warning"
                          : index === 1
                            ? "bg-secondary"
                            : "bg-danger"
                      }`}
                    >
                      #{index + 1}
                    </span>

                    <ServiceCard service={service} />

                    {/* RATING */}
                    <div className="mt-2 text-warning fw-bold small">
                      ⭐ {service.avg_rating?.toFixed(1) || "0"}
                      <span className="text-muted ms-1">
                        ({service.reviews_count || 0})
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 🧠 RECOMENDACIONES */}
      {isAuthenticated && (
        <section className="py-5">
          <div className="container">
            <div className="mb-4">
              <h3 className="fw-bold mb-1">Recomendado para ti</h3>
              <p className="text-muted mb-0">
                Basado en tus servicios, ubicación y actividad en la plataforma
              </p>
            </div>

            {loadingRecommendations ? (
              <LoadingSpinner text="Cargando recomendaciones..." />
            ) : recommendations.length === 0 ? (
              <EmptyState
                title="Aún no tenemos recomendaciones"
                description="Crea algunos servicios o interactúa para mejorar las sugerencias."
                icon="bi-stars"
              />
            ) : (
              <div className="row g-4">
                {recommendations.map((service) => (
                  <div className="col-md-6 col-xl-4" key={service.id}>
                    <ServiceCard service={service} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 🔍 MARKETPLACE */}
      <section id="marketplace" className="py-5 bg-soft">
        <div className="container">
          {/* HEADER */}
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <h2 className="fw-bold mb-1">Explorar servicios</h2>
              <p className="text-muted mb-0">
                Encuentra lo que necesitas o descubre nuevas oportunidades
              </p>
            </div>

            {hasActiveFilters && (
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={handleClearFilters}
              >
                Limpiar filtros
              </button>
            )}
          </div>

          {/* 🔎 FILTROS */}
          <form
            className="card border-0 shadow-soft rounded-4 p-4 mb-4"
            onSubmit={handleSubmit}
          >
            <div className="row g-3">
              <div className="col-12">
                <input
                  className="form-control form-control-lg"
                  placeholder="Buscar servicios..."
                  value={filters.search}
                  onChange={(e) => handleChange("search", e.target.value)}
                />
              </div>

              <div className="col-md-4">
                <select
                  className="form-select"
                  value={filters.category_id}
                  onChange={(e) => handleChange("category_id", e.target.value)}
                >
                  <option value="">Todas las categorías</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <select
                  className="form-select"
                  value={filters.type}
                  onChange={(e) => handleChange("type", e.target.value)}
                >
                  <option value="">Todos</option>
                  <option value="OFFER">Ofertas</option>
                  <option value="REQUEST">Solicitudes</option>
                </select>
              </div>

              <div className="col-md-4">
                <input
                  className="form-control"
                  placeholder="Ubicación"
                  value={filters.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                />
              </div>

              <div className="col-12 text-end">
                <button className="btn btn-primary px-4">Buscar</button>
              </div>
            </div>
          </form>

          {/* RESULTADOS */}
          {loading ? (
            <LoadingSpinner text="Cargando servicios..." />
          ) : services.length === 0 ? (
            <EmptyState
              title="No hay resultados"
              description="Prueba con otros filtros o crea el primer servicio."
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
    </>
  );
}

export default Home;
