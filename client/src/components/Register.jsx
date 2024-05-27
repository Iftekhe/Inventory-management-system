import React, { useState, useEffect } from 'react';
import api from '../api/api';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        role: '',
        department: '',
        fullName: '',
        phoneNumber: '',
        address: '',
        branchId: ''
    });
    const [profileImage, setProfileImage] = useState(null);
    const [Locations, setLocations] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true); // Add a loading state

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const response = await api.get('/api/allLocation'); // Adjust the endpoint according to your backend
                console.log("API Response:", response.data);
                setLocations(response.data);
            } catch (error) {
                console.error('Error fetching branches:', error);
                setLocations([]); // Ensure branches is set to an empty array on error
            } finally {
                setLoading(false); // Set loading to false after fetch
            }
        };

        fetchBranches();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        data.append('profileImage', profileImage);

        try {
            const response = await api.post('/api/register', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error registering user');
        }
    };

    if (loading) {
        return <p>Loading branches...</p>; // Display a loading message while fetching data
    }

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="text" name="role" placeholder="Role" onChange={handleChange} />
                <input type="text" name="department" placeholder="Department" onChange={handleChange} />
                <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} />
                <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} />
                <input type="text" name="address" placeholder="Address" onChange={handleChange} />
                <select name="branchId" onChange={handleChange} required>
                    <option value="">Select Branch</option>
                    {Array.isArray(Locations) && Locations.map(location => {
                        console.log(location); // Add this line to check the structure of each location
                        return (
                            <option key={location._id} value={location._id}>
                                {location.name}
                            </option>
                        );
                    })}
                </select>

                <input type="file" name="profileImage" onChange={handleFileChange} required />
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;
