export default function SectionAnalysis({ sections = [] }) {
  return (
    <section className="result-sheet section-sheet">
      <p className="section-kicker"><span className="kicker-mark kicker-mark-yellow">03</span> STRUCTURE CHECK</p>
      <h3 className="result-title">The essentials</h3>
      <ul className="section-list">
        {sections.map((s, i) => (
          <li key={i} className="section-item">
            <span
              className={`section-status ${
                s.present
                  ? "is-present"
                  : "is-missing"
              }`}
            >
              {s.present ? "✓" : "✕"}
            </span>
            <div className="section-detail">
              <p className="section-name">{s.name}</p>
              <p className="section-feedback">{s.feedback}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
