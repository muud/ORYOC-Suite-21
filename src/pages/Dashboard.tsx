import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, Key, Droplet, RefreshCw, Bell } from 'lucide-react';
import { StatCard } from '../components/ui/StatCard';
import { AnalyticsChart } from '../components/dashboard/AnalyticsChart';
import { fetchAlerts } from '../services/api';

const getAlertStyles = (severity: string) => {
  switch (severity) {
    case 'critical': return { bg: 'rgba(239, 68, 68, 0.1)', border: 'var(--danger)', color: 'var(--danger)' };
    case 'resolved': return { bg: 'rgba(16, 185, 129, 0.1)', border: 'var(--accent-emerald)', color: 'var(--accent-emerald)' };
    case 'warning': return { bg: 'rgba(245, 158, 11, 0.1)', border: 'var(--accent-gold)', color: 'var(--accent-gold)' };
    default: return { bg: 'var(--panel-bg)', border: 'var(--panel-border)', color: 'var(--text-primary)' };
  }
};

const Dashboard: React.FC = () => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const alertData = await fetchAlerts();
    setAlerts(alertData);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAlertClick = (alert: any) => {
    if (alert.severity === 'resolved') return;
    
    setAlerts(prev => prev.map(a => 
      a.id === alert.id ? { ...a, severity: 'resolved', title: `${a.title} (Resolved)` } : a
    ));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Overview</h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Welcome back, here's what's happening today.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="glass-panel" style={{ 
              padding: '0.625rem 1.25rem', 
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }} onClick={() => alert('Date range selector coming soon')}>Date Range</button>
            <button style={{ 
              padding: '0.625rem 1.25rem', 
              backgroundColor: 'var(--accent-blue)', 
              border: 'none', 
              color: 'white',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
              transition: 'transform 0.2s',
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            onClick={() => alert('Report generated successfully!')}
            >Generate Report</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        <StatCard title="Total Revenue" value="$24,562" icon={<TrendingUp color="var(--accent-cyan)" />} trend="+12.5%" isPositive={true} accentColor="var(--accent-cyan)" />
        <StatCard title="Occupancy Rate" value="86%" icon={<Key color="var(--accent-gold)" />} trend="+4.2%" isPositive={true} accentColor="var(--accent-gold)" />
        <StatCard title="New Bookings" value="124" icon={<Users color="var(--accent-blue)" />} trend="+8.1%" isPositive={true} accentColor="var(--accent-blue)" />
        <StatCard title="Water Saved (L)" value="1,240" icon={<Droplet color="var(--accent-emerald)" />} trend="+15.3%" isPositive={true} accentColor="var(--accent-emerald)" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem', gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0 }}>Occupancy vs Revenue</h3>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Last 7 Days</span>
          </div>
          <AnalyticsChart />
        </div>
        
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0 }}>Smart Alerts</h3>
            <button 
              onClick={loadData}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
            >
              <RefreshCw size={16} className={loading ? 'spin' : ''} />
            </button>
          </div>
          
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                <RefreshCw className="spin" size={24} color="var(--accent-cyan)" />
              </div>
            ) : alerts.length > 0 ? alerts.map(alert => {
              const styles = getAlertStyles(alert.severity);
              return (
                <li 
                  key={alert.id} 
                  className="hover-float" 
                  onClick={() => handleAlertClick(alert)}
                  style={{ 
                    padding: '1rem', 
                    backgroundColor: styles.bg, 
                    borderLeft: `4px solid ${styles.border}`, 
                    borderRadius: '0 8px 8px 0',
                    transition: 'all 0.2s',
                    cursor: alert.severity === 'resolved' ? 'default' : 'pointer',
                    opacity: alert.severity === 'resolved' ? 0.7 : 1
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ margin: 0, fontWeight: 500 }}>{alert.title}</p>
                      <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{alert.time}</p>
                    </div>
                    {alert.severity === 'critical' && <Bell size={14} color="var(--danger)" />}
                  </div>
                </li>
              )
            }) : (
              <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '1rem' }}>No active alerts</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
