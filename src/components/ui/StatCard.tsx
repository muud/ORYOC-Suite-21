import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  isPositive: boolean;
  accentColor: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, isPositive, accentColor }) => {
  return (
    <div className="glass-panel hover-float" style={{ 
      padding: '1.5rem', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '1rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative gradient orb for 3D metallic feel */}
      <div style={{
        position: 'absolute',
        top: '-10px',
        right: '-10px',
        width: '60px',
        height: '60px',
        background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
        opacity: 0.15,
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 1 }}>
        <div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.25rem', fontFamily: 'var(--font-heading)' }}>{title}</p>
          <h3 style={{ fontSize: '1.875rem', fontWeight: 700, margin: 0, letterSpacing: '-0.03em' }}>{value}</h3>
        </div>
        <div style={{ 
          padding: '0.75rem', 
          backgroundColor: 'rgba(255,255,255,0.03)', 
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
          boxShadow: `0 8px 16px -4px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.1)` // Metallic 3D pop
        }}>
          {icon}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', zIndex: 1 }}>
        <span style={{ 
          display: 'flex', 
          alignItems: 'center', 
          color: isPositive ? 'var(--accent-emerald)' : 'var(--danger)',
          fontWeight: 600,
          backgroundColor: isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          padding: '0.25rem 0.5rem',
          borderRadius: '20px'
        }}>
          {isPositive ? <ArrowUpRight size={14} style={{ marginRight: '2px' }}/> : <ArrowDownRight size={14} style={{ marginRight: '2px' }} />}
          {trend}
        </span>
        <span style={{ color: 'var(--text-secondary)' }}>vs last week</span>
      </div>
    </div>
  );
};
