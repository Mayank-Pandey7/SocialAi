

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const INTERESTS = ['technology','sports','business','entertainment','health','science','travel','food'];

export default function RegisterPage() {
  const [form, setForm]           = useState({ name:'', email:'', password:'' });
  const [interests, setInterests] = useState([]);
  const [loading, setLoading]     = useState(false);
  const { register }              = useAuth();
  const navigate                  = useNavigate();

  const toggleInterest = (i) =>
    setInterests(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (interests.length === 0) { toast.error('Pick at least one interest'); return; }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password, interests);
      toast.success('Account created! Welcome 🎉');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card} className="fade-in">
        <div style={styles.logo}>
          <span style={styles.logoIcon}>⚡</span>
          <span style={styles.logoText}>SocialAI</span>
        </div>
        <h2 style={styles.title}>Create your account</h2>
        <p style={{ color:'var(--text-secondary)', fontSize:'0.875rem', marginBottom:'2rem' }}>
          Start generating AI-powered social content
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom:'1rem' }}>
            <label className="label">Full Name</label>
            <input className="input" placeholder="eg. Mayank Pandey" value={form.name}
              onChange={e => setForm({...form, name:e.target.value})} required />
          </div>
          <div style={{ marginBottom:'1rem' }}>
            <label className="label">Email Address</label>
            <input className="input" type="email" placeholder="you@example.com" value={form.email}
              onChange={e => setForm({...form, email:e.target.value})} required />
          </div>
          <div style={{ marginBottom:'1.5rem' }}>
            <label className="label">Password</label>
            <input className="input" type="password" placeholder="Min. 6 characters" value={form.password}
              onChange={e => setForm({...form, password:e.target.value})} required minLength={6} />
          </div>

          {/* Interest Selection */}
          <div style={{ marginBottom:'1.5rem' }}>
            <label className="label">Your Interests (select at least one)</label>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem', marginTop:'0.5rem' }}>
              {INTERESTS.map(i => (
                <button key={i} type="button"
                  onClick={() => toggleInterest(i)}
                  style={{
                    padding:'0.4rem 0.9rem', borderRadius:'20px', border:'1px solid',
                    cursor:'pointer', fontSize:'0.8rem', fontWeight:500, transition:'all 0.15s',
                    borderColor: interests.includes(i) ? 'var(--accent)' : 'var(--border)',
                    background:  interests.includes(i) ? 'rgba(108,99,255,0.15)' : 'var(--bg-secondary)',
                    color:       interests.includes(i) ? 'var(--accent-light)' : 'var(--text-secondary)',
                  }}>
                  {i.charAt(0).toUpperCase() + i.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <button className="btn btn-primary"
            style={{ width:'100%', justifyContent:'center', padding:'0.8rem' }}
            type="submit" disabled={loading}>
            {loading ? <span className="spinner" /> : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign:'center', marginTop:'1.5rem', fontSize:'0.875rem', color:'var(--text-secondary)' }}>
          Already have an account? <Link to="/login" style={{ color:'var(--accent-light)', textDecoration:'none' }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page:    { minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem', background:'radial-gradient(ellipse at 50% 0%, rgba(108,99,255,0.08) 0%, var(--bg-primary) 60%)' },
  card:    { background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:'16px', padding:'2.5rem', width:'100%', maxWidth:'440px' },
  logo:    { display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1.5rem' },
  logoIcon:{ fontSize:'1.5rem' },
  logoText:{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:700, fontSize:'1.25rem', background:'var(--gradient)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' },
  title:   { fontSize:'1.5rem', fontWeight:700, marginBottom:'0.25rem' },
};
