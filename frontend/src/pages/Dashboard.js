import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, API } from '../context/AuthContext';

const StatCard = ({ icon, label, value, change, color }) => (
  <div className="card fade-in">
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{
        width: 48, height: 48, borderRadius: 12,
        background: color + '20',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.4rem', flexShrink: 0
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.2 }}>{value}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.1rem' }}>{label}</div>
        {change && (
          <div style={{
            fontSize: '0.75rem', marginTop: '0.2rem',
            color: change.startsWith('+') ? '#22c55e' : '#ef4444'
          }}>
            {change} this week
          </div>
        )}
      </div>
    </div>
  </div>
);

const QuickAction = ({ to, icon, title, desc, color }) => (
  <Link to={to} style={{ textDecoration: 'none' }}>
    <div className="card" style={{ cursor: 'pointer', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
      <div style={{
        width: 44, height: 44, borderRadius: 10,
        background: color + '20',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.3rem', flexShrink: 0
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.2rem' }}>{title}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{desc}</div>
      </div>
    </div>
  </Link>
);

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      API.get('/analytics/overview'),
      API.get('/content/my-posts?limit=5'),
    ]).then(([analyticsRes, postsRes]) => {
      setStats(analyticsRes.data.data);
      setPosts(postsRes.data.data);
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div style={{
      minHeight: '100vh',
      background: '#05070d',
      padding: '1.5rem',
      overflowX: 'hidden',
      boxSizing: 'border-box',
    }}>

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>
          {greeting}, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', marginBottom: 0 }}>
          Here's your content performance overview
        </p>
      </div>

      {/* Stats Grid — responsive 4 cols → 2 cols → 1 col */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem',
      }}>
        <StatCard icon="📝" label="Total Posts"     value={loading ? '–' : stats?.totalPosts ?? 0}                           change="+3"   color="#6c63ff" />
        <StatCard icon="👁️" label="Total Reach"     value={loading ? '–' : (stats?.totalReach ?? 0).toLocaleString()}        change="+12%" color="#22c55e" />
        <StatCard icon="❤️" label="Total Likes"     value={loading ? '–' : (stats?.totalLikes ?? 0).toLocaleString()}        change="+8%"  color="#f59e0b" />
        <StatCard icon="📈" label="Avg Engagement"  value={loading ? '–' : `${stats?.avgEngagement ?? 0}%`}                  change="+2%"  color="#a855f7" />
      </div>

      {/* Quick Actions + Recent Posts — 2 col → 1 col */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem',
      }}>

        {/* Quick Actions */}
        <div>
          <h2 style={{
            fontSize: '0.8rem', fontWeight: 600, marginBottom: '1rem',
            color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em',
          }}>
            Quick Actions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <QuickAction to="/generator" icon="✨" title="Generate Content"  desc="Create AI-powered posts for any platform" color="#6c63ff" />
            <QuickAction to="/trending"  icon="🔥" title="Explore Trending"  desc="Discover what's hot in your interests"   color="#f59e0b" />
            <QuickAction to="/analyzer"  icon="📊" title="View Analytics"    desc="Track engagement and performance"         color="#22c55e" />
            <QuickAction to="/scheduler" icon="📅" title="Schedule Posts"    desc="Plan and manage your content calendar"    color="#a855f7" />
          </div>
        </div>

        {/* Recent Posts */}
        <div>
          <h2 style={{
            fontSize: '0.8rem', fontWeight: 600, marginBottom: '1rem',
            color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em',
          }}>
            Recent Posts
          </h2>

          {loading ? (
            <div className="card" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
              Loading...
            </div>
          ) : posts.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
              <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✨</p>
              <p>No posts yet. Generate your first one!</p>
              <Link to="/generator" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-flex' }}>
                Generate Now
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {posts.map(post => (
                <div key={post._id} className="card" style={{ padding: '1rem' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.5rem', lineHeight: 1.5, margin: '0 0 0.5rem' }}>
                    {post.content.length > 100 ? post.content.substring(0, 100) + '…' : post.content}
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span className={`badge ${post.status === 'scheduled' ? 'badge-yellow' : post.status === 'posted' ? 'badge-green' : 'badge-purple'}`}>
                      {post.status}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{post.platform}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Interests */}
      {user?.interests?.length > 0 && (
        <div className="card">
          <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.75rem' }}>Your Interests</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {user.interests.map(i => (
              <span key={i} className="badge badge-purple">{i}</span>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
