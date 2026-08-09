import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faBars, faXmark, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../context/ThemeContext";

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`sai-navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="sai-nav-container">
        {/* LEFT: Logo */}
        <Link to="/" className="sai-brand">
          <img src="/logo.png" alt="NEYRIX AI Logo" className="sai-logo-img" />
          <span className="sai-brand-name">NEYRIX AI</span>
          <span className="sai-badge-v2">v2.0 AI</span>
        </Link>

        {/* CENTER: Navigation Links */}
        <div className="sai-nav-links desktop-only">
          <a href="#product-demo">Product</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#content-generator">AI Generator</a>
          <a href="#platforms">Platforms</a>
          <a href="#analytics">Analytics</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </div>

        {/* RIGHT: Actions */}
        <div className="sai-nav-actions desktop-only">
          <button onClick={toggleTheme} className="sai-theme-toggle-btn" aria-label="Toggle theme">
            <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
          </button>
          <Link to="/login" className="sai-login-btn">Log in</Link>
          <Link to="/register" className="sai-get-started-btn">
            Get started <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: "0.8rem", marginLeft: "0.3rem" }} />
          </Link>
        </div>

        {/* MOBILE HAMBURGER TOGGLE */}
        <div className="mobile-actions mobile-only">
          <button onClick={toggleTheme} className="sai-theme-toggle-btn" aria-label="Toggle theme">
            <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sai-mobile-hamburger"
            aria-label="Toggle mobile menu"
          >
            <FontAwesomeIcon icon={mobileMenuOpen ? faXmark : faBars} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {mobileMenuOpen && (
        <div className="sai-mobile-menu">
          <a href="#product-demo" onClick={() => setMobileMenuOpen(false)}>Product</a>
          <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
          <a href="#content-generator" onClick={() => setMobileMenuOpen(false)}>AI Generator</a>
          <a href="#platforms" onClick={() => setMobileMenuOpen(false)}>Platforms</a>
          <a href="#analytics" onClick={() => setMobileMenuOpen(false)}>Analytics</a>
          <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
          <div className="mobile-btn-group">
            <Link to="/login" className="sai-mobile-login" onClick={() => setMobileMenuOpen(false)}>Log in</Link>
            <Link to="/register" className="sai-mobile-start" onClick={() => setMobileMenuOpen(false)}>Get started</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
