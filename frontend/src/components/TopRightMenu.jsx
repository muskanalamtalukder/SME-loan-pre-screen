import React, { useState, useRef, useEffect } from "react";
import "./TopRightMenu.css";

export default function TopRightMenu() {
  const [open, setOpen] = useState(false);
  const boxRef = useRef();

  // close when clicking outside
  useEffect(() => {
    function onDoc(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <div className="menu-wrapper" ref={boxRef}>
      <button
        className={`hamburger-button ${open ? "open" : ""}`}
        onClick={() => setOpen((s) => !s)}
        aria-label="Open menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`menu-box ${open ? "show" : ""}`} aria-hidden={!open}>
        <button className="menu-item">👤 Profile</button>
        <button className="menu-item">❓ Help</button>
        <div className="menu-sep" />
        <button className="menu-item logout">⎋ Logout</button>

        <div className="support-box">
          <h4>Support</h4>
          <p><strong>Give a missed call</strong><br/>+91-9289200017</p>
          <p><strong>WhatsApp</strong><br/>Chat with us</p>
          <p><strong>Email</strong><br/>support@example.com</p>
        </div>
      </div>
    </div>
  );
}
