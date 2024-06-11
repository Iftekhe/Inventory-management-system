import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/api';

const UpdateUser = () => {
    const { id } = useParams(); // Use useParams to get the userId from the URL
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        role: '',
        isApproved: false,
        department: '',
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
        branchId: '',
    });
    const [profileImage, setProfileImage] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get(`/api/users/${id}`); // Adjust the endpoint according to your backend
                const userData = response.data;
                setFormData({
                    username: userData.username,
                    role: userData.role,
                    isApproved: userData.isApproved,
                    department: userData.department,
                    fullName: userData.fullName,
                    email: userData.email,
                    phoneNumber: userData.phoneNumber,
                    address: userData.address,
                    branchId: userData.branchId,
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user:', error);
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

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
            const response = await api.put(`/api/registerUpdateUser/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(response.data.msg);
        } catch (error) {
            setMessage(error.response?.data?.msg || 'Error updating user');
        }
    };

    if (loading) {
        return <p>Loading user data...</p>;
    }

    return (
        <div>
            <h2>Update User</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <input type="text" name="role" value={formData.role} onChange={handleChange} required />
                <input type="text" name="department" value={formData.department} onChange={handleChange} />
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                <input type="text" name="address" value={formData.address} onChange={handleChange} />
                <input type="text" name="branchId" value={formData.branchId} onChange={handleChange} />
                <input type="file" name="profileImage" onChange={handleFileChange} />
                <button type="submit">Update</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UpdateUser;
