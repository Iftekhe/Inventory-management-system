import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';


import RegisterPage from './components/User_Management/Register'
import LoginPage from './components/User_Management/Login';
import AddProductPage from './components/Product_Management/AddProduct';

import AdminAddProductPage from './components/Product_Management/AdminAddProduct';

import ProductsPagee from './components/Product_Management/Products';
import BranchProductPage from './components/Product_Management/AvailableProduct';
// import Avai

import RegisterUpdateUserPage from './components/User_Management/RegisterUpdateUser';
import UsersListPage from './components/User_Management/UserList';
import AdminUserListPage from './components/User_Management/AdminUserList';
import EditUserPage from './components/User_Management/EditUser';

import EditProductPage from './components/Product_Management/EditProduct';
import InventoryPage from './components/Inventory_Management/Inventory'
import AddInventoryPage from './components/Inventory_Management/AddInventory'
import AddLocationPage from './components/Location_Management/AddLocation';
import AllBranchLocationsPage from './components/Location_Management/AllBranchLocations';
import AddAssignmentPage from './components/Assignment_Management/AddAssignment';
import ViewAssignmentsPage from './components/Assignment_Management/ViewAssignments';
import AddTransferPage from './components/Transfer_Management/AddTransfer';
import PrivateRoute from './components/Auth/PrivateRoute';
import PublicRoute from './components/Auth/PublicRoute';
import { isLoggedIn, getUserRole } from './components/Auth/auth';
import Unauthorized from './components/Unauthorized';
import AdminHeadOfficeComponent from './components/Head_Admin_Management/AdminHeadOfficeComponent';

import AdminDashboard from './components/Dashboards/AdminDashboard';
import EmployeeDashboard from './components/Dashboards/EmployeeDashboard';

import AdminInventoryPage from './components/Inventory_Management/AdminInventory';

import VIewBranchAvailableProductPage from './components/Inventory_Management/VIewBranchAvailableProduct';

import PendingProductsPage from './components/Head_Admin_Management/PendingProductsComponent';
import PendingInventoryPage from './components/Head_Admin_Management/PendingInventoryComponent';

import PendingUsersComponent from './components/User_Management/PendingUsersComponent';

import AddEmployeeRequestPage from './components/Product_Management/AddEmployeeRequest';

import AdminAddInventoryPage from './components/Inventory_Management/AdminAddInventory';

import BranchProducts from './components/Product_Management/BranchProducts';

import AllUserListPage from './components/User_Management/AllUserList';

import AllInventoryPage from './components/Inventory_Management/AllInventory';
function App() {
    const token = localStorage.getItem('token');
    const userRole = token ? JSON.parse(atob(token.split('.')[1])).department : null;
    const branch = token ? JSON.parse(atob(token.split('.')[1])).branch : null;
  
    return (
        <Router>
          <Routes>

          {/* <Route path="/" element={<PrivateRoute element={
                 isLoggedIn() ? (
              userRole === 'Administration' ?  (
                <Navigate to="/admin-dashboard" />
              ) :  (
                <Navigate to="/employee-dashboard" />
              )
               ) : (
              <Navigate to="/login" />
                )
             } />} /> */}
<Route path="/" element={<PrivateRoute element={
          isLoggedIn() ? (
            userRole === 'Administration' ? (
              branch === 'Head Office' ? (
                <Navigate to="/Head-Admin-dashboard" />
              ) : (
                <Navigate to="/admin-dashboard" />
              )
            ) : (
              <Navigate to="/employee-dashboard" />
            )
          ) : (
            <Navigate to="/login" />
          )
        } />} />


          <Route path="/admin-dashboard" element={<PrivateRoute element={<AdminDashboard />} />} />
          <Route path="/employee-dashboard" element={<PrivateRoute element={<EmployeeDashboard />}  />} />

          <Route path="/Head-Admin-dashboard" element={<PrivateRoute element={<AdminHeadOfficeComponent />} allowedRoles={['Administration']} allowedBranch="Head Office" />} />


              <Route path="/register" element={<PublicRoute element={<RegisterPage />} />} />
              <Route path="/login" element={<PublicRoute element={<LoginPage />} />} />

           
              <Route path="/add-product" element={<PrivateRoute element={<AddProductPage />} allowedRoles={['Administration']} />} />
              <Route path="/admin-add-product" element={<PrivateRoute element={<AdminAddProductPage />} allowedRoles={['Administration']} />} />
              <Route path="/Branch-Available-ProductPage/:locationId" element={<PrivateRoute element={<VIewBranchAvailableProductPage />} />} />

        <Route path="/products" element={<PrivateRoute element={<ProductsPagee />} />} />
        <Route path="/branch-products" element={<PrivateRoute element={<BranchProducts />} />} />
        <Route path="/All-Available-products" element={<PrivateRoute element={<BranchProductPage />} />} />
        <Route path="/pending-user/:branchId" element={<PrivateRoute element={<PendingUsersComponent />} />} />

        
        <Route path="/register-Update-User" element={<PrivateRoute element={<RegisterUpdateUserPage />} allowedRoles={['Administration']} />} />
        <Route path="/user-list" element={<PrivateRoute element={<UsersListPage />} allowedRoles={['Administration']} />} />
        <Route path="/All-user-list" element={<PrivateRoute element={<AllUserListPage />} allowedRoles={['Administration']} />} />
        
        <Route path="/admin-user-list" element={<PrivateRoute element={<AdminUserListPage />} allowedRoles={['Administration']} />} />
        <Route path="/editUser/:id" element={<PrivateRoute element={<EditUserPage />} allowedRoles={['Administration']} />} />
        <Route path="/editProduct/:id" element={<PrivateRoute element={<EditProductPage />} allowedRoles={['Administration']} />} />
        <Route path="/branch-inventory" element={<PrivateRoute element={<InventoryPage />} />} />
        <Route path="/All-inventory" element={<PrivateRoute element={<AllInventoryPage />} />} />
        <Route path="/branch-inventory-admin" element={<PrivateRoute element={<AdminInventoryPage />} />} />
        
        <Route path="/Add-Inventory" element={<PrivateRoute element={<AddInventoryPage />} allowedRoles={['Administration']} />} />
        <Route path="/admin-add-inventory" element={<PrivateRoute element={<AdminAddInventoryPage />} allowedRoles={['Administration']} />} />
        <Route path="/Add-Location" element={<PrivateRoute element={<AddLocationPage />} allowedRoles={['Administration']} />} />
        <Route path="/All-Location" element={<PrivateRoute element={<AllBranchLocationsPage />} />} />
        <Route path="/Add-Assignment" element={<PrivateRoute element={<AddAssignmentPage />} allowedRoles={['Administration']} />} />
        <Route path="/View-Assignments" element={<PrivateRoute element={<ViewAssignmentsPage />} />} />
        <Route path="/Add-Transfer" element={<PrivateRoute element={<AddTransferPage />} allowedRoles={['Administration']} />} />
       
       
       
        <Route path="/pending-products" element={<PrivateRoute element={<PendingProductsPage />} />} />
        <Route path="/pending-inventory" element={<PrivateRoute element={<PendingInventoryPage />} />} />


        <Route path="/request-product" element={<PrivateRoute element={<AddEmployeeRequestPage />} />} />


             {/* admin routes */}
             {/* admin routes */}
             {/* admin routes */}

               
                <Route path="*" element={<div>page not found</div>} />
                <Route path="/unauthorized" element={<Unauthorized />} />

            </Routes>
        </Router>
    );
}

export default App;