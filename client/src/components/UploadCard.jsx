import { useRef, useState } from "react";

export default function UploadCard({ onAnalyze, loading, error }) {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleFile = (f) => {
    if (!f) return;
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!validTypes.includes(f.type)) {
      alert("Please upload a PDF or DOCX file.");
      return;
    }
    setFile(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;
    onAnalyze(file, jobDescription);
  };

  return (
    <form onSubmit={handleSubmit} className="upload-sheet">
      <div className="upload-heading-row">
        <div>
          <p className="section-kicker"><span className="kicker-mark">01</span> START HERE</p>
          <h2 className="upload-title">Your resume, please.</h2>
        </div>
        <span className="file-limit">PDF / DOCX <i /> UP TO 5 MB</span>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`drop-zone ${dragActive ? "is-active" : ""} ${file ? "has-file" : ""}`}
      >
        {loading && <div className="scan-beam" />}
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx"
          className="hidden"
          onChange={(e) => handleFile(e.target.files[0])}
        />
        <span className="upload-symbol" aria-hidden="true">↑</span>
        {file ? (
          <div className="drop-copy">
            <p className="drop-title">{file.name}</p>
            <p className="drop-hint">{(file.size / 1024).toFixed(0)} KB <span>·</span> click to replace</p>
          </div>
        ) : (
          <div className="drop-copy">
            <p className="drop-title">Drop it like it’s a draft</p>
            <p className="drop-hint">
              or <span className="browse-link">browse files</span> from your device
            </p>
          </div>
        )}
        <span className="drop-corner" aria-hidden="true">✳</span>
      </div>

      <div className="role-field">
        <div className="role-label-row">
          <label htmlFor="job-description" className="section-kicker"><span className="kicker-mark kicker-mark-green">02</span> ADD A TARGET ROLE</label>
          <span className="optional-note">optional, but useful</span>
        </div>
        <textarea
          id="job-description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here to check how well your resume lines up..."
          rows={4}
          className="role-textarea"
        />
      </div>

      {error && (
        <p className="error-message" role="alert">{error}</p>
      )}

      <div className="upload-actions">
        <p className="privacy-note"><span aria-hidden="true">✳</span> Your next step starts with a closer look.</p>
        <button type="submit" disabled={!file || loading} className="scan-button">
          <span>{loading ? "Scanning" : "Run my scan"}</span>
          <span className="button-arrow" aria-hidden="true">↗</span>
        </button>
      </div>
    </form>
  );
}
