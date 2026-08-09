import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";

export default function FinalCTA() {
  return (
    <section className="sai-final-cta-section">
      <div className="sai-final-cta-card">
        <div className="final-cta-badge">
          <FontAwesomeIcon icon={faWandMagicSparkles} style={{ color: "#8B5CF6", marginRight: "0.4rem" }} />
          NEYRIX AI Workspace v2.0
        </div>

        <h2 className="final-cta-title">Ready to create better content?</h2>
        <p className="final-cta-sub">
          Start building your social presence with NEYRIX AI. Join thousands of creators posting 10x faster with AI precision.
        </p>

        <div className="final-cta-btn-group">
          <Link to="/register" className="sai-btn-primary-large">
            Get started free <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: "0.5rem" }} />
          </Link>
          <a href="#product-demo" className="sai-btn-outline-large">
            Explore the platform
          </a>
        </div>

        <div className="final-cta-footnote">
          <span>✓ Free forever plan available</span>
          <span>•</span>
          <span>✓ No credit card required</span>
          <span>•</span>
          <span>✓ Setup in under 60 seconds</span>
        </div>
      </div>
    </section>
  );
}
