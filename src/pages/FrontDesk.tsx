import React from 'react';
import { UserCheck, UserMinus, MessageSquare, Key, CreditCard } from 'lucide-react';

const FrontDesk: React.FC = () => {
  const handleAction = (action: string) => {
    alert(`${action} triggered successfully!`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Front Desk</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Action hub for daily operations and guest services.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        
        {/* Left Column: Arrival Queue */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>Arrivals Queue</span>
            <span style={{ fontSize: '0.875rem', padding: '0.25rem 0.75rem', backgroundColor: 'var(--accent-blue)', borderRadius: '12px' }}>3 Pending</span>
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { id: '102', name: 'Sophia Miller', type: 'VIP', time: 'ETA 14:30' },
              { id: '143', name: 'James Wilson', type: 'Standard', time: 'ETA 15:00' },
              { id: '201', name: 'Emma Davis', type: 'Standard', time: 'Waiting in Lobby' },
            ].map(guest => (
              <div key={guest.id} className="glass-panel hover-float" style={{ padding: '1rem', backgroundColor: 'rgba(0,0,0,0.2)', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.125rem' }}>{guest.name}</h4>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{guest.type} • {guest.time}</p>
                </div>
                <button 
                  onClick={() => handleAction(`Check-in for ${guest.name}`)}
                  style={{ padding: '0.5rem', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.2)', color: 'var(--accent-emerald)', border: 'none', cursor: 'pointer' }}
                >
                  <UserCheck size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
             <h3 style={{ marginBottom: '1.5rem' }}>Quick Actions</h3>
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <button className="glass-panel hover-float" onClick={() => handleAction('Keycard Issuance')} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.1)' }}>
                  <Key color="var(--accent-cyan)" size={28} />
                  <span style={{ fontWeight: 500 }}>Issue Keycard</span>
                </button>
                <button className="glass-panel hover-float" onClick={() => handleAction('Payment Processing')} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.1)' }}>
                  <CreditCard color="var(--accent-emerald)" size={28} />
                  <span style={{ fontWeight: 500 }}>Process Payment</span>
                </button>
                <button className="glass-panel hover-float" onClick={() => handleAction('Guest Messaging')} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.1)' }}>
                  <MessageSquare color="var(--accent-blue)" size={28} />
                  <span style={{ fontWeight: 500 }}>Message Guest</span>
                </button>
                <button className="glass-panel hover-float" onClick={() => handleAction('Express Checkout')} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.1)' }}>
                  <UserMinus color="var(--accent-gold)" size={28} />
                  <span style={{ fontWeight: 500 }}>Express Checkout</span>
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontDesk;
