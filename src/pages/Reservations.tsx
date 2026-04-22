import React, { useState, useEffect } from 'react';
import { Search, Filter, MoreHorizontal, CheckCircle, Clock, XCircle, RefreshCw } from 'lucide-react';
import { fetchReservations } from '../services/api';

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Confirmed':
      return <span style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.875rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-emerald)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><CheckCircle size={14} /> Confirmed</span>;
    case 'Pending':
      return <span style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.875rem', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--accent-gold)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} /> Pending</span>;
    case 'Cancelled':
      return <span style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.875rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><XCircle size={14} /> Cancelled</span>;
    default:
      return <span style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.875rem', backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>{status}</span>;
  }
};

const Reservations: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const loadData = async () => {
    setLoading(true);
    const data = await fetchReservations();
    // Normalize data if coming from API vs mock
    const normalized = data.map((b: any) => ({
      id: b.id.toString().startsWith('RS-') ? b.id : `RS-${b.id.toString().padStart(4, '0')}`,
      guest: b.guest,
      dates: b.dates || `${b.checkIn} - ...`,
      roomType: b.roomType || 'Standard',
      amount: b.amount || '$' + (Math.floor(Math.random() * 500) + 100),
      status: b.status
    }));
    setBookings(normalized);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredBookings = bookings.filter(b => 
    b.guest.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Reservations</h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Manage your bookings, arrivals, and departures.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            onClick={loadData}
            style={{ padding: '0.625rem', background: 'transparent', border: '1px solid var(--panel-border)', color: 'var(--text-secondary)', borderRadius: '8px', cursor: 'pointer' }}
          >
            <RefreshCw size={18} className={loading ? 'spin' : ''} />
          </button>
          <button style={{ 
              padding: '0.625rem 1.25rem', 
              backgroundColor: 'var(--accent-blue)', 
              border: 'none', 
              color: 'white',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
            }} onClick={() => alert('New booking flow coming soon!')}>+ New Booking</button>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(0,0,0,0.2)', padding: '0.5rem 1rem', borderRadius: '8px', width: '300px' }}>
            <Search size={18} color="var(--text-secondary)" />
            <input 
              type="text" 
              placeholder="Search by name or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', width: '100%' }} 
            />
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'transparent', border: '1px solid var(--panel-border)', color: 'var(--text-primary)', borderRadius: '8px', cursor: 'pointer' }} onClick={() => alert('Filters coming soon!')}>
            <Filter size={18} /> Filters
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--panel-border)', color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                <th style={{ padding: '1rem' }}>Booking ID</th>
                <th style={{ padding: '1rem' }}>Guest Name</th>
                <th style={{ padding: '1rem' }}>Dates</th>
                <th style={{ padding: '1rem' }}>Room Type</th>
                <th style={{ padding: '1rem' }}>Amount</th>
                <th style={{ padding: '1rem' }}>Status</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}><td colSpan={7} style={{ padding: '1rem', textAlign: 'center', opacity: 0.5 }}>Loading...</td></tr>
                ))
              ) : filteredBookings.length > 0 ? filteredBookings.map(b => (
                <tr key={b.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }} className="hover-float">
                  <td style={{ padding: '1rem', fontWeight: 500, color: 'var(--accent-cyan)' }}>{b.id}</td>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>{b.guest}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{b.dates}</td>
                  <td style={{ padding: '1rem' }}>{b.roomType}</td>
                  <td style={{ padding: '1rem' }}>{b.amount}</td>
                  <td style={{ padding: '1rem' }}>{getStatusBadge(b.status)}</td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <button type="button" onClick={() => alert(`Details for ${b.guest}`)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><MoreHorizontal size={18}/></button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={7} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No reservations found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
