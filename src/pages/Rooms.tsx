import React, { useState, useEffect } from 'react';
import { Thermometer, Lock, Wifi, RefreshCw, X, Unlock, Power, Settings } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

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
  const { rooms, loading, updateRoom, refreshData } = useAppContext();
  const [filter, setFilter] = useState('All');
  const [selectedRoom, setSelectedRoom] = useState<any | null>(null);

  const filteredRooms = filter === 'All' 
    ? rooms 
    : rooms.filter(r => r.status === filter || (filter === 'Maintenance' && r.status === 'Out of Order'));

  const handleUpdateRoom = (updates: any) => {
    if (!selectedRoom) return;
    updateRoom(selectedRoom.id, updates);
    setSelectedRoom({ ...selectedRoom, ...updates });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Rooms & IoT</h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Live floor map and smart room control.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button 
            onClick={refreshData} 
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
            <div key={room.id} 
              onClick={() => setSelectedRoom(room)}
              className="glass-panel hover-float" 
              style={{ 
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
                   {room.lock === false ? <Unlock size={14} color="var(--danger)" /> : <Lock size={14} />}
                   {room.lock === false ? 'Unlocked' : 'Secured'}
                 </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Room Control Modal */}
      {selectedRoom && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, backdropFilter: 'blur(12px)', animation: 'fadeIn 0.3s'
        }}>
          <div className="glass-panel" style={{
            width: '450px', padding: '2.5rem', position: 'relative',
            animation: 'slideUp 0.3s ease-out'
          }}>
            <button 
              onClick={() => setSelectedRoom(null)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0' }}>Room {selectedRoom.id}</h2>
              <div style={{ display: 'inline-block', padding: '0.25rem 1rem', borderRadius: '20px', backgroundColor: 'rgba(255,255,255,0.05)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                {selectedRoom.type} • {selectedRoom.status}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Thermostat Control */}
              <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.2)', border: 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontWeight: 500 }}>Thermostat</span>
                  <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>{selectedRoom.temp}°F</span>
                </div>
                <input 
                  type="range" min="60" max="85" 
                  value={selectedRoom.temp}
                  onChange={(e) => handleUpdateRoom({ temp: parseInt(e.target.value) })}
                  style={{ width: '100%', accentColor: 'var(--accent-cyan)', cursor: 'pointer' }} 
                />
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <button 
                  onClick={() => handleUpdateRoom({ lock: !selectedRoom.lock })}
                  style={{ 
                    padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--panel-border)',
                    backgroundColor: selectedRoom.lock ? 'rgba(255,255,255,0.05)' : 'rgba(239, 68, 68, 0.1)',
                    color: selectedRoom.lock ? 'var(--text-primary)' : 'var(--danger)',
                    cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem',
                    transition: 'all 0.2s'
                  }}>
                  {selectedRoom.lock ? <Lock size={24} /> : <Unlock size={24} />}
                  <span style={{ fontWeight: 600 }}>{selectedRoom.lock ? 'Lock Door' : 'Unlock Door'}</span>
                </button>
                
                <button 
                  onClick={() => handleUpdateRoom({ status: selectedRoom.status === 'Clean' ? 'Dirty' : 'Clean' })}
                  style={{ 
                    padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--panel-border)',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem',
                    transition: 'all 0.2s'
                  }}>
                  <RefreshCw size={24} />
                  <span style={{ fontWeight: 600 }}>Toggle Status</span>
                </button>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                 <button className="glass-panel" style={{ flex: 1, padding: '1rem', border: 'none', background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                   <Power size={18} color="var(--accent-emerald)" /> Lights
                 </button>
                 <button className="glass-panel" style={{ flex: 1, padding: '1rem', border: 'none', background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                   <Settings size={18} /> Advanced
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rooms;
