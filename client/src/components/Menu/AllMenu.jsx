import React, { useEffect, useState } from 'react';
import HeadAdminMenu from './HeadAdminMenu';
import EmployeeMenu from './EmployeeMenu';
import BranchAdminMenu from './AdminMenu'
import { jwtDecode } from 'jwt-decode';

const AllMenu = () => {
    const [userRole, setUserRole] = useState('');
    const [userBranch, setUserBranch] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token'); // or wherever you store the token
        if (token) {
            const decodedToken = jwtDecode(token);
            const role = decodedToken.department; // Adjust based on your token structure
            const branch = decodedToken.branch; // Adjust based on your token structure
            console.log("menu")
            setUserRole(role);
            setUserBranch(branch);
        }
    }, []);

    // Determine which menu to show
    const isHeadAdmin = userRole === 'Administration' && userBranch === 'Head Office';
    const isBranchAdmin = userRole === 'Administration' && userBranch !== 'Head Office';

    return (
        <>
            {isHeadAdmin ? <HeadAdminMenu /> : (isBranchAdmin ? <BranchAdminMenu /> : <EmployeeMenu />)}
        </>
    );
};

export default AllMenu;
