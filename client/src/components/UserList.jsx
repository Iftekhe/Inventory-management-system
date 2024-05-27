import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [locations, setLocations] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsersAndLocations = async () => {
            try {
                const [usersResponse, locationsResponse] = await Promise.all([
                    api.get('/api/AllUser'),
                    api.get('/api/allLocation')
                ]);

                console.log('Users Response:', usersResponse.data);  // Debugging
                console.log('Locations Response:', locationsResponse.data);  // Debugging

                setUsers(usersResponse.data);

                // Check if locationsResponse.data is an array
                if (Array.isArray(locationsResponse.data)) {
                    // Create a map of location IDs to location names
                    const locationsMap = {};
                    locationsResponse.data.forEach(location => {
                        locationsMap[location._id] = location.name;
                    });
                    setLocations(locationsMap);
                } else {
                    console.error('Invalid locations data format:', locationsResponse.data);
                    throw new Error('Invalid locations data format');
                }
            } catch (err) {
                setError('Error fetching data');
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsersAndLocations();
    }, []);

    if (loading) {
        return <p>Loading users...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2>Users List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>status</th>
                        <th>Department</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Branch</th>
                        <th>Profile Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.fullName}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.isApproved ? 'Yes' : 'No'}</td>
                            <td>{user.department}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.address}</td>
                            <td>{locations[user.branchId]}</td>  {/* Display location name */}
                            <td>
                                <img
                                    src={`http://localhost:5000/profileImage/${user.profileImage}`}
                                    alt={user.username}
                                    width="50"
                                />
                            </td>
                            <td>
                                <Link to={`/editUser/${user._id}`}>Edit</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersList;
