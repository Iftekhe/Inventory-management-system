import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';

const EditUser = () => {
    const { id } = useParams();
    //const history = useHistory();
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
        profileImage: null,
    });
    const [branches, setBranches] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserAndBranches = async () => {
            try {
                const [userResponse, branchesResponse] = await Promise.all([
                    api.get(`/api/AllUser/${id}`),
                    api.get('/api/AllLocation')
                ]);

                setFormData(userResponse.data);
                setBranches(branchesResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserAndBranches();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
    const newFormData = new FormData();
    newFormData.append('profileImage', file);
    setFormData({ ...formData, profileImage: file, formData: newFormData });
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/api/deleteUsers/${id}`);
            window.location.href = '/user-list';
            // history.push('/user-list'); // Redirect to user list page after deletion
        } catch (error) {
            console.error('Error deleting user:', error);
            setMessage('Error deleting user');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        console.log(data.get('profileImage'));
        //data.append('profileImage', formData.profileImage);

        try {
            const response = await api.put(`/api/registerUpdateUser/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(response.data.msg);
            //console.log(setMessage)
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error updating user');
        }
    };

    if (loading) {
        return <p>Loading user data...</p>;
    }

    return (
        <div>
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
                <input type="password" name="password" onChange={handleChange} placeholder="Password" />
                <input type="text" name="role" value={formData.role} onChange={handleChange} placeholder="Role" required />
                <input type="checkbox" name="isApproved" checked={formData.isApproved} onChange={(e) => setFormData({ ...formData, isApproved: e.target.checked })} />
                <span>Approve</span>
                <input type="text" name="department" value={formData.department} onChange={handleChange} placeholder="Department" />
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" />
                <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
                <select name="branchId" value={formData.branchId} onChange={handleChange}>
                    {branches.length === 0 ? (
                        <option value="">Loading branches...</option>
                    ) : (
                        <>
                            {/* <option value="">Select Branch</option> */}
                            {branches.map(branch => (
                                <option key={branch._id} value={branch._id}>
                                    {branch.name}
                                </option>
                            ))}
                        </>
                    )}
                </select>
                <input type="file" name="profileImage" onChange={handleFileChange} />
                {formData.profileImage && (
                    <img src={`http://localhost:5000/profileImage/${formData.profileImage}`} alt="Profile" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                )}
                <button type="submit">Update User</button>
                <button type="button" onClick={handleDelete}>Delete User</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default EditUser;
