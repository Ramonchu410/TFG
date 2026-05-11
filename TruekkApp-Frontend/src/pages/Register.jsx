import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Registramos al usuario y lo llevamos al login para iniciar sesión manualmente.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo completar el registro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-section py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-5">
            <div className="card border-0 shadow-soft rounded-4 p-4 p-lg-5">
              <h2 className="fw-bold mb-2">Crea tu cuenta</h2>
              <p className="text-muted mb-4">Empieza a intercambiar servicios con tu comunidad.</p>

              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit} className="d-grid gap-3">
                <div>
                  <label className="form-label">Nombre</label>
                  <input
                    className="form-control form-control-lg"
                    value={form.name}
                    onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Email</label>
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Password</label>
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>
                <button className="btn btn-primary btn-lg" disabled={loading}>
                  {loading ? 'Creando cuenta...' : 'Registrarme'}
                </button>
              </form>

              <p className="text-muted mt-4 mb-0">
                ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
