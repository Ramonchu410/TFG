function Terms() {
  return (
    <section className="py-5">
      <div className="container" style={{ maxWidth: "900px" }}>
        <h1 className="fw-bold mb-4">Términos y condiciones</h1>

        <p className="text-muted">
          Bienvenido a TruekApp. Al utilizar esta plataforma aceptas los siguientes términos:
        </p>

        <h5 className="fw-bold mt-4">Uso de la plataforma</h5>
        <p className="text-muted">
          TruekApp es una plataforma de intercambio de servicios sin transacciones monetarias.
          Los usuarios son responsables de los acuerdos que realicen entre ellos.
        </p>

        <h5 className="fw-bold mt-4">Responsabilidad</h5>
        <p className="text-muted">
          TruekApp no se hace responsable de conflictos, incumplimientos o daños derivados de los intercambios.
        </p>

        <h5 className="fw-bold mt-4">Contenido</h5>
        <p className="text-muted">
          Nos reservamos el derecho de eliminar contenido inapropiado o que incumpla nuestras normas.
        </p>

        <h5 className="fw-bold mt-4">Modificaciones</h5>
        <p className="text-muted">
          Estos términos pueden actualizarse en cualquier momento.
        </p>
      </div>
    </section>
  );
}

export default Terms;