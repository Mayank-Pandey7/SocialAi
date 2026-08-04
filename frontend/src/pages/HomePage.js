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
    tag: "AI Copywriter",
    title: "Platform-Native Content Engine",
    desc: "Generate posts tailored for LinkedIn long-form, Twitter punchy threads, or Instagram visual captions in one click.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    span: "col-span-2",
    accent: "from-teal-500/20 to-emerald-500/10",
  },
  {
    tag: "Viral Score",
    title: "Engagement Prediction",
    desc: "Real-time AI metrics on post readability, hook strength, and viral potential before you publish.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    span: "col-span-1",
    accent: "from-cyan-500/20 to-blue-500/10",
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
    accent: "from-purple-500/20 to-violet-500/10",
  },
  {
    tag: "Smart Planner",
    title: "Calendar & Queue Scheduler",
    desc: "Draft content in advance, organize queue schedules, and maintain non-stop publishing consistency.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    span: "col-span-2",
    accent: "from-emerald-500/20 to-teal-500/10",
  },
];

const TESTIMONIALS = [
  {
    name: "Alex Rivera",
    role: "Founder @ TechFlow",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    text: "SocialAI cut down our social media drafting time from 3 hours a day to less than 15 minutes. The tone precision is incredible!",
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

/* ─── Sub-components ─── */
function StatCounter({ value, suffix, label, icon, visible }) {
  const count = useCounter(value, visible);
  return (
    <div className="stat-card-modern">
      <div className="stat-icon-wrap">{icon}</div>
      <div className="stat-val-text">{count.toLocaleString()}{suffix}</div>
      <div className="stat-lbl-text">{label}</div>
    </div>
  );
}

/* ─── Interactive Playground Demo ─── */
function LiveStudioDemo() {
  const [selectedPlatform, setSelectedPlatform] = useState("LinkedIn");
  const [selectedTone, setSelectedTone] = useState("Professional");
  const [customPrompt, setCustomPrompt] = useState("");
  const [outputText, setOutputText] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [viralScore, setViralScore] = useState(94);

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
      setViralScore(Math.floor(Math.random() * 8) + 92);
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
    <div className="demo-studio-container">
      <div className="studio-header">
        <div className="studio-title-bar">
          <div className="window-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <span className="studio-badge">✨ Live AI Content Generator</span>
        </div>
      </div>

      {/* Preset Chips */}
      <div className="preset-chips-row">
        <span className="preset-label">Try Presets:</span>
        {PRESETS.map((p) => (
          <button key={p.label} onClick={() => applyPreset(p)} className="preset-chip">
            {p.label}
          </button>
        ))}
      </div>

      {/* Control Bar */}
      <div className="studio-controls-grid">
        <div className="control-group">
          <label className="control-label">Target Platform</label>
          <div className="pill-selector">
            {PLATFORMS.map((p) => (
              <button
                key={p.id}
                onClick={() => { setSelectedPlatform(p.id); triggerGeneration(p.id, selectedTone, customPrompt); }}
                className={`pill-btn ${selectedPlatform === p.id ? "active" : ""}`}
              >
                <span className="pill-icon">{p.icon}</span> {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="control-group">
          <label className="control-label">Tone of Voice</label>
          <div className="pill-selector">
            {TONES.map((t) => (
              <button
                key={t.id}
                onClick={() => { setSelectedTone(t.id); triggerGeneration(selectedPlatform, t.id, customPrompt); }}
                className={`pill-btn ${selectedTone === t.id ? "active" : ""}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Prompt Input */}
      <div className="prompt-input-wrapper">
        <input
          type="text"
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && triggerGeneration()}
          placeholder="Enter an idea, topic, or bullet point (e.g. Why remote work is growing...)"
          className="prompt-input"
        />
        <button
          onClick={() => triggerGeneration()}
          disabled={isGenerating}
          className="generate-action-btn"
        >
          {isGenerating ? "Generating..." : "⚡ Generate Draft"}
        </button>
      </div>

      {/* Output Display Card */}
      <div className="output-display-card">
        <div className="output-card-header">
          <div className="meta-left">
            <span className="platform-tag">{selectedPlatform}</span>
            <span className="tone-tag">{selectedTone}</span>
          </div>
          <div className="meta-right">
            <span className="viral-badge">🔥 Viral Score: {viralScore}/100</span>
            <span className="length-badge">{(displayedText || "").length} chars</span>
          </div>
        </div>

        <div className="output-body">
          <pre className="output-text">
            {displayedText}
            <span className="typing-cursor">|</span>
          </pre>
        </div>

        <div className="output-card-footer">
          <div className="actions-left">
            <button onClick={handleCopy} className="footer-action-btn primary">
              {copied ? "✓ Copied to Clipboard!" : "📋 Copy Post"}
            </button>
            <button onClick={() => triggerGeneration()} className="footer-action-btn secondary">
              🔄 Regenerate
            </button>
          </div>
          <div className="actions-right">
            <Link to="/register" className="footer-action-btn highlight">
              🚀 Schedule this Post &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── FAQ Accordion Item ─── */
function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-card ${open ? "open" : ""}`} onClick={() => setOpen(!open)}>
      <div className="faq-question">
        <h3>{faq.q}</h3>
        <span className="faq-toggle-icon">{open ? "−" : "+"}</span>
      </div>
      {open && <div className="faq-answer"><p>{faq.a}</p></div>}
    </div>
  );
}

/* ─── MAIN HOME PAGE COMPONENT ─── */
export default function HomePage() {
  const { isDark, toggleTheme } = useTheme();
  const [statsRef, statsVisible] = useInView(0.2);
  const [interactiveTone, setInteractiveTone] = useState(70);

  return (
    <div className="modern-landing-root">
      {/* Dynamic Background Mesh Gradients */}
      <div className="bg-mesh-container">
        <div className="mesh-blob blob-1"></div>
        <div className="mesh-blob blob-2"></div>
        <div className="mesh-blob blob-3"></div>
        <div className="grid-overlay"></div>
      </div>

      {/* ── NAVBAR ── */}
      <nav className="modern-navbar">
        <div className="navbar-inner">
          <Link to="/" className="brand-logo">
            <div className="logo-icon-glow">
              <span className="logo-sparkle">✦</span>
            </div>
            <span className="brand-name">SocialAI</span>
            <span className="brand-v2">v2.0</span>
          </Link>

          <div className="nav-menu-links">
            <a href="#features" className="nav-item">Features</a>
            <a href="#demo" className="nav-item">AI Studio</a>
            <a href="#how-it-works" className="nav-item">Workflow</a>
            <a href="#testimonials" className="nav-item">Wall of Love</a>
            <a href="#faq" className="nav-item">FAQ</a>
          </div>

          <div className="nav-right-actions">
            <button
              onClick={toggleTheme}
              className="theme-switch-btn"
              aria-label={isDark ? "Switch to light" : "Switch to dark"}
            >
              <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
            </button>
            <Link to="/login" className="nav-login-link">Sign In</Link>
            <Link to="/register" className="nav-primary-cta">Get Started Free &rarr;</Link>
          </div>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section className="hero-section-modern">
        <div className="hero-container">
          <div className="hero-pill-badge">
            <span className="pulse-dot"></span>
            <span>AI Copilot 2.0 • 100% Free & Unlimited Access</span>
          </div>

          <h1 className="hero-headline">
            Write Viral Social Content <br />
            <span className="gradient-text">10x Faster with AI</span>
          </h1>

          <p className="hero-subtext">
            SocialAI turns your quick ideas into platform-ready, high-converting posts for LinkedIn, Twitter/X, Instagram & Threads in seconds.
          </p>

          <div className="hero-button-group">
            <Link to="/register" className="hero-cta-primary">
              <span>Start Writing Free</span>
              <span className="btn-glow-aura"></span>
            </Link>
            <a href="#demo" className="hero-cta-secondary">
              <span>View Interactive Demo</span>
              <span className="arrow-icon">&darr;</span>
            </a>
          </div>

          <div className="hero-trust-bar">
            <span>Trusted by 10,000+ founders, creators, and growth teams</span>
            <div className="trust-stars">★★★★★ 4.9/5</div>
          </div>
        </div>

        {/* Hero Interactive Social Post Card Mockup */}
        <div className="hero-card-preview-wrap">
          <div className="hero-glass-card">
            <div className="card-author-row">
              <img
                src="/mayank.jpg"
                alt="Mayank Pandey"
                className="author-avatar"
              />
              <div className="author-info">
                <div className="author-name">Mayank Pandey <span className="blue-check">✓</span></div>
                <div className="author-meta">Founder @ SocialAI • Just now</div>
              </div>
              <span className="platform-pill-small linkedin">LinkedIn</span>
            </div>

            <div className="card-post-body">
              "AI won't replace content creators.
              <br /><br />
              Creators who master AI tools will replace creators who don't.
              <br /><br />
              The secret isn't writing more words — it's removing friction so you can share authentic insights consistently."
              <br /><br />
              <span className="post-hashtags">#BuildInPublic #AI #SocialMedia #GrowthMindset</span>
            </div>

            <img
              src="/mayank.jpg"
              alt="Mayank Pandey LinkedIn Attachment"
              className="card-post-image"
            />

            <div className="card-post-stats">
              <div className="stat-group">👍 <strong>1,842</strong> Likes</div>
              <div className="stat-group">💬 <strong>249</strong> Comments</div>
              <div className="stat-group">🔁 <strong>114</strong> Reposts</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <section className="stats-section-modern" ref={statsRef}>
        <div className="stats-grid-inner">
          <StatCounter
            value={50000}
            suffix="+"
            label="Posts Generated"
            icon="🚀"
            visible={statsVisible}
          />
          <StatCounter
            value={5}
            suffix=""
            label="Platforms Supported"
            icon="🌐"
            visible={statsVisible}
          />
          <StatCounter
            value={98}
            suffix="%"
            label="Average Time Saved"
            icon="⚡"
            visible={statsVisible}
          />
          <StatCounter
            value={100}
            suffix="%"
            label="Free & Open Access"
            icon="💎"
            visible={statsVisible}
          />
        </div>
      </section>

      {/* ── LIVE AI STUDIO DEMO SECTION ── */}
      <section id="demo" className="demo-section-wrapper">
        <div className="section-header-center">
          <span className="section-eyebrow">Interactive Studio</span>
          <h2 className="section-title">Test the AI Engine Live</h2>
          <p className="section-subtitle">
            Pick a platform, select your desired tone, or enter an idea to generate instant drafts.
          </p>
        </div>
        <LiveStudioDemo />
      </section>

      {/* ── BENTO BOX FEATURES ── */}
      <section id="features" className="bento-section-wrapper">
        <div className="section-header-center">
          <span className="section-eyebrow">Built for Growth</span>
          <h2 className="section-title">Everything You Need to Scale Your Presence</h2>
          <p className="section-subtitle">
            Engineered with deep platform understanding so every post resonates with your audience.
          </p>
        </div>

        <div className="bento-grid-container">
          {FEATURES.map((f, i) => (
            <div key={f.title} className={`bento-card ${f.span} bg-gradient-${i + 1}`}>
              <div className="bento-icon-box">{f.icon}</div>
              <span className="bento-tag">{f.tag}</span>
              <h3 className="bento-card-title">{f.title}</h3>
              <p className="bento-card-desc">{f.desc}</p>
              
              {i === 0 && (
                <div className="bento-interactive-mini">
                  <div className="mini-tone-header">
                    <span>Interactive Tone Adjuster:</span>
                    <strong>{interactiveTone < 33 ? "💼 Professional" : interactiveTone < 66 ? "☕ Casual" : "🔥 Viral / High-Hook"}</strong>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={interactiveTone}
                    onChange={(e) => setInteractiveTone(Number(e.target.value))}
                    className="tone-slider"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── 3-STEP WORKFLOW ── */}
      <section id="how-it-works" className="workflow-section-wrapper">
        <div className="section-header-center">
          <span className="section-eyebrow">Seamless Process</span>
          <h2 className="section-title">From Idea to Published Post in 3 Steps</h2>
        </div>

        <div className="workflow-steps-grid">
          <div className="workflow-step-card">
            <div className="step-num">01</div>
            <h3 className="step-heading">1. Input Your Idea</h3>
            <p className="step-desc">Type a quick bullet point, topic, or blog summary into the AI Studio prompt box.</p>
          </div>

          <div className="workflow-step-card">
            <div className="step-num">02</div>
            <h3 className="step-heading">2. Choose Platform & Tone</h3>
            <p className="step-desc">Select LinkedIn, Twitter, Instagram, or Threads and choose your exact tone of voice.</p>
          </div>

          <div className="workflow-step-card">
            <div className="step-num">03</div>
            <h3 className="step-heading">3. Generate & Schedule</h3>
            <p className="step-desc">Copy your post instantly or save it to your visual queue calendar to publish at optimal times.</p>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS / WALL OF LOVE ── */}
      <section id="testimonials" className="testimonials-section-wrapper">
        <div className="section-header-center">
          <span className="section-eyebrow">Wall of Love</span>
          <h2 className="section-title">Loved by Creators & Growth Leaders</h2>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="testimonial-card">
              <div className="t-card-header">
                <img src={t.avatar} alt={t.name} className="t-avatar" />
                <div className="t-meta">
                  <div className="t-name">{t.name}</div>
                  <div className="t-role">{t.role}</div>
                </div>
                <span className="t-badge">{t.tag}</span>
              </div>
              <p className="t-text">"{t.text}"</p>
              <div className="t-stars">{"★".repeat(t.stars)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section id="faq" className="faq-section-wrapper">
        <div className="section-header-center">
          <span className="section-eyebrow">Frequently Asked</span>
          <h2 className="section-title">Got Questions? We Have Answers.</h2>
        </div>

        <div className="faq-container">
          {FAQS.map((faq) => (
            <FAQItem key={faq.q} faq={faq} />
          ))}
        </div>
      </section>

      {/* ── HIGH-IMPACT CTA BANNER ── */}
      <section className="cta-banner-wrapper">
        <div className="cta-banner-card">
          <h2 className="cta-heading">Ready to Supercharge Your Social Media Presence?</h2>
          <p className="cta-description">
            Join thousands of creators drafting better content in less time. 100% free forever.
          </p>
          <div className="cta-button-group">
            <Link to="/register" className="cta-btn-primary">
              Create Free Account &rarr;
            </Link>
            <Link to="/login" className="cta-btn-secondary">
              Sign In to Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="modern-footer">
        <div className="footer-top-inner">
          <div className="footer-brand-col">
            <div className="brand-logo">
              <div className="logo-icon-glow">
                <span className="logo-sparkle">✦</span>
              </div>
              <span className="brand-name">SocialAI</span>
            </div>
            <p className="footer-tagline">
              Empowering creators and teams with AI-driven social media copy.
            </p>
            <div className="status-pill">
              <span className="status-dot"></span> Systems Operational • v2.0
            </div>
          </div>

          <div className="footer-links-grid">
            <div className="f-col">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#demo">Live AI Studio</a>
              <a href="#how-it-works">Workflow</a>
            </div>

            <div className="f-col">
              <h4>Account</h4>
              <Link to="/login">Sign In</Link>
              <Link to="/register">Create Account</Link>
              <Link to="/dashboard">Dashboard</Link>
            </div>

            <div className="f-col">
              <h4>Company</h4>
              <a href="https://github.com/Mayank-Pandey7" target="_blank" rel="noreferrer">GitHub</a>
              <a href="#faq">FAQ</a>
              <a href="#">Privacy Policy</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <span>© {new Date().getFullYear()} SocialAI. Built with passion by <a href="https://github.com/Mayank-Pandey7" target="_blank" rel="noreferrer">@Mayank-Pandey7</a></span>
        </div>
      </footer>

      {/* ── SCOPED CSS STYLES FOR MODERN LANDING PAGE ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap');

        .modern-landing-root {
          position: relative;
          background: var(--bg-primary);
          color: var(--text-primary);
          font-family: 'Plus Jakarta Sans', sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* Ambient Mesh Background */
        .bg-mesh-container {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }
        .mesh-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.18;
          animation: floatBlob 18s ease-in-out infinite alternate;
        }
        .blob-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, #0d9488 0%, #06b6d4 100%);
          top: -100px; left: -100px;
        }
        .blob-2 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, #8b5cf6 0%, #ec4899 100%);
          top: 40%; right: -200px;
          animation-delay: -6s;
        }
        .blob-3 {
          width: 450px; height: 450px;
          background: radial-gradient(circle, #10b981 0%, #0ea5e9 100%);
          bottom: -100px; left: 20%;
          animation-delay: -12s;
        }
        @keyframes floatBlob {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(60px, 80px) scale(1.15); }
        }
        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px);
          background-size: 32px 32px;
          opacity: 0.4;
        }

        /* Navbar */
        .modern-navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          background: rgba(10, 18, 18, 0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
        }
        body.light .modern-navbar {
          background: rgba(240, 250, 250, 0.85);
        }
        .navbar-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .brand-logo {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          text-decoration: none;
          color: var(--text-primary);
        }
        .logo-icon-glow {
          width: 34px; height: 34px;
          border-radius: 10px;
          background: linear-gradient(135deg, #0d9488 0%, #8b5cf6 100%);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 16px rgba(13, 148, 136, 0.4);
        }
        .logo-sparkle { color: #fff; font-size: 1.1rem; }
        .brand-name {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 1.25rem;
          letter-spacing: -0.02em;
        }
        .brand-v2 {
          font-size: 0.68rem;
          background: rgba(13, 148, 136, 0.2);
          color: var(--accent-light);
          padding: 0.15rem 0.45rem;
          border-radius: 12px;
          font-weight: 600;
          border: 1px solid rgba(13, 148, 136, 0.3);
        }
        .nav-menu-links {
          display: flex;
          gap: 2rem;
        }
        .nav-item {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: color 0.2s ease;
        }
        .nav-item:hover { color: var(--text-primary); }
        .nav-right-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .theme-switch-btn {
          background: var(--bg-card);
          border: 1px solid var(--border);
          color: var(--text-primary);
          width: 36px; height: 36px;
          border-radius: 10px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s ease;
        }
        .theme-switch-btn:hover { border-color: var(--accent); transform: scale(1.05); }
        .nav-login-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
        }
        .nav-primary-cta {
          background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%);
          color: #fff;
          text-decoration: none;
          padding: 0.6rem 1.1rem;
          border-radius: 10px;
          font-size: 0.88rem;
          font-weight: 600;
          box-shadow: 0 4px 16px rgba(13, 148, 136, 0.3);
          transition: all 0.2s ease;
        }
        .nav-primary-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(13, 148, 136, 0.45);
        }

        /* Hero Section */
        .hero-section-modern {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 9rem 1.5rem 4rem;
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 3.5rem;
          align-items: center;
        }
        .hero-pill-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(13, 148, 136, 0.12);
          border: 1px solid rgba(13, 148, 136, 0.3);
          color: var(--accent-light);
          padding: 0.4rem 0.9rem;
          border-radius: 20px;
          font-size: 0.82rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
        }
        .pulse-dot {
          width: 8px; height: 8px;
          background: #22c55e;
          border-radius: 50%;
          box-shadow: 0 0 8px #22c55e;
          animation: pulseGreen 2s infinite;
        }
        @keyframes pulseGreen {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.3); }
          100% { opacity: 1; transform: scale(1); }
        }
        .hero-headline {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.6rem, 4.5vw, 3.8rem);
          font-weight: 700;
          line-height: 1.12;
          letter-spacing: -0.03em;
          margin-bottom: 1.25rem;
        }
        .gradient-text {
          background: linear-gradient(135deg, #2dd4bf 0%, #a855f7 50%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-subtext {
          font-size: 1.1rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin-bottom: 2rem;
          max-width: 520px;
        }
        .hero-button-group {
          display: flex;
          gap: 1rem;
          align-items: center;
          margin-bottom: 2.5rem;
        }
        .hero-cta-primary {
          position: relative;
          background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%);
          color: #fff;
          text-decoration: none;
          padding: 0.85rem 1.75rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.98rem;
          box-shadow: 0 6px 24px rgba(13, 148, 136, 0.35);
          transition: all 0.2s ease;
        }
        .hero-cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(13, 148, 136, 0.5);
        }
        .hero-cta-secondary {
          display: flex; align-items: center; gap: 0.5rem;
          background: var(--bg-card);
          border: 1px solid var(--border);
          color: var(--text-primary);
          text-decoration: none;
          padding: 0.85rem 1.5rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.2s ease;
        }
        .hero-cta-secondary:hover {
          border-color: var(--accent);
          transform: translateY(-2px);
        }
        .hero-trust-bar {
          font-size: 0.85rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .trust-stars { color: #f59e0b; font-weight: 700; }

        /* Hero Social Card Mockup */
        .hero-card-preview-wrap {
          perspective: 1000px;
        }
        .hero-glass-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: var(--shadow);
          transition: all 0.3s ease;
          position: relative;
        }
        .hero-glass-card:hover {
          transform: translateY(-4px) rotateX(2deg);
          border-color: var(--accent);
        }
        .card-author-row {
          display: flex; align-items: center; gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .author-avatar {
          width: 44px; height: 44px;
          border-radius: 50%;
          object-fit: cover;
        }
        .author-name { font-weight: 700; font-size: 0.95rem; }
        .blue-check { color: #38bdf8; font-size: 0.85rem; }
        .author-meta { font-size: 0.75rem; color: var(--text-muted); }
        .platform-pill-small {
          margin-left: auto;
          font-size: 0.7rem;
          padding: 0.2rem 0.6rem;
          border-radius: 12px;
          font-weight: 600;
          background: rgba(10, 102, 194, 0.15);
          color: #38bdf8;
        }
        .card-post-body {
          font-size: 0.92rem;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
        }
        .post-hashtags { color: var(--accent-light); font-weight: 500; }
        .card-post-image {
          width: 100%;
          max-height: 320px;
          object-fit: cover;
          object-position: top;
          border-radius: 12px;
          margin-bottom: 1.25rem;
          border: 1px solid var(--border);
        }
        .card-post-stats {
          display: flex; gap: 1.5rem;
          border-top: 1px solid var(--border);
          padding-top: 0.75rem;
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        /* Stats Band */
        .stats-section-modern {
          position: relative; z-index: 1;
          background: var(--bg-secondary);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 3rem 1.5rem;
        }
        .stats-grid-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }
        .stat-card-modern {
          text-align: center;
          padding: 1rem;
        }
        .stat-icon-wrap { font-size: 1.75rem; margin-bottom: 0.4rem; }
        .stat-val-text {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 2.2rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .stat-lbl-text {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-top: 0.2rem;
        }

        /* Demo Section */
        .demo-section-wrapper {
          position: relative; z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          padding: 6rem 1.5rem;
        }
        .section-header-center {
          text-align: center;
          max-width: 600px;
          margin: 0 auto 3.5rem;
        }
        .section-eyebrow {
          font-size: 0.82rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--accent);
          margin-bottom: 0.5rem;
          display: block;
        }
        .section-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
        }
        .section-subtitle {
          color: var(--text-secondary);
          font-size: 1rem;
          line-height: 1.6;
        }

        /* Studio Component */
        .demo-studio-container {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 2rem;
          box-shadow: var(--shadow);
        }
        .studio-header { margin-bottom: 1.5rem; }
        .studio-title-bar {
          display: flex; align-items: center; justify-content: space-between;
          border-bottom: 1px solid var(--border);
          padding-bottom: 1rem;
        }
        .window-dots { display: flex; gap: 0.4rem; }
        .dot { width: 10px; height: 10px; border-radius: 50%; }
        .dot.red { background: #ef4444; }
        .dot.yellow { background: #f59e0b; }
        .dot.green { background: #22c55e; }
        .studio-badge { font-size: 0.82rem; font-weight: 600; color: var(--accent-light); }
        .preset-chips-row {
          display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }
        .preset-label { font-size: 0.8rem; color: var(--text-muted); font-weight: 600; }
        .preset-chip {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          padding: 0.35rem 0.75rem;
          border-radius: 20px;
          font-size: 0.78rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .preset-chip:hover { border-color: var(--accent); color: var(--text-primary); }
        .studio-controls-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .control-label {
          display: block; font-size: 0.8rem; font-weight: 600; color: var(--text-muted); margin-bottom: 0.5rem;
        }
        .pill-selector { display: flex; gap: 0.4rem; flex-wrap: wrap; }
        .pill-btn {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          padding: 0.45rem 0.85rem;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex; align-items: center; gap: 0.3rem;
        }
        .pill-btn.active {
          background: var(--accent);
          color: #fff;
          border-color: var(--accent);
        }
        .prompt-input-wrapper {
          display: flex; gap: 0.75rem; margin-bottom: 1.5rem;
        }
        .prompt-input {
          flex: 1;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 0.75rem 1rem;
          color: var(--text-primary);
          font-size: 0.9rem;
          outline: none;
        }
        .prompt-input:focus { border-color: var(--accent); }
        .generate-action-btn {
          background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%);
          color: #fff;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          white-space: nowrap;
        }
        .output-display-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.25rem;
        }
        .output-card-header {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border);
        }
        .platform-tag { font-size: 0.78rem; font-weight: 700; color: var(--accent); margin-right: 0.5rem; }
        .tone-tag { font-size: 0.78rem; color: var(--text-muted); }
        .viral-badge { font-size: 0.78rem; color: #f59e0b; font-weight: 600; margin-right: 0.75rem; }
        .length-badge { font-size: 0.75rem; color: var(--text-muted); }
        .output-text {
          font-family: 'Plus Jakarta Sans', sans-serif;
          white-space: pre-wrap;
          font-size: 0.92rem;
          line-height: 1.65;
          color: var(--text-primary);
          margin: 0;
          min-height: 120px;
        }
        .typing-cursor { animation: blink 1s infinite; color: var(--accent); }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .output-card-footer {
          display: flex; justify-content: space-between; align-items: center;
          margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid var(--border);
        }
        .actions-left { display: flex; gap: 0.6rem; }
        .footer-action-btn {
          padding: 0.45rem 0.9rem; border-radius: 8px; font-size: 0.82rem; font-weight: 600; cursor: pointer; text-decoration: none;
        }
        .footer-action-btn.primary { background: var(--border); color: var(--text-primary); border: none; }
        .footer-action-btn.secondary { background: transparent; color: var(--text-secondary); border: 1px solid var(--border); }
        .footer-action-btn.highlight { background: rgba(13, 148, 136, 0.15); color: var(--accent-light); border: 1px solid rgba(13, 148, 136, 0.3); }

        /* Bento Grid */
        .bento-section-wrapper {
          position: relative; z-index: 1;
          max-width: 1100px; margin: 0 auto; padding: 6rem 1.5rem;
        }
        .bento-grid-container {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;
        }
        .bento-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 1.75rem;
          transition: all 0.3s ease;
        }
        .bento-card:hover { border-color: var(--accent); transform: translateY(-3px); }
        .col-span-2 { grid-column: span 2; }
        .col-span-1 { grid-column: span 1; }
        .bento-icon-box {
          width: 42px; height: 42px; border-radius: 10px;
          background: rgba(13, 148, 136, 0.15); color: var(--accent-light);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1rem;
        }
        .bento-tag { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: var(--accent); letter-spacing: 0.05em; }
        .bento-card-title { font-size: 1.25rem; font-weight: 700; margin: 0.4rem 0 0.6rem; }
        .bento-card-desc { color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; }
        .bento-interactive-mini { margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border); }
        .mini-tone-header { font-size: 0.8rem; display: flex; justify-content: space-between; margin-bottom: 0.5rem; }
        .tone-slider { width: 100%; accent-color: var(--accent); }

        /* Workflow */
        .workflow-section-wrapper { max-width: 1100px; margin: 0 auto; padding: 6rem 1.5rem; }
        .workflow-steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .workflow-step-card {
          background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 2rem; position: relative;
        }
        .step-num { font-family: 'Space Grotesk', sans-serif; font-size: 2.5rem; font-weight: 700; color: var(--accent); opacity: 0.4; margin-bottom: 0.5rem; }
        .step-heading { font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem; }
        .step-desc { color: var(--text-secondary); font-size: 0.88rem; line-height: 1.6; }

        /* Testimonials */
        .testimonials-section-wrapper { max-width: 1100px; margin: 0 auto; padding: 6rem 1.5rem; }
        .testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .testimonial-card {
          background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 1.5rem;
        }
        .t-card-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
        .t-avatar { width: 42px; height: 42px; border-radius: 50%; object-fit: cover; }
        .t-name { font-weight: 700; font-size: 0.9rem; }
        .t-role { font-size: 0.75rem; color: var(--text-muted); }
        .t-badge { margin-left: auto; font-size: 0.68rem; background: var(--bg-secondary); padding: 0.2rem 0.5rem; border-radius: 10px; color: var(--accent-light); }
        .t-text { font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem; }
        .t-stars { color: #f59e0b; font-size: 0.85rem; }

        /* FAQ */
        .faq-section-wrapper { max-width: 800px; margin: 0 auto; padding: 6rem 1.5rem; }
        .faq-container { display: flex; flex-direction: column; gap: 1rem; }
        .faq-card {
          background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; padding: 1.25rem 1.5rem; cursor: pointer; transition: all 0.2s ease;
        }
        .faq-card:hover { border-color: var(--accent); }
        .faq-question { display: flex; justify-content: space-between; align-items: center; }
        .faq-question h3 { font-size: 1rem; font-weight: 600; margin: 0; }
        .faq-toggle-icon { font-size: 1.2rem; font-weight: 700; color: var(--accent); }
        .faq-answer { margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid var(--border); color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; }

        /* CTA Banner */
        .cta-banner-wrapper { max-width: 1100px; margin: 0 auto; padding: 4rem 1.5rem 6rem; }
        .cta-banner-card {
          background: linear-gradient(135deg, rgba(13, 148, 136, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%);
          border: 1px solid rgba(13, 148, 136, 0.4);
          border-radius: 24px; padding: 4rem 2rem; text-align: center;
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        }
        .cta-heading { font-family: 'Space Grotesk', sans-serif; font-size: 2.2rem; font-weight: 700; margin-bottom: 1rem; }
        .cta-description { color: var(--text-secondary); max-width: 540px; margin: 0 auto 2rem; font-size: 1rem; }
        .cta-button-group { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
        .cta-btn-primary {
          background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%); color: #fff; text-decoration: none;
          padding: 0.85rem 1.75rem; border-radius: 12px; font-weight: 600; box-shadow: 0 4px 20px rgba(13, 148, 136, 0.4);
        }
        .cta-btn-secondary {
          background: var(--bg-card); color: var(--text-primary); text-decoration: none;
          padding: 0.85rem 1.5rem; border-radius: 12px; font-weight: 600; border: 1px solid var(--border);
        }

        /* Footer */
        .modern-footer { background: var(--bg-secondary); border-top: 1px solid var(--border); padding: 4rem 1.5rem 2rem; }
        .footer-top-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1.5fr 2fr; gap: 4rem; margin-bottom: 3rem; }
        .footer-tagline { color: var(--text-secondary); font-size: 0.88rem; margin: 1rem 0; max-width: 300px; }
        .status-pill { display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.75rem; color: var(--green); background: rgba(34, 197, 94, 0.1); padding: 0.3rem 0.7rem; border-radius: 20px; }
        .status-dot { width: 6px; height: 6px; background: var(--green); border-radius: 50%; }
        .footer-links-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .f-col h4 { font-size: 0.85rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 1rem; }
        .f-col a { display: block; color: var(--text-secondary); text-decoration: none; font-size: 0.88rem; margin-bottom: 0.6rem; }
        .f-col a:hover { color: var(--text-primary); }
        .footer-bottom-bar { max-width: 1100px; margin: 0 auto; padding-top: 2rem; border-top: 1px solid var(--border); text-align: center; font-size: 0.8rem; color: var(--text-muted); }
        .footer-bottom-bar a { color: var(--text-secondary); text-decoration: none; }

        /* Responsive Breakpoints */
        @media (max-width: 992px) {
          .hero-section-modern { grid-template-columns: 1fr; gap: 3rem; padding-top: 7rem; }
          .stats-grid-inner { grid-template-columns: repeat(2, 1fr); }
          .bento-grid-container { grid-template-columns: 1fr; }
          .col-span-2 { grid-column: span 1; }
          .workflow-steps-grid { grid-template-columns: 1fr; }
          .testimonials-grid { grid-template-columns: 1fr; }
          .footer-top-inner { grid-template-columns: 1fr; gap: 2.5rem; }
        }
        @media (max-width: 768px) {
          .nav-menu-links { display: none; }
          .studio-controls-grid { grid-template-columns: 1fr; }
          .prompt-input-wrapper { flex-direction: column; }
          .hero-button-group { flex-direction: column; align-items: stretch; }
          .hero-cta-primary, .hero-cta-secondary { text-align: center; justify-content: center; }
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
