import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000',
  timeout: 5000,
});

export const fetchRooms = async () => {
  const response = await api.get('/api/rooms');
  return response.data;
};

export const fetchReservations = async () => {
  const response = await api.get('/api/reservations');
  return response.data;
};

export const fetchAlerts = async () => {
  const response = await api.get('/api/alerts');
  return response.data;
};

export const postAlert = async (alert: any) => {
  const response = await api.post('/api/alerts', alert);
  return response.data;
};
