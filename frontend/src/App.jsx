import React from "react";
import Header from "./components/Header";
import ApplicationForm from "./components/ApplicationForm";
import Dashboard from "./components/Dashboard";
import "./styles.css";

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="main-area">
        <div className="left-col">
          <ApplicationForm />
        </div>
        <aside className="right-col">
          <Dashboard />
        </aside>
      </main>

      <footer className="site-footer">
        <small>© {new Date().getFullYear()} HDFC - SME RFT Pre-Screen (Prototype)</small>
      </footer>

      {/* decorative floating shapes */}
      <div className="float-shape s1" />
      <div className="float-shape s2" />
      <div className="float-shape s3" />
    </div>
  );
}
