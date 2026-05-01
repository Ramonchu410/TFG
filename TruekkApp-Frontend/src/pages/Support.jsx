import { Link } from 'react-router-dom';

function Support() {
  return (
    <section className="support-page py-5">
      <div className="container">
        <div className="support-hero card border-0 shadow-soft rounded-4 p-4 p-lg-5 mb-4">
          <div className="row g-4 align-items-center">
            <div className="col-lg-7">
              <span className="badge rounded-pill text-bg-primary px-3 py-2 mb-3">
                Centro de ayuda
              </span>

              <h1 className="fw-bold display-5 mb-3">
                ¿Necesitas ayuda con TruekApp?
              </h1>

              <p className="text-muted fs-5 mb-4">
                Encuentra respuestas sobre servicios, trueques, moderación, chats,
                valoraciones y seguridad dentro de la plataforma.
              </p>

              <div className="d-flex flex-wrap gap-2">
                <a className="btn btn-primary btn-lg" href="#faq">
                  Ver preguntas frecuentes
                </a>

                <a className="btn btn-outline-primary btn-lg" href="mailto:support@truekapp.local">
                  Contactar soporte
                </a>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="support-contact-card rounded-4 p-4">
                <h5 className="fw-bold mb-3">Canales de soporte</h5>

                <div className="d-grid gap-3">
                  <SupportContact
                    icon="bi-envelope"
                    title="Email"
                    text="support@truekapp.local"
                  />
                  <SupportContact
                    icon="bi-clock"
                    title="Tiempo de respuesta"
                    text="24-48 horas laborables"
                  />
                  <SupportContact
                    icon="bi-shield-check"
                    title="Seguridad"
                    text="Revisamos reportes de abuso o contenido inapropiado"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4 mb-5">
          <SupportCard
            icon="bi-plus-circle"
            title="Crear servicios"
            text="Publica ofertas o solicitudes, selecciona categoría, ubicación y decide si quieres que sean visibles."
          />
          <SupportCard
            icon="bi-arrow-left-right"
            title="Gestionar trueques"
            text="Solicita intercambios, acepta propuestas, conversa por chat y marca los trueques como completados."
          />
          <SupportCard
            icon="bi-star"
            title="Valoraciones"
            text="Cuando un trueque se completa, ambas personas pueden dejar una reseña para construir reputación."
          />
        </div>

        <div className="row g-4">
          <div className="col-lg-8">
            <div id="faq" className="card border-0 shadow-soft rounded-4 p-4">
              <h3 className="fw-bold mb-4">Preguntas frecuentes</h3>

              <div className="accordion" id="supportFaq">
                <FaqItem
                  id="one"
                  question="¿Cómo publico un servicio?"
                  answer="Inicia sesión, entra en “Crear servicio”, rellena título, descripción, categoría, ubicación y tipo de publicación. El servicio quedará pendiente hasta que un administrador lo apruebe."
                />
                <FaqItem
                  id="two"
                  question="¿Por qué mi servicio no aparece públicamente?"
                  answer="Solo aparecen públicamente los servicios activos y aprobados por moderación. Si está pendiente, rechazado o inactivo, no se mostrará en el marketplace."
                />
                <FaqItem
                  id="three"
                  question="¿Cómo solicito un trueque?"
                  answer="Entra en el detalle de un servicio, pulsa “Solicitar trueque” y elige uno de tus servicios aprobados para ofrecer a cambio. También puedes añadir un mensaje para explicar tu propuesta."
                />
                <FaqItem
                  id="four"
                  question="¿Cuándo se activa el chat?"
                  answer="El chat se desbloquea cuando la otra persona acepta tu solicitud de trueque. Antes de eso, solo se muestra la propuesta enviada."
                />
                <FaqItem
                  id="five"
                  question="¿Cómo funcionan las valoraciones?"
                  answer="Cuando un trueque se marca como completado, ambas personas pueden dejar una valoración de 1 a 5 estrellas y un comentario sobre la experiencia."
                />
                <FaqItem
                  id="six"
                  question="¿Puedo ocultar un servicio sin eliminarlo?"
                  answer="Sí. En “Mis servicios” puedes editar un servicio y desactivar su visibilidad. Dejará de aparecer públicamente, pero seguirá guardado en tu cuenta."
                />
                <FaqItem
                  id="seven"
                  question="¿Qué hago si un usuario incumple un acuerdo?"
                  answer="Puedes contactar con soporte indicando el servicio, la solicitud de trueque y una descripción del problema. El equipo revisará el caso y podrá tomar medidas."
                />
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-soft rounded-4 p-4 mb-4">
              <h4 className="fw-bold mb-3">Buenas prácticas</h4>

              <ul className="list-unstyled d-grid gap-3 mb-0">
                <SupportTip text="Describe claramente lo que ofreces o necesitas." />
                <SupportTip text="Usa el chat para concretar fechas, lugar y condiciones." />
                <SupportTip text="No compartas datos sensibles innecesarios." />
                <SupportTip text="Valora de forma honesta cuando completes un trueque." />
              </ul>
            </div>

            <div className="card border-0 shadow-soft rounded-4 p-4">
              <h4 className="fw-bold mb-2">¿No encuentras respuesta?</h4>
              <p className="text-muted">
                Escríbenos y revisaremos tu caso. Incluye capturas o detalles del servicio
                si ayuda a entender mejor el problema.
              </p>

              <a className="btn btn-primary w-100 mb-2" href="mailto:support@truekapp.local">
                <i className="bi bi-envelope me-2" />
                Enviar email
              </a>

              <Link className="btn btn-outline-secondary w-100" to="/">
                Volver al marketplace
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SupportContact({ icon, title, text }) {
  return (
    <div className="d-flex gap-3 align-items-start">
      <div className="support-icon">
        <i className={`bi ${icon}`} />
      </div>
      <div>
        <strong>{title}</strong>
        <p className="text-muted small mb-0">{text}</p>
      </div>
    </div>
  );
}

function SupportCard({ icon, title, text }) {
  return (
    <div className="col-md-4">
      <div className="card border-0 shadow-soft rounded-4 p-4 h-100 support-card">
        <div className="support-card-icon mb-3">
          <i className={`bi ${icon}`} />
        </div>
        <h5 className="fw-bold">{title}</h5>
        <p className="text-muted mb-0">{text}</p>
      </div>
    </div>
  );
}

function FaqItem({ id, question, answer }) {
  return (
    <div className="accordion-item border-0 border-bottom">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed fw-semibold"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#faq-${id}`}
        >
          {question}
        </button>
      </h2>

      <div
        id={`faq-${id}`}
        className="accordion-collapse collapse"
        data-bs-parent="#supportFaq"
      >
        <div className="accordion-body text-muted">
          {answer}
        </div>
      </div>
    </div>
  );
}

function SupportTip({ text }) {
  return (
    <li className="d-flex gap-2">
      <i className="bi bi-check-circle-fill text-success" />
      <span className="text-muted">{text}</span>
    </li>
  );
}

export default Support;