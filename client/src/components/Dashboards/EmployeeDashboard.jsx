// AdminDashboard.jsx
import React from 'react';
import EmployeeMenu from '../Menu/EmployeeMenu';

const EmployeeDashboard = () => {
    return (
        <div>
            < EmployeeMenu />
            <h1>Welcome to employee Dashboard</h1>
            {/* Admin-specific content */}
        </div>
    );
};

export default EmployeeDashboard;