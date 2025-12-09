import React, { useState } from "react";

export default function ApplicationForm() {
  const [form, setForm] = useState({
    business: "",
    turnover: "",
    investment: "",
    docs: { kyc: false, income: false, business: false },
  });

  function toggleDoc(name) {
    setForm((f) => ({ ...f, docs: { ...f.docs, [name]: !f.docs[name] } }));
  }

  const submittedCount = Object.values(form.docs).filter(Boolean).length;
  const allDocs = submittedCount === 3;

  return (
    <div className="form-shell">
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        {/* Inline row */}
        <div className="inline-row">
          <div className="field">
            <label>Business Name</label>
            <input
              value={form.business}
              onChange={(e) => setForm({ ...form, business: e.target.value })}
              type="text"
              placeholder="Enter business name"
            />
          </div>

          <div className="field">
            <label>Turnover (INR)</label>
            <input
              value={form.turnover}
              onChange={(e) => setForm({ ...form, turnover: e.target.value })}
              type="number"
              placeholder="Annual turnover"
            />
          </div>

          <div className="field">
            <label>Investment (INR)</label>
            <input
              value={form.investment}
              onChange={(e) => setForm({ ...form, investment: e.target.value })}
              type="number"
              placeholder="Investment amount"
            />
          </div>
        </div>

        {/* Documents box */}
        <div className="docs-container">
          <div className="docs-box">
            <div className="docs-title">Documents Submitted</div>

            <div className="checkbox-grid">
              <label className="chk">
                <input
                  type="checkbox"
                  checked={form.docs.kyc}
                  onChange={() => toggleDoc("kyc")}
                />
                <span>KYC</span>
              </label>

              <label className="chk">
                <input
                  type="checkbox"
                  checked={form.docs.income}
                  onChange={() => toggleDoc("income")}
                />
                <span>Income Proof</span>
              </label>

              <label className="chk">
                <input
                  type="checkbox"
                  checked={form.docs.business}
                  onChange={() => toggleDoc("business")}
                />
                <span>Business Proof</span>
              </label>
            </div>
          </div>

          <div className="docs-side">
            <div
              className={`docs-badge ${allDocs ? "ok" : submittedCount > 0 ? "partial" : "none"}`}
              title={
                allDocs
                  ? "All documents submitted"
                  : submittedCount > 0
                  ? `${submittedCount} of 3 documents submitted`
                  : "No documents submitted"
              }
            >
              {allDocs ? "All set" : `${submittedCount}/3`}
            </div>

            {!allDocs && submittedCount < 3 && (
              <div className="docs-hint">Missing document(s) — application may be rejected</div>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button className="btn-primary" type="button">
            Pre-Screen
          </button>
          <button
            className="btn-reset"
            type="button"
            onClick={() =>
              setForm({
                business: "",
                turnover: "",
                investment: "",
                docs: { kyc: false, income: false, business: false },
              })
            }
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
