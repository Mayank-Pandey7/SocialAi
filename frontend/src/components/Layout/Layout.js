import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const NAV_ITEMS = [
  { to:'/dashboard', icon:'🏠', label:'Dashboard' },
  { to:'/generator', icon:'✨', label:'Generator' },
  { to:'/trending',  icon:'🔥', label:'Trending' },
  { to:'/analyzer',  icon:'📊', label:'Analyzer' },
  { to:'/scheduler', icon:'📅', label:'Scheduler' },
];

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => { logout(); toast.success('Logged out'); navigate('/login'); };

  return (
    <div style={styles.wrapper}>

      {/* ── Mobile Top Bar ── */}
      <div className="mobile-topbar" style={styles.mobileTopBar}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>⚡</span>
          <span style={styles.logoText}>SocialAI</span>
        </div>
        <button onClick={() => setMobileOpen(o => !o)} style={styles.hamburger}>
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* ── Mobile Overlay ── */}
      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)} style={styles.overlay} />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`desktop-sidebar ${mobileOpen ? 'mobile-open' : ''}`}
        style={{
          ...styles.sidebar,
          width: collapsed ? 72 : 220,
        }}
      >
        {/* Logo */}
        <div style={styles.logoRow}>
          <span style={styles.logoIcon}>⚡</span>
          {!collapsed && <span style={styles.logoText}>SocialAI</span>}
          <button onClick={() => setCollapsed(c => !c)} style={styles.collapseBtn} className="collapse-btn">
            {collapsed ? '›' : '‹'}
          </button>
        </div>

        {/* Nav Links */}
        <nav style={{ flex:1, padding:'0.5rem 0' }}>
          {NAV_ITEMS.map(item => (
            <NavLink key={item.to} to={item.to}
              onClick={() => setMobileOpen(false)}
              style={({ isActive }) => ({
                ...styles.navLink,
                background:     isActive ? 'rgba(108,99,255,0.15)' : 'transparent',
                color:          isActive ? 'var(--accent-light)' : 'var(--text-secondary)',
                borderLeft:     isActive ? '3px solid var(--accent)' : '3px solid transparent',
                justifyContent: collapsed ? 'center' : 'flex-start',
              })}>
              <span style={{ fontSize:'1.1rem' }}>{item.icon}</span>
              {!collapsed && <span style={{ fontSize:'0.875rem', fontWeight:500 }}>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User footer */}
        <div style={styles.userFooter}>
          {!collapsed && (
            <div style={{ overflow:'hidden' }}>
              <p style={{ fontSize:'0.8rem', fontWeight:600, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{user?.name}</p>
              <p style={{ fontSize:'0.7rem', color:'var(--text-muted)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{user?.email}</p>
            </div>
          )}
          <button onClick={handleLogout} style={styles.logoutBtn} title="Logout">🚪</button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="layout-main" style={styles.main}>
        <div style={styles.container}>
          <Outlet />
        </div>
      </main>

      {/* ── Mobile Bottom Nav ── */}
      <nav className="bottom-nav" style={styles.bottomNav}>
        {NAV_ITEMS.map(item => (
          <NavLink key={item.to} to={item.to}
            style={({ isActive }) => ({
              ...styles.bottomNavItem,
              color: isActive ? 'var(--accent-light)' : 'var(--text-muted)',
            })}>
            <span style={{ fontSize:'1.3rem' }}>{item.icon}</span>
            <span style={{ fontSize:'0.6rem', marginTop:'0.15rem' }}>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

const styles = {
  wrapper:      { display:'flex', minHeight:'100vh', background:'var(--bg-primary)' },

  mobileTopBar: { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 1rem', height:56, background:'var(--bg-secondary)', borderBottom:'1px solid var(--border)', position:'fixed', top:0, left:0, right:0, zIndex:150 },
  hamburger:    { background:'transparent', border:'none', color:'var(--text-primary)', fontSize:'1.3rem', cursor:'pointer', padding:'0.5rem' },
  overlay:      { position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', zIndex:150 },

  sidebar:      { display:'flex', flexDirection:'column', background:'var(--bg-secondary)', borderRight:'1px solid var(--border)', transition:'width 0.25s ease, transform 0.3s ease', overflow:'hidden', position:'sticky', top:0, height:'100vh', flexShrink:0 },
  logoRow:      { display:'flex', alignItems:'center', gap:'0.5rem', padding:'1.25rem 1rem', borderBottom:'1px solid var(--border)', minHeight:64 },
  logoIcon:     { fontSize:'1.3rem', flexShrink:0 },
  logoText:     { fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:'1.1rem', background:'var(--gradient)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', flex:1, whiteSpace:'nowrap' },
  collapseBtn:  { marginLeft:'auto', background:'transparent', border:'none', cursor:'pointer', color:'var(--text-muted)', fontSize:'1.1rem', padding:'0.25rem', flexShrink:0 },
  navLink:      { display:'flex', alignItems:'center', gap:'0.75rem', padding:'0.7rem 1rem', textDecoration:'none', transition:'all 0.15s', borderRadius:'0 8px 8px 0', margin:'0.1rem 0' },
  userFooter:   { display:'flex', alignItems:'center', gap:'0.75rem', padding:'1rem', borderTop:'1px solid var(--border)' },
  logoutBtn:    { background:'transparent', border:'none', cursor:'pointer', fontSize:'1rem', marginLeft:'auto', opacity:0.6, flexShrink:0 },

  main:         { flex: 1, overflowY: 'auto', display: 'flex', justifyContent: 'center'},
  bottomNav:    { display:'none', position:'fixed', bottom:0, left:0, right:0, height:60, background:'var(--bg-secondary)', borderTop:'1px solid var(--border)', zIndex:100 },
  bottomNavItem:{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', flex:1, textDecoration:'none', transition:'color 0.15s', padding:'0.25rem 0' },
  container:    {  width: '100%', maxWidth: '1200px', padding: '1.5rem'},

  logo:         { display:'flex', alignItems:'center', gap:'0.4rem' },
};