import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Hero() {
  return (
    <section className="sai-hero-section">
      <div className="sai-hero-container">
        {/* Eyebrow badge */}
        <div className="sai-hero-eyebrow">
          <span className="eyebrow-icon">⚡</span>
          <span>AI-Powered Social Media Platform</span>
        </div>

        {/* Large Centered Headline */}
        <h1 className="sai-hero-headline">
          Create content. Grow your audience. <br />
          <span className="gradient-highlight">Let AI do the heavy lifting.</span>
        </h1>

        {/* Supporting Subtitle */}
        <p className="sai-hero-subtitle">
          Generate social content, discover trends, analyze performance, and plan your entire content workflow from one AI-powered workspace.
        </p>

        {/* CTA Button Group */}
        <div className="sai-hero-ctas">
          <Link to="/register" className="sai-hero-cta-primary">
            Get started <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: "0.5rem" }} />
          </Link>
          <a href="#product-demo" className="sai-hero-cta-secondary">
            Explore NEYRIX AI
          </a>
        </div>

        {/* Guarantee / Trust Subtext */}
        <div className="sai-hero-trust-subtext">
          <span className="check-icon">✓</span> Free to get started · No credit card required
        </div>
      </div>
    </section>
  );
}
