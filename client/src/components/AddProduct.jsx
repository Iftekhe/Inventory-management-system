import React, { useState } from 'react';
import api from '../api/api';

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        brand: '',
        model: '',
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
 
            const response = await api.post('/api/product/addProduct', formData);
            setMessage(response.data);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error adding product');
        }
    };

    return (
        <div>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                <input type="text" name="description" placeholder="Description" onChange={handleChange} required />
                <input type="text" name="category" placeholder="Category" onChange={handleChange} required />
                <input type="text" name="brand" placeholder="Brand" onChange={handleChange} required />
                <input type="text" name="model" placeholder="Model" onChange={handleChange} required />
                <button type="submit">Add Product</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddProduct;
