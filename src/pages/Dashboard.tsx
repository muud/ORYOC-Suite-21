import React from 'react';
import { Users, TrendingUp, Key, Droplet, RefreshCw, Bell } from 'lucide-react';
import { StatCard } from '../components/ui/StatCard';
import { AnalyticsChart } from '../components/dashboard/AnalyticsChart';
import { useAppContext } from '../context/AppContext';

const getAlertStyles = (severity: string) => {
  switch (severity) {
    case 'critical': return { bg: 'rgba(239, 68, 68, 0.1)', border: 'var(--danger)', color: 'var(--danger)' };
    case 'resolved': return { bg: 'rgba(16, 185, 129, 0.1)', border: 'var(--accent-emerald)', color: 'var(--accent-emerald)' };
    case 'warning': return { bg: 'rgba(245, 158, 11, 0.1)', border: 'var(--accent-gold)', color: 'var(--accent-gold)' };
    default: return { bg: 'var(--panel-bg)', border: 'var(--panel-border)', color: 'var(--text-primary)' };
  }
};

const Dashboard: React.FC = () => {
  const { rooms, reservations, alerts, loading, resolveAlert, refreshData, settings } = useAppContext();

  // Dynamic stats
  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter(r => r.status === 'Occupied').length;
  const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;
  const pendingReservations = reservations.filter(r => r.status === 'Pending').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Overview</h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Welcome back to {settings.propertyName}.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="glass-panel" style={{ 
              padding: '0.625rem 1.25rem', 
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }} onClick={() => alert('Filter applied')}>Last 24 Hours</button>
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
            onClick={() => alert('Exporting report...')}
            >Generate Report</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        <StatCard title="Estimated Revenue" value="$24,562" icon={<TrendingUp color="var(--accent-cyan)" />} trend="+12.5%" isPositive={true} accentColor="var(--accent-cyan)" />
        <StatCard title="Occupancy Rate" value={`${occupancyRate}%`} icon={<Key color="var(--accent-gold)" />} trend="+4.2%" isPositive={true} accentColor="var(--accent-gold)" />
        <StatCard title="Active Bookings" value={reservations.length} icon={<Users color="var(--accent-blue)" />} trend="+8.1%" isPositive={true} accentColor="var(--accent-blue)" />
        <StatCard title="Water Saved (L)" value="1,240" icon={<Droplet color="var(--accent-emerald)" />} trend="+15.3%" isPositive={true} accentColor="var(--accent-emerald)" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem', gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0 }}>Occupancy vs Revenue</h3>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Live Analytics</span>
          </div>
          <AnalyticsChart />
        </div>
        
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0 }}>Smart Alerts</h3>
            <button 
              onClick={refreshData}
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
                  onClick={() => resolveAlert(alert.id)}
                  style={{ 
                    padding: '1rem', 
                    backgroundColor: styles.bg, 
                    borderLeft: `4px solid ${styles.border}`, 
                    borderRadius: '0 8px 8px 0',
                    transition: 'all 0.2s',
                    cursor: alert.severity === 'resolved' ? 'default' : 'pointer',
                    opacity: alert.severity === 'resolved' ? 0.6 : 1
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
          {pendingReservations > 0 && (
            <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
              <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 500, color: 'var(--accent-blue)' }}>
                You have {pendingReservations} pending reservations to review.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
