import ScoreGauge from "./ScoreGauge";
import SectionAnalysis from "./SectionAnalysis";
import KeywordList from "./KeywordList";

export default function ResultsDashboard({ result }) {
  if (!result) return null;

  return (
    <div className="results-dashboard">
      <section className="results-summary">
        <div className="score-pair">
          <ScoreGauge score={result.overallScore} label="Overall score" />
          <ScoreGauge score={result.atsCompatibility} label="ATS compatibility" />
        </div>
        <div className="verdict-note">
          <p className="section-kicker"><span className="kicker-mark">03</span> THE BIG PICTURE</p>
          <h3 className="verdict-title">Your first read</h3>
          <p className="verdict-copy">{result.summary}</p>
          <span className="verdict-scribble">the useful stuff, up front</span>
        </div>
      </section>

      <div className="results-grid">
        <SectionAnalysis sections={result.sections} />
        <KeywordList
          matched={result.matchedKeywords}
          missing={result.missingKeywords}
        />
      </div>

      <div className="results-grid">
        <section className="result-sheet strengths-sheet">
          <p className="section-kicker"><span className="kicker-mark kicker-mark-green">04</span> KEEP DOING THIS</p>
          <h3 className="result-title">Your strengths</h3>
          <ul className="result-list">
            {result.strengths?.map((s, i) => (
              <li key={i}><span className="list-mark">+</span> {s}</li>
            ))}
          </ul>
        </section>

        <section className="result-sheet improvements-sheet">
          <p className="section-kicker"><span className="kicker-mark kicker-mark-yellow">05</span> ROOM TO GROW</p>
          <h3 className="result-title">A few good edits</h3>
          <ul className="result-list">
            {result.improvements?.map((s, i) => (
              <li key={i}><span className="list-mark">↗</span> {s}</li>
            ))}
          </ul>
        </section>
      </div>

      {result.formattingIssues?.length > 0 && (
        <section className="result-sheet formatting-sheet">
          <p className="section-kicker"><span className="kicker-mark kicker-mark-pink">06</span> DETAILS TO CHECK</p>
          <h3 className="result-title">Formatting flags</h3>
          <ul className="result-list">
            {result.formattingIssues.map((s, i) => (
              <li key={i}><span className="list-mark">!</span> {s}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
