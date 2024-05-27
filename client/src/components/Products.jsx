import React, { useEffect, useState } from 'react';
import api from '../api/api';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/api/product/AllProducts')
                console.log("Api response: ", response.data);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h2>Products</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Description</th>
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
                            {/* <td>{new Date(product.createdAt).toLocaleString()}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Products;
