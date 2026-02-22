import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import ImagesPage from './pages/ImagesPage';
import VolumesPage from './pages/VolumesPage';
import NetworksPage from './pages/NetworksPage';
import SettingsPage from './pages/SettingsPage';
import './App.css';
import Sidebar from './components/layout/Sidebar'

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout" style={{ display: "flex" }}>
        <Sidebar />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/containers" replace />} />
            <Route path="/containers" element={<Dashboard />} />
            <Route path="/images" element={<ImagesPage />} />
            <Route path="/volumes" element={<VolumesPage />} />
            <Route path="/networks" element={<NetworksPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;