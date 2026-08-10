import React from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";

export default function Hero() {
  return (
    <section className="sap-hero-section">
      {/* Full Background Video Layer */}
      <div className="sap-hero-video-bg">
        <video
          src="/1393-147055573_medium.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="sap-bg-video"
        />
        <div className="sap-bg-video-overlay" />
      </div>

      {/* Title Stage */}
      <div className="universal-title-stage">
        <h1 className="universal-hero-title">
          <span className="char">N</span>
          <span className="char">E</span>
          <span className="char">Y</span>
          <span className="char">R</span>
          <span className="char">I</span>
          <span className="char">X</span>
          <span className="char space">&nbsp;</span>
          <span className="char">A</span>
          <span className="char">I</span>
        </h1>
      </div>

      <div className="sap-hero-wrapper">
        {/* Left Bottom Section: Creator Trust & Subtext */}
        <div className="sap-hero-bottom-left">
          <div className="sap-avatar-stack">
            <div className="sap-avatars">
              <img src="/mayank.jpg" alt="Creator" className="avatar-img" />
              <div className="avatar-placeholder p1">AI</div>
              <div className="avatar-placeholder p2">✨</div>
            </div>
            <div className="sap-avatar-info">
              <span className="sap-stat-number">2M+</span>
              <span className="sap-stat-label">World active user</span>
            </div>
          </div>

          <p className="sap-hero-blurb">
            The design software that keeps your flow with AI tools and built-in graphics
          </p>
        </div>

        {/* Right Bottom Section: Feature Index & Floating Play Badge */}
        <div className="sap-hero-bottom-right">
          <div className="sap-feature-index-list">
            <div className="sap-index-item">
              <span className="label">Web based</span>
              <span className="num">/01</span>
            </div>
            <div className="sap-index-item">
              <span className="label">Collaborative</span>
              <span className="num">/02</span>
            </div>
            <div className="sap-index-item">
              <span className="label">Real-time</span>
              <span className="num">/03</span>
            </div>
          </div>

          {/* SAPFORCE-style Neon Green Action Badge */}
          <a href="#product-demo" className="sap-neon-play-btn">
            <div className="play-icon-row">
              <Play size={15} fill="currentColor" />
              <span>How it works?</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
