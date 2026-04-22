import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchRooms, fetchReservations, fetchAlerts } from '../services/api';

interface AppContextType {
  rooms: any[];
  reservations: any[];
  alerts: any[];
  settings: any;
  loading: boolean;
  updateRoom: (id: string, updates: any) => void;
  addReservation: (reservation: any) => void;
  resolveAlert: (id: number) => void;
  updateSettings: (newSettings: any) => void;
  refreshData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('oryoc_settings');
    return saved ? JSON.parse(saved) : {
      propertyName: 'ORYOC Grand Plaza',
      timezone: 'Eastern Time (ET)',
      currency: 'USD ($)',
      darkModeEnforcement: true
    };
  });
  const [loading, setLoading] = useState(true);

  const refreshData = async () => {
    setLoading(true);
    try {
      const [r, res, a] = await Promise.all([
        fetchRooms(),
        fetchReservations(),
        fetchAlerts()
      ]);
      setRooms(r);
      setReservations(res);
      setAlerts(a);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const updateRoom = (id: string, updates: any) => {
    setRooms(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
  };

  const addReservation = (reservation: any) => {
    setReservations(prev => [reservation, ...prev]);
  };

  const resolveAlert = (id: number) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, severity: 'resolved' } : a));
  };

  const updateSettings = (newSettings: any) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('oryoc_settings', JSON.stringify(updated));
  };

  return (
    <AppContext.Provider value={{
      rooms, reservations, alerts, settings, loading,
      updateRoom, addReservation, resolveAlert, updateSettings, refreshData
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
