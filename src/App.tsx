import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingScreen from './components/common/LoadingScreen';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import Reservations from './pages/Reservations';
import FrontDesk from './pages/FrontDesk';
import Rooms from './pages/Rooms';
import SettingsPage from './pages/Settings';
import { useAppContext } from './context/AppContext';

function App() {
  const { loading } = useAppContext();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="app-container">
        <Sidebar isOpen={sidebarOpen} />
        <div className="main-content">
          <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <main className="page-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/front-desk" element={<FrontDesk />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
