import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/api/product/AllProducts');
                console.log("Api response: ", response.data);
                setProducts(response.data); // Set products state with response.data directly
                setErrorMessage(''); // Clear error message if fetching succeeds
            } catch (error) {
                console.error('Error fetching products:', error);
                console.error(error.response?.data?.msg);
                setProducts([]); // Ensure products state is an empty array if fetching fails
                setErrorMessage(error.response?.data?.msg || 'Error logging in');
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h2>Products</h2>
            {products.length > 0 ? ( // Check if products is not empty before mapping
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>Description</th>
                            <th>Action</th>
                            {/* <th>Created At</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>{product.model}</td>
                                <td>{product.description}</td>
                                <td>
                                    <Link to={`/editProduct/${product._id}`}>Edit</Link> {/* Add Edit link */}
                                </td>
                                {/* <td>{new Date(product.createdAt).toLocaleString()}</td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No products available</p>
            )}
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export default Products;
