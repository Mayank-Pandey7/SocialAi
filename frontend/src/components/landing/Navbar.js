import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Navbar({ navLogoRef, isDocked, travelProgress = 0 }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Expanding brand slot width calculation: starts at 0px when p=0 (Product is at far left)
  // and expands smoothly as NEYRIX AI travels into the navbar!
  const slotWidth = isDocked ? "auto" : `${travelProgress * 170}px`;
  const slotMargin = isDocked ? "1.5rem" : `${travelProgress * 1.5}rem`;

  return (
    <nav className={`sai-navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="sai-nav-container">
        {/* LEFT: Expanding Logo Destination Target Slot */}
        <div
          ref={navLogoRef}
          className="sai-brand-slot"
          style={{
            width: slotWidth,
            marginRight: slotMargin,
            overflow: "hidden",
            display: "inline-flex",
            alignItems: "center",
            whiteSpace: "nowrap",
            flexShrink: 0
          }}
        >
          <Link to="/" className="sai-brand" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.6rem" }}>
            <img
              src="/logo.png"
              alt="NEYRIX AI Logo"
              className="sai-logo-img"
              style={{
                opacity: isDocked ? 1 : 0,
                transform: isDocked ? "scale(1)" : "scale(0.5)",
                transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)"
              }}
            />
            <span
              className="universal-hero-title nav-docked-title"
              style={{
                opacity: isDocked ? 1 : 0,
                fontSize: "1.85rem",
                letterSpacing: "0.08em",
                lineHeight: 1,
                margin: 0,
                padding: 0,
                display: "inline-block",
                transition: "opacity 0.15s ease"
              }}
            >
              NEYRIX AI
            </span>
          </Link>
        </div>

        {/* CENTER: Navigation Links (Starts immediately at "Product" when travelProgress === 0) */}
        <div className="sai-nav-links desktop-only">
          <a href="#product-demo">Product</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#content-generator">Content</a>
          <a href="#platforms">Platforms</a>
          <a href="#analytics">Analytics</a>
          <a href="#ai-features">AI Features</a>
          <a href="#faq">FAQ</a>
        </div>

        {/* RIGHT: Actions */}
        <div className="sai-nav-actions desktop-only">
          <Link to="/login" className="sai-login-btn">Log in</Link>
          <Link to="/register" className="sai-get-started-btn">
            Get started <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: "0.8rem", marginLeft: "0.3rem" }} />
          </Link>
        </div>

        {/* MOBILE HAMBURGER TOGGLE */}
        <div className="mobile-actions mobile-only">
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
          <a href="#content-generator" onClick={() => setMobileMenuOpen(false)}>Content</a>
          <a href="#platforms" onClick={() => setMobileMenuOpen(false)}>Platforms</a>
          <a href="#analytics" onClick={() => setMobileMenuOpen(false)}>Analytics</a>
          <a href="#ai-features" onClick={() => setMobileMenuOpen(false)}>AI Features</a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
          <div className="sai-mobile-menu-actions">
            <Link to="/login" className="sai-login-btn" onClick={() => setMobileMenuOpen(false)}>Log in</Link>
            <Link to="/register" className="sai-get-started-btn" onClick={() => setMobileMenuOpen(false)}>
              Get started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
