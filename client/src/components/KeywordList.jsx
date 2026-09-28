export default function KeywordList({ matched = [], missing = [] }) {
  return (
    <section className="result-sheet keyword-sheet">
      <p className="section-kicker"><span className="kicker-mark kicker-mark-green">04</span> ROLE FIT</p>
      <h3 className="result-title">Keywords in play</h3>

      <div className="keyword-group">
        <p className="keyword-label matched-label">
          Matched ({matched.length})
        </p>
        <div className="keyword-cloud">
          {matched.length ? (
            matched.map((kw, i) => (
              <span
                key={i}
                className="keyword-tag matched-tag"
              >
                {kw}
              </span>
            ))
          ) : (
            <span className="empty-note">None detected</span>
          )}
        </div>
      </div>

      <div className="keyword-group">
        <p className="keyword-label missing-label">
          Missing ({missing.length})
        </p>
        <div className="keyword-cloud">
          {missing.length ? (
            missing.map((kw, i) => (
              <span
                key={i}
                className="keyword-tag missing-tag"
              >
                {kw}
              </span>
            ))
          ) : (
            <span className="empty-note">None — great coverage</span>
          )}
        </div>
      </div>
    </section>
  );
}
