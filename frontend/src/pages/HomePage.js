import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const TYPED_WORDS = ['tweets.', 'captions.', 'threads.', 'posts.', 'content.'];

const FEATURES = [
  { icon: '✦', title: 'AI Content Engine', desc: 'Generate platform-perfect posts in seconds — professional, funny, motivational or casual tones at your command.', color: '#a78bfa' },
  { icon: '◈', title: 'Trending Intel', desc: 'Real-time topic discovery across tech, sports, business & more. Always post what people care about.', color: '#34d399' },
  { icon: '◉', title: 'Engagement Charts', desc: 'Beautiful analytics dashboards that show reach, likes, and engagement across all your content.', color: '#fb923c' },
  { icon: '◆', title: 'Smart Scheduler', desc: 'Draft today. Schedule for the perfect moment. Your content calendar, fully in control.', color: '#60a5fa' },
  { icon: '◎', title: 'Multi-Platform', desc: 'Twitter, Instagram, LinkedIn, Facebook — each post optimised for its platform\'s character limits and culture.', color: '#f472b6' },
  { icon: '⬡', title: 'Zero API Cost', desc: 'Powered by free AI models and smart templates. Professional output without the subscription fees.', color: '#facc15' },
];

const STATS = [
  { value: '10K+', label: 'Posts Generated' },
  { value: '5', label: 'Platforms Supported' },
  { value: '100%', label: 'Free to Use' },
  { value: '< 3s', label: 'Generation Time' },
];

const TONES = ['professional', 'funny', 'motivational', 'casual', 'inspirational'];

const DEMO_POSTS = {
  professional: '🚀 AI is not replacing your job — someone who understands AI is. The question isn\'t whether to adapt, it\'s how fast. #TechStrategy #FutureReady #Innovation',
  funny: 'Sometimes I use AI to feel productive Like yeah, I\'m doing something with my life then reality hits… I just copied and pasted everything 🤡 #DevLife #TechHumor',
  motivational: 'Every expert was once a complete beginner. Every viral post was once someone\'s first attempt. Keep building. Keep posting. 💪 #NeverStopLearning #GrowthMindset',
  casual: 'honestly AI tools are lowkey changing everything and nobody\'s talking about it enough 👀 the next 2 years are going to be wild #JustSaying',
  inspirational: 'The most powerful tool in technology is still human creativity. Machines compute. Humans imagine. ✨ Build something that matters. #Innovation #HumanFirst',
};

export default function HomePage() {
  const [typedIndex, setTypedIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeTone, setActiveTone] = useState('professional');
  const [demoVisible, setDemoVisible] = useState(false);
  const demoRef = useRef(null);

  useEffect(() => {
    const word = TYPED_WORDS[typedIndex];
    let timeout;
    if (!isDeleting && displayText.length < word.length) {
      timeout = setTimeout(() => setDisplayText(word.slice(0, displayText.length + 1)), 80);
    } else if (!isDeleting && displayText.length === word.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 40);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setTypedIndex(i => (i + 1) % TYPED_WORDS.length);
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, typedIndex]);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setDemoVisible(true); }, { threshold: 0.2 });
    if (demoRef.current) obs.observe(demoRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div style={s.page}>

      {/* ── NAV ── */}
      <nav style={s.nav}>
        <div style={s.navInner}>
          <div style={s.logo}>
            <span style={s.logoGlyph}>⚡</span>
            <span style={s.logoWord}>SocialAI</span>
          </div>
          <div className="hp-nav-links" style={s.navLinks}>
            <a href="#features" style={s.navLink}>Features</a>
            <a href="#demo" style={s.navLink}>Demo</a>
            <a href="#stats" style={s.navLink}>Stats</a>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link to="/login" className="hp-nav-btn-outline" style={s.btnOutline}>Sign in</Link>
            <Link to="/register" className="hp-nav-btn-fill" style={s.btnFill}>Get started →</Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hp-hero" style={s.hero}>
        <div style={s.gridBg} aria-hidden />
        <div style={{ ...s.orb, top: '10%', left: '15%', background: 'radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 70%)' }} />
        <div style={{ ...s.orb, top: '30%', right: '10%', background: 'radial-gradient(circle, rgba(52,211,153,0.12) 0%, transparent 70%)' }} />
        <div style={{ ...s.orb, bottom: '5%', left: '40%', background: 'radial-gradient(circle, rgba(96,165,250,0.1) 0%, transparent 70%)' }} />

        <div className="hp-hero-content" style={s.heroContent}>
          <div style={s.badge}>
            <span style={s.badgeDot} />
            AI-Powered · Free to Use · No Setup Required
          </div>
          <h1 style={s.heroH1}>
            Generate viral<br />
            <span style={s.heroAccent}>{displayText}</span>
            <span style={s.cursor}>|</span>
          </h1>
          <p style={s.heroSub}>
            SocialAI writes platform-perfect social media content in seconds.<br />
            Pick your tone, pick your topic — let AI do the rest.
          </p>
          <div className="hp-cta-row" style={s.ctaRow}>
            <Link to="/register" style={s.heroCta}>
              Start generating free <span style={{ marginLeft: '0.5rem' }}>→</span>
            </Link>
            <a href="#demo" style={s.heroCtaGhost}>See live demo ↓</a>
          </div>
          <div className="hp-trust-row" style={s.trustRow}>
            {['React.js', 'Node.js', 'MongoDB', 'Chart.js', 'Hugging Face AI'].map(t => (
              <span key={t} style={s.techPill}>{t}</span>
            ))}
          </div>
        </div>

        <div className="hp-hero-visual" style={s.heroVisual}>
          {/* position:relative here so the absolute badges anchor to this wrapper */}
          <div style={{ position: 'relative' }}>
            <div style={s.floatCard}>
              <div style={s.floatCardTop}>
                <div style={s.avatar}>M</div>
                <div>
                  <div style={s.floatName}>Mayank Pandey</div>
                  <div style={s.floatHandle}>@mayank_pandey · just now</div>
                </div>
                <div style={s.aiTag}>✦ AI</div>
              </div>
              <p style={s.floatText}>
                🚀 The future belongs to those who learn, adapt, and build. Every great product started as someone's crazy idea. What's yours? #Innovation #Tech
              </p>
              <div style={s.floatActions}>
                <span style={s.floatStat}>❤ 2.4K</span>
                <span style={s.floatStat}>🔁 847</span>
                <span style={s.floatStat}>👁 18.2K</span>
              </div>
            </div>
            <div style={{ ...s.floatBadge, top: '-14px', right: '16px', animationDelay: '0.5s' }}>
              ⚡ Generated in 1.2s
            </div>
            <div style={{ ...s.floatBadge, bottom: '-14px', left: '16px', animationDelay: '1s', background: 'rgba(52,211,153,0.15)', borderColor: 'rgba(52,211,153,0.3)', color: '#34d399' }}>
              📈 +340% engagement
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section id="stats" style={s.statsBand}>
        <div className="hp-stats-inner" style={s.statsInner}>
          {STATS.map(st => (
            <div key={st.label} style={s.statItem}>
              <div style={s.statVal}>{st.value}</div>
              <div style={s.statLabel}>{st.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="hp-section" style={s.section}>
        <div style={s.sectionHead}>
          <div style={s.eyebrow}>Everything you need</div>
          <h2 style={s.sectionH2}>Built for content creators<br />who move fast</h2>
        </div>
        <div className="hp-feat-grid" style={s.featGrid}>
          {FEATURES.map((f, i) => (
            <div key={f.title} style={{ ...s.featCard, animationDelay: `${i * 0.08}s` }}>
              <div style={{ ...s.featIcon, color: f.color, borderColor: f.color + '30', background: f.color + '10' }}>
                {f.icon}
              </div>
              <h3 style={s.featTitle}>{f.title}</h3>
              <p style={s.featDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── DEMO ── */}
      <section id="demo" ref={demoRef} className="hp-section" style={s.section}>
        <div style={s.sectionHead}>
          <div style={s.eyebrow}>Live preview</div>
          <h2 style={s.sectionH2}>See the AI in action</h2>
          <p style={{ color: '#6b7280', fontSize: '1rem', marginTop: '0.75rem' }}>
            Switch tones below — watch the same topic transform instantly
          </p>
        </div>
        <div style={s.demoWrap}>
          <div style={s.toneRow}>
            {TONES.map(t => (
              <button key={t} onClick={() => setActiveTone(t)}
                style={{ ...s.tonePill, ...(activeTone === t ? s.tonePillActive : {}) }}>
                {t}
              </button>
            ))}
          </div>
          <div style={{ ...s.demoCard, opacity: demoVisible ? 1 : 0, transform: demoVisible ? 'none' : 'translateY(20px)', transition: 'all 0.6s ease' }}>
            <div style={s.demoHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={s.demoAvatar}>S</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#e5e7eb' }}>SocialAI User</div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>@user · 2s ago</div>
                </div>
              </div>
              <span style={{ ...s.aiTag, fontSize: '0.72rem' }}>✦ {activeTone}</span>
            </div>
            <p style={{ ...s.floatText, padding: '0 0 1rem', lineHeight: 1.7, minHeight: 80 }}>
              {DEMO_POSTS[activeTone]}
            </p>
            <div style={{ ...s.floatActions, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.75rem', marginTop: 0 }}>
              <span style={s.floatStat}>❤ 1.2K</span>
              <span style={s.floatStat}>🔁 340</span>
              <span style={s.floatStat}>👁 9.8K</span>
            </div>
          </div>
          <Link to="/register" style={{ ...s.heroCta, margin: '0 auto', display: 'inline-flex', marginTop: '1.5rem' }}>
            Try it yourself — it's free →
          </Link>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={s.ctaSection}>
        <div className="hp-cta-box" style={s.ctaBox}>
          <div style={s.ctaOrb} />
          <div style={s.eyebrow}>Struggling to create engaging content?</div>
          <h2 className="hp-cta-h2" style={{ ...s.sectionH2, fontSize: '2.5rem', marginTop: '0.75rem' }}>
            Ready to create better content
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '1rem', maxWidth: 480, margin: '1rem auto 2rem' }}>
            Sign in now and start generating AI-powered social media captions in under 60 seconds.
          </p>
          <div className="hp-cta-row" style={s.ctaRow}>
            <Link to="/register" style={s.heroCta}>Create free account →</Link>
            <Link to="/login" style={s.heroCtaGhost}>Sign in</Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={s.footer}>
        <div style={s.footerInner}>
          <div style={s.logo}>
            <span style={s.logoGlyph}>⚡</span>
            <span style={s.logoWord}>SocialAI</span>
          </div>
          <p style={{ color: '#4b5563', fontSize: '0.82rem' }}>
            © 2026 LogicAI. All Rights Reserved. Built by @mynkdev
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="/login" style={s.footerLink}>Login</Link>
            <Link to="/register" style={s.footerLink}>Register</Link>
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');
        html { scroll-behavior: smooth; }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>
    </div>
  );
}

const s = {
  page: { background: '#060912', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", color: '#e5e7eb', overflowX: 'hidden' },

  nav: { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(6,9,18,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' },
  navInner: { maxWidth: 1200, margin: '0 auto', padding: '0 1.25rem', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  logo: { display: 'flex', alignItems: 'center', gap: '0.4rem' },
  logoGlyph: { fontSize: '1.25rem' },
  logoWord: { fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.15rem', background: 'linear-gradient(135deg, #a78bfa, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  navLinks: { display: 'flex', gap: '2rem', flex: 1, marginLeft: '2rem' },
  navLink: { color: '#9ca3af', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 400 },
  btnOutline: { padding: '0.5rem 1.1rem', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', color: '#e5e7eb', textDecoration: 'none', fontSize: '0.85rem', whiteSpace: 'nowrap' },
  btnFill: { padding: '0.5rem 1.1rem', borderRadius: 8, background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', color: '#fff', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500, whiteSpace: 'nowrap' },

  hero: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1200, margin: '0 auto', padding: '8rem 2rem 4rem', gap: '4rem', position: 'relative' },
  gridBg: { position: 'fixed', inset: 0, backgroundImage: 'linear-gradient(...)', backgroundSize: '48px 48px', },
  orb: { position: 'absolute', width: 600, height: 600, borderRadius: '50%', pointerEvents: 'none' },

  heroContent: { flex: '1 1 480px', zIndex: 1 },
  heroVisual: { flex: '0 0 400px', maxWidth: 420, zIndex: 1 },

  badge: { display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.9rem', border: '1px solid rgba(167,139,250,0.3)', borderRadius: 20, fontSize: '0.78rem', color: '#a78bfa', background: 'rgba(167,139,250,0.08)', marginBottom: '1.5rem', fontWeight: 500 },
  badgeDot: { width: 6, height: 6, borderRadius: '50%', background: '#a78bfa', animation: 'pulse 2s ease infinite' },
  heroH1: { fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.08, marginBottom: '1.25rem', color: '#f9fafb' },
  heroAccent: { background: 'linear-gradient(135deg, #a78bfa 0%, #60a5fa 50%, #34d399 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  cursor: { display: 'inline-block', color: '#a78bfa', animation: 'blink 1s step-end infinite', marginLeft: 2 },
  heroSub: { fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', color: '#9ca3af', lineHeight: 1.7, marginBottom: '2rem' },

  ctaRow: { display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' },
  heroCta: { padding: '0.85rem 1.4rem', borderRadius: 10, background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', color: '#fff', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' },
  heroCtaGhost: { color: '#9ca3af', textDecoration: 'none', fontSize: '0.9rem', padding: '0.85rem 1rem', fontWeight: 400 },
  trustRow: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '2.5rem' },
  techPill: { padding: '0.25rem 0.75rem', borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)', color: '#6b7280', fontSize: '0.72rem', fontWeight: 500 },

  floatCard: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '1.25rem', backdropFilter: 'blur(12px)' },
  floatCardTop: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.875rem' },
  avatar: { width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.95rem', color: '#fff', flexShrink: 0 },
  floatName: { fontSize: '0.875rem', fontWeight: 600, color: '#e5e7eb' },
  floatHandle: { fontSize: '0.75rem', color: '#6b7280' },
  aiTag: { marginLeft: 'auto', padding: '0.2rem 0.6rem', border: '1px solid rgba(167,139,250,0.35)', borderRadius: 20, fontSize: '0.72rem', color: '#a78bfa', background: 'rgba(167,139,250,0.1)', fontWeight: 600, flexShrink: 0 },
  floatText: { fontSize: '0.88rem', color: '#d1d5db', lineHeight: 1.65, margin: 0, marginBottom: '0.875rem' },
  floatActions: { display: 'flex', gap: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.75rem' },
  floatStat: { fontSize: '0.78rem', color: '#6b7280' },
  floatBadge: { position: 'absolute', padding: '0.4rem 0.9rem', background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.25)', borderRadius: 20, fontSize: '0.75rem', color: '#a78bfa', fontWeight: 500, backdropFilter: 'blur(8px)', animation: 'float 4s ease-in-out infinite', whiteSpace: 'nowrap' },

  statsBand: { background: 'rgba(255,255,255,0.025)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' },
  statsInner: { maxWidth: 1200, margin: '0 auto', padding: '2.5rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' },
  statItem: { textAlign: 'center', padding: '0.5rem' },
  statVal: { fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, background: 'linear-gradient(135deg, #a78bfa, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 },
  statLabel: { fontSize: '0.82rem', color: '#6b7280', marginTop: '0.35rem' },

  section: { maxWidth: 1200, margin: '0 auto', padding: '6rem 2rem' },
  sectionHead: { textAlign: 'center', marginBottom: '3.5rem' },
  eyebrow: { fontSize: '0.78rem', fontWeight: 600, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' },
  sectionH2: { fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.6rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#f9fafb', lineHeight: 1.15 },

  featGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' },
  featCard: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '1.75rem', transition: 'border-color 0.2s', animation: 'fadeUp 0.6s ease both' },
  featIcon: { width: 42, height: 42, borderRadius: 10, border: '1px solid', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.15rem', marginBottom: '1rem' },
  featTitle: { fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#f3f4f6', marginBottom: '0.6rem' },
  featDesc: { fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.7, fontWeight: 300 },

  demoWrap: { maxWidth: 640, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' },
  toneRow: { display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' },
  tonePill: { padding: '0.45rem 1rem', borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#6b7280', fontSize: '0.82rem', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontWeight: 500, transition: 'all 0.2s' },
  tonePillActive: { border: '1px solid rgba(167,139,250,0.5)', background: 'rgba(167,139,250,0.12)', color: '#a78bfa' },
  demoCard: { width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '1.5rem' },
  demoHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' },
  demoAvatar: { width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg, #059669, #0891b2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff' },

  ctaSection: { padding: '5rem 1.5rem', position: 'relative' },
  ctaBox: { maxWidth: 800, margin: '0 auto', textAlign: 'center', background: 'rgba(124,58,237,0.07)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: 20, padding: '4rem 3rem', position: 'relative', overflow: 'hidden' },
  ctaOrb: { position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' },

  footer: { borderTop: '1px solid rgba(255,255,255,0.06)', padding: '2rem 1.5rem' },
  footerInner: { maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' },
  footerLink: { color: '#4b5563', textDecoration: 'none', fontSize: '0.82rem' },
};