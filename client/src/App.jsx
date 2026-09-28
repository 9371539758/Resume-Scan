import { useState } from "react";
import UploadCard from "./components/UploadCard";
import ResultsDashboard from "./components/ResultsDashboard";
import { analyzeResume } from "./api";

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async (file, jobDescription) => {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const { data } = await analyzeResume(file, jobDescription);
      setResult(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong while scanning your resume. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="site-header-inner">
          <div className="brand-lockup">
            <span className="brand-mark">R.</span>
            <h1 className="brand-name">Resume Scan</h1>
          </div>
          <span className="header-note">
            <span className="header-note-dot" />
            A sharper first impression
          </span>
        </div>
      </header>

      <main className="app-main">
        {!result && (
          <section className="intro-panel">
            <div className="intro-copy">
              <p className="eyebrow"><span>THE RESUME WORKSHOP</span> <span className="eyebrow-number">NO. 01</span></p>
              <h2 className="intro-title">
                Make your resume<br />
                <span className="title-highlight">work harder.</span>
              </h2>
              <p className="intro-description">
                A thoughtful ATS check for the details that get you noticed: clear structure, role-fit keywords, and practical next steps.
              </p>
            </div>
            <aside className="intro-stamp" aria-label="Resume review checklist">
              <span className="stamp-spark">✳</span>
              <span className="stamp-caption">GOOD WORK<br />GETS SEEN</span>
              <span className="stamp-rule" />
              <span className="stamp-index">SCAN / 001</span>
            </aside>
          </section>
        )}

        <UploadCard onAnalyze={handleAnalyze} loading={loading} error={error} />

        {result && (
          <>
            <button
              onClick={() => setResult(null)}
              className="result-reset"
            >
              <span aria-hidden="true">↖</span> Scan another resume
            </button>
            <ResultsDashboard result={result} />
          </>
        )}
      </main>

      <footer className="site-footer">
        <span>RESUME SCAN <span className="footer-star">✳</span> ATS INSIGHTS</span>
        <span>MADE FOR THE NEXT OPPORTUNITY</span>
      </footer>
    </div>
  );
}
