import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';

const Menu = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/add-product">Add Product</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/user-list">User List</Link></li>
                <li><Link to="/Inventory">Inventory</Link></li>
                <li>< Logout /></li>
            </ul>
        </nav>
    );
};

export default Menu;
