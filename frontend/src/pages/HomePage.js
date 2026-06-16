import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../context/ThemeContext";

/* ─── Data ─── */
const FEATURES = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    title: "AI Content Engine",
    desc: "Generate platform-perfect posts in seconds — professional, funny, or casual tones at your command.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: "Trending Topics",
    desc: "Real-time topic discovery across tech, sports, business and culture. Always post what people care about.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    title: "Analytics",
    desc: "Clean dashboards showing reach and engagement across all your content — no noise, just signal.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    title: "Smart Scheduler",
    desc: "Draft today, schedule for the perfect moment. Your content calendar, fully under your control.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    title: "Multi-Platform",
    desc: "Twitter, Instagram, LinkedIn, Facebook — each post optimised for its platform's character limits and culture.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
      </svg>
    ),
    title: "Zero Cost",
    desc: "Powered by free AI models and smart templates. Professional output without the subscription fees.",
  },
];

const PLATFORMS = ["LinkedIn", "Twitter", "Instagram", "Facebook"];
const TONES = ["Professional", "Casual", "Funny", "Motivational", "Inspirational"];
const SAMPLE_OUTPUTS = {
  "LinkedIn-Professional":
    "AI isn't replacing human creativity — it's amplifying it. The most effective teams I've seen this year aren't the ones avoiding AI; they're the ones integrating it thoughtfully into their workflow.\n\nThe question isn't whether to adapt. It's how intentionally you do it.\n\n#Leadership #Innovation #FutureOfWork",
  "LinkedIn-Casual":
    "Hot take: spending 2 hours perfecting a LinkedIn post that gets 12 likes is wild when you could spend 10 minutes with AI and move on with your life 😅\n\nWorking smarter, not harder. #ProductivityTips",
  "Twitter-Professional":
    "The best content creators aren't the most talented writers.\n\nThey're the most consistent ones.\n\nAI doesn't replace your voice — it removes the friction so you can show up every day.",
  "Twitter-Funny":
    "me: I'll just write a quick tweet\nalso me: *opens AI tool*\nalso me: *stares at 12 generated options*\nalso me: *picks the first one and edits it anyway*\n\nthe circle of content creation",
  "Instagram-Motivational":
    "Every scroll is a choice. Every post is a statement.\n\nWhat are you saying about who you are?\n\nBuild the feed you want others to find. ✦\n\n#ContentCreator #Mindset #GrowthMindset",
};

/* ─── Hooks ─── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useCounter(target, visible, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, target, duration]);
  return count;
}

/* ─── Sub-components ─── */
function AnimatedSection({ children, className = "", style = {}, delay = 0 }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(20px)",
        transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function StatCounter({ value, suffix, label, visible }) {
  const num = useCounter(value, visible);
  return (
    <div style={{ textAlign: "center" }}>
      <div style={s.statVal}>{num}{suffix}</div>
      <div style={s.statLabel}>{label}</div>
    </div>
  );
}

/* ─── Demo Section ─── */
function DemoSection() {
  const [platform, setPlatform] = useState("LinkedIn");
  const [tone, setTone] = useState("Professional");
  const [topic, setTopic] = useState("");
  const [output, setOutput] = useState(SAMPLE_OUTPUTS["LinkedIn-Professional"]);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(true);
  const [demoRef, demoVisible] = [useRef(null), true];

  const generate = useCallback(() => {
    setLoading(true);
    setGenerated(false);
    setTimeout(() => {
      const key = `${platform}-${tone}`;
      setOutput(SAMPLE_OUTPUTS[key] || SAMPLE_OUTPUTS["LinkedIn-Professional"]);
      setLoading(false);
      setGenerated(true);
    }, 900);
  }, [platform, tone]);

  return (
    <AnimatedSection style={{ maxWidth: 760, margin: "0 auto" }}>
      <div style={s.demoShell}>
        {/* Input Row */}
        <div style={s.demoInputRow}>
          <div style={s.demoField}>
            <label style={s.demoLabel}>Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              style={s.demoSelect}
            >
              {PLATFORMS.map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div style={s.demoField}>
            <label style={s.demoLabel}>Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              style={s.demoSelect}
            >
              {TONES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div style={{ ...s.demoField, flex: 2 }}>
            <label style={s.demoLabel}>Topic <span style={{ color: "var(--text-muted)" }}>(optional)</span></label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. AI in education, remote work…"
              style={s.demoInput}
              onKeyDown={(e) => e.key === "Enter" && generate()}
            />
          </div>
          <button onClick={generate} style={s.generateBtn} disabled={loading}>
            {loading ? (
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={s.spinner} />
                Generating
              </span>
            ) : "Generate"}
          </button>
        </div>

        {/* Divider */}
        <div style={s.demoDivider} />

        {/* Output */}
        <div style={{ ...s.demoOutput, opacity: generated ? 1 : 0.3, transition: "opacity 0.3s" }}>
          <div style={s.demoOutputHeader}>
            <span style={s.demoOutputPlatform}>{platform}</span>
            <span style={s.demoOutputTone}>{tone}</span>
          </div>
          <p style={s.demoOutputText}>{output}</p>
          <div style={s.demoOutputFooter}>
            <button style={s.demoAction}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}>
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
              </svg>
              Copy
            </button>
            <button onClick={generate} style={s.demoAction}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}>
                <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/>
              </svg>
              Regenerate
            </button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ─── Main Component ─── */
export default function HomePage() {
  const { isDark, toggleTheme } = useTheme();
  const [statsRef, statsVisible] = useInView(0.3);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={s.page}>
      {/* ── NAV ── */}
      <nav style={s.nav}>
        <div style={s.navInner}>
          <Link to="/" style={s.logo}>
            <span style={s.logoMark} />
            <span style={s.logoWord}>SocialAI</span>
          </Link>

          <div className="hp-nav-links" style={s.navLinks}>
            {["Features", "Demo", "Pricing"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} style={s.navLink} className="nav-link">
                {item}
              </a>
            ))}
          </div>

          <div style={s.navActions}>
            <button
              onClick={toggleTheme}
              style={s.themeToggle}
              aria-label={isDark ? "Switch to light" : "Switch to dark"}
            >
              <FontAwesomeIcon
                icon={isDark ? faSun : faMoon}
                style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}
              />
            </button>
            <Link to="/login" className="hp-signin" style={s.navLinkBtn}>Sign in</Link>
            <Link to="/register" style={s.navCta}>Get started</Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={s.hero}>
        <div style={s.heroInner}>
          <AnimatedSection delay={0}>
            <div style={s.heroEyebrow}>
              <span style={s.eyebrowDot} />
              Free to use · No credit card
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.05}>
            <h1 style={s.heroH1}>
              Create better social media
              <br />
              <span style={s.heroH1Accent}>content with AI</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <p style={s.heroSub}>
              Generate professional posts for LinkedIn, Twitter and Instagram in seconds.
              <br />
              Pick your tone, pick your topic — let AI do the rest.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div style={s.heroCtas}>
              <Link to="/register" style={s.heroPrimary}>
                Get started free
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 8 }}>
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
              <a href="#demo" style={s.heroSecondary}>View demo</a>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div style={s.heroStack}>
              {["React", "Node.js", "Express", "MongoDB"].map((t) => (
                <span key={t} style={s.stackPill}>{t}</span>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Hero product preview */}
        <AnimatedSection delay={0.12} style={s.heroPreview}>
          <div style={s.previewCard}>
            <div style={s.previewTop}>
              <div style={s.previewDots}>
                <span style={{ ...s.previewDot, background: "#ff5f57" }} />
                <span style={{ ...s.previewDot, background: "#febc2e" }} />
                <span style={{ ...s.previewDot, background: "#28c840" }} />
              </div>
              <div style={s.previewTitle}>Generate content</div>
            </div>
            <div style={s.previewBody}>
              <div style={s.previewRow}>
                <span style={s.previewFieldLabel}>Platform</span>
                <div style={s.previewChips}>
                  {["LinkedIn", "Twitter", "Instagram"].map((p, i) => (
                    <span key={p} style={{ ...s.previewChip, ...(i === 0 ? s.previewChipActive : {}) }}>{p}</span>
                  ))}
                </div>
              </div>
              <div style={s.previewRow}>
                <span style={s.previewFieldLabel}>Tone</span>
                <div style={s.previewChips}>
                  {["Professional", "Casual", "Funny"].map((t, i) => (
                    <span key={t} style={{ ...s.previewChip, ...(i === 0 ? s.previewChipActive : {}) }}>{t}</span>
                  ))}
                </div>
              </div>
              <div style={s.previewRow}>
                <span style={s.previewFieldLabel}>Topic</span>
                <div style={s.previewInputMock}>AI in the workplace</div>
              </div>
              <div style={s.previewGenerateBtn}>Generate →</div>
              <div style={s.previewOutput}>
                <div style={s.previewOutputLabel}>
                  <span style={s.previewOutputDot} />
                  Generated
                </div>
                <p style={s.previewOutputText}>
                  AI isn't replacing human creativity — it's amplifying it.
                  The most effective teams integrate it thoughtfully...
                  <span style={{ color: "var(--text-muted)" }}> #Leadership #Innovation</span>
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ── STATS ── */}
      <div style={s.statsBand} ref={statsRef}>
        <div style={s.statsInner}>
          <StatCounter value={10000} suffix="+" label="Posts generated" visible={statsVisible} />
          <div style={s.statsDivider} />
          <StatCounter value={5} suffix="" label="Platforms supported" visible={statsVisible} />
          <div style={s.statsDivider} />
          <StatCounter value={100} suffix="%" label="Free to use" visible={statsVisible} />
          <div style={s.statsDivider} />
          <StatCounter value={3} suffix="s" label="Avg. generation time" visible={statsVisible} />
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section id="features" style={s.section}>
        <div style={s.sectionHead}>
          <AnimatedSection>
            <p style={s.eyebrow}>Features</p>
            <h2 style={s.sectionH2}>Everything you need to create better content</h2>
            <p style={s.sectionSub}>Built for creators who want to spend less time writing and more time building an audience.</p>
          </AnimatedSection>
        </div>
        <div style={s.featGrid}>
          {FEATURES.map((f, i) => (
            <AnimatedSection key={f.title} delay={i * 0.06} style={s.featCard} className="feat-card">
              <div style={s.featIcon}>{f.icon}</div>
              <h3 style={s.featTitle}>{f.title}</h3>
              <p style={s.featDesc}>{f.desc}</p>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ── DEMO ── */}
      <section id="demo" style={{ ...s.section, background: "var(--bg-secondary)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 2rem" }}>
          <div style={s.sectionHead}>
            <AnimatedSection>
              <p style={s.eyebrow}>Live demo</p>
              <h2 style={s.sectionH2}>See it in action</h2>
              <p style={s.sectionSub}>Pick a platform, choose a tone, and generate real content — right here.</p>
            </AnimatedSection>
          </div>
          <DemoSection />
          <AnimatedSection style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link to="/register" style={s.heroPrimary}>
              Try it yourself — it's free
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 8 }}>
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={s.ctaSection}>
        <AnimatedSection style={s.ctaInner}>
          <h2 style={s.ctaH2}>Ready to create better content?</h2>
          <p style={s.ctaSub}>
            Join thousands of creators already using SocialAI to grow their audience.
          </p>
          <div style={s.heroCtas}>
            <Link to="/register" style={s.heroPrimary}>
              Create free account
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 8 }}>
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
            <Link to="/login" style={s.heroSecondary}>Sign in</Link>
          </div>
        </AnimatedSection>
      </section>

      {/* ── FOOTER ── */}
      <footer style={s.footer}>
        <div style={s.footerInner}>
          <div style={s.footerBrand}>
            <div style={s.logo}>
              <span style={s.logoMark} />
              <span style={s.logoWord}>SocialAI</span>
            </div>
            <p style={s.footerTagline}>
              AI-powered social media content for modern creators.
            </p>
          </div>
          <div style={s.footerCols}>
            <div style={s.footerCol}>
              <p style={s.footerColHead}>Product</p>
              <a href="#features" style={s.footerLink}>Features</a>
              <a href="#demo" style={s.footerLink}>Demo</a>
              <Link to="/register" style={s.footerLink}>Get started</Link>
            </div>
            <div style={s.footerCol}>
              <p style={s.footerColHead}>Account</p>
              <Link to="/login" style={s.footerLink}>Sign in</Link>
              <Link to="/register" style={s.footerLink}>Register</Link>
            </div>
            <div style={s.footerCol}>
              <p style={s.footerColHead}>Company</p>
              <a href="https://github.com/Mayank-Pandey7" target="_blank" rel="noreferrer" style={s.footerLink}>GitHub</a>
              <a href="#" style={s.footerLink}>Privacy</a>
              <a href="#" style={s.footerLink}>Terms</a>
            </div>
          </div>
        </div>
        <div style={s.footerBottom}>
          <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
            © 2026 SocialAI. Built by{" "}
            <a href="https://github.com/Mayank-Pandey7" target="_blank" rel="noreferrer" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>
              @mynkdev
            </a>
          </span>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

        html { scroll-behavior: smooth; }

        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        * { box-sizing: border-box; }

        .nav-link {
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--text-primary);
          transition: width 0.2s ease;
        }
        .nav-link:hover::after { width: 100%; }

        .feat-card:hover {
          border-color: var(--accent) !important;
          transform: translateY(-2px);
          transition: border-color 0.2s, transform 0.2s;
        }

        @media (max-width: 768px) {
          .hp-nav-links { display: none !important; }
          .hp-signin { display: none !important; }
        }
        @media (max-width: 900px) {
          #hp-hero-layout { flex-direction: column !important; }
          #hp-hero-preview { display: none !important; }
        }
        @media (max-width: 640px) {
          #hp-stats { grid-template-columns: repeat(2,1fr) !important; }
          #hp-feat-grid { grid-template-columns: 1fr !important; }
          #hp-demo-inputs { flex-direction: column !important; }
          #hp-footer-cols { flex-direction: column !important; gap: 2rem !important; }
          #hp-footer-inner { flex-direction: column !important; gap: 2.5rem !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  );
}

/* ─── Styles ─── */
const ACCENT = "#0d9488";
const ACCENT_HOVER = "#0f766e";

const s = {
  page: {
    background: "var(--bg-primary)",
    minHeight: "100vh",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    color: "var(--text-primary)",
    overflowX: "hidden",
    "--accent": ACCENT,
  },

  /* NAV */
  nav: {
    position: "fixed",
    top: 0, left: 0, right: 0,
    zIndex: 100,
    background: "var(--bg-primary)",
    borderBottom: "1px solid var(--border)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
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
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    textDecoration: "none",
    flexShrink: 0,
  },
  logoMark: {
    display: "inline-block",
    width: 20,
    height: 20,
    borderRadius: 6,
    background: ACCENT,
    flexShrink: 0,
  },
  logoWord: {
    fontSize: "0.95rem",
    fontWeight: 600,
    color: "var(--text-primary)",
    letterSpacing: "-0.01em",
  },
  navLinks: {
    display: "flex",
    gap: "2rem",
    marginLeft: "2rem",
  },
  navLink: {
    color: "var(--text-secondary)",
    textDecoration: "none",
    fontSize: "0.875rem",
    fontWeight: 400,
    letterSpacing: "-0.01em",
  },
  navActions: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginLeft: "auto",
    flexShrink: 0,
  },
  themeToggle: {
    background: "transparent",
    border: "1px solid var(--border)",
    cursor: "pointer",
    borderRadius: 8,
    width: 34,
    height: 34,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.15s",
    flexShrink: 0,
  },
  navLinkBtn: {
    color: "var(--text-secondary)",
    textDecoration: "none",
    fontSize: "0.875rem",
    padding: "0.4rem 0.75rem",
    borderRadius: 7,
  },
  navCta: {
    background: "var(--text-primary)",
    color: "var(--bg-primary)",
    textDecoration: "none",
    fontSize: "0.85rem",
    fontWeight: 500,
    padding: "0.45rem 0.9rem",
    borderRadius: 7,
    whiteSpace: "nowrap",
    transition: "opacity 0.15s",
  },

  /* HERO */
  hero: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "9rem 1.5rem 5rem",
    display: "flex",
    alignItems: "center",
    gap: "4rem",
    minHeight: "100vh",
  },
  heroInner: { flex: "1 1 480px", maxWidth: 560 },
  heroEyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.78rem",
    fontWeight: 500,
    color: "var(--text-muted)",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    marginBottom: "1.75rem",
    border: "1px solid var(--border)",
    borderRadius: 20,
    padding: "0.3rem 0.8rem",
  },
  eyebrowDot: {
    display: "inline-block",
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: ACCENT,
    flexShrink: 0,
  },
  heroH1: {
    fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
    fontWeight: 600,
    lineHeight: 1.1,
    letterSpacing: "-0.03em",
    color: "var(--text-primary)",
    marginBottom: "1.25rem",
    margin: "0 0 1.25rem",
  },
  heroH1Accent: {
    color: ACCENT,
  },
  heroSub: {
    fontSize: "1.05rem",
    color: "var(--text-secondary)",
    lineHeight: 1.75,
    marginBottom: "2rem",
    fontWeight: 400,
  },
  heroCtas: {
    display: "flex",
    gap: "0.75rem",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: "2rem",
  },
  heroPrimary: {
    display: "inline-flex",
    alignItems: "center",
    padding: "0.65rem 1.25rem",
    background: ACCENT,
    color: "#fff",
    textDecoration: "none",
    borderRadius: 8,
    fontSize: "0.9rem",
    fontWeight: 500,
    letterSpacing: "-0.01em",
    transition: "background 0.15s, transform 0.1s",
    border: `1px solid ${ACCENT_HOVER}`,
  },
  heroSecondary: {
    display: "inline-flex",
    alignItems: "center",
    padding: "0.65rem 1.25rem",
    color: "var(--text-secondary)",
    textDecoration: "none",
    borderRadius: 8,
    fontSize: "0.9rem",
    fontWeight: 400,
    border: "1px solid var(--border)",
    transition: "border-color 0.15s, color 0.15s",
  },
  heroStack: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
  },
  stackPill: {
    padding: "0.25rem 0.65rem",
    borderRadius: 6,
    border: "1px solid var(--border)",
    color: "var(--text-muted)",
    fontSize: "0.75rem",
    fontWeight: 500,
    letterSpacing: "0.01em",
  },
  heroPreview: {
    flex: "0 0 420px",
    maxWidth: 420,
  },

  /* Product preview card */
  previewCard: {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: 14,
    overflow: "hidden",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 4px 24px rgba(0,0,0,0.06)",
  },
  previewTop: {
    background: "var(--bg-secondary)",
    borderBottom: "1px solid var(--border)",
    padding: "0.65rem 1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  previewDots: { display: "flex", gap: 6 },
  previewDot: { width: 10, height: 10, borderRadius: "50%" },
  previewTitle: {
    fontSize: "0.75rem",
    color: "var(--text-muted)",
    fontWeight: 500,
  },
  previewBody: { padding: "1.25rem" },
  previewRow: { marginBottom: "1rem" },
  previewFieldLabel: {
    display: "block",
    fontSize: "0.7rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "var(--text-muted)",
    marginBottom: "0.4rem",
  },
  previewChips: { display: "flex", gap: "0.4rem", flexWrap: "wrap" },
  previewChip: {
    padding: "0.25rem 0.6rem",
    borderRadius: 6,
    border: "1px solid var(--border)",
    fontSize: "0.78rem",
    color: "var(--text-secondary)",
    cursor: "default",
  },
  previewChipActive: {
    border: `1px solid ${ACCENT}`,
    color: ACCENT,
    background: "rgba(13,148,136,0.08)",
  },
  previewInputMock: {
    padding: "0.45rem 0.75rem",
    borderRadius: 7,
    border: "1px solid var(--border)",
    fontSize: "0.82rem",
    color: "var(--text-primary)",
    background: "var(--bg-primary)",
  },
  previewGenerateBtn: {
    display: "inline-block",
    padding: "0.45rem 1rem",
    background: ACCENT,
    color: "#fff",
    borderRadius: 7,
    fontSize: "0.82rem",
    fontWeight: 500,
    marginBottom: "1rem",
    cursor: "default",
  },
  previewOutput: {
    background: "var(--bg-secondary)",
    borderRadius: 8,
    padding: "0.85rem",
    border: "1px solid var(--border)",
  },
  previewOutputLabel: {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    fontSize: "0.7rem",
    fontWeight: 600,
    color: ACCENT,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: "0.5rem",
  },
  previewOutputDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: ACCENT,
    flexShrink: 0,
  },
  previewOutputText: {
    fontSize: "0.82rem",
    color: "var(--text-secondary)",
    lineHeight: 1.65,
    margin: 0,
  },

  /* STATS */
  statsBand: {
    borderTop: "1px solid var(--border)",
    borderBottom: "1px solid var(--border)",
    background: "var(--bg-secondary)",
  },
  statsInner: {
    maxWidth: 960,
    margin: "0 auto",
    padding: "2.5rem 2rem",
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr auto 1fr auto 1fr",
    alignItems: "center",
    gap: "1rem",
  },
  statVal: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)",
    fontWeight: 600,
    color: "var(--text-primary)",
    letterSpacing: "-0.03em",
    lineHeight: 1,
    marginBottom: "0.3rem",
  },
  statLabel: {
    fontSize: "0.8rem",
    color: "var(--text-muted)",
    fontWeight: 400,
  },
  statsDivider: {
    width: 1,
    height: 40,
    background: "var(--border)",
  },

  /* SECTIONS */
  section: {
    padding: "7rem 2rem",
  },
  sectionHead: {
    maxWidth: 560,
    marginBottom: "3.5rem",
  },
  eyebrow: {
    fontSize: "0.75rem",
    fontWeight: 600,
    color: ACCENT,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    marginBottom: "0.75rem",
    margin: "0 0 0.75rem",
  },
  sectionH2: {
    fontSize: "clamp(1.6rem, 3.5vw, 2.25rem)",
    fontWeight: 600,
    color: "var(--text-primary)",
    letterSpacing: "-0.025em",
    lineHeight: 1.2,
    margin: "0 0 0.875rem",
  },
  sectionSub: {
    fontSize: "1rem",
    color: "var(--text-secondary)",
    lineHeight: 1.7,
    margin: 0,
  },

  /* FEATURES */
  featGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1px",
    border: "1px solid var(--border)",
    borderRadius: 14,
    overflow: "hidden",
    maxWidth: 1100,
    margin: "0 auto",
  },
  featCard: {
    background: "var(--bg-card)",
    padding: "1.75rem",
    transition: "border-color 0.2s, transform 0.2s",
    cursor: "default",
  },
  featIcon: {
    width: 36,
    height: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: ACCENT,
    marginBottom: "1rem",
    border: "1px solid var(--border)",
    borderRadius: 8,
    background: "var(--bg-secondary)",
  },
  featTitle: {
    fontSize: "0.95rem",
    fontWeight: 600,
    color: "var(--text-primary)",
    letterSpacing: "-0.01em",
    marginBottom: "0.5rem",
    margin: "0 0 0.5rem",
  },
  featDesc: {
    fontSize: "0.875rem",
    color: "var(--text-secondary)",
    lineHeight: 1.7,
    margin: 0,
    fontWeight: 400,
  },

  /* DEMO */
  demoShell: {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: 14,
    overflow: "hidden",
  },
  demoInputRow: {
    display: "flex",
    gap: "1rem",
    padding: "1.25rem 1.5rem",
    alignItems: "flex-end",
    flexWrap: "wrap",
  },
  demoField: {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
    flex: 1,
    minWidth: 120,
  },
  demoLabel: {
    fontSize: "0.72rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "var(--text-muted)",
  },
  demoSelect: {
    background: "var(--bg-primary)",
    border: "1px solid var(--border)",
    borderRadius: 7,
    padding: "0.45rem 0.65rem",
    fontSize: "0.875rem",
    color: "var(--text-primary)",
    cursor: "pointer",
    outline: "none",
    fontFamily: "inherit",
    appearance: "auto",
  },
  demoInput: {
    background: "var(--bg-primary)",
    border: "1px solid var(--border)",
    borderRadius: 7,
    padding: "0.45rem 0.65rem",
    fontSize: "0.875rem",
    color: "var(--text-primary)",
    outline: "none",
    fontFamily: "inherit",
    width: "100%",
  },
  generateBtn: {
    padding: "0.5rem 1.1rem",
    background: ACCENT,
    color: "#fff",
    border: "none",
    borderRadius: 7,
    fontSize: "0.875rem",
    fontWeight: 500,
    cursor: "pointer",
    whiteSpace: "nowrap",
    fontFamily: "inherit",
    transition: "opacity 0.15s",
    flexShrink: 0,
    height: 36,
    display: "flex",
    alignItems: "center",
  },
  demoDivider: {
    height: 1,
    background: "var(--border)",
  },
  demoOutput: {
    padding: "1.5rem",
  },
  demoOutputHeader: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "0.875rem",
  },
  demoOutputPlatform: {
    fontSize: "0.72rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "var(--text-muted)",
    padding: "0.2rem 0.5rem",
    border: "1px solid var(--border)",
    borderRadius: 5,
  },
  demoOutputTone: {
    fontSize: "0.72rem",
    fontWeight: 600,
    color: ACCENT,
    padding: "0.2rem 0.5rem",
    border: `1px solid ${ACCENT}30`,
    borderRadius: 5,
    background: `${ACCENT}10`,
  },
  demoOutputText: {
    fontSize: "0.9rem",
    color: "var(--text-secondary)",
    lineHeight: 1.75,
    whiteSpace: "pre-wrap",
    margin: "0 0 1.25rem",
  },
  demoOutputFooter: {
    display: "flex",
    gap: "0.5rem",
    borderTop: "1px solid var(--border)",
    paddingTop: "0.875rem",
  },
  demoAction: {
    display: "inline-flex",
    alignItems: "center",
    padding: "0.35rem 0.75rem",
    border: "1px solid var(--border)",
    borderRadius: 6,
    background: "var(--bg-secondary)",
    color: "var(--text-secondary)",
    fontSize: "0.78rem",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "border-color 0.15s",
  },
  spinner: {
    display: "inline-block",
    width: 12,
    height: 12,
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "#fff",
    borderRadius: "50%",
    animation: "spin 0.7s linear infinite",
  },

  /* CTA */
  ctaSection: {
    padding: "7rem 2rem",
    background: "var(--bg-secondary)",
    borderTop: "1px solid var(--border)",
    borderBottom: "1px solid var(--border)",
  },
  ctaInner: {
    maxWidth: 560,
    margin: "0 auto",
    textAlign: "center",
  },
  ctaH2: {
    fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
    fontWeight: 600,
    color: "var(--text-primary)",
    letterSpacing: "-0.025em",
    lineHeight: 1.15,
    marginBottom: "1rem",
    margin: "0 0 1rem",
  },
  ctaSub: {
    fontSize: "1rem",
    color: "var(--text-secondary)",
    lineHeight: 1.7,
    marginBottom: "2rem",
  },

  /* FOOTER */
  footer: {
    borderTop: "1px solid var(--border)",
    background: "var(--bg-primary)",
  },
  footerInner: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "4rem 2rem 3rem",
    display: "flex",
    gap: "4rem",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  footerBrand: { maxWidth: 240 },
  footerTagline: {
    fontSize: "0.85rem",
    color: "var(--text-muted)",
    lineHeight: 1.65,
    margin: "0.75rem 0 0",
  },
  footerCols: {
    display: "flex",
    gap: "3rem",
    flexWrap: "wrap",
  },
  footerCol: {
    display: "flex",
    flexDirection: "column",
    gap: "0.65rem",
  },
  footerColHead: {
    fontSize: "0.75rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "var(--text-primary)",
    margin: "0 0 0.25rem",
  },
  footerLink: {
    color: "var(--text-muted)",
    textDecoration: "none",
    fontSize: "0.875rem",
    transition: "color 0.15s",
  },
  footerBottom: {
    borderTop: "1px solid var(--border)",
    padding: "1.25rem 2rem",
    maxWidth: 1100,
    margin: "0 auto",
  },
};
