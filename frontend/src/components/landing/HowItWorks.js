import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles, faShareNodes, faRobot, faChartLine } from "@fortawesome/free-solid-svg-icons";

const STEPS = [
  {
    step: "01",
    title: "Tell NEYRIX AI what you want to create",
    desc: "Enter a topic, rough idea, product update, campaign goal, or blog summary into the AI prompt input.",
    icon: faWandMagicSparkles,
    previewType: "prompt",
    previewContent: {
      label: "Prompt Input",
      text: "We just launched our React & Node AI content generator today!",
    },
  },
  {
    step: "02",
    title: "Choose your platform & tone",
    desc: "Select target destination: LinkedIn long-form, Twitter punchy thread, Instagram caption, or Facebook community post.",
    icon: faShareNodes,
    previewType: "platforms",
    platforms: [
      { name: "LinkedIn", icon: "💼", active: true },
      { name: "Twitter / X", icon: "𝕏", active: false },
      { name: "Instagram", icon: "📸", active: false },
      { name: "Facebook", icon: "🌐", active: false },
    ],
  },
  {
    step: "03",
    title: "Let AI create",
    desc: "NEYRIX AI automatically formats line breaks, hashtag density, hooks, and viral readability for your selected channel.",
    icon: faRobot,
    previewType: "output",
    outputPost: "🚀 After 6 months of intense building, our AI Content Engine is live!\n\nKey features:\n• 1-Click Platform Adaptation\n• Real-Time Virality Index (98/100)\n\nTry it 100% free today! #BuildInPublic #AI",
  },
  {
    step: "04",
    title: "Analyze and improve",
    desc: "Track post virality scores, monitor organic reach, and refine your next batch of content using data-driven insights.",
    icon: faChartLine,
    previewType: "analytics",
    metrics: [
      { label: "Organic Reach", val: "24.8K", trend: "+18.2%" },
      { label: "Viral Score", val: "98/100", trend: "High Hook" },
      { label: "Engagement", val: "8.4%", trend: "+3.1%" },
    ],
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="sai-how-it-works-section">
      <div className="sai-section-container">
        <div className="sai-section-header">

          <h2 className="sai-section-title">Start creating in minutes.</h2>
          <p className="sai-section-sub">
            Four simple steps to transform raw ideas into multi-channel social media success.
          </p>
        </div>

        {/* Steps List */}
        <div className="sai-steps-container">
          {STEPS.map((s, idx) => (
            <div key={s.step} className={`sai-step-row ${idx % 2 === 1 ? "reverse" : ""}`}>
              {/* Text Side */}
              <div className="step-text-side">
                <span className="step-num">{s.step}</span>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
              </div>

              {/* Visual Side */}
              <div className="step-visual-side">
                <div className="step-card-mock">
                  <div className="card-mock-header">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="title">Step {s.step} Visual Preview</span>
                  </div>

                  <div className="card-mock-body">
                    {s.previewType === "prompt" && (
                      <div className="step-prompt-ui">
                        <label>{s.previewContent.label}</label>
                        <div className="prompt-box">{s.previewContent.text}</div>
                        <div className="prompt-actions">
                          <span className="pill">Gemini Pro 1.5</span>
                          <button className="gen-btn">⚡ Synthesize</button>
                        </div>
                      </div>
                    )}

                    {s.previewType === "platforms" && (
                      <div className="step-platforms-ui">
                        <label>Target Channels</label>
                        <div className="platforms-grid">
                          {s.platforms.map((p) => (
                            <div key={p.name} className={`plat-chip ${p.active ? "active" : ""}`}>
                              <span>{p.icon}</span> {p.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {s.previewType === "output" && (
                      <div className="step-output-ui">
                        <div className="out-top">
                          <span className="plat-tag">💼 LinkedIn Output</span>
                          <span className="score">🔥 98/100</span>
                        </div>
                        <pre className="out-text">{s.outputPost}</pre>
                      </div>
                    )}

                    {s.previewType === "analytics" && (
                      <div className="step-analytics-ui">
                        <div className="metrics-row">
                          {s.metrics.map((m) => (
                            <div key={m.label} className="m-box">
                              <span className="lbl">{m.label}</span>
                              <span className="val">{m.val}</span>
                              <span className="sub">{m.trend}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
