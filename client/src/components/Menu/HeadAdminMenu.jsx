import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logout from '../User_Management/Logout';
//import jwtDecode from 'jwt-decode';

const HeadAdminMenu = () => {
    const [user, setUser] = useState([]);

    const decodeToken = (token) => {
        try {
          // Decode the token to get user information
          return JSON.parse(atob(token.split('.')[1]));
        } catch (error) {
          console.error('Error decoding token:', error);
          return {};
        }
      };

  useEffect(() => {
    const existingToken = localStorage.getItem('token');
      if (existingToken) {
        // Redirect to the appropriate dashboard or display a message
        const decodedToken = decodeToken(existingToken);
        console.log(decodedToken.username)
        setUser(decodedToken)
        
      }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Admin Head Dashboard</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#adminNavbar" aria-controls="adminNavbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="adminNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Products
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="/Admin-add-product">Add Product</Link></li>
                <li><Link className="dropdown-item" to="/pending-products">pending Products</Link></li>
                <li><Link className="dropdown-item" to="/products">Products</Link></li>
              </ul>
            </li>

<li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Location
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="/Add-Location">Add Location</Link></li>
                <li><Link className="dropdown-item" to="/All-Location">All Location</Link></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Inventory
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="/branch-inventory-admin">Branch Inventory</Link></li>
                {/* <li><Link className="dropdown-item" to="/branch-inventory">Branch Inventory</Link></li> */}
                <li><Link className="dropdown-item" to="/admin-add-inventory">Add Inventory</Link></li>
                <li><Link className="dropdown-item" to="/All-inventory">All Inventory</Link></li>
                <li><Link className="dropdown-item" to="/pending-inventory">pending inventory</Link></li>
              </ul>
            </li>
            

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Users
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="/admin-user-list">User List</Link></li>
                <li><Link className="dropdown-item" to="/All-user-list">All User List</Link></li>
                

              </ul>
            </li>        


            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Location
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="/Add-Location">Add Location</Link></li>
                <li><Link className="dropdown-item" to="/All-Location">All Location</Link></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                transfer
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="/Add-Transfer">Add Transfer</Link></li>
              </ul>
            </li>
         
            
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Assignments
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="/Add-Assignment">Add Assignment</Link></li>
                <li><Link className="dropdown-item" to="/View-Assignments">View Assignments</Link></li>
              </ul>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {user.username}
              </a>
              <ul className="dropdown-menu" aria-labelledby="userDropdown">
                <li><Link className="dropdown-item" to="/user-list">User List</Link></li>
                <li><Logout /></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HeadAdminMenu;
