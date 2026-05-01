import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="py-5">
      <div className="container text-center py-5">
        <h1 className="display-3 fw-bold">404</h1>
        <p className="text-muted">La página que buscas no existe.</p>
        <Link to="/" className="btn btn-primary">Volver al inicio</Link>
      </div>
    </section>
  );
}

export default NotFound;
