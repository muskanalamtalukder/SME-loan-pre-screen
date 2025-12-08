import React from "react";
import "../styles.css";
import logo from "../assets/hdfc-logo.jpg";

export default function Header() {
  return (
    <header className="hdfc-header">
      <div className="hdfc-header-left">
        <img src={logo} alt="HDFC Logo" className="hdfc-logo" />

        <div>
          <h1 className="hdfc-title">HDFC SME Pre-Screen</h1>
          <p className="hdfc-subtitle">Fast • Accurate • Right-First-Time</p>
        </div>
      </div>
    </header>
  );
}
