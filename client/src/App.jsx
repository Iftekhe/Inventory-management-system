import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
 import PrivateRoute from './components/Auth/PrivateRoute';
 import { isLoggedIn, getUserRole } from './components/Auth/auth';
import PublicRoute from './components/Auth/PublicRoute';
import Unauthorized from './components/Unauthorized';
 import DashboardPage from './page/DashboardPage';
 import RegisterPage from './components/User_Management/Register'
// // Import route files
import ProductRoutes from './routes/ProductRoutes';
import InventoryRoutes from './routes/InventoryRoutes';
import AssignmentRoutes from './routes/AssignmentRoutes';
import UserRoutes from './routes/UserRoutes';
import LocationRoutes from './routes/LocationRoutes'
import LoginPage from './components/User_Management/Login';
import Menu from '../src/components/Menu/UnifiedMenu';

function App() {
  return (
    <>  
    
    
    <Router>
      <Menu/>
      
      <Routes>
      
        <Route path="/" element={<PrivateRoute element={isLoggedIn() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />} />
        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/login" element={<PublicRoute element={<LoginPage />} />} />
        <Route path="/register" element={<PublicRoute element={<RegisterPage />} />} />

        {/* Route groups */}
        <Route path="/products/*" element={<ProductRoutes />} />
        <Route path="/inventory/*" element={<InventoryRoutes />} />
        <Route path="/assignments/*" element={<AssignmentRoutes />} />
        <Route path="/location/*" element={<LocationRoutes />} />
        <Route path="/users/*" element={<UserRoutes />} />
        
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
