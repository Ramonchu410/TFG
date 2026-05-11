import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createService, getCategories } from '../api/services';

function CreateService() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    category_id: '',
    type: 'OFFER',
    title: '',
    description: '',
    location: '',
    is_active: true,
  });

  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  // Cargamos categorías al entrar para preparar el formulario de publicación.
  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data?.data || res.data || []))
      .catch(() => setCategories([]));
  }, []);

  // Alta de servicio: se normalizan tipos y se envía al endpoint de creación.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      await createService({
        category_id: form.category_id ? Number(form.category_id) : null,
        type: form.type,
        title: form.title,
        description: form.description,
        location: form.location,
        is_active: form.is_active,
      });

      navigate('/my-services');
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo crear el servicio.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-soft rounded-4 p-4 p-lg-5">
              <h2 className="fw-bold mb-2">Publicar nuevo servicio</h2>
              <p className="text-muted mb-4">
                Crea una oferta o solicitud y deja que la comunidad te descubra.
              </p>

              {error && <div className="alert alert-danger">{error}</div>}

              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-6">
                  <label className="form-label">Tipo</label>
                  <select
                    className="form-select"
                    value={form.type}
                    onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
                  >
                    <option value="OFFER">Oferta</option>
                    <option value="REQUEST">Solicitud</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Categoría</label>
                  <select
                    className="form-select"
                    value={form.category_id}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, category_id: e.target.value }))
                    }
                    required
                  >
                    <option value="">Selecciona una categoría</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
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
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, description: e.target.value }))
                    }
                    required
                  />
                </div>

                <div className="col-md-8">
                  <label className="form-label">Localización</label>
                  <input
                    className="form-control"
                    value={form.location}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, location: e.target.value }))
                    }
                  />
                </div>

                <div className="col-md-4 d-flex align-items-end">
                  <div className="form-check form-switch ms-md-auto">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={form.is_active}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, is_active: e.target.checked }))
                      }
                    />
                    <label className="form-check-label">Servicio activo</label>
                  </div>
                </div>

                <div className="col-12 d-flex gap-2">
                  <button className="btn btn-primary px-4" disabled={saving}>
                    {saving ? 'Guardando...' : 'Crear servicio'}
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate(-1)}
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

export default CreateService;