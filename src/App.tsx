import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/login';
import Calendar from './pages/calendar/calendar';
import LoginForm from './pages/login/loginForm';
/*import AdminDashboard from './pages/dashboard/AdminDashboard';*/
/*import VetDashboard from './pages/dashboard/VetDashboard';*/

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/login/:rol" element={<LoginForm />} />
      {/*<Route path="/dashboard/admin" element={<AdminDashboard />} />*/}
      {/*<Route path="/dashboard/vet" element={<VetDashboard />} />*/}
    </Routes>
  );
}

export default App;
