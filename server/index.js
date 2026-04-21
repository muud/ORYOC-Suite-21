require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// Health check route
app.get('/', (req, res) => {
  res.send('ORYOC Suite Backend is running');
});

// API index route
app.get('/api', (req, res) => {
  res.json({
    endpoints: ['/api/rooms', '/api/reservations', '/api/alerts']
  });
});
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

// Mock data generators
const generateRooms = () => {
  const rooms = [];
  for (let i = 1; i <= 24; i++) {
    const statusOptions = ['Clean', 'Dirty', 'Out of Order'];
    const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
    rooms.push({
      id: `R${i.toString().padStart(2, '0')}`,
      status,
      temperature: Math.floor(Math.random() * 10) + 68, // 68‑77°F
      lock: status === 'Out of Order' ? false : true
    });
  }
  return rooms;
};

let roomsData = generateRooms();

app.get('/api/rooms', (req, res) => {
  res.json(roomsData);
});

app.get('/api/reservations', (req, res) => {
  // Simple static mock reservations
  const reservations = [
    { id: 1, guest: 'John Doe', room: 'R05', status: 'Confirmed', checkIn: '2026-04-20' },
    { id: 2, guest: 'Jane Smith', room: 'R12', status: 'Pending', checkIn: '2026-04-22' },
    { id: 3, guest: 'Bob Lee', room: 'R19', status: 'Cancelled', checkIn: '2026-04-18' }
  ];
  res.json(reservations);
});

app.get('/api/alerts', (req, res) => {
  const alerts = [
    { id: 1, title: 'Room 402 AC Malfunction', time: '15 mins ago', severity: 'critical' },
    { id: 2, title: 'VIP Checkout Complete', time: 'Room 101 cleaning triggered', severity: 'resolved' },
    { id: 3, title: 'Elevator B Maintenance Due', time: 'Scheduled for tonight', severity: 'warning' }
  ];
  res.json(alerts);
});

app.post('/api/alerts', (req, res) => {
  // Placeholder – just echo back
  const newAlert = req.body;
  res.status(201).json(newAlert);
});

// Socket.io real‑time room status updates
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  const interval = setInterval(() => {
    // Randomly change status of a few rooms
    roomsData = roomsData.map(room => {
      if (Math.random() < 0.2) {
        const statusOptions = ['Clean', 'Dirty', 'Out of Order'];
        room.status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
      }
      return room;
    });
    socket.emit('roomStatusUpdate', roomsData);
  }, 10000);

  socket.on('disconnect', () => {
    clearInterval(interval);
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Backend server listening on http://localhost:${PORT}`);
});
