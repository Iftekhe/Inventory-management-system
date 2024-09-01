import React, { useEffect, useState } from 'react';
import HeadAdminMenu from './HeadAdminMenu';
import EmployeeMenu from './EmployeeMenu';
import jwtDecode from 'jwt-decode';

const Menu = () => {
    const [userRole, setUserRole] = useState('');
    const [userBranch, setUserBranch] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token'); // or wherever you store the token
        if (token) {
            const decodedToken = jwtDecode(token);
            const role = decodedToken.role; // Adjust based on your token structure
            const branch = decodedToken.branchId.name; // Adjust based on your token structure
           
            setUserRole(role);
            setUserBranch(branch);
        }
    }, []);

    const isHeadAdmin = userRole === 'admin' && userBranch === 'Head Office';

    return (
        <>
            {isHeadAdmin ? <HeadAdminMenu /> : <EmployeeMenu />}
        </>
    );
};

export default Menu;
