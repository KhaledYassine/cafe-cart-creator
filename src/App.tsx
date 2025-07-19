
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import { MenuProvider } from './context/MenuContext';
import { OrderProvider } from './context/OrderContext';
import { Toaster } from './components/ui/toaster';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';

function getUserRole(user) {
  if (!user) return undefined;
  const roleClaim = user["https://your-app.com/role"] || user["http://localhost:8080/role"];
  if (Array.isArray(roleClaim)) return roleClaim[0];
  return roleClaim;
}

function App() {
  const { isLoading, isAuthenticated, error, user } = useAuth0();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Debug log for role and authentication
  console.log('Auth0:', {
    isAuthenticated,
    user,
    role: getUserRole(user)
  });

  return (
    <Router>
      <MenuProvider>
        <OrderProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/orders"
              element={isAuthenticated ? <Orders /> : <Navigate to="/login" />}
            />
            <Route
              path="/admin"
              element={
                isAuthenticated && user && ((Array.isArray(user["http://localhost:8080/role"]) && user["http://localhost:8080/role"].includes('owner')) ||
                  user["http://localhost:8080/role"] === 'owner'
                )
                  ? <Admin />
                  : <Navigate to="/" />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </OrderProvider>
      </MenuProvider>
    </Router>
  );
}

export default App;
