import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../context/ThemeContext";

/* ─── Sample & Preset Data ─── */
const PLATFORMS = [
  { id: "LinkedIn", label: "LinkedIn", icon: "💼", color: "#0a66c2" },
  { id: "Twitter", label: "Twitter / X", icon: "𝕏", color: "#38bdf8" },
  { id: "Instagram", label: "Instagram", icon: "📸", color: "#e1306c" },
  { id: "Threads", label: "Threads", icon: "🌀", color: "#a855f7" },
];

const TONES = [
  { id: "Professional", label: "Professional", badge: "💼 Corporate", desc: "Authoritative & clear" },
  { id: "Casual", label: "Casual", badge: "☕ Friendly", desc: "Conversational & human" },
  { id: "Viral", label: "Viral / Bold", badge: "🔥 High Engagement", desc: "Punchy & hooks attention" },
  { id: "Motivational", label: "Inspiring", badge: "⚡ Uplifting", desc: "Action-oriented & deep" },
];

const PRESETS = [
  { label: "🚀 Product Launch", prompt: "We just launched our new AI analytics dashboard today after 6 months of work!", platform: "LinkedIn", tone: "Professional" },
  { label: "💡 Developer Hot Take", prompt: "AI isn't taking developer jobs, it's raising the bar for what one developer can build.", platform: "Twitter", tone: "Viral" },
  { label: "🔥 Weekly Growth Tip", prompt: "3 simple content habits that doubled our organic reach in 30 days.", platform: "Instagram", tone: "Motivational" },
  { label: "☕ Remote Work Culture", prompt: "Why async communication and documentation matter more than video calls.", platform: "Threads", tone: "Casual" },
];

const SAMPLE_OUTPUTS = {
  "LinkedIn-Professional":
    "AI isn't replacing human creativity — it's amplifying it.\n\nThe most effective teams this year aren't the ones avoiding AI tools; they're the ones integrating them thoughtfully into their core workflows.\n\nKey takeaways from our journey:\n1. Focus on strategy over execution speed\n2. Maintain your unique brand voice\n3. Use AI to remove friction, not replace human judgment\n\nHow is your organization adapting to AI workflows?\n\n#Leadership #Innovation #FutureOfWork #AI",
  "LinkedIn-Casual":
    "Spent 6 months building our new AI analytics tool... and 6 minutes figuring out how to describe it simply. 😂\n\nHonest truth: product launches are exhausting, but seeing real users get value makes every late night worth it.\n\nCheck it out and let me know your thoughts!\n\n#BuildInPublic #StartupLife #SaaS",
  "Twitter-Viral":
    "The best content creators don't write more.\n\nThey refine faster.\n\nAI doesn't replace your voice — it strips away the friction so you can show up consistently every single day.\n\nAgree or disagree? 👇",
  "Twitter-Professional":
    "Building in public update:\n\n1. AI drafting cuts content creation time by 75%\n2. Consistency improves organic reach exponentially\n3. Quality + platform tailoring = high engagement\n\nStop writing from scratch.",
  "Instagram-Motivational":
    "Every post is a seed planted for your future audience. 🌿\n\nStop waiting for perfect inspiration. Use smart tools, share authentic value, and build the feed you want the world to discover.\n\nSave this post for your next content strategy session! ✨\n\n#ContentCreator #Mindset #GrowthMindset #DigitalStrategy",
  "Threads-Casual":
    "Async communication tip of the week: if a meeting could be a well-structured document, write the document.\n\nYour team's deep work time will thank you. 🧠✨",
};

const FEATURES = [
  {
    tag: "AI Coprocessor",
    title: "Platform-Native Content Engine",
    desc: "Generate posts tailored for LinkedIn long-form, Twitter punchy threads, or Instagram visual captions in one click.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    span: "col-span-2",
  },
  {
    tag: "Viral Score",
    title: "Engagement Prediction Index",
    desc: "Real-time AI metrics on post readability, hook strength, and viral potential before you publish.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    span: "col-span-1",
  },
  {
    tag: "Real-time Trends",
    title: "Trending Topics Feed",
    desc: "Automatically surface trending industry news across tech, startup culture, and design.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
      </svg>
    ),
    span: "col-span-1",
  },
  {
    tag: "Smart Scheduler",
    title: "Queue Calendar & Time Optimization",
    desc: "Draft content in advance, organize queue schedules, and maintain non-stop publishing consistency.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    span: "col-span-2",
  },
];

const COMPARISONS = [
  { feature: "Content Generation Speed", legacy: "2 - 3 Hours / post", borea: "⚡ 5 Seconds with AI" },
  { feature: "Multi-Platform Formatting", legacy: "Manual re-writing & editing", borea: "🌐 Automatic 1-Click Adaptation" },
  { feature: "Tone Precision", legacy: "Inconsistent brand voice", borea: "🎯 5+ Custom Persona Tones" },
  { feature: "Engagement Analytics", legacy: "Guesswork after posting", borea: "🔥 Real-time Pre-publish Viral Score" },
  { feature: "Cost & Accessibility", legacy: "$500+/mo copywriting retainers", borea: "💎 100% Free & Unlimited Access" },
];

const TESTIMONIALS = [
  {
    name: "Alex Rivera",
    role: "Founder @ TechFlow",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    text: "SocialAI cut down our social media drafting time from 3 hours a day to less than 15 minutes. The Borea-style AI engine is mindblowing!",
    stars: 5,
    tag: "Verified Founder",
  },
  {
    name: "Sarah Chen",
    role: "Head of Growth @ BuildScale",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    text: "The platform-specific adaptation is a game changer. LinkedIn posts feel genuinely professional while Twitter drafts hit the viral hooks.",
    stars: 5,
    tag: "Growth Lead",
  },
  {
    name: "Marcus Vance",
    role: "Indie Creator & Developer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    text: "I used to struggle with writer's block every single morning. Now I just type my rough idea and SocialAI transforms it into 4 polished posts.",
    stars: 5,
    tag: "Content Creator",
  },
];

const FAQS = [
  {
    q: "Is SocialAI completely free to use?",
    a: "Yes! You get unrestricted access to post generation, tone switching, and platform formatting with zero subscriptions or credit card requirements.",
  },
  {
    q: "Which social media platforms are supported?",
    a: "SocialAI natively generates and formats posts for LinkedIn, Twitter / X, Instagram, Threads, and Facebook with platform-tailored lengths and hashtag styles.",
  },
  {
    q: "Can I customize the generated AI tone?",
    a: "Absolutely. Choose between Professional, Casual, Viral, Motivational, Funny, or direct technical tones to match your exact personal brand.",
  },
  {
    q: "How does SocialAI adapt content for different platforms?",
    a: "Our AI engine automatically adjusts line spacing, hashtag density, length limits, and call-to-action hooks specifically for each platform's algorithm.",
  },
];

/* ─── Custom Hooks ─── */
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

function useCounter(target, visible, duration = 1000) {
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

function StatCounter({ value, suffix, label, icon, visible }) {
  const count = useCounter(value, visible);
  return (
    <div className="borea-stat-card">
      <div className="borea-stat-icon">{icon}</div>
      <div className="borea-stat-val">{count.toLocaleString()}{suffix}</div>
      <div className="borea-stat-lbl">{label}</div>
    </div>
  );
}

/* ─── Borea Interactive Studio Playground ─── */
function LiveStudioDemo() {
  const [selectedPlatform, setSelectedPlatform] = useState("LinkedIn");
  const [selectedTone, setSelectedTone] = useState("Professional");
  const [customPrompt, setCustomPrompt] = useState("");
  const [outputText, setOutputText] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [viralScore, setViralScore] = useState(96);

  const triggerGeneration = useCallback((plat = selectedPlatform, tne = selectedTone, prmpt = customPrompt) => {
    setIsGenerating(true);
    setDisplayedText("");
    
    setTimeout(() => {
      const key = `${plat}-${tne}`;
      let targetResult = SAMPLE_OUTPUTS[key] || SAMPLE_OUTPUTS["LinkedIn-Professional"];
      if (prmpt.trim()) {
        targetResult = `💡 [${tne} Draft for ${plat}]:\n\n${prmpt.trim()}\n\nHere is how to share this with maximum impact:\n- High hook opening statement\n- Clean line breaks for mobile readability\n- Strategic call to action at the bottom.\n\n#BuildInPublic #${plat} #AI`;
      }
      
      setOutputText(targetResult);
      setViralScore(Math.floor(Math.random() * 6) + 94);
      setIsGenerating(false);

      // Typewriter Effect
      let idx = 0;
      const timer = setInterval(() => {
        if (idx <= targetResult.length) {
          setDisplayedText(targetResult.slice(0, idx));
          idx += 3;
        } else {
          setDisplayedText(targetResult);
          clearInterval(timer);
        }
      }, 15);
    }, 600);
  }, [selectedPlatform, selectedTone, customPrompt]);

  useEffect(() => {
    triggerGeneration("LinkedIn", "Professional", "");
  }, [triggerGeneration]);

  const handleCopy = () => {
    navigator.clipboard?.writeText(outputText || displayedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const applyPreset = (preset) => {
    setSelectedPlatform(preset.platform);
    setSelectedTone(preset.tone);
    setCustomPrompt(preset.prompt);
    triggerGeneration(preset.platform, preset.tone, preset.prompt);
  };

  return (
    <div className="borea-studio-card">
      <div className="borea-window-bar">
        <div className="borea-window-dots">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
        <span className="borea-window-title">✨ Borea AI Engine • Live Content Studio</span>
        <div className="borea-window-badge">v2.0 Active</div>
      </div>

      {/* Preset Chips */}
      <div className="borea-presets-bar">
        <span className="preset-label">Preset Ideas:</span>
        {PRESETS.map((p) => (
          <button key={p.label} onClick={() => applyPreset(p)} className="borea-preset-chip">
            {p.label}
          </button>
        ))}
      </div>

      {/* Controls Grid */}
      <div className="borea-controls-grid">
        <div className="control-box">
          <label className="borea-label">Target Platform</label>
          <div className="borea-pills">
            {PLATFORMS.map((p) => (
              <button
                key={p.id}
                onClick={() => { setSelectedPlatform(p.id); triggerGeneration(p.id, selectedTone, customPrompt); }}
                className={`borea-pill ${selectedPlatform === p.id ? "active" : ""}`}
              >
                <span>{p.icon}</span> {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="control-box">
          <label className="borea-label">Tone Persona</label>
          <div className="borea-pills">
            {TONES.map((t) => (
              <button
                key={t.id}
                onClick={() => { setSelectedTone(t.id); triggerGeneration(selectedPlatform, t.id, customPrompt); }}
                className={`borea-pill ${selectedTone === t.id ? "active" : ""}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Prompt Input */}
      <div className="borea-input-bar">
        <input
          type="text"
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && triggerGeneration()}
          placeholder="Type an idea, bullet point, or blog summary..."
          className="borea-prompt-field"
        />
        <button
          onClick={() => triggerGeneration()}
          disabled={isGenerating}
          className="borea-generate-btn"
        >
          {isGenerating ? "Synthesizing..." : "⚡ Generate Draft"}
        </button>
      </div>

      {/* Output Screen */}
      <div className="borea-output-screen">
        <div className="borea-output-top">
          <div className="meta-info">
            <span className="borea-tag platform">{selectedPlatform}</span>
            <span className="borea-tag tone">{selectedTone}</span>
          </div>
          <div className="meta-stats">
            <span className="borea-viral">🔥 Viral Index: {viralScore}/100</span>
            <span className="borea-count">{(displayedText || "").length} chars</span>
          </div>
        </div>

        <div className="borea-output-content">
          <pre className="borea-code-text">
            {displayedText}
            <span className="borea-cursor">|</span>
          </pre>
        </div>

        <div className="borea-output-actions">
          <div className="left-btns">
            <button onClick={handleCopy} className="borea-action-btn primary">
              {copied ? "✓ Copied!" : "📋 Copy Post"}
            </button>
            <button onClick={() => triggerGeneration()} className="borea-action-btn secondary">
              🔄 Regenerate
            </button>
          </div>
          <div className="right-btns">
            <Link to="/register" className="borea-action-btn glow">
              🚀 Schedule & Publish &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── FAQ Item ─── */
function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`borea-faq-item ${open ? "open" : ""}`} onClick={() => setOpen(!open)}>
      <div className="borea-faq-head">
        <h3>{faq.q}</h3>
        <span className="borea-faq-icon">{open ? "−" : "+"}</span>
      </div>
      {open && <div className="borea-faq-body"><p>{faq.a}</p></div>}
    </div>
  );
}

/* ─── MAIN HOME PAGE COMPONENT ─── */
export default function HomePage() {
  const { isDark, toggleTheme } = useTheme();
  const [statsRef, statsVisible] = useInView(0.2);
  const [interactiveTone, setInteractiveTone] = useState(75);

  return (
    <div className="borea-landing-wrapper">
      {/* Radial Atmospheric Lighting Flares */}
      <div className="borea-atmosphere">
        <div className="borea-flare flare-cyan"></div>
        <div className="borea-flare flare-violet"></div>
        <div className="borea-flare flare-teal"></div>
        <div className="borea-grid-pattern"></div>
      </div>

      {/* ── NAVBAR ── */}
      <nav className="borea-nav">
        <div className="borea-nav-container">
          <Link to="/" className="borea-brand">
            <div className="borea-logo-symbol">✦</div>
            <span className="borea-brand-name">SocialAI</span>
            <span className="borea-v2-badge">Borea AI v2</span>
          </Link>

          <div className="borea-nav-links">
            <a href="#features">Features</a>
            <a href="#demo">AI Studio</a>
            <a href="#comparison">Comparison</a>
            <a href="#testimonials">Wall of Love</a>
            <a href="#faq">FAQ</a>
          </div>

          <div className="borea-nav-actions">
            <button onClick={toggleTheme} className="borea-theme-btn" aria-label="Toggle theme">
              <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
            </button>
            <Link to="/login" className="borea-link-btn">Sign In</Link>
            <Link to="/register" className="borea-btn-gradient">Start Free &rarr;</Link>
          </div>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section className="borea-hero">
        <div className="borea-hero-header">
          <div className="borea-hero-badge">
            <span className="borea-dot"></span>
            <span>Borea-Class AI Content Engine • 100% Free & Open</span>
          </div>

          <h1 className="borea-hero-title">
            Automate Your Social Media <br />
            <span className="borea-text-gradient">With Precision AI</span>
          </h1>

          <p className="borea-hero-subtitle">
            Craft high-converting, platform-tailored posts for LinkedIn, Twitter/X, Instagram & Threads in seconds.
          </p>

          <div className="borea-hero-actions">
            <Link to="/register" className="borea-cta-main">
              <span>Start Writing Free</span>
              <span className="borea-cta-glow"></span>
            </Link>
            <a href="#demo" className="borea-cta-glass">
              <span>Explore Live Studio</span>
              <span>&darr;</span>
            </a>
          </div>

          <div className="borea-social-trust">
            <span>Powering 10,000+ founders, tech leads & creators globally</span>
            <span className="stars">★★★★★ 4.9/5</span>
          </div>
        </div>

        {/* Hero Interactive Social Post Card Mockup */}
        <div className="borea-hero-mockup">
          <div className="borea-card">
            <div className="borea-card-author">
              <img src="/mayank.jpg" alt="Mayank Pandey" className="borea-avatar" />
              <div className="author-details">
                <div className="name">Mayank Pandey <span className="check">✓</span></div>
                <div className="title">Founder @ SocialAI • Just now</div>
              </div>
              <span className="platform-pill">LinkedIn</span>
            </div>

            <div className="borea-card-content">
              "AI won't replace content creators.
              <br /><br />
              Creators who master AI tools will replace creators who don't.
              <br /><br />
              The secret isn't writing more words — it's removing friction so you can share authentic insights consistently."
              <br /><br />
              <span className="hashtags">#BuildInPublic #AI #SocialMedia #GrowthMindset</span>
            </div>

            <img
              src="/mayank.jpg"
              alt="Mayank Pandey LinkedIn Attachment"
              className="borea-post-img"
            />

            <div className="borea-card-footer">
              <span>👍 <strong>1,842</strong> Likes</span>
              <span>💬 <strong>249</strong> Comments</span>
              <span>🔁 <strong>114</strong> Reposts</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── INFINITE MARQUEE BRAND BAR ── */}
      <div className="borea-marquee-wrap">
        <div className="borea-marquee-track">
          <span>⚡ LINKEDIN OPTIMIZED</span>
          <span>✦ TWITTER/X HOOK ENGINE</span>
          <span>🚀 INSTAGRAM CAPTION GENERATOR</span>
          <span>🌀 THREADS CONVERSATIONAL AI</span>
          <span>🔥 PRE-PUBLISH VIRAL SCORE</span>
          <span>⚡ LINKEDIN OPTIMIZED</span>
          <span>✦ TWITTER/X HOOK ENGINE</span>
          <span>🚀 INSTAGRAM CAPTION GENERATOR</span>
          <span>🌀 THREADS CONVERSATIONAL AI</span>
          <span>🔥 PRE-PUBLISH VIRAL SCORE</span>
        </div>
      </div>

      {/* ── STATS BAND ── */}
      <section className="borea-stats-section" ref={statsRef}>
        <div className="borea-stats-grid">
          <StatCounter value={50000} suffix="+" label="Posts Generated" icon="🚀" visible={statsVisible} />
          <StatCounter value={5} suffix="" label="Platforms Supported" icon="🌐" visible={statsVisible} />
          <StatCounter value={98} suffix="%" label="Time Saved" icon="⚡" visible={statsVisible} />
          <StatCounter value={100} suffix="%" label="Free Access" icon="💎" visible={statsVisible} />
        </div>
      </section>

      {/* ── LIVE DEMO STUDIO ── */}
      <section id="demo" className="borea-section">
        <div className="borea-section-head">
          <span className="borea-eyebrow">Interactive Studio</span>
          <h2 className="borea-h2">Test the Borea Engine Live</h2>
          <p className="borea-sub">Experience real-time AI post generation with multi-tone synthesis.</p>
        </div>
        <LiveStudioDemo />
      </section>

      {/* ── BENTO FEATURES ── */}
      <section id="features" className="borea-section">
        <div className="borea-section-head">
          <span className="borea-eyebrow">Built for Growth</span>
          <h2 className="borea-h2">Enterprise Content Infrastructure</h2>
          <p className="borea-sub">Everything you need to grow your personal brand and business reach.</p>
        </div>

        <div className="borea-bento-grid">
          {FEATURES.map((f, i) => (
            <div key={f.title} className={`borea-bento-card ${f.span}`}>
              <div className="borea-bento-icon">{f.icon}</div>
              <span className="borea-bento-tag">{f.tag}</span>
              <h3 className="borea-bento-title">{f.title}</h3>
              <p className="borea-bento-desc">{f.desc}</p>

              {i === 0 && (
                <div className="bento-tone-demo">
                  <div className="tone-label-row">
                    <span>Active Tone Persona:</span>
                    <strong>{interactiveTone < 33 ? "💼 Corporate" : interactiveTone < 66 ? "☕ Casual" : "🔥 Viral Hook"}</strong>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={interactiveTone}
                    onChange={(e) => setInteractiveTone(Number(e.target.value))}
                    className="borea-slider"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── COMPARISON MATRIX ── */}
      <section id="comparison" className="borea-section">
        <div className="borea-section-head">
          <span className="borea-eyebrow">Why SocialAI?</span>
          <h2 className="borea-h2">Legacy Copywriting vs SocialAI Engine</h2>
        </div>

        <div className="borea-table-card">
          <table className="borea-table">
            <thead>
              <tr>
                <th>Capability</th>
                <th>Traditional Writing</th>
                <th>SocialAI Engine</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISONS.map((c) => (
                <tr key={c.feature}>
                  <td className="feat-name">{c.feature}</td>
                  <td className="legacy-cell">{c.legacy}</td>
                  <td className="borea-cell">{c.borea}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── TESTIMONIALS / WALL OF LOVE ── */}
      <section id="testimonials" className="borea-section">
        <div className="borea-section-head">
          <span className="borea-eyebrow">Wall of Love</span>
          <h2 className="borea-h2">Trusted by Top Tech Founders</h2>
        </div>

        <div className="borea-testimonials-grid">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="borea-t-card">
              <div className="head-row">
                <img src={t.avatar} alt={t.name} className="avatar" />
                <div>
                  <div className="name">{t.name}</div>
                  <div className="role">{t.role}</div>
                </div>
                <span className="badge">{t.tag}</span>
              </div>
              <p className="text">"{t.text}"</p>
              <div className="stars">{"★".repeat(t.stars)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section id="faq" className="borea-section faq-width">
        <div className="borea-section-head">
          <span className="borea-eyebrow">Frequently Asked</span>
          <h2 className="borea-h2">Got Questions? We Have Answers.</h2>
        </div>

        <div className="borea-faq-list">
          {FAQS.map((faq) => (
            <FAQItem key={faq.q} faq={faq} />
          ))}
        </div>
      </section>

      {/* ── HIGH-IMPACT CTA ── */}
      <section className="borea-cta-section">
        <div className="borea-cta-box">
          <h2 className="title">Supercharge Your Social Presence Today</h2>
          <p className="sub">Join thousands of creators using SocialAI to post 10x faster with AI precision.</p>
          <div className="btn-row">
            <Link to="/register" className="borea-cta-main">Create Free Account &rarr;</Link>
            <Link to="/login" className="borea-cta-glass">Sign In to Dashboard</Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="borea-footer">
        <div className="borea-footer-inner">
          <div className="borea-footer-brand">
            <div className="borea-brand">
              <div className="borea-logo-symbol">✦</div>
              <span className="borea-brand-name">SocialAI</span>
            </div>
            <p className="tagline">Next-generation AI social media content platform.</p>
            <div className="borea-status">
              <span className="green-dot"></span> Systems Operational • v2.0
            </div>
          </div>

          <div className="borea-footer-links">
            <div className="col">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#demo">Live Studio</a>
              <a href="#comparison">Comparison</a>
            </div>
            <div className="col">
              <h4>Account</h4>
              <Link to="/login">Sign In</Link>
              <Link to="/register">Register</Link>
              <Link to="/dashboard">Dashboard</Link>
            </div>
            <div className="col">
              <h4>Company</h4>
              <a href="https://github.com/Mayank-Pandey7" target="_blank" rel="noreferrer">GitHub</a>
              <a href="#faq">FAQ</a>
            </div>
          </div>
        </div>

        <div className="borea-footer-bottom">
          <span>© {new Date().getFullYear()} SocialAI. Built by <a href="https://github.com/Mayank-Pandey7" target="_blank" rel="noreferrer">@Mayank-Pandey7</a></span>
        </div>
      </footer>

      {/* ── BOREA STARTUP DESIGN CSS ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap');

        .borea-landing-wrapper {
          position: relative;
          background: #06090e;
          color: #e0f2f1;
          font-family: 'Plus Jakarta Sans', sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
        }

        body.light .borea-landing-wrapper {
          background: #f4faf9;
          color: #0f2e2b;
        }

        /* Atmosphere Flares */
        .borea-atmosphere {
          position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden;
        }
        .borea-flare {
          position: absolute; border-radius: 50%; filter: blur(120px); opacity: 0.22;
          animation: boreaFloat 20s ease-in-out infinite alternate;
        }
        .flare-cyan { width: 600px; height: 600px; background: radial-gradient(circle, #06b6d4 0%, #0d9488 100%); top: -150px; left: -150px; }
        .flare-violet { width: 700px; height: 700px; background: radial-gradient(circle, #8b5cf6 0%, #ec4899 100%); top: 35%; right: -250px; animation-delay: -7s; }
        .flare-teal { width: 500px; height: 500px; background: radial-gradient(circle, #10b981 0%, #0ea5e9 100%); bottom: -150px; left: 25%; animation-delay: -14s; }
        @keyframes boreaFloat { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(70px, 90px) scale(1.12); } }
        .borea-grid-pattern {
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px);
          background-size: 36px 36px; opacity: 0.5;
        }

        /* Navbar */
        .borea-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          background: rgba(6, 9, 14, 0.82); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        body.light .borea-nav { background: rgba(244, 250, 249, 0.88); border-bottom-color: rgba(0,0,0,0.08); }
        .borea-nav-container {
          max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; height: 72px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .borea-brand { display: flex; align-items: center; gap: 0.6rem; text-decoration: none; color: inherit; }
        .borea-logo-symbol {
          width: 36px; height: 36px; border-radius: 10px;
          background: linear-gradient(135deg, #0d9488 0%, #8b5cf6 100%);
          display: flex; align-items: center; justify-content: center; color: #fff; font-size: 1.1rem;
          box-shadow: 0 0 20px rgba(13, 148, 136, 0.45);
        }
        .borea-brand-name { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 1.3rem; }
        .borea-v2-badge {
          font-size: 0.68rem; background: rgba(13, 148, 136, 0.2); color: #2dd4bf; padding: 0.2rem 0.5rem; border-radius: 12px; font-weight: 600; border: 1px solid rgba(13, 148, 136, 0.3);
        }
        .borea-nav-links { display: flex; gap: 2rem; }
        .borea-nav-links a { color: #7fa9a6; text-decoration: none; font-size: 0.9rem; font-weight: 500; transition: color 0.2s; }
        .borea-nav-links a:hover { color: #fff; }
        .borea-nav-actions { display: flex; align-items: center; gap: 1rem; }
        .borea-theme-btn {
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: inherit;
          width: 36px; height: 36px; border-radius: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center;
        }
        .borea-link-btn { color: #7fa9a6; text-decoration: none; font-size: 0.9rem; font-weight: 500; }
        .borea-btn-gradient {
          background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%); color: #fff; text-decoration: none;
          padding: 0.65rem 1.2rem; border-radius: 10px; font-size: 0.88rem; font-weight: 600;
          box-shadow: 0 4px 20px rgba(13, 148, 136, 0.35); transition: all 0.2s;
        }
        .borea-btn-gradient:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(13, 148, 136, 0.5); }

        /* Hero */
        .borea-hero {
          position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; padding: 9.5rem 1.5rem 5rem;
          display: grid; grid-template-columns: 1.1fr 1fr; gap: 4rem; align-items: center;
        }
        .borea-hero-badge {
          display: inline-flex; align-items: center; gap: 0.6rem;
          background: rgba(13, 148, 136, 0.12); border: 1px solid rgba(13, 148, 136, 0.3); color: #2dd4bf;
          padding: 0.45rem 1rem; border-radius: 20px; font-size: 0.82rem; font-weight: 600; margin-bottom: 1.5rem;
        }
        .borea-dot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; box-shadow: 0 0 10px #22c55e; }
        .borea-hero-title {
          font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.7rem, 4.8vw, 4rem); font-weight: 700; line-height: 1.1; letter-spacing: -0.03em; margin-bottom: 1.25rem;
        }
        .borea-text-gradient {
          background: linear-gradient(135deg, #2dd4bf 0%, #8b5cf6 50%, #ec4899 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .borea-hero-subtitle { font-size: 1.12rem; color: #7fa9a6; line-height: 1.65; margin-bottom: 2.25rem; max-width: 520px; }
        .borea-hero-actions { display: flex; gap: 1rem; align-items: center; margin-bottom: 2.5rem; }
        .borea-cta-main {
          position: relative; background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%); color: #fff;
          text-decoration: none; padding: 0.9rem 1.85rem; border-radius: 12px; font-weight: 600; font-size: 0.98rem;
          box-shadow: 0 8px 30px rgba(13, 148, 136, 0.4); transition: all 0.2s;
        }
        .borea-cta-main:hover { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(13, 148, 136, 0.55); }
        .borea-cta-glass {
          display: flex; align-items: center; gap: 0.5rem; background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.12); color: inherit; text-decoration: none;
          padding: 0.9rem 1.5rem; border-radius: 12px; font-weight: 600; font-size: 0.95rem; transition: all 0.2s;
        }
        .borea-cta-glass:hover { border-color: #0d9488; transform: translateY(-2px); }
        .borea-social-trust { font-size: 0.85rem; color: #4a7370; display: flex; align-items: center; gap: 0.75rem; }
        .borea-social-trust .stars { color: #f59e0b; font-weight: 700; }

        /* Borea Card Mockup */
        .borea-hero-mockup { perspective: 1000px; }
        .borea-card {
          background: #0f1f1f; border: 1px solid #1f3d3d; border-radius: 20px; padding: 1.75rem;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5); transition: all 0.3s ease; position: relative;
        }
        body.light .borea-card { background: #ffffff; border-color: #b2dfdb; box-shadow: 0 20px 50px rgba(0,0,0,0.08); }
        .borea-card:hover { transform: translateY(-4px) rotateX(2deg); border-color: #0d9488; }
        .borea-card-author { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem; }
        .borea-avatar { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; border: 2px solid #0d9488; }
        .author-details .name { font-weight: 700; font-size: 0.98rem; }
        .author-details .check { color: #38bdf8; font-size: 0.85rem; }
        .author-details .title { font-size: 0.78rem; color: #7fa9a6; }
        .platform-pill { margin-left: auto; font-size: 0.72rem; padding: 0.25rem 0.65rem; border-radius: 12px; font-weight: 600; background: rgba(10, 102, 194, 0.2); color: #38bdf8; }
        .borea-card-content { font-size: 0.95rem; line-height: 1.65; color: #7fa9a6; margin-bottom: 1.25rem; }
        .borea-card-content .hashtags { color: #2dd4bf; font-weight: 500; }
        .borea-post-img { width: 100%; max-height: 320px; object-fit: cover; object-position: top; border-radius: 14px; margin-bottom: 1.25rem; border: 1px solid #1f3d3d; }
        .borea-card-footer { display: flex; gap: 1.5rem; border-top: 1px solid #1f3d3d; padding-top: 0.85rem; font-size: 0.85rem; color: #7fa9a6; }

        /* Marquee */
        .borea-marquee-wrap {
          position: relative; z-index: 1; background: rgba(13, 148, 136, 0.08); border-y: 1px solid rgba(13, 148, 136, 0.2);
          overflow: hidden; white-space: nowrap; padding: 0.85rem 0;
        }
        .borea-marquee-track { display: inline-flex; gap: 3rem; animation: boreaMarquee 25s linear infinite; }
        .borea-marquee-track span { font-family: 'Space Grotesk', sans-serif; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.08em; color: #2dd4bf; }
        @keyframes boreaMarquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

        /* Stats Band */
        .borea-stats-section { position: relative; z-index: 1; padding: 4rem 1.5rem; }
        .borea-stats-grid { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; }
        .borea-stat-card { text-align: center; background: #0f1f1f; border: 1px solid #1f3d3d; border-radius: 16px; padding: 1.5rem; }
        body.light .borea-stat-card { background: #ffffff; border-color: #b2dfdb; }
        .borea-stat-icon { font-size: 1.8rem; margin-bottom: 0.4rem; }
        .borea-stat-val { font-family: 'Space Grotesk', sans-serif; font-size: 2.2rem; font-weight: 700; color: inherit; }
        .borea-stat-lbl { font-size: 0.85rem; color: #7fa9a6; margin-top: 0.2rem; }

        /* Section Layouts */
        .borea-section { position: relative; z-index: 1; max-width: 1100px; margin: 0 auto; padding: 6rem 1.5rem; }
        .borea-section-head { text-align: center; max-width: 600px; margin: 0 auto 3.5rem; }
        .borea-eyebrow { font-size: 0.82rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #0d9488; margin-bottom: 0.5rem; display: block; }
        .borea-h2 { font-family: 'Space Grotesk', sans-serif; font-size: 2.4rem; font-weight: 700; margin-bottom: 0.75rem; }
        .borea-sub { color: #7fa9a6; font-size: 1.05rem; line-height: 1.6; }

        /* Borea Studio Playground */
        .borea-studio-card { background: #0f1f1f; border: 1px solid #1f3d3d; border-radius: 24px; padding: 2rem; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
        body.light .borea-studio-card { background: #ffffff; border-color: #b2dfdb; box-shadow: 0 20px 50px rgba(0,0,0,0.08); }
        .borea-window-bar { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #1f3d3d; padding-bottom: 1rem; margin-bottom: 1.5rem; }
        .borea-window-dots { display: flex; gap: 0.4rem; }
        .borea-window-dots .dot { width: 10px; height: 10px; border-radius: 50%; }
        .dot.red { background: #ef4444; } .dot.yellow { background: #f59e0b; } .dot.green { background: #22c55e; }
        .borea-window-title { font-size: 0.85rem; font-weight: 600; color: #2dd4bf; }
        .borea-window-badge { font-size: 0.72rem; background: rgba(13, 148, 136, 0.2); color: #2dd4bf; padding: 0.2rem 0.5rem; border-radius: 10px; }
        .borea-presets-bar { display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
        .preset-label { font-size: 0.8rem; color: #4a7370; font-weight: 600; }
        .borea-preset-chip { background: rgba(255,255,255,0.05); border: 1px solid #1f3d3d; color: #7fa9a6; padding: 0.35rem 0.8rem; border-radius: 20px; font-size: 0.78rem; cursor: pointer; transition: all 0.2s; }
        .borea-preset-chip:hover { border-color: #0d9488; color: inherit; }
        .borea-controls-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem; }
        .borea-label { display: block; font-size: 0.8rem; font-weight: 600; color: #4a7370; margin-bottom: 0.5rem; }
        .borea-pills { display: flex; gap: 0.4rem; flex-wrap: wrap; }
        .borea-pill { background: rgba(255,255,255,0.05); border: 1px solid #1f3d3d; color: #7fa9a6; padding: 0.45rem 0.85rem; border-radius: 8px; font-size: 0.82rem; font-weight: 500; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 0.3rem; }
        .borea-pill.active { background: #0d9488; color: #fff; border-color: #0d9488; }
        .borea-input-bar { display: flex; gap: 0.75rem; margin-bottom: 1.5rem; }
        .borea-prompt-field { flex: 1; background: rgba(255,255,255,0.03); border: 1px solid #1f3d3d; border-radius: 10px; padding: 0.75rem 1rem; color: inherit; font-size: 0.9rem; outline: none; }
        .borea-prompt-field:focus { border-color: #0d9488; }
        .borea-generate-btn { background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%); color: #fff; border: none; padding: 0.75rem 1.5rem; border-radius: 10px; font-weight: 600; font-size: 0.9rem; cursor: pointer; white-space: nowrap; }
        .borea-output-screen { background: rgba(0,0,0,0.25); border: 1px solid #1f3d3d; border-radius: 16px; padding: 1.5rem; }
        body.light .borea-output-screen { background: #f0fafa; }
        .borea-output-top { display: flex; justify-content: space-between; align-items: center; padding-bottom: 0.75rem; border-bottom: 1px solid #1f3d3d; margin-bottom: 1rem; }
        .borea-tag { font-size: 0.78rem; font-weight: 700; color: #0d9488; margin-right: 0.5rem; }
        .borea-tag.tone { color: #7fa9a6; }
        .borea-viral { font-size: 0.78rem; color: #f59e0b; font-weight: 600; margin-right: 0.75rem; }
        .borea-count { font-size: 0.75rem; color: #4a7370; }
        .borea-code-text { font-family: 'Plus Jakarta Sans', sans-serif; white-space: pre-wrap; font-size: 0.94rem; line-height: 1.65; margin: 0; min-height: 120px; color: inherit; }
        .borea-cursor { animation: boreaBlink 1s infinite; color: #0d9488; }
        @keyframes boreaBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .borea-output-actions { display: flex; justify-content: space-between; align-items: center; padding-top: 0.75rem; border-top: 1px solid #1f3d3d; margin-top: 1rem; }
        .left-btns { display: flex; gap: 0.6rem; }
        .borea-action-btn { padding: 0.45rem 0.95rem; border-radius: 8px; font-size: 0.82rem; font-weight: 600; cursor: pointer; text-decoration: none; }
        .borea-action-btn.primary { background: #1f3d3d; color: inherit; border: none; }
        .borea-action-btn.secondary { background: transparent; color: #7fa9a6; border: 1px solid #1f3d3d; }
        .borea-action-btn.glow { background: rgba(13, 148, 136, 0.2); color: #2dd4bf; border: 1px solid rgba(13, 148, 136, 0.4); }

        /* Bento Grid */
        .borea-bento-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .borea-bento-card { background: #0f1f1f; border: 1px solid #1f3d3d; border-radius: 20px; padding: 1.85rem; transition: all 0.3s; }
        body.light .borea-bento-card { background: #ffffff; border-color: #b2dfdb; }
        .borea-bento-card:hover { border-color: #0d9488; transform: translateY(-3px); }
        .col-span-2 { grid-column: span 2; }
        .col-span-1 { grid-column: span 1; }
        .borea-bento-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(13, 148, 136, 0.15); color: #2dd4bf; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; }
        .borea-bento-tag { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: #0d9488; letter-spacing: 0.05em; }
        .borea-bento-title { font-size: 1.25rem; font-weight: 700; margin: 0.4rem 0 0.6rem; }
        .borea-bento-desc { color: #7fa9a6; font-size: 0.9rem; line-height: 1.6; }
        .bento-tone-demo { margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid #1f3d3d; }
        .tone-label-row { font-size: 0.8rem; display: flex; justify-content: space-between; margin-bottom: 0.5rem; }
        .borea-slider { width: 100%; accent-color: #0d9488; }

        /* Comparison Table */
        .borea-table-card { background: #0f1f1f; border: 1px solid #1f3d3d; border-radius: 20px; overflow: hidden; }
        body.light .borea-table-card { background: #ffffff; border-color: #b2dfdb; }
        .borea-table { width: 100%; border-collapse: collapse; text-align: left; }
        .borea-table th { background: rgba(0,0,0,0.25); padding: 1.25rem 1.5rem; font-size: 0.85rem; text-transform: uppercase; color: #7fa9a6; border-bottom: 1px solid #1f3d3d; }
        .borea-table td { padding: 1.25rem 1.5rem; border-bottom: 1px solid #1f3d3d; font-size: 0.9rem; }
        .feat-name { font-weight: 600; }
        .legacy-cell { color: #ef4444; }
        .borea-cell { color: #22c55e; font-weight: 600; }

        /* Testimonials */
        .borea-testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .borea-t-card { background: #0f1f1f; border: 1px solid #1f3d3d; border-radius: 20px; padding: 1.75rem; }
        body.light .borea-t-card { background: #ffffff; border-color: #b2dfdb; }
        .borea-t-card .head-row { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
        .borea-t-card .avatar { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; }
        .borea-t-card .name { font-weight: 700; font-size: 0.92rem; }
        .borea-t-card .role { font-size: 0.75rem; color: #7fa9a6; }
        .borea-t-card .badge { margin-left: auto; font-size: 0.68rem; background: rgba(13, 148, 136, 0.15); color: #2dd4bf; padding: 0.2rem 0.5rem; border-radius: 10px; }
        .borea-t-card .text { font-size: 0.88rem; color: #7fa9a6; line-height: 1.6; margin-bottom: 1rem; }
        .borea-t-card .stars { color: #f59e0b; font-size: 0.85rem; }

        /* FAQ */
        .faq-width { max-width: 800px; }
        .borea-faq-list { display: flex; flex-direction: column; gap: 1rem; }
        .borea-faq-item { background: #0f1f1f; border: 1px solid #1f3d3d; border-radius: 14px; padding: 1.25rem 1.5rem; cursor: pointer; transition: all 0.2s; }
        body.light .borea-faq-item { background: #ffffff; border-color: #b2dfdb; }
        .borea-faq-item:hover { border-color: #0d9488; }
        .borea-faq-head { display: flex; justify-content: space-between; align-items: center; }
        .borea-faq-head h3 { font-size: 1rem; font-weight: 600; margin: 0; }
        .borea-faq-icon { font-size: 1.2rem; font-weight: 700; color: #0d9488; }
        .borea-faq-body { margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid #1f3d3d; color: #7fa9a6; font-size: 0.9rem; line-height: 1.6; }

        /* CTA Box */
        .borea-cta-section { max-width: 1100px; margin: 0 auto; padding: 4rem 1.5rem 6rem; }
        .borea-cta-box {
          background: linear-gradient(135deg, rgba(13, 148, 136, 0.25) 0%, rgba(139, 92, 246, 0.25) 100%);
          border: 1px solid rgba(13, 148, 136, 0.4); border-radius: 24px; padding: 4.5rem 2rem; text-align: center;
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }
        .borea-cta-box .title { font-family: 'Space Grotesk', sans-serif; font-size: 2.3rem; font-weight: 700; margin-bottom: 1rem; }
        .borea-cta-box .sub { color: #7fa9a6; max-width: 540px; margin: 0 auto 2rem; font-size: 1.05rem; }
        .borea-cta-box .btn-row { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

        /* Footer */
        .borea-footer { background: #0f1f1f; border-top: 1px solid #1f3d3d; padding: 4rem 1.5rem 2rem; }
        body.light .borea-footer { background: #e0f2f1; border-color: #b2dfdb; }
        .borea-footer-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1.5fr 2fr; gap: 4rem; margin-bottom: 3rem; }
        .borea-footer-brand .tagline { color: #7fa9a6; font-size: 0.88rem; margin: 1rem 0; max-width: 300px; }
        .borea-status { display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.75rem; color: #22c55e; background: rgba(34, 197, 94, 0.1); padding: 0.3rem 0.7rem; border-radius: 20px; }
        .green-dot { width: 6px; height: 6px; background: #22c55e; border-radius: 50%; }
        .borea-footer-links { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .borea-footer-links h4 { font-size: 0.85rem; text-transform: uppercase; color: #4a7370; margin-bottom: 1rem; }
        .borea-footer-links a { display: block; color: #7fa9a6; text-decoration: none; font-size: 0.88rem; margin-bottom: 0.6rem; }
        .borea-footer-links a:hover { color: inherit; }
        .borea-footer-bottom { max-width: 1100px; margin: 0 auto; padding-top: 2rem; border-top: 1px solid #1f3d3d; text-align: center; font-size: 0.8rem; color: #4a7370; }
        .borea-footer-bottom a { color: inherit; text-decoration: none; }

        /* Mobile */
        @media (max-width: 992px) {
          .borea-hero { grid-template-columns: 1fr; gap: 3.5rem; padding-top: 7.5rem; }
          .borea-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .borea-bento-grid { grid-template-columns: 1fr; }
          .col-span-2 { grid-column: span 1; }
          .borea-testimonials-grid { grid-template-columns: 1fr; }
          .borea-footer-inner { grid-template-columns: 1fr; gap: 2.5rem; }
        }
        @media (max-width: 768px) {
          .borea-nav-links { display: none; }
          .borea-controls-grid { grid-template-columns: 1fr; }
          .borea-input-bar { flex-direction: column; }
          .borea-hero-actions { flex-direction: column; align-items: stretch; }
          .borea-cta-main, .borea-cta-glass { justify-content: center; text-align: center; }
        }
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
