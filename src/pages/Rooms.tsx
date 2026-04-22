import React, { useState, useEffect } from 'react';
import { Thermometer, Lock, Wifi, RefreshCw } from 'lucide-react';
import { fetchRooms } from '../services/api';

const getRoomColor = (status: string) => {
  switch (status) {
    case 'Clean': return { border: 'var(--accent-emerald)', bg: 'rgba(16, 185, 129, 0.05)' };
    case 'Occupied': return { border: 'var(--accent-blue)', bg: 'rgba(59, 130, 246, 0.05)' };
    case 'Dirty': return { border: 'var(--accent-gold)', bg: 'rgba(245, 158, 11, 0.05)' };
    case 'Maintenance': return { border: 'var(--danger)', bg: 'rgba(239, 68, 68, 0.05)' };
    case 'Out of Order': return { border: 'var(--danger)', bg: 'rgba(239, 68, 68, 0.05)' };
    default: return { border: 'var(--panel-border)', bg: 'transparent' };
  }
};

const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  const loadRooms = async () => {
    setLoading(true);
    const data = await fetchRooms();
    setRooms(data);
    setLoading(false);
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const filteredRooms = filter === 'All' 
    ? rooms 
    : rooms.filter(r => r.status === filter || (filter === 'Maintenance' && r.status === 'Out of Order'));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Rooms & IoT</h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Live floor map and smart room control.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button 
            onClick={loadRooms} 
            className="glass-panel hover-float" 
            style={{ padding: '0.5rem', borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            title="Refresh"
          >
            <RefreshCw size={18} className={loading ? 'spin' : ''} />
          </button>
          {['All', 'Clean', 'Occupied', 'Dirty', 'Maintenance'].map(f => (
             <button 
                key={f} 
                onClick={() => setFilter(f)}
                style={{
                  padding: '0.5rem 1rem', 
                  background: filter === f ? 'var(--accent-blue)' : 'var(--panel-bg)', 
                  border: '1px solid var(--panel-border)', 
                  color: 'white', 
                  borderRadius: '20px', 
                  cursor: 'pointer', 
                  fontSize: '0.875rem',
                  transition: 'all 0.2s'
                }}
              >
                {f}
              </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.25rem' }}>
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="glass-panel" style={{ height: '180px', animation: 'pulse 1.5s infinite opacity' }} />
          ))
        ) : filteredRooms.map(room => {
          const colors = getRoomColor(room.status);
          return (
            <div key={room.id} className="glass-panel hover-float" style={{ 
              backgroundColor: colors.bg,
              borderTop: `4px solid ${colors.border}`,
              padding: '1.25rem',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>{room.id}</h2>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, color: colors.border, padding: '0.2rem 0.5rem', border: `1px solid ${colors.border}`, borderRadius: '12px' }}>
                  {room.status.toUpperCase()}
                </span>
              </div>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{room.type || 'Standard'}</p>
              
              <div style={{ display: 'flex', gap: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem', marginTop: 'auto' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                   <Thermometer size={14} /> {room.temp}°
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                   <Lock size={14} /> {room.lock === false ? 'Unlocked' : 'Secured'}
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                   <Wifi size={14} /> OK
                 </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Rooms;
