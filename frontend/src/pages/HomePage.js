import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const PLATFORMS = ["Twitter", "Instagram", "LinkedIn", "Facebook"];
const TONES = ["professional", "casual", "funny", "motivational"];
const TOPICS = ["tech & ai", "startup life", "design", "productivity"];

const DEMO_OUTPUTS = {
  "professional-tech & ai":
    "The companies quietly winning in AI aren't the loudest. They're the ones building reliable infrastructure while everyone debates AGI timelines. Execution > hype. #AI #Tech",
  "casual-tech & ai":
    "okay but why is every ai tool still asking me to 'craft' my prompt like i'm writing a poem?? just let me type normally and figure it out 😭 #devlife",
  "funny-tech & ai":
    "me: write me a professional email\nAI: certainly! here's a 6-paragraph essay with 3 metaphors and a haiku\nme: i just needed 2 sentences\nAI: understood. here are 4 versions 🙃",
  "motivational-tech & ai":
    "Every developer who ships things that people actually use started with a project that maybe 5 people noticed. Build anyway. Ship anyway. 🚀",
  "professional-startup life":
    "Fundraising teaches you something nobody warns you about: the investors who move fast are rarely the ones you want. The right ones ask hard questions slowly. #startups",
  "casual-startup life":
    "3 years into building and the proudest moment is still when a user messaged saying they use it every day. no revenue milestone beats that honestly",
  "funny-startup life":
    "startup milestone tracker:\n✅ MVP done\n✅ first 10 users\n✅ first churn\n✅ pivoted twice\n✅ called it 'early traction'\n❌ profitable\n❌ sleeping normally",
  "motivational-startup life":
    "The version 1 you shipped and the version 1 you envisioned are never the same. That gap is not failure — it's how you learned what the product actually needed to be.",
  "professional-design":
    "Good interface design is invisible. Users don't think about the button — they think about the task. That invisibility is the hardest thing to build. #uxdesign #productdesign",
  "casual-design":
    "designer brain is seeing a sign with bad kerning in the wild and being unable to move past it until you've mentally fixed it",
  "funny-design":
    "client: can we make the logo bigger?\nme: *makes it bigger*\nclient: actually smaller than before but bigger in feel\nme: ...what",
  "motivational-design":
    "Every great product was once a rough wireframe on a napkin (or a Figma file with 40 pages named 'final_v2_REAL_USE_THIS'). Start messy. Refine relentlessly.",
  "professional-productivity":
    "The most productive people I know don't have better systems. They've just gotten ruthless about what they agree to before it enters their system. Calendar hygiene is a skill.",
  "casual-productivity":
    "the productivity hack nobody sells you: having one day where you do absolutely nothing and feeling zero guilt about it. works every time",
  "funny-productivity":
    "my productivity system:\n1. write long to-do list\n2. do the 2 easy things\n3. add them back just to cross them off\n4. feel accomplished\n5. ignore the rest",
  "motivational-productivity":
    "You don't need a perfect morning routine. You need to start. The gap between planning to be productive and being productive is exactly one decision.",
};

const FEATURES = [
  {
    label: "AI Content Engine",
    body: "Platform-perfect posts across every tone. The same idea reads completely differently when it's yours.",
  },
  {
    label: "Trending Topics",
    body: "Real-time signals across tech, business, sport, culture. Know what's resonating before you post.",
  },
  {
    label: "Multi-platform",
    body: "Twitter's character limit. Instagram's culture. LinkedIn's register. Each post adapted, not copied.",
  },
  {
    label: "Analytics",
    body: "Reach, engagement, and growth across your content. Know what works, stop guessing.",
  },
  {
    label: "Smart Scheduler",
    body: "Draft now, post at the right moment. Your calendar, your rules.",
  },
  {
    label: "Free to use",
    body: "No paywalls. No token limits. Built on open AI and smart templates.",
  },
];

export default function HomePage() {
  const [platform, setPlatform] = useState("Twitter");
  const [tone, setTone] = useState("casual");
  const [topic, setTopic] = useState("tech & ai");
  const [generating, setGenerating] = useState(false);
  const [output, setOutput] = useState(
    DEMO_OUTPUTS["casual-tech & ai"]
  );
  const [charCount, setCharCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const outputRef = useRef(null);

  const generate = () => {
    setGenerating(true);
    setOutput("");
    const key = `${tone}-${topic}`;
    const text =
      DEMO_OUTPUTS[key] ||
      DEMO_OUTPUTS["casual-tech & ai"];
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setOutput(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setGenerating(false);
      }
    }, 14);
  };

  useEffect(() => {
    setCharCount(output.length);
  }, [output]);

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div style={s.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        a { text-decoration: none; }

        .chip { transition: background 0.14s, border-color 0.14s, color 0.14s; cursor: pointer; }
        .chip:hover { border-color: rgba(255,255,255,0.3) !important; }
        .chip.active { background: rgba(255,255,255,0.1) !important; border-color: rgba(255,255,255,0.4) !important; color: #fff !important; }

        .feat-row { border-top: 1px solid rgba(255,255,255,0.06); transition: background 0.14s; }
        .feat-row:hover { background: rgba(255,255,255,0.03); }

        .gen-btn { transition: background 0.18s, transform 0.1s; }
        .gen-btn:hover { background: rgba(255,255,255,0.14) !important; }
        .gen-btn:active { transform: scale(0.98); }

        .cta-main { transition: background 0.16s, transform 0.1s; }
        .cta-main:hover { background: #e2e2e2 !important; }
        .cta-main:active { transform: scale(0.98); }

        .cta-sec { transition: border-color 0.16s, color 0.16s; }
        .cta-sec:hover { border-color: rgba(255,255,255,0.4) !important; color: #fff !important; }

        .nav-link { transition: color 0.14s; }
        .nav-link:hover { color: #fff !important; }

        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .cursor { display: inline-block; width: 2px; height: 1em; background: #fff; vertical-align: text-bottom; animation: blink 0.9s step-end infinite; margin-left: 1px; }

        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner { animation: spin 0.7s linear infinite; }

        @media (max-width: 720px) {
          .hero-layout { flex-direction: column !important; }
          .hide-mobile { display: none !important; }
          .demo-panel { padding: 1.25rem !important; }
          .nav-ctas .hide-sm { display: none; }
        }
      `}</style>

      {/* NAV */}
      <nav style={s.nav}>
        <div style={s.navInner}>
          <div style={s.logo}>
            <div style={s.logoBox}>S</div>
            <span style={s.logoText}>SocialAI</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="hide-mobile">
            {["Features", "Demo", "Stats"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="nav-link" style={s.navLink}>{l}</a>
            ))}
          </div>
          <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }} className="nav-ctas">
            <Link to="/login" className="cta-sec hide-sm" style={s.navBtnSecondary}>Sign in</Link>
            <Link to="/register" className="cta-main" style={s.navBtnPrimary}>Get started</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="demo" style={s.hero}>
        <div style={s.heroInner}>
          {/* Left: Copy */}
          <div style={s.heroLeft}>
            <p style={s.heroEye}>AI content for every platform</p>
            <h1 style={s.heroH1}>
              Write less.<br />
              <span style={s.heroAccent}>Post smarter.</span>
            </h1>
            <p style={s.heroSub}>
              Pick a topic, pick a tone — SocialAI writes the post. Adapted for every platform, ready in seconds.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "2rem" }}>
              <Link to="/register" className="cta-main" style={s.heroCta}>Start free</Link>
              <a href="#features" className="cta-sec" style={s.heroCtaGhost}>See features →</a>
            </div>
            <div style={s.techStack}>
              {["React", "Node.js", "Express", "MongoDB"].map((t) => (
                <span key={t} style={s.techPill}>{t}</span>
              ))}
            </div>
          </div>

          {/* Right: Live demo */}
          <div style={s.demoPanel} className="demo-panel">
            {/* Controls row */}
            <div style={s.demoControls}>
              <div style={s.controlGroup}>
                <span style={s.controlLabel}>Platform</span>
                <div style={s.chips}>
                  {PLATFORMS.map((p) => (
                    <button
                      key={p}
                      onClick={() => setPlatform(p)}
                      className={`chip${platform === p ? " active" : ""}`}
                      style={{ ...s.chip, ...(platform === p ? s.chipActive : {}) }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div style={s.controlGroup}>
                <span style={s.controlLabel}>Tone</span>
                <div style={s.chips}>
                  {TONES.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
                      className={`chip${tone === t ? " active" : ""}`}
                      style={{ ...s.chip, ...(tone === t ? s.chipActive : {}) }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div style={s.controlGroup}>
                <span style={s.controlLabel}>Topic</span>
                <div style={s.chips}>
                  {TOPICS.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTopic(t)}
                      className={`chip${topic === t ? " active" : ""}`}
                      style={{ ...s.chip, ...(topic === t ? s.chipActive : {}) }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Output */}
            <div style={s.demoOutput} ref={outputRef}>
              <div style={s.demoOutputHeader}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div style={s.demoAvatar}>M</div>
                  <div>
                    <div style={{ fontSize: "0.8rem", fontWeight: 500, color: "rgba(255,255,255,0.85)" }}>Mayank Pandey</div>
                    <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", fontFamily: "'JetBrains Mono', monospace" }}>@mayank_pandey · {platform}</div>
                  </div>
                </div>
                <button onClick={copy} style={s.copyBtn} title="Copy post">
                  {copied ? "✓ copied" : "copy"}
                </button>
              </div>
              <div style={s.demoText}>
                {output || <span style={{ color: "rgba(255,255,255,0.2)", fontStyle: "italic" }}>Hit generate…</span>}
                {generating && <span className="cursor" />}
              </div>
              <div style={s.demoMeta}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: platform === "Twitter" && charCount > 280 ? "#f87171" : "rgba(255,255,255,0.3)" }}>
                  {charCount}{platform === "Twitter" ? " / 280" : ""}
                </span>
                <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.72rem" }}>
                  {tone} · {topic}
                </span>
              </div>
            </div>

            {/* Generate button */}
            <button
              onClick={generate}
              disabled={generating}
              className="gen-btn"
              style={s.genBtn}
            >
              {generating ? (
                <>
                  <svg className="spinner" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="5.5" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
                    <path d="M7 1.5a5.5 5.5 0 0 1 5.5 5.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Generating…
                </>
              ) : (
                "Generate post →"
              )}
            </button>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div id="stats" style={s.statsBar}>
        {[
          ["10K+", "posts generated"],
          ["5", "platforms"],
          ["< 3s", "generation time"],
          ["100%", "free to use"],
        ].map(([v, l]) => (
          <div key={l} style={s.statItem}>
            <span style={s.statVal}>{v}</span>
            <span style={s.statLabel}>{l}</span>
          </div>
        ))}
      </div>

      {/* FEATURES */}
      <section id="features" style={s.featSection}>
        <div style={s.featInner}>
          <div style={s.featHeader}>
            <h2 style={s.featH2}>Everything you need to post consistently</h2>
            <p style={s.featSub}>Not just a generator — a full content workflow.</p>
          </div>
          <div style={s.featList}>
            {FEATURES.map((f, i) => (
              <div key={f.label} className="feat-row" style={s.featRow}>
                <div style={s.featNum}>{String(i + 1).padStart(2, "0")}</div>
                <div style={s.featLabel}>{f.label}</div>
                <div style={s.featBody}>{f.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={s.ctaSection}>
        <div style={s.ctaInner}>
          <h2 style={s.ctaH2}>Start posting today.</h2>
          <p style={s.ctaSub}>Free account. No credit card. Takes 30 seconds.</p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/register" className="cta-main" style={{ ...s.heroCta, padding: "0.85rem 2rem" }}>Create free account</Link>
            <Link to="/login" className="cta-sec" style={s.heroCtaGhost}>Sign in →</Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={s.footer}>
        <div style={s.footerInner}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ ...s.logoBox, width: 24, height: 24, fontSize: "0.7rem" }}>S</div>
            <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "rgba(255,255,255,0.5)" }}>SocialAI</span>
          </div>
          <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.25)" }}>© 2025 SocialAI · built by @mynkdev</span>
          <div style={{ display: "flex", gap: "1.25rem" }}>
            {[["Login", "/login"], ["Register", "/register"]].map(([l, h]) => (
              <Link key={l} to={h} className="nav-link" style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.3)" }}>{l}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

const s = {
  page: {
    background: "#0a0a0a",
    minHeight: "100vh",
    fontFamily: "'Inter', system-ui, sans-serif",
    color: "rgba(255,255,255,0.85)",
    overflowX: "hidden",
  },

  /* NAV */
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "rgba(10,10,10,0.85)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
  },
  navInner: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "0 1.5rem",
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
  },
  logo: { display: "flex", alignItems: "center", gap: "0.5rem" },
  logoBox: {
    width: 28,
    height: 28,
    background: "#fff",
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.8rem",
    fontWeight: 600,
    color: "#0a0a0a",
    flexShrink: 0,
  },
  logoText: { fontWeight: 600, fontSize: "1rem", color: "#fff", letterSpacing: "-0.02em" },
  navLink: { fontSize: "0.85rem", color: "rgba(255,255,255,0.45)", fontWeight: 400 },
  navBtnSecondary: {
    padding: "0.4rem 0.9rem",
    borderRadius: 7,
    border: "1px solid rgba(255,255,255,0.15)",
    color: "rgba(255,255,255,0.6)",
    fontSize: "0.82rem",
    fontWeight: 500,
    background: "transparent",
  },
  navBtnPrimary: {
    padding: "0.4rem 1rem",
    borderRadius: 7,
    background: "#fff",
    color: "#0a0a0a",
    fontSize: "0.82rem",
    fontWeight: 600,
  },

  /* HERO */
  hero: {
    borderBottom: "1px solid rgba(255,255,255,0.07)",
  },
  heroInner: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "5rem 1.5rem 5rem",
    display: "flex",
    alignItems: "flex-start",
    gap: "4rem",
    flexWrap: "wrap",
  },
  heroLeft: {
    flex: "1 1 300px",
    paddingTop: "1rem",
  },
  heroEye: {
    fontSize: "0.75rem",
    fontWeight: 500,
    color: "rgba(255,255,255,0.3)",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginBottom: "1rem",
  },
  heroH1: {
    fontSize: "clamp(2.2rem,4.5vw,3.4rem)",
    fontWeight: 300,
    lineHeight: 1.1,
    letterSpacing: "-0.04em",
    color: "#fff",
  },
  heroAccent: {
    fontWeight: 600,
    color: "#fff",
  },
  heroSub: {
    fontSize: "0.95rem",
    color: "rgba(255,255,255,0.45)",
    lineHeight: 1.7,
    marginTop: "1.25rem",
    maxWidth: 360,
    fontWeight: 400,
  },
  heroCta: {
    padding: "0.75rem 1.5rem",
    borderRadius: 8,
    background: "#fff",
    color: "#0a0a0a",
    fontSize: "0.875rem",
    fontWeight: 600,
    display: "inline-flex",
    alignItems: "center",
  },
  heroCtaGhost: {
    padding: "0.75rem 1.25rem",
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.15)",
    color: "rgba(255,255,255,0.5)",
    fontSize: "0.875rem",
    fontWeight: 500,
    display: "inline-flex",
    alignItems: "center",
  },
  techStack: { display: "flex", gap: "0.4rem", flexWrap: "wrap", marginTop: "2.5rem" },
  techPill: {
    padding: "0.2rem 0.65rem",
    borderRadius: 20,
    border: "1px solid rgba(255,255,255,0.1)",
    color: "rgba(255,255,255,0.25)",
    fontSize: "0.7rem",
    fontWeight: 500,
    fontFamily: "'JetBrains Mono', monospace",
  },

  /* DEMO PANEL */
  demoPanel: {
    flex: "1 1 360px",
    maxWidth: 480,
    background: "#111",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 14,
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  demoControls: { display: "flex", flexDirection: "column", gap: "0.75rem" },
  controlGroup: { display: "flex", flexDirection: "column", gap: "0.4rem" },
  controlLabel: {
    fontSize: "0.68rem",
    fontWeight: 500,
    color: "rgba(255,255,255,0.25)",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    fontFamily: "'JetBrains Mono', monospace",
  },
  chips: { display: "flex", gap: "0.35rem", flexWrap: "wrap" },
  chip: {
    padding: "0.28rem 0.75rem",
    borderRadius: 20,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "transparent",
    color: "rgba(255,255,255,0.4)",
    fontSize: "0.75rem",
    fontWeight: 500,
    cursor: "pointer",
  },
  chipActive: {
    background: "rgba(255,255,255,0.1)",
    borderColor: "rgba(255,255,255,0.35)",
    color: "#fff",
  },

  demoOutput: {
    background: "#0a0a0a",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 10,
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    minHeight: 160,
  },
  demoOutputHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  demoAvatar: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.75rem",
    fontWeight: 600,
    color: "rgba(255,255,255,0.7)",
    flexShrink: 0,
  },
  demoText: {
    fontSize: "0.875rem",
    color: "rgba(255,255,255,0.75)",
    lineHeight: 1.7,
    whiteSpace: "pre-wrap",
    flex: 1,
  },
  demoMeta: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  copyBtn: {
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 5,
    color: "rgba(255,255,255,0.35)",
    fontSize: "0.72rem",
    fontWeight: 500,
    padding: "0.2rem 0.6rem",
    cursor: "pointer",
    fontFamily: "'JetBrains Mono', monospace",
    transition: "color 0.14s, border-color 0.14s",
  },
  genBtn: {
    width: "100%",
    padding: "0.75rem",
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.07)",
    color: "rgba(255,255,255,0.8)",
    fontSize: "0.875rem",
    fontWeight: 500,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
  },

  /* STATS */
  statsBar: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
  },
  statItem: {
    padding: "2rem 1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.3rem",
    borderRight: "1px solid rgba(255,255,255,0.07)",
  },
  statVal: {
    fontSize: "clamp(1.5rem,3vw,2rem)",
    fontWeight: 300,
    color: "#fff",
    letterSpacing: "-0.03em",
    fontFamily: "'JetBrains Mono', monospace",
  },
  statLabel: {
    fontSize: "0.72rem",
    color: "rgba(255,255,255,0.3)",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    fontWeight: 500,
  },

  /* FEATURES */
  featSection: {
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    padding: "5rem 1.5rem",
  },
  featInner: { maxWidth: 1100, margin: "0 auto" },
  featHeader: { marginBottom: "3rem" },
  featH2: {
    fontSize: "clamp(1.4rem,2.5vw,2rem)",
    fontWeight: 300,
    color: "#fff",
    letterSpacing: "-0.03em",
    marginBottom: "0.5rem",
  },
  featSub: {
    fontSize: "0.9rem",
    color: "rgba(255,255,255,0.35)",
    fontWeight: 400,
  },
  featList: {},
  featRow: {
    display: "grid",
    gridTemplateColumns: "3rem 1fr 2fr",
    gap: "1.5rem",
    padding: "1.25rem 0",
    alignItems: "start",
  },
  featNum: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.72rem",
    color: "rgba(255,255,255,0.2)",
    paddingTop: "0.15rem",
  },
  featLabel: {
    fontSize: "0.875rem",
    fontWeight: 500,
    color: "rgba(255,255,255,0.75)",
  },
  featBody: {
    fontSize: "0.875rem",
    color: "rgba(255,255,255,0.35)",
    lineHeight: 1.65,
    fontWeight: 400,
  },

  /* CTA */
  ctaSection: {
    padding: "7rem 1.5rem",
    textAlign: "center",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
  },
  ctaInner: { maxWidth: 500, margin: "0 auto" },
  ctaH2: {
    fontSize: "clamp(2rem,4vw,3rem)",
    fontWeight: 300,
    color: "#fff",
    letterSpacing: "-0.04em",
    marginBottom: "0.75rem",
  },
  ctaSub: {
    fontSize: "0.9rem",
    color: "rgba(255,255,255,0.35)",
    marginBottom: "2rem",
  },

  /* FOOTER */
  footer: {
    padding: "1.5rem",
    background: "#0a0a0a",
  },
  footerInner: {
    maxWidth: 1100,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "1rem",
  },
};
