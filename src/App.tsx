import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/login';
import Calendar from './pages/calendar/calendar';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/calendar" element={<Calendar />} />
    </Routes>
  );
}

export default App;
