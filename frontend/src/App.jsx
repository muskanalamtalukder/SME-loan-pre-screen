import React from "react";
import ApplicationForm from "./components/ApplicationForm";
import Dashboard from "./components/Dashboard";
import TopRightMenu from "./components/TopRightMenu";
import logo from "./assets/hdfc-logo.png";

export default function App() {
  return (
    <div className="app-bg">
      <header className="app-header">
        <div className="header-center">
          <img src={logo} alt="HDFC Bank" className="bank-logo" />
          <div className="title-block">
            <h1 className="app-title">SME LOAN Pre-Screen</h1>
            <p className="app-subtitle">Simple pre-screening for SME loan requests</p>
          </div>
        </div>

        <div className="header-menu">
          <TopRightMenu />
        </div>
      </header>

      <main className="content-area">
        <section className="card">
          <ApplicationForm />
        </section>

        <section className="card">
          <Dashboard />
        </section>
      </main>
    </div>
  );
}
