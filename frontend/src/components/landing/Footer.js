import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="sai-footer-section">
      <div className="sai-footer-container">
        <div className="sai-footer-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-brand-logo">
              <img src="/logo.png" alt="NEYRIX AI Logo" className="footer-logo-img" />
              <span className="brand-name">NEYRIX AI</span>
            </Link>
            <p className="brand-tagline">
              Next-generation AI social content generator, real-time trend discovery engine, and multi-channel analytics workspace.
            </p>
            <div className="footer-status-pill">
              <span className="live-dot"></span> Systems Operational • v2.0 AI
            </div>
          </div>

          {/* Links Column 1: Product */}
          <div className="footer-links-col">
            <h4>Product</h4>
            <a href="#content-generator">AI Generator</a>
            <a href="#analytics">Analytics Workspace</a>
            <a href="#how-it-works">Smart Calendar</a>
            <a href="#ai-features">Trend Discovery</a>
          </div>

          {/* Links Column 2: Platform */}
          <div className="footer-links-col">
            <h4>Account</h4>
            <Link to="/login">Sign In</Link>
            <Link to="/register">Register Free</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/generator">AI Studio</Link>
            <Link to="/analyzer">Post Analyzer</Link>
          </div>

          {/* Links Column 3: Connect & Company */}
          <div className="footer-links-col">
            <h4>Connect</h4>
            <a href="https://github.com/Mayank-Pandey7" target="_blank" rel="noreferrer">
              GitHub Repository
            </a>
            <a href="#faq">FAQ & Help</a>
            <a href="https://github.com/Mayank-Pandey7/NEYRIX AI" target="_blank" rel="noreferrer">
              Documentation
            </a>
          </div>
        </div>

        {/* Footer Bottom Line */}
        <div className="sai-footer-bottom">
          <span>
            © {new Date().getFullYear()} NEYRIX AI. Built with precision by{" "}
            <a href="https://github.com/Mayank-Pandey7" target="_blank" rel="noreferrer">
              @Mayank-Pandey7
            </a>. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
