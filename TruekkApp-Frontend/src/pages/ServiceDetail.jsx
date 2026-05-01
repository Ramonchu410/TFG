import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createTradeRequest } from "../api/tradeRequests";
import { getMyServices, getServiceById } from "../api/services";
import {
  checkSavedService,
  saveService,
  unsaveService,
} from "../api/savedServices";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/common/LoadingSpinner";

const getTypeData = (type) =>
  type === "OFFER"
    ? { label: "Oferta", color: "success", icon: "bi-stars" }
    : { label: "Solicitud", color: "primary", icon: "bi-search" };

const getModerationData = (status) => {
  const map = {
    APPROVED: { label: "Aprobado", color: "success", icon: "bi-check-circle" },
    PENDING: { label: "Pendiente", color: "warning", icon: "bi-hourglass-split" },
    REJECTED: { label: "Rechazado", color: "danger", icon: "bi-x-circle" },
  };

  return map[status] || {
    label: "Sin estado",
    color: "secondary",
    icon: "bi-info-circle",
  };
};

function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [service, setService] = useState(null);
  const [myServices, setMyServices] = useState([]);
  const [selectedOfferServiceId, setSelectedOfferServiceId] = useState("");
  const [tradeMessage, setTradeMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingMyServices, setLoadingMyServices] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showTradeBox, setShowTradeBox] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [savingService, setSavingService] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getServiceById(id);
        setService(response.data?.service || response.data?.data || response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Servicio no encontrado.");
        setService(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  useEffect(() => {
    if (!isAuthenticated || !id) return;

    checkSavedService(id)
      .then((res) => setIsSaved(Boolean(res.data?.saved)))
      .catch(() => setIsSaved(false));
  }, [id, isAuthenticated]);

  const isOwnService =
    isAuthenticated && Number(service?.user_id) === Number(user?.id);

  const availableMyServices = useMemo(() => {
    return myServices.filter(
      (item) =>
        Number(item.id) !== Number(service?.id) &&
        Boolean(item.is_active) &&
        item.moderation_status === "APPROVED"
    );
  }, [myServices, service]);

  const handleOpenTradeBox = async () => {
    if (!isAuthenticated) return;

    try {
      setMessage("");
      setLoadingMyServices(true);
      setShowTradeBox(true);

      const response = await getMyServices();
      const services = response.data?.data || response.data || [];

      setMyServices(services);

      const available = services.filter(
        (item) =>
          Number(item.id) !== Number(service?.id) &&
          Boolean(item.is_active) &&
          item.moderation_status === "APPROVED"
      );

      setSelectedOfferServiceId(
        available.length > 0 ? String(available[0].id) : ""
      );
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
          "No se pudieron cargar tus servicios disponibles."
      );
    } finally {
      setLoadingMyServices(false);
    }
  };

  const handleTradeRequest = async () => {
    try {
      setMessage("");

      if (!selectedOfferServiceId) {
        setMessage("Debes elegir qué servicio quieres ofrecer a cambio.");
        return;
      }

      await createTradeRequest({
        target_service_id: service.id,
        offer_service_id: Number(selectedOfferServiceId),
        message: tradeMessage || null,
      });

      setMessage(
        "Tu solicitud ha sido enviada correctamente. El usuario será notificado."
      );
      setShowTradeBox(false);
      setTradeMessage("");
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
          "No se pudo enviar la solicitud. Revisa tus servicios disponibles."
      );
    }
  };

  const handleToggleSave = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!service?.id) return;

    try {
      setSavingService(true);
      setMessage("");

      if (isSaved) {
        await unsaveService(service.id);
        setIsSaved(false);
        setMessage("Servicio eliminado de guardados.");
      } else {
        await saveService(service.id);
        setIsSaved(true);
        setMessage("Servicio guardado correctamente.");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "No se pudo actualizar guardados.");
    } finally {
      setSavingService(false);
    }
  };

  if (loading) return <LoadingSpinner text="Cargando detalle del servicio..." />;

  if (error || !service) {
    return (
      <section className="py-5">
        <div className="container">
          <div className="card border-0 shadow-soft rounded-4 p-5 text-center">
            <h2 className="fw-bold mb-2">Servicio no encontrado</h2>
            <p className="text-muted mb-4">
              Puede que el servicio no exista, esté pendiente de moderación o haya sido desactivado.
            </p>
            <button className="btn btn-primary" onClick={() => navigate("/")}>
              Volver al inicio
            </button>
          </div>
        </div>
      </section>
    );
  }

  const typeData = getTypeData(service.type);
  const moderationData = getModerationData(service.moderation_status);

  return (
    <section className="py-5 service-detail-section">
      <div className="container">
        <div className="mb-4">
          <Link to="/" className="text-decoration-none fw-semibold">
            ← Volver a servicios
          </Link>
        </div>

        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-soft rounded-4 overflow-hidden">
              <div className={`p-4 p-lg-5 border-start border-5 border-${typeData.color}`}>
                <div className="d-flex flex-wrap gap-2 mb-4">
                  <span className={`badge rounded-pill text-bg-${typeData.color} px-3 py-2`}>
                    <i className={`bi ${typeData.icon} me-1`} />
                    {typeData.label}
                  </span>

                  <span className={`badge rounded-pill text-bg-${moderationData.color} px-3 py-2`}>
                    <i className={`bi ${moderationData.icon} me-1`} />
                    {moderationData.label}
                  </span>

                  <span
                    className={`badge rounded-pill px-3 py-2 ${
                      service.is_active
                        ? "bg-success-subtle text-success border border-success-subtle"
                        : "bg-secondary-subtle text-secondary border border-secondary-subtle"
                    }`}
                  >
                    <i className={`bi ${service.is_active ? "bi-eye" : "bi-eye-slash"} me-1`} />
                    {service.is_active ? "Visible" : "Oculto"}
                  </span>
                </div>

                <p className="text-uppercase text-primary small fw-bold mb-2">
                  Servicio publicado
                </p>

                <h1 className="display-6 fw-bold mb-3">{service.title}</h1>

                <p className="text-muted fs-5 mb-4">
                  {service.description || "Este servicio no tiene descripción."}
                </p>

                <div className="row g-3">
                  <InfoBox
                    icon="bi-person-circle"
                    label="Usuario"
                    value={service.user?.name || `User ${service.user_id}`}
                  />

                  <InfoBox
                    icon="bi-geo-alt"
                    label="Localización"
                    value={service.location || "No especificada"}
                  />

                  <InfoBox
                    icon="bi-tags"
                    label="Categoría"
                    value={service.category?.name || "Sin categoría"}
                  />

                  <InfoBox
                    icon="bi-arrow-left-right"
                    label="Tipo de publicación"
                    value={typeData.label}
                  />
                </div>

                {message && (
                  <div className="alert alert-info mt-4 mb-0 rounded-4">
                    {message}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div
              className="card border-0 shadow-soft rounded-4 p-4 sticky-top"
              style={{ top: "90px" }}
            >
              <h5 className="fw-bold mb-3">Publicado por</h5>

              <Link
                to={`/users/${service.user?.id}`}
                className="d-flex align-items-center gap-3 mb-4 text-decoration-none user-link-block"
              >
                <div
                  className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold shadow-sm user-avatar"
                  style={{ width: 52, height: 52 }}
                >
                  {service.user?.name?.charAt(0)?.toUpperCase() || "?"}
                </div>

                <div>
                  <strong className="text-dark">
                    {service.user?.name || "Usuario"}
                  </strong>
                  <p className="text-muted small mb-0">Miembro de TruekApp</p>
                </div>
              </Link>

              {!isAuthenticated ? (
                <div className="border rounded-4 p-3 mb-3 bg-light">
                  <h6 className="fw-bold mb-2">¿Te interesa este servicio?</h6>

                  <p className="small text-muted mb-3">
                    Para solicitar un trueque necesitas iniciar sesión o crear una cuenta en TruekApp.
                  </p>

                  <div className="d-grid gap-2">
                    <Link className="btn btn-primary" to="/login">
                      Iniciar sesión
                    </Link>

                    <Link className="btn btn-outline-primary" to="/register">
                      Crear cuenta gratis
                    </Link>
                  </div>
                </div>
              ) : isOwnService ? (
                <div className="alert alert-info small mb-3 rounded-4">
                  Este servicio es tuyo. No puedes solicitar un trueque sobre tu propia publicación.
                </div>
              ) : !showTradeBox ? (
                <button
                  className="btn btn-primary w-100 mb-2 py-2 fw-semibold"
                  onClick={handleOpenTradeBox}
                >
                  <i className="bi bi-arrow-left-right me-2" />
                  Solicitar trueque
                </button>
              ) : (
                <div className="border rounded-4 p-3 mb-3 bg-light">
                  <h6 className="fw-bold mb-3">Elige qué ofreces a cambio</h6>

                  {loadingMyServices ? (
                    <div className="text-center py-3">
                      <div className="spinner-border spinner-border-sm text-primary" />
                      <p className="small text-muted mt-2 mb-0">
                        Cargando tus servicios...
                      </p>
                    </div>
                  ) : availableMyServices.length === 0 ? (
                    <div>
                      <div className="alert alert-warning small mb-3 rounded-4">
                        No tienes ningún servicio activo y aprobado para ofrecer a cambio.
                      </div>

                      <Link className="btn btn-primary w-100" to="/create-service">
                        Crear un servicio
                      </Link>
                    </div>
                  ) : (
                    <>
                      <select
                        className="form-select mb-3"
                        value={selectedOfferServiceId}
                        onChange={(e) => setSelectedOfferServiceId(e.target.value)}
                      >
                        {availableMyServices.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.title}
                          </option>
                        ))}
                      </select>

                      <textarea
                        className="form-control mb-3"
                        rows="3"
                        placeholder="Mensaje opcional para explicar tu propuesta..."
                        value={tradeMessage}
                        onChange={(e) => setTradeMessage(e.target.value)}
                      />

                      <div className="d-grid gap-2">
                        <button className="btn btn-primary" onClick={handleTradeRequest}>
                          Enviar solicitud
                        </button>

                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => setShowTradeBox(false)}
                        >
                          Cancelar
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}

              <button
                className={`btn w-100 ${isSaved ? "btn-secondary" : "btn-outline-secondary"}`}
                onClick={handleToggleSave}
                disabled={savingService || isOwnService}
              >
                <i className={`bi ${isSaved ? "bi-bookmark-fill" : "bi-bookmark"} me-2`} />
                {savingService ? "Guardando..." : isSaved ? "Guardado" : "Guardar servicio"}
              </button>

              <hr />

              <p className="small text-muted mb-0">
                Este servicio ha sido aprobado por moderación y está disponible para la comunidad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoBox({ icon, label, value }) {
  return (
    <div className="col-md-6">
      <div className="p-3 rounded-4 bg-light border h-100">
        <div className="d-flex align-items-center gap-2 mb-2">
          <i className={`bi ${icon} text-primary`} />
          <small className="text-muted">{label}</small>
        </div>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

export default ServiceDetail;