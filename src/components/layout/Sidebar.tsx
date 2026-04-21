import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarDays, 
  ConciergeBell, 
  DoorClosed, 
  Settings,
  LogOut 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Reservations', path: '/reservations', icon: CalendarDays },
    { name: 'Front Desk', path: '/front-desk', icon: ConciergeBell },
    { name: 'Rooms', path: '/rooms', icon: DoorClosed },
  ];

  return (
    <aside className="glass-panel" style={{
      width: isOpen ? '260px' : '88px',
      margin: '1rem 0 1rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      padding: '1.5rem',
      borderRadius: '24px',
      transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      overflow: 'hidden'
    }}>
      <div className="brand" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem', justifyContent: isOpen ? 'flex-start' : 'center', transition: 'var(--transition-smooth)' }}>
        <img 
          src="/logo.jpg" 
          alt="Logo" 
          style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><rect width="40" height="40" rx="8" fill="%2306b6d4"/><text x="50%" y="50%" font-family="sans-serif" font-weight="bold" font-size="16" fill="white" dominant-baseline="middle" text-anchor="middle">O</text></svg>';
          }}
        />
        <span style={{ 
          fontFamily: 'var(--font-heading)', 
          fontSize: '1.25rem', 
          fontWeight: 700,
          background: 'linear-gradient(to right, #f8fafc, #06b6d4)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          opacity: isOpen ? 1 : 0,
          whiteSpace: 'nowrap',
          display: isOpen ? 'block' : 'none',
          transition: 'var(--transition-smooth)'
        }}>
          ORYOC
        </span>
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: isOpen ? 'stretch' : 'center' }}>
        {navItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: isOpen ? 'flex-start' : 'center',
              gap: '1rem',
              padding: '0.875rem 1rem',
              borderRadius: '12px',
              color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
              backgroundColor: isActive ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
              textDecoration: 'none',
              transition: 'var(--transition-smooth)',
              fontWeight: isActive ? 600 : 500
            })}
            title={item.name}
          >
            <item.icon size={20} color={window.location.pathname === item.path ? 'var(--accent-cyan)' : 'currentColor'} style={{ flexShrink: 0 }} />
            {isOpen && <span style={{ whiteSpace: 'nowrap' }}>{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer" style={{ borderTop: '1px solid var(--panel-border)', paddingTop: '1rem', marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: isOpen ? 'stretch' : 'center' }}>
        <NavLink to="/settings" style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: isOpen ? 'flex-start' : 'center',
              gap: '1rem',
              padding: '0.875rem 1rem',
              borderRadius: '12px',
              color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
              backgroundColor: isActive ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
              textDecoration: 'none',
              transition: 'var(--transition-smooth)'
            })} title="Settings">
          <Settings size={20} style={{ flexShrink: 0 }} />
          {isOpen && <span style={{ whiteSpace: 'nowrap' }}>Settings</span>}
        </NavLink>
        <button style={{ display: 'flex', alignItems: 'center', justifyContent: isOpen ? 'flex-start' : 'center', gap: '1rem', padding: '0.875rem 1rem', color: 'var(--danger)', background: 'transparent', border: 'none', cursor: 'pointer', transition: 'var(--transition-smooth)' }} title="Logout">
          <LogOut size={20} style={{ flexShrink: 0 }} />
          {isOpen && <span style={{ whiteSpace: 'nowrap' }}>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
