import React from "react";

export default function Dashboard() {
  const rows = [
    { business: "XYZ Store", class: "Micro", turnover: 200000, investment: 50000, status: "Conditional", reason: "Business proof missing" },
    { business: "Medical Shop", class: "Micro", turnover: 500000, investment: 100000, status: "Ready", reason: "All documents verified" },
    { business: "ABC Works", class: "Small", turnover: 2500000, investment: 800000, status: "Rejected", reason: "KYC missing" },
  ];

  function statusClass(s) {
    if (s === "Ready") return "st-ready";
    if (s === "Conditional") return "st-conditional";
    return "st-rejected";
  }

  return (
    <div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Business</th>
            <th>Classification</th>
            <th>Turnover</th>
            <th>Investment</th>
            <th>Status</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{r.business}</td>
              <td>{r.class}</td>
              <td>{r.turnover.toLocaleString()}</td>
              <td>{r.investment.toLocaleString()}</td>
              <td>
                <span className={`status-pill ${statusClass(r.status)}`}>{r.status}</span>
              </td>
              <td className={r.status === "Rejected" ? "reason-reject" : ""}>{r.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
