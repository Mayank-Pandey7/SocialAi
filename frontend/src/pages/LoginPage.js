// ============================================
// pages/LoginPage.js
// ============================================

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [form, setForm]       = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login }             = useAuth();
  const navigate              = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back! 🎉');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card} className="fade-in">
        {/* Logo */}
        <div style={styles.logo}>
          <span style={styles.logoIcon}>⚡</span>
          <span style={styles.logoText}>SocialAI</span>
        </div>
        <h2 style={styles.title}>Welcome back</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '2rem' }}>
          Sign in to your account to continue
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label className="label">Email Address</label>
            <input className="input" type="email" placeholder="you@example.com"
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="label">Password</label>
            <input className="input" type="password" placeholder="••••••••"
              value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
          </div>
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.8rem' }}
            type="submit" disabled={loading}>
            {loading ? <span className="spinner" /> : 'Sign In'}
          </button>
        </form>

        {/* Demo credentials hint */}
        <div style={styles.hint}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Demo: test@demo.com / password123</p>
        </div>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--accent-light)', textDecoration: 'none' }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page:    { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: 'radial-gradient(ellipse at 50% 0%, rgba(108,99,255,0.08) 0%, var(--bg-primary) 60%)' },
  card:    { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '2.5rem', width: '100%', maxWidth: '420px' },
  logo:    { display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' },
  logoIcon:{ fontSize: '1.5rem' },
  logoText:{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.25rem', background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  title:   { fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' },
  hint:    { marginTop: '1rem', padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '8px', textAlign: 'center', border: '1px solid var(--border)' },
};
