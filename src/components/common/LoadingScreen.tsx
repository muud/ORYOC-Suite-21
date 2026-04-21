import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="loading-container" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: 'var(--bg-color)',
      backgroundImage: `radial-gradient(circle at center, rgba(6,182,212,0.15) 0%, transparent 50%)`
    }}>
      <div className="logo-wrapper" style={{
        animation: 'pulseGlow 2.5s infinite ease-in-out',
        marginBottom: '2rem'
      }}>
        <img 
          src="/logo.jpg" 
          alt="ORYOC Suite 21 Logo" 
          style={{ width: '200px', height: 'auto', borderRadius: '12px' }}
          onError={(e) => {
            // Fallback if logo.jpg is not placed by user yet
            (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200" fill="%230b0f19"><rect width="200" height="200" rx="20" fill="%23191e29"/><text x="50%" y="50%" font-family="Outfit" font-size="24" fill="%23f8fafc" dominant-baseline="middle" text-anchor="middle">ORYOC</text><text x="50%" y="70%" font-family="Outfit" font-size="16" fill="%2306b6d4" dominant-baseline="middle" text-anchor="middle">SUITE 21</text></svg>';
          }}
        />
      </div>
      <div className="loading-bar-container" style={{
        width: '240px',
        height: '4px',
        backgroundColor: 'var(--panel-border)',
        borderRadius: '2px',
        overflow: 'hidden'
      }}>
        <div className="loading-bar-fill" style={{
          height: '100%',
          background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-blue))',
          animation: 'loadProgress 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards'
        }} />
      </div>
      <p style={{
        marginTop: '1rem',
        color: 'var(--text-secondary)',
        fontFamily: 'var(--font-heading)',
        fontSize: '0.875rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase'
      }}>
        Initializing Systems...
      </p>

      <style>{`
        @keyframes loadProgress {
          0% { width: 0%; transform: translateX(-100%); }
          50% { width: 70%; transform: translateX(0%); }
          100% { width: 100%; transform: translateX(0%); }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
