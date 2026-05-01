import { useState } from 'react';
import { createReview } from '../../api/reviews';

function ReviewForm({ tradeRequestId, onCreated }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setMessage('');

      await createReview({
        trade_request_id: tradeRequestId,
        rating: Number(rating),
        comment: comment || null,
      });

      setMessage('Valoración publicada correctamente.');
      setComment('');
      await onCreated?.();
    } catch (error) {
      setMessage(error.response?.data?.message || 'No se pudo publicar la valoración.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="border rounded-4 p-3 bg-white mt-3" onSubmit={handleSubmit}>
      <h6 className="fw-bold mb-2">
        <i className="bi bi-star-fill text-warning me-2" />
        Valora este trueque
      </h6>

      <div className="mb-3">
        <select
          className="form-select"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="5">★★★★★ Excelente</option>
          <option value="4">★★★★ Muy bueno</option>
          <option value="3">★★★ Correcto</option>
          <option value="2">★★ Mejorable</option>
          <option value="1">★ Mala experiencia</option>
        </select>
      </div>

      <textarea
        className="form-control mb-3"
        rows="3"
        placeholder="Cuenta cómo fue el intercambio..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      {message && <div className="alert alert-info small">{message}</div>}

      <button className="btn btn-warning btn-sm" disabled={saving}>
        {saving ? 'Publicando...' : 'Publicar valoración'}
      </button>
    </form>
  );
}

export default ReviewForm;