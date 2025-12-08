import React, { useEffect, useState } from 'react';
import { listApplications } from '../api/api';

function StatusBadge({ status }) {
  const map = {
    'Ready for Appraisal': 'green',
    'Conditional Approval': 'orange',
    'On Hold': 'yellow',
    'Rejected': 'red',
    'Pending': 'gray'
  };
  const color = map[status] || 'gray';
  return <span className={`badge ${color}`}>{status}</span>;
}

export default function Dashboard() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchApps() {
    setLoading(true);
    try {
      const data = await listApplications();
      setApps(data.sort((a,b)=> new Date(b.createdAt)-new Date(a.createdAt)));
    } catch (err) {
      setApps([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchApps(); }, []);

  return (
    <section className="card dashboard-card">
      <h2>Applications</h2>

      {loading ? <div className="empty">Loading…</div> : (
        apps.length === 0 ? (
          <div className="empty">No applications yet — submit one on the left.</div>
        ) : (
          <div className="table-wrap">
            <table className="apps-table">
              <thead>
                <tr>
                  <th>Business</th>
                  <th>Classification</th>
                  <th>Turnover</th>
                  <th>Investment</th>
                  <th>Status</th>
                  <th>Submitted</th>
                </tr>
              </thead>
              <tbody>
                {apps.map(a => (
                  <tr key={a.id}>
                    <td>{a.businessName}</td>
                    <td>{a.classification}</td>
                    <td>{a.turnover.toLocaleString()}</td>
                    <td>{a.investment.toLocaleString()}</td>
                    <td><StatusBadge status={a.decision.status} /></td>
                    <td>{new Date(a.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
      <div className="note">Tip: Click an item to view full details (future enhancement).</div>
    </section>
  );
}
