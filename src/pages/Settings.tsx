import React, { useState } from 'react';
import { Settings, User, Bell, Shield, Smartphone, Check } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [propertyName, setPropertyName] = useState('ORYOC Grand Plaza');
  const [saving, setSaving] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  const handleSave = () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 3000);
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Property Settings</h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Configure system preferences, integrations, and security.</p>
        </div>
        {showSaved && (
          <div style={{ 
            display: 'flex', alignItems: 'center', gap: '0.5rem', 
            backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-emerald)',
            padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--accent-emerald)',
            animation: 'fadeIn 0.3s'
          }}>
            <Check size={16} /> Changes saved successfully!
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {/* Settings Navigation */}
        <div style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            { icon: <Settings size={18} />, label: 'General', active: true },
            { icon: <User size={18} />, label: 'Account Profile', active: false },
            { icon: <Shield size={18} />, label: 'Security & Roles', active: false },
            { icon: <Bell size={18} />, label: 'Notifications', active: false },
            { icon: <Smartphone size={18} />, label: 'IoT Integrations', active: false },
          ].map(tab => (
            <button key={tab.label} style={{ 
              display: 'flex', alignItems: 'center', gap: '1rem', 
              padding: '1rem', 
              backgroundColor: tab.active ? 'rgba(6, 182, 212, 0.15)' : 'transparent', 
              color: tab.active ? 'var(--accent-cyan)' : 'var(--text-secondary)', 
              border: 'none', 
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: 500,
              textAlign: 'left',
              transition: 'var(--transition-smooth)'
            }}>
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Settings Form Content */}
        <div className="glass-panel" style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', margin: 0 }}>General Information</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Property Name</label>
              <input 
                type="text" 
                value={propertyName} 
                onChange={(e) => setPropertyName(e.target.value)}
                style={{ 
                  background: 'rgba(0,0,0,0.2)', border: '1px solid var(--panel-border)', 
                  color: 'var(--text-primary)', padding: '0.75rem 1rem', borderRadius: '8px', outline: 'none' 
                }} 
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Timezone</label>
                <select style={{ 
                  background: 'rgba(0,0,0,0.2)', border: '1px solid var(--panel-border)', 
                  color: 'var(--text-primary)', padding: '0.75rem 1rem', borderRadius: '8px', outline: 'none', appearance: 'none'
                }}>
                  <option>Eastern Time (ET)</option>
                  <option>Pacific Time (PT)</option>
                  <option>UTC</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Currency</label>
                <select style={{ 
                  background: 'rgba(0,0,0,0.2)', border: '1px solid var(--panel-border)', 
                  color: 'var(--text-primary)', padding: '0.75rem 1rem', borderRadius: '8px', outline: 'none', appearance: 'none'
                }}>
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
               <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Dark Mode Enforcement</label>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                 <div style={{ width: '50px', height: '26px', background: 'var(--accent-cyan)', borderRadius: '13px', position: 'relative', cursor: 'pointer' }}>
                   <div style={{ width: '22px', height: '22px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px' }} />
                 </div>
                 <span style={{ fontSize: '0.875rem' }}>Force dark mode for all staff users</span>
               </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button 
              onClick={handleSave}
              disabled={saving}
              style={{ 
                padding: '0.625rem 2rem', 
                backgroundColor: 'var(--accent-blue)', 
                border: 'none', 
                color: 'white',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: saving ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                opacity: saving ? 0.7 : 1,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
