function SectionTitle({ icon = 'bi-grid', kicker, title, subtitle }) {
  return (
    <div className="mb-4">
      {kicker && <span className="text-uppercase fw-semibold small text-primary">{kicker}</span>}
      <h2 className="fw-bold mt-2 d-flex align-items-center gap-2">
        <i className={`bi ${icon} text-primary`} /> {title}
      </h2>
      {subtitle && <p className="text-muted mb-0">{subtitle}</p>}
    </div>
  );
}

export default SectionTitle;
