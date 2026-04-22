import React, { useState } from 'react';
import { UserCheck, UserMinus, MessageSquare, Key, CreditCard, X, Send, CheckCircle2 } from 'lucide-react';

const FrontDesk: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const handleAction = (type: string) => {
    setActiveModal(type);
    setSuccess(false);
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      setTimeout(() => setActiveModal(null), 2000);
    }, 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      setMessage('');
      setTimeout(() => setActiveModal(null), 1500);
    }, 1000);
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
                  onClick={() => handleAction('check-in')}
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
                <button className="glass-panel hover-float" onClick={() => handleAction('keycard')} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.1)' }}>
                  <Key color="var(--accent-cyan)" size={28} />
                  <span style={{ fontWeight: 500 }}>Issue Keycard</span>
                </button>
                <button className="glass-panel hover-float" onClick={() => handleAction('payment')} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.1)' }}>
                  <CreditCard color="var(--accent-emerald)" size={28} />
                  <span style={{ fontWeight: 500 }}>Process Payment</span>
                </button>
                <button className="glass-panel hover-float" onClick={() => handleAction('message')} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.1)' }}>
                  <MessageSquare color="var(--accent-blue)" size={28} />
                  <span style={{ fontWeight: 500 }}>Message Guest</span>
                </button>
                <button className="glass-panel hover-float" onClick={() => handleAction('checkout')} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.1)' }}>
                  <UserMinus color="var(--accent-gold)" size={28} />
                  <span style={{ fontWeight: 500 }}>Express Checkout</span>
                </button>
             </div>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {activeModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, backdropFilter: 'blur(8px)', animation: 'fadeIn 0.3s'
        }}>
          <div className="glass-panel" style={{
            width: '450px', padding: '2rem', position: 'relative',
            animation: 'slideUp 0.3s ease-out'
          }}>
            <button 
              onClick={() => setActiveModal(null)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>

            {activeModal === 'payment' && (
              <div style={{ textAlign: 'center' }}>
                <h2 style={{ marginBottom: '1.5rem' }}>Process Payment</h2>
                {success ? (
                  <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <CheckCircle2 size={64} color="var(--accent-emerald)" />
                    <h3 style={{ color: 'var(--accent-emerald)' }}>Payment Successful!</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>Transaction ID: #PAY-7821-X9</p>
                  </div>
                ) : (
                  <form onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.875rem' }}>Cardholder Name</label>
                      <input required type="text" placeholder="John Doe" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--panel-border)', color: 'var(--text-primary)', padding: '0.75rem', borderRadius: '8px', outline: 'none' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.875rem' }}>Card Number</label>
                      <input required type="text" placeholder="**** **** **** 1234" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--panel-border)', color: 'var(--text-primary)', padding: '0.75rem', borderRadius: '8px', outline: 'none' }} />
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                        <label style={{ fontSize: '0.875rem' }}>Expiry</label>
                        <input required type="text" placeholder="MM/YY" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--panel-border)', color: 'var(--text-primary)', padding: '0.75rem', borderRadius: '8px', outline: 'none' }} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                        <label style={{ fontSize: '0.875rem' }}>CVC</label>
                        <input required type="text" placeholder="***" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--panel-border)', color: 'var(--text-primary)', padding: '0.75rem', borderRadius: '8px', outline: 'none' }} />
                      </div>
                    </div>
                    <button type="submit" disabled={processing} style={{ 
                      marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--accent-emerald)', 
                      color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer',
                      opacity: processing ? 0.7 : 1
                    }}>
                      {processing ? 'Processing...' : 'Charge $450.00'}
                    </button>
                  </form>
                )}
              </div>
            )}

            {activeModal === 'message' && (
              <div>
                <h2 style={{ marginBottom: '1.5rem' }}>Send Message to Guest</h2>
                <form onSubmit={handleSendMessage} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.875rem' }}>Recipient</label>
                    <select style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--panel-border)', color: 'var(--text-primary)', padding: '0.75rem', borderRadius: '8px', outline: 'none' }}>
                      <option>Sophia Miller (Room 102)</option>
                      <option>James Wilson (Room 143)</option>
                      <option>Emma Davis (Room 201)</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.875rem' }}>Message Content</label>
                    <textarea 
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Welcome to ORYOC Suite! Let us know if you need anything."
                      style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--panel-border)', color: 'var(--text-primary)', padding: '0.75rem', borderRadius: '8px', outline: 'none', minHeight: '120px', resize: 'none' }} 
                    />
                  </div>
                  <button type="submit" disabled={processing} style={{ 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                    padding: '1rem', backgroundColor: 'var(--accent-blue)', 
                    color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer',
                    opacity: processing ? 0.7 : 1
                  }}>
                    {processing ? 'Sending...' : <><Send size={18} /> Send Message</>}
                  </button>
                </form>
              </div>
            )}

            {(activeModal === 'keycard' || activeModal === 'check-in' || activeModal === 'checkout') && (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <h2 style={{ marginBottom: '1.5rem' }}>{activeModal.charAt(0).toUpperCase() + activeModal.slice(1).replace('-', ' ')}</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>This action is being processed by the system.</p>
                <button onClick={() => {
                  setProcessing(true);
                  setTimeout(() => {
                    setProcessing(false);
                    setActiveModal(null);
                  }, 1500);
                }} style={{ padding: '1rem 2rem', backgroundColor: 'var(--accent-blue)', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 600, cursor: 'pointer' }}>
                  {processing ? 'Confirming...' : 'Confirm Action'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FrontDesk;
