import React, { useState } from 'react';
import { createApplication } from '../api/api';

export default function ApplicationForm() {
  const [businessName, setBusinessName] = useState('');
  const [turnover, setTurnover] = useState('');
  const [investment, setInvestment] = useState('');
  const [kyc, setKyc] = useState(false);
  const [income, setIncome] = useState(false);
  const [businessProof, setBusinessProof] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      const payload = { businessName, turnover: Number(turnover), investment: Number(investment), docs: { kyc, income, businessProof } };
      const resp = await createApplication(payload);
      setMessage({ type: 'success', text: `${resp.decision.status}` });
    } catch (err) {
      setMessage({ type: 'error', text: err?.response?.data?.error || 'Network Error' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="card form-card">
      <div className="card-head">
        <h2>Submit Application</h2>
        <div className="status-note">Pre-screen (instant)</div>
      </div>

      <form onSubmit={handleSubmit} className="form-grid">
        <label className="form-row">
          <div className="label">Business name</div>
          <input required value={businessName} onChange={e => setBusinessName(e.target.value)} placeholder="e.g. Talukder Pharmacy" />
        </label>

        <label className="form-row">
          <div className="label">Turnover (INR)</div>
          <input required type="number" value={turnover} onChange={e => setTurnover(e.target.value)} placeholder="Annual turnover in rupees" />
        </label>

        <label className="form-row">
          <div className="label">Investment (INR)</div>
          <input required type="number" value={investment} onChange={e => setInvestment(e.target.value)} placeholder="Investment in plant/equipment" />
        </label>

        <fieldset className="form-row docs">
          <legend>Documents submitted</legend>
          <label><input type="checkbox" checked={kyc} onChange={e => setKyc(e.target.checked)} /> KYC</label>
          <label><input type="checkbox" checked={income} onChange={e => setIncome(e.target.checked)} /> Income Proof</label>
          <label><input type="checkbox" checked={businessProof} onChange={e => setBusinessProof(e.target.checked)} /> Business Proof</label>
        </fieldset>

        <div className="form-actions">
          <button className="btn primary" type="submit" disabled={loading}>{loading ? 'Checking...' : 'Pre-Screen'}</button>
          <button type="button" className="btn ghost" onClick={() => {
            setBusinessName(''); setTurnover(''); setInvestment(''); setKyc(false); setIncome(false); setBusinessProof(false); setMessage(null);
          }}>Reset</button>
        </div>

        {message && <div className={`msg ${message.type}`}>{message.text}</div>}
      </form>
    </section>
  );
}
