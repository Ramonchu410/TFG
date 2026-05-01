import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getServiceById, updateService } from '../api/services';
import LoadingSpinner from '../components/common/LoadingSpinner';

function EditService() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    type: 'OFFER',
    title: '',
    description: '',
    location: '',
    is_active: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const loadService = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await getServiceById(id);
        const service = response.data?.service || response.data?.data || response.data;

        setForm({
          type: service.type || 'OFFER',
          title: service.title || '',
          description: service.description || '',
          location: service.location || '',
          is_active: Boolean(service.is_active),
        });
      } catch (err) {
        setError(err.response?.data?.message || 'No se pudo cargar el servicio.');
      } finally {
        setLoading(false);
      }
    };

    loadService();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setNotice('');
    setSaving(true);

    try {
      const response = await updateService(id, {
        category_id: null,
        type: form.type,
        title: form.title,
        description: form.description,
        location: form.location,
        is_active: form.is_active,
      });

      setNotice(response.data?.message || 'Servicio actualizado correctamente.');

      setTimeout(() => {
        navigate('/my-services');
      }, 700);
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo actualizar el servicio.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner text="Cargando servicio..." />;

  return (
    <section className="py-5">
      <div className="container">
        <div className="mb-4">
          <Link to="/my-services" className="text-decoration-none">
            ← Volver a mis servicios
          </Link>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-soft rounded-4 p-4 p-lg-5">
              <h2 className="fw-bold mb-2">Editar servicio</h2>
              <p className="text-muted mb-4">
                Modifica la información, cambia su visibilidad o desactívalo de la vista pública.
              </p>

              <div className="alert alert-info small">
                Si cambias título, descripción, tipo, categoría o localización, el servicio volverá a quedar pendiente de revisión.
                Si solo cambias la visibilidad, no necesitará nueva moderación.
              </div>

              {error && <div className="alert alert-danger">{error}</div>}
              {notice && <div className="alert alert-success">{notice}</div>}

              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-6">
                  <label className="form-label">Tipo</label>
                  <select
                    className="form-select"
                    value={form.type}
                    onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
                  >
                    <option value="OFFER">OFFER</option>
                    <option value="REQUEST">REQUEST</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label">Título</label>
                  <input
                    className="form-control"
                    value={form.title}
                    onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Descripción</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    value={form.description}
                    onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div className="col-md-8">
                  <label className="form-label">Localización</label>
                  <input
                    className="form-control"
                    value={form.location}
                    onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
                  />
                </div>

                <div className="col-md-4 d-flex align-items-end">
                  <div className="form-check form-switch ms-md-auto">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={form.is_active}
                      onChange={(e) => setForm((prev) => ({ ...prev, is_active: e.target.checked }))}
                    />
                    <label className="form-check-label">Servicio activo</label>
                  </div>
                </div>

                <div className="col-12 d-flex gap-2">
                  <button className="btn btn-primary px-4" disabled={saving}>
                    {saving ? 'Guardando...' : 'Guardar cambios'}
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/my-services')}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditService;