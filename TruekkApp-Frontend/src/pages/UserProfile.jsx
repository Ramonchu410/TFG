import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPublicUserProfile, updateMyAvatar } from '../api/users';
import { useAuth } from '../context/AuthContext';
import ServiceCard from '../components/common/ServiceCard';
import EmptyState from '../components/common/EmptyState';
import LoadingSpinner from '../components/common/LoadingSpinner';

function UserProfile() {
  const { id } = useParams();
  const { user: authUser, updateUser } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [avatarMessage, setAvatarMessage] = useState('');

  const isOwnProfile = Number(authUser?.id) === Number(id);

  const loadProfile = async () => {
    setLoading(true);

    getPublicUserProfile(id)
      .then((res) => setProfile(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProfile();
  }, [id]);

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);
      setAvatarMessage('');

      const response = await updateMyAvatar(file);
      const updatedUser = response.data?.user;

      if (updatedUser) {
        updateUser(updatedUser);
      }

      await loadProfile();
      setAvatarMessage('Foto actualizada correctamente.');
    } catch (error) {
      setAvatarMessage(error.response?.data?.message || 'No se pudo subir la foto.');
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <LoadingSpinner text="Cargando perfil..." />;

  if (!profile) {
    return (
      <section className="py-5">
        <div className="container">
          <EmptyState
            title="Usuario no encontrado"
            description="No se pudo cargar este perfil."
            icon="bi-person-x"
          />
        </div>
      </section>
    );
  }

  const { user, stats, services, reviews } = profile;
  const isVerified = user?.status === 'VERIFIED';

  return (
    <section className="py-5">
      <div className="container">
        <Link to="/" className="text-decoration-none fw-semibold">
          ← Volver al marketplace
        </Link>

        <div className="card border-0 shadow-soft rounded-4 p-4 p-lg-5 my-4">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-4">
            <div className="d-flex align-items-center gap-3">
              <div className="position-relative">
                {user.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt={user.name}
                    className="rounded-circle border shadow-sm"
                    style={{ width: 82, height: 82, objectFit: 'cover' }}
                  />
                ) : (
                  <div
                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold shadow-sm"
                    style={{ width: 82, height: 82, fontSize: '1.8rem' }}
                  >
                    {user.name?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                )}

                {isOwnProfile && (
                  <label
                    className="btn btn-primary btn-sm rounded-circle position-absolute bottom-0 end-0"
                    title="Cambiar foto"
                    style={{ width: 32, height: 32, display: 'grid', placeItems: 'center' }}
                  >
                    <i className="bi bi-camera" />
                    <input
                      type="file"
                      accept="image/*"
                      className="d-none"
                      onChange={handleAvatarChange}
                      disabled={uploading}
                    />
                  </label>
                )}
              </div>

              <div>
                <p className="text-uppercase text-primary small fw-bold mb-1">
                  Perfil público
                </p>

                <div className="d-flex align-items-center gap-2 flex-wrap">
                  <h1 className="fw-bold mb-1">{user.name}</h1>

                  {isVerified && (
                    <i
                      className="bi bi-patch-check-fill text-primary fs-3 mb-1"
                      title="Usuario verificado"
                    />
                  )}
                </div>

                <p className="text-muted mb-1">
                  Miembro de TruekApp
                  {isVerified && (
                    <span className="badge text-bg-primary ms-2">
                      Verificado
                    </span>
                  )}
                </p>

                {isOwnProfile && (
                  <small className="text-muted">
                    {uploading ? 'Subiendo foto...' : 'Puedes cambiar tu foto desde aquí.'}
                  </small>
                )}

                {avatarMessage && (
                  <div className="small text-primary mt-1">{avatarMessage}</div>
                )}
              </div>
            </div>

            <div className="d-flex flex-wrap gap-3">
              <ProfileStat
                label="Valoración"
                value={stats.average_rating > 0 ? `${stats.average_rating} ★` : 'Sin valorar'}
              />
              <ProfileStat label="Reseñas" value={stats.reviews_count} />
              <ProfileStat label="Servicios" value={stats.services_count} />
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-lg-8">
            <div className="mb-4">
              <h3 className="fw-bold mb-1">Servicios publicados</h3>
              <p className="text-muted mb-0">
                Servicios activos y aprobados de este usuario.
              </p>
            </div>

            {services.length === 0 ? (
              <EmptyState
                title="No tiene servicios publicados"
                description="Este usuario todavía no tiene servicios activos."
                icon="bi-briefcase"
              />
            ) : (
              <div className="row g-4">
                {services.map((service) => (
                  <div className="col-md-6" key={service.id}>
                    <ServiceCard service={{ ...service, user }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-soft rounded-4 p-4">
              <h5 className="fw-bold mb-3">Reseñas recibidas</h5>

              {reviews.length === 0 ? (
                <p className="text-muted small mb-0">
                  Este usuario todavía no tiene reseñas.
                </p>
              ) : (
                <div className="d-grid gap-3">
                  {reviews.map((review) => (
                    <div className="border rounded-4 p-3 bg-light" key={review.id}>
                      <div className="d-flex justify-content-between gap-2 mb-2">
                        <strong>{review.from_user?.name || 'Usuario'}</strong>
                        <span className="text-warning fw-bold">
                          {'★'.repeat(review.rating)}
                        </span>
                      </div>

                      <p className="small text-muted mb-0">
                        {review.comment || 'Sin comentario.'}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProfileStat({ label, value }) {
  return (
    <div className="p-3 rounded-4 bg-light border text-center" style={{ minWidth: 115 }}>
      <div className="fw-bold fs-5">{value}</div>
      <small className="text-muted">{label}</small>
    </div>
  );
}

export default UserProfile;