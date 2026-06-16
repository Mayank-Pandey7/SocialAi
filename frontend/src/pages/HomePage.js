import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../context/ThemeContext";

/* ─── Data ─── */
const FEATURES = [
  {
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    title: "Content engine",
    desc: "Generate platform-ready posts in seconds, in the tone you choose.",
  },
  {
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: "Trending topics",
    desc: "Surface what's relevant across tech, business and culture.",
  },
  {
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    title: "Analytics",
    desc: "A clean read on reach and engagement, without the noise.",
  },
  {
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    title: "Scheduler",
    desc: "Draft now, publish later. Your calendar, on your terms.",
  },
  {
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    title: "Multi-platform",
    desc: "Each post shaped for its destination — length, tone, format.",
  },
  {
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
      </svg>
    ),
    title: "No cost",
    desc: "Free models, no subscription, nothing held back.",
  },
];

const PLATFORMS = ["LinkedIn", "Twitter", "Instagram", "Facebook"];
const TONES = ["Professional", "Casual", "Funny", "Motivational", "Inspirational"];
const SAMPLE_OUTPUTS = {
  "LinkedIn-Professional":
    "AI isn't replacing human creativity — it's amplifying it. The most effective teams I've seen this year aren't the ones avoiding AI; they're the ones integrating it thoughtfully into their workflow.\n\nThe question isn't whether to adapt. It's how intentionally you do it.\n\n#Leadership #Innovation #FutureOfWork",
  "LinkedIn-Casual":
    "Hot take: spending 2 hours perfecting a LinkedIn post that gets 12 likes is wild when you could spend 10 minutes with AI and move on with your life.\n\nWorking smarter, not harder. #ProductivityTips",
  "Twitter-Professional":
    "The best content creators aren't the most talented writers.\n\nThey're the most consistent ones.\n\nAI doesn't replace your voice — it removes the friction so you can show up every day.",
  "Twitter-Funny":
    "me: I'll just write a quick tweet\nalso me: *opens AI tool*\nalso me: *stares at 12 generated options*\nalso me: *picks the first one and edits it anyway*\n\nthe circle of content creation",
  "Instagram-Motivational":
    "Every scroll is a choice. Every post is a statement.\n\nWhat are you saying about who you are?\n\nBuild the feed you want others to find.\n\n#ContentCreator #Mindset #GrowthMindset",
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

function useCounter(target, visible, duration = 900) {
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
function AnimatedSection({ children, className = "", style = {}, delay = 0, as = "div" }) {
  const [ref, visible] = useInView();
  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(10px)",
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

function StatCounter({ value, suffix, label, visible }) {
  const num = useCounter(value, visible);
  return (
    <div style={s.statItem}>
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
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    setLoading(true);
    setGenerated(false);
    setTimeout(() => {
      const key = `${platform}-${tone}`;
      setOutput(SAMPLE_OUTPUTS[key] || SAMPLE_OUTPUTS["LinkedIn-Professional"]);
      setLoading(false);
      setGenerated(true);
    }, 700);
  }, [platform, tone]);

  const copy = useCallback(() => {
    navigator.clipboard?.writeText(output).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }, [output]);

  return (
    <div style={s.demoShell}>
      {/* Input Row */}
      <div id="hp-demo-inputs" style={s.demoInputRow}>
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
        <div style={{ ...s.demoField, flex: "2 1 220px" }}>
          <label style={s.demoLabel}>Topic <span style={{ color: "var(--text-muted)", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(optional)</span></label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="AI in education, remote work…"
            style={s.demoInput}
            onKeyDown={(e) => e.key === "Enter" && generate()}
          />
        </div>
        <button onClick={generate} style={s.generateBtn} disabled={loading} className="hp-btn-primary">
          {loading ? "Generating…" : "Generate"}
        </button>
      </div>

      <div style={s.demoDivider} />

      {/* Output */}
      <div style={{ ...s.demoOutput, opacity: generated ? 1 : 0.45, transition: "opacity 0.2s ease" }}>
        <div style={s.demoOutputHeader}>
          <span style={s.demoOutputPlatform}>{platform}</span>
          <span style={s.demoOutputTone}>{tone}</span>
        </div>
        <p style={s.demoOutputText}>{output}</p>
        <div style={s.demoOutputFooter}>
          <button onClick={copy} style={s.demoAction} className="hp-action">
            {copied ? "Copied" : "Copy"}
          </button>
          <button onClick={generate} style={s.demoAction} className="hp-action">
            Regenerate
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function HomePage() {
  const { isDark, toggleTheme } = useTheme();
  const [statsRef, statsVisible] = useInView(0.3);

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
              className="hp-icon-btn"
            >
              <FontAwesomeIcon
                icon={isDark ? faSun : faMoon}
                style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}
              />
            </button>
            <Link to="/login" className="hp-signin nav-link" style={s.navLinkBtn}>Sign in</Link>
            <Link to="/register" style={s.navCta} className="hp-btn-primary">Get started</Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={s.hero}>
        <div id="hp-hero-layout" style={s.heroLayout}>
          <div style={s.heroInner}>
            <AnimatedSection delay={0}>
              <span style={s.badge}>
                <span style={s.badgeDot} />
                Free — no card required
              </span>
            </AnimatedSection>

            <AnimatedSection delay={0.05}>
              <h1 style={s.heroH1}>
                Write social posts<br />that sound like you
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <p style={s.heroSub}>
                Pick a platform and a tone. SocialAI drafts the post —
                you decide what goes out.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div style={s.heroCtas}>
                <Link to="/register" style={s.heroPrimary} className="hp-btn-primary">
                  Get started
                </Link>
                <a href="#demo" style={s.heroSecondary} className="hp-btn-secondary">View demo</a>
              </div>
            </AnimatedSection>
          </div>

          {/* Hero product preview */}
          <AnimatedSection
  delay={0.12}
  id="hp-hero-preview"
  style={s.heroPreview}
>
  <div style={s.socialCard}>
    <div style={s.socialHeader}>
      <div style={s.avatar}>M</div>

      <div>
        <div style={s.userName}>Mayank Pandey</div>
        <div style={s.userMeta}>
          Software Engineer • Just now
        </div>
      </div>
    </div>

    <div style={s.socialContent}>
      AI won't replace developers.

      <br /><br />

      Developers who use AI will replace
      developers who don't.

      <br /><br />

      The future belongs to people who
      learn to collaborate with AI.

      <br /><br />

      <span style={s.hashTag}>
        #AI #Technology
      </span>
    </div>

    <div style={s.socialFooter}>
      <span>👍 142</span>
      <span>💬 19</span>
      <span>↗️ 8</span>
    </div>
  </div>
</AnimatedSection>
        </div>
      </section>

      {/* ── STATS ── */}
      <div style={s.statsBand} ref={statsRef}>
        <div id="hp-stats" style={s.statsInner}>
          <StatCounter value={10000} suffix="+" label="Posts generated" visible={statsVisible} />
          <StatCounter value={5} suffix="" label="Platforms supported" visible={statsVisible} />
          <StatCounter value={100} suffix="%" label="Free to use" visible={statsVisible} />
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section id="features" style={s.section}>
        <div style={s.sectionHead}>
          <AnimatedSection>
            <p style={s.eyebrow}>Features</p>
            <h2 style={s.sectionH2}>Built to get out of your way</h2>
            <p style={s.sectionSub}>Fewer steps between an idea and a post that's ready to publish.</p>
          </AnimatedSection>
        </div>
        <div id="hp-feat-grid" style={s.featGrid}>
          {FEATURES.map((f, i) => (
            <AnimatedSection key={f.title} delay={i * 0.04} style={s.featCard} className="feat-card">
              <div style={s.featIcon}>{f.icon}</div>
              <h3 style={s.featTitle}>{f.title}</h3>
              <p style={s.featDesc}>{f.desc}</p>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ── DEMO ── */}
      <section id="demo" style={{ ...s.section, background: "var(--bg-secondary)" }}>
        <div style={s.demoSectionInner}>
          <div style={s.sectionHead}>
            <AnimatedSection>
              <p style={s.eyebrow}>Demo</p>
              <h2 style={s.sectionH2}>Try it now</h2>
              <p style={s.sectionSub}>Choose a platform and tone, then generate a real draft.</p>
            </AnimatedSection>
          </div>
          <AnimatedSection>
            <DemoSection />
          </AnimatedSection>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={s.ctaSection}>
        <AnimatedSection style={s.ctaInner}>
          <h2 style={s.ctaH2}>Start writing better posts</h2>
          <p style={s.ctaSub}>
            Free to use. No credit card. Set up in under a minute.
          </p>
          <div style={s.heroCtas}>
            <Link to="/register" style={s.heroPrimary} className="hp-btn-primary">
              Create free account
            </Link>
            <Link to="/login" style={s.heroSecondary} className="hp-btn-secondary">Sign in</Link>
          </div>
        </AnimatedSection>
      </section>

      {/* ── FOOTER ── */}
      <footer style={s.footer}>
        <div id="hp-footer-inner" style={s.footerInner}>
          <div style={s.footerBrand}>
            <div style={s.logo}>
              <span style={s.logoMark} />
              <span style={s.logoWord}>SocialAI</span>
            </div>
            <p style={s.footerTagline}>
              Social media content, written with AI.
            </p>
          </div>
          <div id="hp-footer-cols" style={s.footerCols}>
            <div style={s.footerCol}>
              <p style={s.footerColHead}>Product</p>
              <a href="#features" style={s.footerLink} className="footer-link">Features</a>
              <a href="#demo" style={s.footerLink} className="footer-link">Demo</a>
              <Link to="/register" style={s.footerLink} className="footer-link">Get started</Link>
            </div>
            <div style={s.footerCol}>
              <p style={s.footerColHead}>Account</p>
              <Link to="/login" style={s.footerLink} className="footer-link">Sign in</Link>
              <Link to="/register" style={s.footerLink} className="footer-link">Register</Link>
            </div>
            <div style={s.footerCol}>
              <p style={s.footerColHead}>Company</p>
              <a href="https://github.com/Mayank-Pandey7" target="_blank" rel="noreferrer" style={s.footerLink} className="footer-link">GitHub</a>
              <a href="#" style={s.footerLink} className="footer-link">Privacy</a>
              <a href="#" style={s.footerLink} className="footer-link">Terms</a>
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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; }

        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }

        .nav-link {
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--text-primary);
          transition: width 200ms ease-in-out;
        }
        .nav-link:hover::after { width: 100%; }

        .hp-icon-btn {
          transition: background-color 180ms ease-in-out, border-color 180ms ease-in-out;
        }
        .hp-icon-btn:hover {
          background: var(--bg-secondary);
        }

        .hp-btn-primary {
          transition: transform 180ms ease-in-out, box-shadow 180ms ease-in-out, opacity 180ms ease-in-out;
        }
        .hp-btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        .hp-btn-primary:focus-visible, .hp-btn-secondary:focus-visible, .hp-icon-btn:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }

        .hp-btn-secondary {
          transition: border-color 180ms ease-in-out, color 180ms ease-in-out, transform 180ms ease-in-out;
        }
        .hp-btn-secondary:hover {
          border-color: var(--text-secondary);
          transform: translateY(-1px);
        }

        .feat-card {
          transition: border-color 200ms ease-in-out, transform 200ms ease-in-out;
        }
        .feat-card:hover {
          border-color: var(--text-muted);
        }

        .hp-action {
          transition: border-color 180ms ease-in-out, background-color 180ms ease-in-out;
        }
        .hp-action:hover {
          border-color: var(--text-secondary);
        }

        .footer-link {
          transition: color 180ms ease-in-out;
        }
        .footer-link:hover {
          color: var(--text-primary);
        }

        select.hp-select-native {
          appearance: auto;
        }

        @media (max-width: 768px) {
          .hp-nav-links { display: none !important; }
          .hp-signin { display: none !important; }
        }
        @media (max-width: 900px) {
          #hp-hero-layout { flex-direction: column !important; gap: 3rem !important; }
          #hp-hero-preview { width: 100% !important; max-width: 480px !important; }
        }
        @media (max-width: 640px) {
          #hp-stats { grid-template-columns: repeat(3,1fr) !important; gap: 1.5rem !important; }
          #hp-feat-grid { grid-template-columns: 1fr !important; }
          #hp-demo-inputs { flex-direction: column !important; align-items: stretch !important; }
          #hp-demo-inputs > button { width: 100% !important; justify-content: center !important; }
          #hp-footer-cols { gap: 2rem !important; }
          #hp-footer-inner { flex-direction: column !important; gap: 2.5rem !important; }
          .hp-hero-section { padding: 7rem 1.25rem 4rem !important; }
        }
          #hp-hero-preview > div {transition: transform 220ms ease, box-shadow 220ms ease;}
          #hp-hero-preview > div:hover {transform: translateY(-4px);box-shadow: 0 12px 32px rgba(0,0,0,0.08);}
      `}</style>
    </div>
  );
}

/* ─── Styles ─── */
const ACCENT = "#0d6b5e";

const SPACE = (n) => `${n * 0.5}rem`; // 8px base unit

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
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
  },
  navInner: {
    maxWidth: 1120,
    margin: "0 auto",
    padding: "0 2rem",
    height: 64,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "0.55rem",
    textDecoration: "none",
    flexShrink: 0,
  },
  logoMark: {
    display: "inline-block",
    width: 16,
    height: 16,
    borderRadius: 4,
    background: ACCENT,
    flexShrink: 0,
  },
  logoWord: {
    fontSize: "0.92rem",
    fontWeight: 600,
    color: "var(--text-primary)",
    letterSpacing: "-0.01em",
  },
  navLinks: {
    display: "flex",
    gap: "2.25rem",
    marginLeft: "2.5rem",
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
    gap: SPACE(2),
    marginLeft: "auto",
    flexShrink: 0,
  },
  themeToggle: {
    background: "transparent",
    border: "1px solid var(--border)",
    cursor: "pointer",
    borderRadius: 6,
    width: 32,
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  navLinkBtn: {
    color: "var(--text-secondary)",
    textDecoration: "none",
    fontSize: "0.875rem",
    padding: "0.4rem 0.25rem",
  },
  navCta: {
    background: "var(--text-primary)",
    color: "var(--bg-primary)",
    textDecoration: "none",
    fontSize: "0.85rem",
    fontWeight: 500,
    padding: "0.5rem 1rem",
    borderRadius: 6,
    whiteSpace: "nowrap",
    display: "inline-flex",
    alignItems: "center",
  },

  /* HERO */
  hero: {
    maxWidth: 1120,
    margin: "0 auto",
    padding: "10rem 2rem 6rem",
    minHeight: "92vh",
    display: "flex",
    alignItems: "center",
  },
  heroLayout: {
    display: "flex",
    alignItems: "center",
    gap: "5rem",
    width: "100%",
  },
  heroInner: { flex: "1 1 480px", maxWidth: 520 },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.78rem",
    fontWeight: 500,
    color: "var(--text-muted)",
    marginBottom: "2rem",
    border: "1px solid var(--border)",
    borderRadius: 20,
    padding: "0.35rem 0.85rem",
  },
  badgeDot: {
    display: "inline-block",
    width: 5,
    height: 5,
    borderRadius: "50%",
    background: ACCENT,
    flexShrink: 0,
  },
  heroH1: {
    fontSize: "clamp(2.5rem, 4.6vw, 3.4rem)",
    fontWeight: 600,
    lineHeight: 1.15,
    letterSpacing: "-0.025em",
    color: "var(--text-primary)",
    margin: "0 0 1.5rem",
  },
  heroSub: {
    fontSize: "1.05rem",
    color: "var(--text-secondary)",
    lineHeight: 1.7,
    margin: "0 0 2.5rem",
    maxWidth: 440,
    fontWeight: 400,
  },
  heroCtas: {
    display: "flex",
    gap: "0.75rem",
    flexWrap: "wrap",
    alignItems: "center",
  },
  heroPrimary: {
    display: "inline-flex",
    alignItems: "center",
    padding: "0.7rem 1.3rem",
    background: ACCENT,
    color: "#fff",
    textDecoration: "none",
    borderRadius: 7,
    fontSize: "0.9rem",
    fontWeight: 500,
    letterSpacing: "-0.01em",
  },
  heroSecondary: {
    display: "inline-flex",
    alignItems: "center",
    padding: "0.7rem 1.3rem",
    color: "var(--text-secondary)",
    textDecoration: "none",
    borderRadius: 7,
    fontSize: "0.9rem",
    fontWeight: 400,
    border: "1px solid var(--border)",
  },
  heroPreview: {
    flex: "0 0 420px",
    maxWidth: 420,
  },

  /* Product preview card */
  previewCard: {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: 10,
    overflow: "hidden",
  },
  previewTop: {
    borderBottom: "1px solid var(--border)",
    padding: "0.75rem 1.25rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  previewTopLabel: {
    fontSize: "0.8rem",
    color: "var(--text-primary)",
    fontWeight: 500,
  },
  previewTopMeta: {
    fontSize: "0.72rem",
    color: "var(--text-muted)",
    fontWeight: 400,
  },
  previewBody: { padding: "1.5rem" },
  previewRow: { marginBottom: "1.25rem" },
  previewFieldLabel: {
    display: "block",
    fontSize: "0.7rem",
    fontWeight: 500,
    color: "var(--text-muted)",
    marginBottom: "0.5rem",
  },
  previewChips: { display: "flex", gap: "0.4rem", flexWrap: "wrap" },
  previewChip: {
    padding: "0.3rem 0.65rem",
    borderRadius: 6,
    border: "1px solid var(--border)",
    fontSize: "0.78rem",
    color: "var(--text-secondary)",
    cursor: "default",
  },
  previewChipActive: {
    border: `1px solid ${ACCENT}`,
    color: ACCENT,
  },
  previewInputMock: {
    padding: "0.5rem 0.75rem",
    borderRadius: 6,
    border: "1px solid var(--border)",
    fontSize: "0.82rem",
    color: "var(--text-primary)",
  },
  previewDivider: {
    height: 1,
    background: "var(--border)",
    margin: "1.25rem 0",
  },
  previewOutputLabel: {
    fontSize: "0.7rem",
    fontWeight: 500,
    color: "var(--text-muted)",
    marginBottom: "0.6rem",
  },
  previewOutputText: {
    fontSize: "0.84rem",
    color: "var(--text-secondary)",
    lineHeight: 1.7,
    margin: 0,
  },

  /* STATS */
  statsBand: {
    borderTop: "1px solid var(--border)",
    borderBottom: "1px solid var(--border)",
  },
  statsInner: {
    maxWidth: 760,
    margin: "0 auto",
    padding: "3rem 2rem",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "2rem",
  },
  statItem: { textAlign: "center" },
  statVal: {
    fontSize: "clamp(1.6rem, 3vw, 2rem)",
    fontWeight: 600,
    color: "var(--text-primary)",
    letterSpacing: "-0.02em",
    lineHeight: 1,
    marginBottom: "0.4rem",
  },
  statLabel: {
    fontSize: "0.8rem",
    color: "var(--text-muted)",
    fontWeight: 400,
  },

  /* SECTIONS */
  section: {
    padding: "7rem 2rem",
  },
  sectionHead: {
    maxWidth: 520,
    marginBottom: "3.5rem",
  },
  eyebrow: {
    fontSize: "0.78rem",
    fontWeight: 500,
    color: "var(--text-muted)",
    margin: "0 0 0.75rem",
  },
  sectionH2: {
    fontSize: "clamp(1.5rem, 3vw, 2rem)",
    fontWeight: 600,
    color: "var(--text-primary)",
    letterSpacing: "-0.02em",
    lineHeight: 1.25,
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
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "2.5rem 2rem",
    maxWidth: 1120,
    margin: "0 auto",
  },
  featCard: {
    padding: 0,
    cursor: "default",
    borderTop: "1px solid var(--border)",
    paddingTop: "1.5rem",
  },
  featIcon: {
    width: 30,
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: ACCENT,
    marginBottom: "1rem",
  },
  featTitle: {
    fontSize: "0.95rem",
    fontWeight: 600,
    color: "var(--text-primary)",
    letterSpacing: "-0.01em",
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
  demoSectionInner: {
    maxWidth: 880,
    margin: "0 auto",
  },
  demoShell: {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: 10,
    overflow: "hidden",
  },
  demoInputRow: {
    display: "flex",
    gap: "1rem",
    padding: "1.5rem",
    alignItems: "flex-end",
    flexWrap: "wrap",
  },
  demoField: {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
    flex: "1 1 130px",
    minWidth: 130,
  },
  demoLabel: {
    fontSize: "0.72rem",
    fontWeight: 500,
    color: "var(--text-muted)",
  },
  demoSelect: {
    background: "var(--bg-primary)",
    border: "1px solid var(--border)",
    borderRadius: 6,
    padding: "0.5rem 0.65rem",
    fontSize: "0.875rem",
    color: "var(--text-primary)",
    cursor: "pointer",
    outline: "none",
    fontFamily: "inherit",
  },
  demoInput: {
    background: "var(--bg-primary)",
    border: "1px solid var(--border)",
    borderRadius: 6,
    padding: "0.5rem 0.65rem",
    fontSize: "0.875rem",
    color: "var(--text-primary)",
    outline: "none",
    fontFamily: "inherit",
    width: "100%",
  },
  generateBtn: {
    padding: "0.55rem 1.2rem",
    background: ACCENT,
    color: "#fff",
    border: "none",
    borderRadius: 6,
    fontSize: "0.875rem",
    fontWeight: 500,
    cursor: "pointer",
    whiteSpace: "nowrap",
    fontFamily: "inherit",
    flexShrink: 0,
    height: 38,
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
    marginBottom: "1rem",
  },
  demoOutputPlatform: {
    fontSize: "0.72rem",
    fontWeight: 500,
    color: "var(--text-muted)",
    padding: "0.2rem 0.55rem",
    border: "1px solid var(--border)",
    borderRadius: 4,
  },
  demoOutputTone: {
    fontSize: "0.72rem",
    fontWeight: 500,
    color: ACCENT,
    padding: "0.2rem 0.55rem",
    border: `1px solid ${ACCENT}40`,
    borderRadius: 4,
  },
  demoOutputText: {
    fontSize: "0.9rem",
    color: "var(--text-secondary)",
    lineHeight: 1.75,
    whiteSpace: "pre-wrap",
    margin: "0 0 1.5rem",
  },
  demoOutputFooter: {
    display: "flex",
    gap: "0.5rem",
    borderTop: "1px solid var(--border)",
    paddingTop: "1rem",
  },
  demoAction: {
    display: "inline-flex",
    alignItems: "center",
    padding: "0.4rem 0.8rem",
    border: "1px solid var(--border)",
    borderRadius: 6,
    background: "transparent",
    color: "var(--text-secondary)",
    fontSize: "0.78rem",
    cursor: "pointer",
    fontFamily: "inherit",
  },

  /* CTA */
  ctaSection: {
    padding: "7rem 2rem",
    borderTop: "1px solid var(--border)",
  },
  ctaInner: {
    maxWidth: 480,
    margin: "0 auto",
    textAlign: "center",
  },
  ctaH2: {
    fontSize: "clamp(1.6rem, 3.5vw, 2.1rem)",
    fontWeight: 600,
    color: "var(--text-primary)",
    letterSpacing: "-0.02em",
    lineHeight: 1.2,
    margin: "0 0 0.875rem",
  },
  ctaSub: {
    fontSize: "1rem",
    color: "var(--text-secondary)",
    lineHeight: 1.7,
    margin: "0 0 2rem",
  },

  socialCard: {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: 14,
  padding: "1.5rem",
  boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
  transition: "all 0.25s ease",
},

socialHeader: {
  display: "flex",
  alignItems: "center",
  gap: "0.9rem",
  marginBottom: "1.2rem",
},

avatar: {
  width: 42,
  height: 42,
  borderRadius: "50%",
  background: "#0d6b5e",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 600,
  fontSize: "1rem",
},

userName: {
  fontWeight: 600,
  fontSize: "0.95rem",
  color: "var(--text-primary)",
},

userMeta: {
  fontSize: "0.75rem",
  color: "var(--text-muted)",
  marginTop: 2,
},

socialContent: {
  fontSize: "0.92rem",
  lineHeight: 1.75,
  color: "var(--text-secondary)",
  marginBottom: "1.4rem",
},

hashTag: {
  color: "#0d6b5e",
  fontWeight: 500,
},

socialFooter: {
  display: "flex",
  gap: "1.6rem",
  paddingTop: "1rem",
  borderTop: "1px solid var(--border)",
  color: "var(--text-muted)",
  fontSize: "0.85rem",
},

  /* FOOTER */
  footer: {
    borderTop: "1px solid var(--border)",
  },
  footerInner: {
    maxWidth: 1120,
    margin: "0 auto",
    padding: "4rem 2rem 2.5rem",
    display: "flex",
    gap: "4rem",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  footerBrand: { maxWidth: 220 },
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
    color: "var(--text-primary)",
    margin: "0 0 0.25rem",
  },
  footerLink: {
    color: "var(--text-muted)",
    textDecoration: "none",
    fontSize: "0.875rem",
  },
  footerBottom: {
    borderTop: "1px solid var(--border)",
    padding: "1.25rem 2rem",
    maxWidth: 1120,
    margin: "0 auto",
  },
};
