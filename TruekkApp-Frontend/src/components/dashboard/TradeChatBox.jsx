import { useEffect, useState } from 'react';
import { getTradeMessages, sendTradeMessage } from '../../api/tradeMessages';

function TradeChatBox({ tradeRequestId, currentUserId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const loadMessages = async () => {
    try {
      setError('');
      const response = await getTradeMessages(tradeRequestId);
      setMessages(response.data?.data || response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo cargar el chat.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, [tradeRequestId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    try {
      setSending(true);
      setError('');

      const response = await sendTradeMessage(tradeRequestId, {
        message: newMessage.trim(),
      });

      const createdMessage = response.data?.trade_message;

      if (createdMessage) {
        setMessages((prev) => [...prev, createdMessage]);
      } else {
        await loadMessages();
      }

      setNewMessage('');
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo enviar el mensaje.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="border rounded-4 p-3 bg-white mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h6 className="fw-bold mb-0">
            <i className="bi bi-chat-dots me-2" />
            Chat del trueque
          </h6>
          <small className="text-muted">Disponible porque el trueque está aceptado.</small>
        </div>

        <button className="btn btn-outline-secondary btn-sm" onClick={loadMessages}>
          Actualizar
        </button>
      </div>

      {error && <div className="alert alert-danger small">{error}</div>}

      <div className="trade-chat-messages d-grid gap-2 mb-3">
        {loading ? (
          <p className="text-muted small mb-0">Cargando mensajes...</p>
        ) : messages.length === 0 ? (
          <div className="alert alert-light border small mb-0">
            Todavía no hay mensajes. Rompe el hielo y concreta el intercambio.
          </div>
        ) : (
          messages.map((message) => {
            const isMine = Number(message.sender_id) === Number(currentUserId);

            return (
              <div
                key={message.id}
                className={`p-3 rounded-4 ${isMine ? 'bg-primary text-white ms-auto' : 'bg-light me-auto'}`}
                style={{ maxWidth: '85%' }}
              >
                <small className={isMine ? 'text-white-50' : 'text-muted'}>
                  {isMine ? 'Tú' : message.sender?.name || 'Usuario'}
                </small>

                <p className="mb-0 mt-1">{message.message}</p>
              </div>
            );
          })
        )}
      </div>

      <form className="d-flex gap-2" onSubmit={handleSubmit}>
        <input
          className="form-control"
          placeholder="Escribe un mensaje..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          disabled={sending}
        />

        <button className="btn btn-primary" disabled={sending || !newMessage.trim()}>
          {sending ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
}

export default TradeChatBox;