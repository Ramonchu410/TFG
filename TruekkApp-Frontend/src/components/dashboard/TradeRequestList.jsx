import {
  acceptTradeRequest,
  cancelTradeRequest,
  completeTradeRequest,
  rejectTradeRequest,
} from '../../api/tradeRequests';
import EmptyState from '../common/EmptyState';
import TradeChatBox from './TradeChatBox';
import ReviewForm from './ReviewForm';

const statusMap = {
  PENDING: 'primary',
  ACCEPTED: 'success',
  REJECTED: 'danger',
  CANCELLED: 'secondary',
  COMPLETED: 'dark',
};

function TradeRequestList({ requests = [], currentUserId, onRefresh }) {
  const receivedRequests = requests.filter(
    (request) => Number(request.target_service?.user_id) === Number(currentUserId)
  );

  const sentRequests = requests.filter(
    (request) => Number(request.requester_id) === Number(currentUserId)
  );

  const handleAction = async (action, id) => {
    try {
      await action(id);
      await onRefresh?.();
    } catch (error) {
      alert(error.response?.data?.message || 'No se pudo actualizar la solicitud.');
    }
  };

  return (
    <div className="card border-0 shadow-soft rounded-4 p-4">
      <h5 className="fw-bold mb-1">Solicitudes de trueque</h5>
      <p className="text-muted small mb-4">
        Revisa quién quiere intercambiar contigo y qué servicios has solicitado.
      </p>

      {requests.length === 0 ? (
        <EmptyState
          title="No hay solicitudes de trueque"
          description="Cuando solicites o recibas trueques aparecerán aquí."
          icon="bi-arrow-left-right"
        />
      ) : (
        <div className="d-grid gap-4">
          <TradeSection
            title="Solicitudes recibidas"
            emptyText="Todavía no has recibido solicitudes."
            requests={receivedRequests}
            currentUserId={currentUserId}
            type="received"
            onAction={handleAction}
            onRefresh={onRefresh}
          />

          <TradeSection
            title="Solicitudes enviadas"
            emptyText="Todavía no has enviado solicitudes."
            requests={sentRequests}
            currentUserId={currentUserId}
            type="sent"
            onAction={handleAction}
            onRefresh={onRefresh}
          />
        </div>
      )}
    </div>
  );
}

function TradeSection({ title, emptyText, requests, currentUserId, type, onAction, onRefresh }) {
  return (
    <div>
      <h6 className="fw-bold mb-3">{title}</h6>

      {requests.length === 0 ? (
        <div className="border rounded-4 p-3 bg-light text-muted small">
          {emptyText}
        </div>
      ) : (
        <div className="d-grid gap-3">
          {requests.map((request) => (
            <TradeRequestCard
              key={request.id}
              request={request}
              currentUserId={currentUserId}
              type={type}
              onAction={onAction}
              onRefresh={onRefresh}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function TradeRequestCard({ request, currentUserId, type, onAction, onRefresh }) {
  const isReceived = type === 'received';

  const requesterName = request.requester?.name || 'Usuario';
  const targetService = request.target_service;
  const offerService = request.offer_service;

  return (
    <div className="border rounded-4 p-3 bg-light">
      <div className="d-flex flex-wrap justify-content-between gap-3 mb-3">
        <div>
          <h6 className="fw-bold mb-1">
            {isReceived
              ? `${requesterName} quiere solicitar tu servicio`
              : `Solicitud enviada a ${targetService?.user?.name || 'otro usuario'}`}
          </h6>

          <span className={`badge text-bg-${statusMap[request.status] || 'secondary'}`}>
            {request.status}
          </span>
        </div>

        <small className="text-muted">
          Solicitud #{request.id}
        </small>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <div className="p-3 rounded-4 bg-white h-100">
            <small className="text-muted d-block mb-1">Servicio solicitado</small>
            <strong>{targetService?.title || 'Servicio eliminado'}</strong>

            {targetService?.description && (
              <p className="small text-muted mb-0 mt-1">{targetService.description}</p>
            )}

            {targetService?.location && (
              <small className="text-muted d-block mt-2">
                <i className="bi bi-geo-alt me-1" />
                {targetService.location}
              </small>
            )}
          </div>
        </div>

        <div className="col-md-6">
          <div className="p-3 rounded-4 bg-white h-100">
            <small className="text-muted d-block mb-1">Servicio ofrecido a cambio</small>
            <strong>{offerService?.title || 'Servicio eliminado'}</strong>

            {offerService?.description && (
              <p className="small text-muted mb-0 mt-1">{offerService.description}</p>
            )}

            {offerService?.location && (
              <small className="text-muted d-block mt-2">
                <i className="bi bi-geo-alt me-1" />
                {offerService.location}
              </small>
            )}
          </div>
        </div>
      </div>

      <div className="p-3 rounded-4 bg-white mb-3">
        <small className="text-muted d-block mb-1">Mensaje de la solicitud</small>
        <p className="mb-0">
          {request.message || 'El usuario no añadió ningún mensaje.'}
        </p>
      </div>

      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
        <small className="text-muted">
          Solicitante: <strong>{requesterName}</strong>
        </small>

        <div className="d-flex flex-wrap gap-2">
          {isReceived && request.status === 'PENDING' && (
            <>
              <button
                className="btn btn-success btn-sm"
                onClick={() => onAction(acceptTradeRequest, request.id)}
              >
                Aceptar
              </button>

              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => onAction(rejectTradeRequest, request.id)}
              >
                Rechazar
              </button>
            </>
          )}

          {!isReceived && ['PENDING', 'ACCEPTED'].includes(request.status) && (
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => onAction(cancelTradeRequest, request.id)}
            >
              Cancelar
            </button>
          )}

          {request.status === 'ACCEPTED' && (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => onAction(completeTradeRequest, request.id)}
            >
              Marcar completado
            </button>
          )}
        </div>
      </div>

      {request.status === 'ACCEPTED' && (
        <TradeChatBox
          tradeRequestId={request.id}
          currentUserId={currentUserId}
        />
      )}

      {request.status === 'COMPLETED' && (
        <ReviewForm
          tradeRequestId={request.id}
          onCreated={onRefresh}
        />
      )}
    </div>
  );
}

export default TradeRequestList;