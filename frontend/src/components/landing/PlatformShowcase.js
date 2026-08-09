import React from "react";

const PLATFORM_BLOCKS = [
  {
    name: "Instagram",
    icon: "📸",
    badge: "Captions & Reels",
    solidColor: "#831843",
    borderColor: "#F43F5E",
    iconBg: "#9F1239",
    accentTextColor: "#FDA4AF",
    sampleBg: "#4C0519",
    examplePost: "WE ARE LIVE! 🚀✨\n\n6 months ago, we set out to build the simplest AI social engine for creators. Today, it's open to everyone!\n\nSwipe to see virality scores in action 📲 #CreatorEconomy #AI",
  },
  {
    name: "LinkedIn",
    icon: "💼",
    badge: "Long-Form Articles",
    solidColor: "#1E1B4B",
    borderColor: "#3B82F6",
    iconBg: "#1E40AF",
    accentTextColor: "#93C5FD",
    sampleBg: "#0F172A",
    examplePost: "🚀 After 6 months of intense building, we just launched NEYRIX AI 2.0!\n\nWhat it solves:\n• 1-Click Platform Adaptation\n• Pre-Publish Virality Scores\n• Automated Content Queues\n\nTry it 100% free today! #BuildInPublic #AI",
  },
  {
    name: "Twitter / X",
    icon: "𝕏",
    badge: "Viral Threads",
    solidColor: "#18181B",
    borderColor: "#52525B",
    iconBg: "#27272A",
    accentTextColor: "#E4E4E7",
    sampleBg: "#09090B",
    examplePost: "AI isn't replacing content creators.\n\nCreators who master AI tools will replace creators who don't.\n\nThe secret isn't writing more words — it's removing friction so you can share authentic insights consistently. 👇 #BuildInPublic",
  },
  {
    name: "Facebook",
    icon: "🌐",
    badge: "Community & Groups",
    solidColor: "#172554",
    borderColor: "#2563EB",
    iconBg: "#1E3A8A",
    accentTextColor: "#BFDBFE",
    sampleBg: "#0B132B",
    examplePost: "Hey everyone! Huge milestone day for our team — NEYRIX AI 2.0 is officially live! 🎉\n\nIf you've been struggling to keep up with daily multi-channel posts, test it out free today!",
  },
];

export default function PlatformShowcase() {
  return (
    <section id="platforms" className="sai-platform-showcase-section">
      <div className="sai-section-container">
        <div className="sai-section-header">
          <span className="sai-eyebrow">Multi-Channel Distribution</span>
          <h2 className="sai-section-title">Create once. Reach everywhere.</h2>
          <p className="sai-section-sub">
            NEYRIX AI supports native post generation and formatting for all your primary social distribution channels.
          </p>
        </div>

        {/* 4 Large Solid Eye-Catching Platform Cards */}
        <div className="platforms-cards-grid">
          {PLATFORM_BLOCKS.map((p) => (
            <div
              key={p.name}
              className="platform-big-card"
              style={{
                backgroundColor: p.solidColor,
                border: `2px solid ${p.borderColor}`,
                color: "#FFFFFF",
              }}
            >
              <div className="card-header">
                <div
                  className="plat-icon-wrap"
                  style={{
                    backgroundColor: p.iconBg,
                    border: `1px solid ${p.borderColor}`,
                  }}
                >
                  <span className="icon">{p.icon}</span>
                </div>
                <div>
                  <h3 className="plat-title" style={{ color: "#FFFFFF" }}>
                    {p.name}
                  </h3>
                  <span
                    className="plat-badge"
                    style={{
                      backgroundColor: p.iconBg,
                      color: p.accentTextColor,
                      border: `1px solid ${p.borderColor}`,
                      padding: "0.2rem 0.55rem",
                      borderRadius: "10px",
                      fontSize: "0.72rem",
                      fontWeight: "700",
                    }}
                  >
                    {p.badge}
                  </span>
                </div>
              </div>

              <div className="card-body">
                <span className="sample-label" style={{ color: p.accentTextColor }}>
                  Sample Native Formatting:
                </span>
                <pre
                  className="sample-pre"
                  style={{
                    backgroundColor: p.sampleBg,
                    border: `1px solid ${p.borderColor}`,
                    color: "#F4F4F5",
                  }}
                >
                  {p.examplePost}
                </pre>
              </div>

              <div
                className="card-footer"
                style={{ borderColor: p.borderColor }}
              >
                <span className="check-text" style={{ color: p.accentTextColor }}>
                  ✓ Algorithm-tuned line breaks & tags
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
