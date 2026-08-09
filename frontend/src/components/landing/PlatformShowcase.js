import React from "react";

const PLATFORM_BLOCKS = [
  {
    name: "Instagram",
    icon: "📸",
    badge: "Captions & Reels",
    accentColor: "#E4405F",
    examplePost: "WE ARE LIVE! 🚀✨\n\n6 months ago, we set out to build the simplest AI social engine for creators. Today, it's open to everyone!\n\nSwipe to see virality scores in action 📲 #CreatorEconomy #AI",
  },
  {
    name: "LinkedIn",
    icon: "💼",
    badge: "Long-Form Articles & Updates",
    accentColor: "#0A66C2",
    badgeColor: "#0A66C2",
    examplePost: "🚀 After 6 months of intense building, we just launched NEYRIX AI 2.0!\n\nWhat it solves:\n• 1-Click Platform Adaptation\n• Pre-Publish Virality Scores\n• Automated Content Queues\n\nTry it 100% free today! #BuildInPublic #AI",
  },
  {
    name: "Twitter / X",
    icon: "𝕏",
    badge: "Hooks & Viral Threads",
    accentColor: "#000000",
    examplePost: "AI isn't replacing content creators.\n\nCreators who master AI tools will replace creators who don't.\n\nThe secret isn't writing more words — it's removing friction so you can share authentic insights consistently. 👇 #BuildInPublic",
  },
  {
    name: "Facebook",
    icon: "🌐",
    badge: "Community & Groups",
    accentColor: "#1877F2",
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

        {/* 4 Large Platform Cards */}
        <div className="platforms-cards-grid">
          {PLATFORM_BLOCKS.map((p) => (
            <div key={p.name} className="platform-big-card">
              <div className="card-header">
                <div className="plat-icon-wrap" style={{ borderColor: p.accentColor }}>
                  <span className="icon">{p.icon}</span>
                </div>
                <div>
                  <h3 className="plat-title">{p.name}</h3>
                  <span className="plat-badge">{p.badge}</span>
                </div>
              </div>

              <div className="card-body">
                <span className="sample-label">Sample Native Formatting:</span>
                <pre className="sample-pre">{p.examplePost}</pre>
              </div>

              <div className="card-footer">
                <span className="check-text">✓ Algorithm-tuned line breaks & tags</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
