import React from 'react';
import { Search, Filter, MoreHorizontal, CheckCircle, Clock, XCircle } from 'lucide-react';

const mockBookings = [
  { id: 'RS-1042', guest: 'Eleanor Vance', dates: 'Oct 12 - Oct 15', roomType: 'Suite', amount: '$1,250', status: 'Confirmed' },
  { id: 'RS-1043', guest: 'Marcus Pierce', dates: 'Oct 14 - Oct 16', roomType: 'Standard', amount: '$420', status: 'Pending' },
  { id: 'RS-1044', guest: 'Sarah Jenkins', dates: 'Oct 14 - Oct 18', roomType: 'Deluxe', amount: '$850', status: 'Confirmed' },
  { id: 'RS-1045', guest: 'David Cho', dates: 'Oct 10 - Oct 11', roomType: 'Suite', amount: '$450', status: 'Cancelled' },
  { id: 'RS-1046', guest: 'Emily Rostova', dates: 'Oct 15 - Oct 20', roomType: 'Deluxe', amount: '$1,020', status: 'Pending' },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Confirmed':
      return <span style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.875rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-emerald)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><CheckCircle size={14} /> Confirmed</span>;
    case 'Pending':
      return <span style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.875rem', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--accent-gold)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} /> Pending</span>;
    case 'Cancelled':
      return <span style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.875rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><XCircle size={14} /> Cancelled</span>;
    default:
      return <span>{status}</span>;
  }
};

const Reservations: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Reservations</h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Manage your bookings, arrivals, and departures.</p>
        </div>
        <button style={{ 
            padding: '0.625rem 1.25rem', 
            backgroundColor: 'var(--accent-blue)', 
            border: 'none', 
            color: 'white',
            borderRadius: '8px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
          }}>+ New Booking</button>
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(0,0,0,0.2)', padding: '0.5rem 1rem', borderRadius: '8px', width: '300px' }}>
            <Search size={18} color="var(--text-secondary)" />
            <input type="text" placeholder="Search by name or ID..." style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', width: '100%' }} />
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'transparent', border: '1px solid var(--panel-border)', color: 'var(--text-primary)', borderRadius: '8px', cursor: 'pointer' }}>
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
              {mockBookings.map(b => (
                <tr key={b.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }} className="hover-float">
                  <td style={{ padding: '1rem', fontWeight: 500, color: 'var(--accent-cyan)' }}>{b.id}</td>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>{b.guest}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{b.dates}</td>
                  <td style={{ padding: '1rem' }}>{b.roomType}</td>
                  <td style={{ padding: '1rem' }}>{b.amount}</td>
                  <td style={{ padding: '1rem' }}>{getStatusBadge(b.status)}</td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <button type="button" onClick={() => console.log('More actions for booking')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><MoreHorizontal size={18}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
