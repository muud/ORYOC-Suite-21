import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000',
  timeout: 5000,
});

// Mock data fallbacks
const mockRooms = Array.from({ length: 24 }, (_, i) => ({
  id: `R${(i + 1).toString().padStart(2, '0')}`,
  status: ['Clean', 'Dirty', 'Occupied', 'Maintenance'][Math.floor(Math.random() * 4)],
  type: i > 20 ? 'Suite' : 'Standard',
  temp: Math.floor(Math.random() * 10) + 68,
}));

const mockReservations = [
  { id: 1, guest: 'John Doe', room: 'R05', status: 'Confirmed', checkIn: '2026-04-20' },
  { id: 2, guest: 'Jane Smith', room: 'R12', status: 'Pending', checkIn: '2026-04-22' },
  { id: 3, guest: 'Bob Lee', room: 'R19', status: 'Cancelled', checkIn: '2026-04-18' }
];

const mockAlerts = [
  { id: 1, title: 'Room 402 AC Malfunction', time: '15 mins ago', severity: 'critical' },
  { id: 2, title: 'VIP Checkout Complete', time: 'Room 101 cleaning triggered', severity: 'resolved' },
  { id: 3, title: 'Elevator B Maintenance Due', time: 'Scheduled for tonight', severity: 'warning' }
];

export const fetchRooms = async () => {
  try {
    const response = await api.get('/api/rooms');
    return response.data;
  } catch (error) {
    console.warn('API Error: Falling back to mock rooms', error);
    return mockRooms;
  }
};

export const fetchReservations = async () => {
  try {
    const response = await api.get('/api/reservations');
    return response.data;
  } catch (error) {
    console.warn('API Error: Falling back to mock reservations', error);
    return mockReservations;
  }
};

export const fetchAlerts = async () => {
  try {
    const response = await api.get('/api/alerts');
    return response.data;
  } catch (error) {
    console.warn('API Error: Falling back to mock alerts', error);
    return mockAlerts;
  }
};

export const postAlert = async (alert: any) => {
  try {
    const response = await api.post('/api/alerts', alert);
    return response.data;
  } catch (error) {
    console.warn('API Error: Falling back to local alert creation', error);
    return alert;
  }
};
