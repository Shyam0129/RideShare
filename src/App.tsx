import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import RidesList from './pages/RidesList';
import CreateRide from './pages/CreateRide';
import Profile from './pages/Profile';
import Vehicles from './pages/Vehicles';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="rides" element={<RidesList />} />
            <Route path="rides/create" element={<CreateRide />} />
            <Route path="profile" element={<Profile />} />
            <Route path="vehicles" element={<Vehicles />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}