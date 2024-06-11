// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../../api/api';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const AddEmployeeRequest = () => {
//     const [formData, setFormData] = useState({
//         productName: '',
//         quantity: '',
//     });
//     const [message, setMessage] = useState('');
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true); 
//         try {
//             const token = localStorage.getItem('token');
//             const response = await api.post('/api/employee/requestProduct', formData, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
//             setMessage('Product request sent successfully. Pending approval from admin.');
//             setTimeout(() => {
//                 setLoading(false); 
//                 navigate('/employee/requests');
//             }, 1000);
//         } catch (error) {
//             setMessage(error.response?.data?.message || 'Error sending product request');
//             setLoading(false); 
//         }
//     };

//     return (
//         <div className="container mt-5">
//             <h2>Request Product</h2>
//             <form onSubmit={handleSubmit} className="mt-4">
//                 <div className="form-group">
//                     <label htmlFor="productName">Product Name</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="productName"
//                         name="productName"
//                         placeholder="Product Name"
//                         value={formData.productName}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="quantity">Quantity</label>
//                     <input
//                         type="number"
//                         className="form-control"
//                         id="quantity"
//                         name="quantity"
//                         placeholder="Quantity"
//                         value={formData.quantity}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
//                 {loading ? 'Sending Request...' : 'Send Request'}
//                 </button>
//             </form>
//             {message && <div className="alert alert-info mt-3">{message}</div>}
//         </div>
//     );
// };

// export default AddEmployeeRequest;








// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../../api/api';
// import 'bootstrap/dist/css/bootstrap.min.css';
// //import jwt_decode from 'jwt-decode'; // Import jwt_decode to decode the token

// const AddEmployeeRequest = () => {
//     const [formData, setFormData] = useState({
//         productName: '',
//         quantity: '',
//     });
//     const [message, setMessage] = useState('');
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();
//     const decodeToken = (token) => {
//         try {
//           // Decode the token to get user information
//           return JSON.parse(atob(token.split('.')[1]));
//         } catch (error) {
//           console.error('Error decoding token:', error);
//           return {};
//         }
//       };
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true); 
//         try {
//             console.log('Employee ID:');

//             // const token = localStorage.getItem('token');
//             // const decodedToken = jwt_decode(token); // Decode the token to get the employee ID
//             // const employeeId = decodedToken.id;
//         //console.log('Employee ID:', employeeId);
//         const existingToken = localStorage.getItem('token');
//         const decodedToken = decodeToken(existingToken);
//         const employeeId = decodedToken.id
//         console.log(employeeId)
//             // Send the employeeId in the request body to the backend
//             const response = await api.post('/api/employee/requestProduct', { ...formData, employeeId });
            
//             setMessage('Product request sent successfully. Pending approval from admin.');
//             setTimeout(() => {
//                 setLoading(false); 
//                 navigate('/employee/requests');
//             }, 1000);
//         } catch (error) {
//             setMessage(error.response?.data?.message || 'Error sending product request');
//             setLoading(false); 
//         }
//     };

//     return (
//         <div className="container mt-5">
//             <h2>Request Product</h2>
//             <form onSubmit={handleSubmit} className="mt-4">
//                 <div className="form-group">
//                     <label htmlFor="productName">Product Name</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="productName"
//                         name="productName"
//                         placeholder="Product Name"
//                         value={formData.productName}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="quantity">Quantity</label>
//                     <input
//                         type="number"
//                         className="form-control"
//                         id="quantity"
//                         name="quantity"
//                         placeholder="Quantity"
//                         value={formData.quantity}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
//                 {loading ? 'Sending Request...' : 'Send Request'}
//                 </button>
//             </form>
//             {message && <div className="alert alert-info mt-3">{message}</div>}
//         </div>
//     );
// };

// export default AddEmployeeRequest;







// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../../api/api';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const AddEmployeeRequest = () => {
//     const [formData, setFormData] = useState({
//         productId: '',
//         quantity: '',
//     });
//     const [products, setProducts] = useState([]);
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [message, setMessage] = useState('');
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const decodeToken = (token) => {
//         try {
//             return JSON.parse(atob(token.split('.')[1]));
//         } catch (error) {
//             console.error('Error decoding token:', error);
//             return {};
//         }
//     };

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await api.get('/api/product/AllApprovedProducts');
//                 const products = response.data || [];
//                 setProducts(products);
//                 setFilteredProducts(products);
//             } catch (error) {
//                 console.error('Error fetching approved products:', error);
//             }
//         };
//         fetchProducts();
//     }, []);

//     const handleSearchChange = (e) => {
//         const { value } = e.target;
//         setSearchQuery(value);

//         const filtered = products.filter(product =>
//             (product.name && product.name.toLowerCase().includes(value.toLowerCase())) ||
//             (product.productCode && product.productCode.toLowerCase().includes(value.toLowerCase())) ||
//             (product.subcategory && product.subcategory.toLowerCase().includes(value.toLowerCase()))
//         );
//         setFilteredProducts(filtered);
//     };

//     const handleProductSelect = (product) => {
//         setSelectedProduct(product);
//         setFormData({ ...formData, productId: product._id });
//     };

//     const handleChangeProduct = () => {
//         setSelectedProduct(null);
//         setFormData({ ...formData, productId: '' });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const existingToken = localStorage.getItem('token');
//             const decodedToken = decodeToken(existingToken);
//             const employeeId = decodedToken.id;

//             await api.post('/api/employee/requestProduct', { ...formData, employeeId });

//             setMessage('Product request sent successfully. Pending approval from admin.');
//             setTimeout(() => {
//                 setLoading(false);
//                 navigate('/employee/requests');
//             }, 1000);
//         } catch (error) {
//             setMessage(error.response?.data?.message || 'Error sending product request');
//             setLoading(false);
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     return (
//         <div className="container mt-5">
//             <h2>Request Product</h2>
//             <form onSubmit={handleSubmit} className="mt-4">
//                 <div className="form-group">
//                     <label htmlFor="search">Search Products</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="search"
//                         name="search"
//                         placeholder="Search by product name, code, or subcategory"
//                         value={searchQuery}
//                         onChange={handleSearchChange}
//                     />
//                 </div>
//                 {selectedProduct ? (
//                     <div className="form-group">
//                         <label>Selected Product:</label>
//                         <div className="card">
//                             <div className="card-body">
//                                 <h5 className="card-title">{selectedProduct.name}</h5>
//                                 <p className="card-text">Product Code: {selectedProduct.productCode}</p>
//                                 <p className="card-text">Category: {selectedProduct.category}</p>
//                                 <p className="card-text">Subcategory: {selectedProduct.subcategory}</p>
//                                 <p className="card-text">Description: {selectedProduct.description}</p>
//                                 <button
//                                     type="button"
//                                     className="btn btn-secondary"
//                                     onClick={handleChangeProduct}
//                                 >
//                                     Change Product
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="form-group">
//                         <label>Available Products:</label>
//                         <ul className="list-group">
//                             {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
//                                 filteredProducts.map(product => (
//                                     <li
//                                         key={product._id}
//                                         className="list-group-item"
//                                         onClick={() => handleProductSelect(product)}
//                                     >
//                                         {product.name} - {product.productCode}
//                                     </li>
//                                 ))
//                             ) : (
//                                 <li className="list-group-item">No products found</li>
//                             )}
//                         </ul>
//                     </div>
//                 )}
//                 <div className="form-group">
//                     <label htmlFor="quantity">Quantity</label>
//                     <input
//                         type="number"
//                         className="form-control"
//                         id="quantity"
//                         name="quantity"
//                         placeholder="Quantity"
//                         value={formData.quantity}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
//                     {loading ? 'Sending Request...' : 'Send Request'}
//                 </button>
//             </form>
//             {message && <div className="alert alert-info mt-3">{message}</div>}
//         </div>
//     );
// };

// export default AddEmployeeRequest;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../../api/api';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const AddEmployeeRequest = () => {
//     const [formData, setFormData] = useState({
//         productId: '',
//         quantity: '',
//     });
//     const [products, setProducts] = useState([]);
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [message, setMessage] = useState('');
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await api.get('/api/product/AllApprovedProducts');
//                 const products = response.data || [];
//                 setProducts(products);
//                 setFilteredProducts(products);
//             } catch (error) {
//                 console.error('Error fetching approved products:', error);
//             }
//         };
//         fetchProducts();
//     }, []);

//     const handleSearchChange = (e) => {
//         const { value } = e.target;
//         setSearchQuery(value);

//         const filtered = products.filter(product =>
//             (product.name && product.name.toLowerCase().includes(value.toLowerCase())) ||
//             (product.productCode && product.productCode.toLowerCase().includes(value.toLowerCase())) ||
//             (product.subcategory && product.subcategory.toLowerCase().includes(value.toLowerCase()))
//         );
//         setFilteredProducts(filtered);
//     };

//     const handleProductSelect = (product) => {
//         setSelectedProduct(product);
//         setFormData({ ...formData, productId: product._id });
//     };

//     const handleChangeProduct = () => {
//         setSelectedProduct(null);
//         setFormData({ ...formData, productId: '' });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const token = localStorage.getItem('token');
//             const response = await api.post('/api/employee/requestProduct', { ...formData, employeeId: 'your_employee_id_here' }, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
//             setMessage(response.data.message || 'Product request sent successfully. Pending approval from admin.');
//             setTimeout(() => {
//                 setLoading(false);
//                 navigate('/employee/requests');
//             }, 1000);
//         } catch (error) {
//             setMessage(error.response?.data?.message || 'Error sending product request');
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="container mt-5">
//             <h2>Request Product</h2>
//             <form onSubmit={handleSubmit} className="mt-4">
//                 <div className="form-group">
//                     <label htmlFor="search">Search Products</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="search"
//                         name="search"
//                         placeholder="Search by product name, code, or subcategory"
//                         value={searchQuery}
//                         onChange={handleSearchChange}
//                     />
//                 </div>
//                 {selectedProduct ? (
//                     <div className="form-group">
//                         <label>Selected Product:</label>
//                         <div className="card">
//                             <div className="card-body">
//                                 <h5 className="card-title">{selectedProduct.name}</h5>
//                                 <p className="card-text">Product Code: {selectedProduct.productCode}</p>
//                                 <p className="card-text">Category: {selectedProduct.category}</p>
//                                 <p className="card-text">Subcategory: {selectedProduct.subcategory}</p>
//                                 {/* Add more details here if needed */}
//                                 <button
//                                     type="button"
//                                     className="btn btn-secondary"
//                                     onClick={handleChangeProduct}
//                                 >
//                                     Change Product
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="form-group">
//                         <label>Available Products:</label>
//                         <ul className="list-group">
//                             {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
//                                 filteredProducts.map(product => (
//                                     <li
//                                         key={product._id}
//                                         className="list-group-item"
//                                         onClick={() => handleProductSelect(product)}
//                                     >
//                                         {product.name} - {product.productCode}
//                                     </li>
//                                 ))
//                             ) : (
//                                 <li className="list-group-item">No products found</li>
//                             )}
//                         </ul>
//                     </div>
//                 )}
//                 <div className="form-group">
//                     <label htmlFor="quantity">Quantity</label>
//                     <input
//                         type="number"
//                         className="form-control"
//                         id="quantity"
//                         name="quantity"
//                         placeholder="Quantity"
//                         value={formData.quantity}
//                         onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
//                     {loading ? 'Sending Request...' : 'Send Request'}
//                 </button>
//             </form>
//             {message && <div className="alert alert-info mt-3">{message}</div>}
//         </div>
//     );
// };

// export default AddEmployeeRequest;








// import React, { useState, useEffect } from 'react';
// import api from '../../api/api';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const AddEmployeeRequest = () => {
//     const [formData, setFormData] = useState({
//         productId: '',
//         quantity: '',
//         branchId: '',
//     });
//     const [products, setProducts] = useState([]);
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [message, setMessage] = useState('');
//     const [loading, setLoading] = useState(false);

//     const fetchProducts = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await api.get('/api/product/BranchAllApprovedProducts', {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
//             const products = response.data || [];
//             setProducts(products);
//             setFilteredProducts(products);

//             // Decode the token to get the employee's branchId
//             const decodedToken = decodeToken(token);
//             const branchId = decodedToken.branchId;  // Assuming `branchId` is stored in the token

//             setFormData(prevFormData => ({ ...prevFormData, branchId }));
//         } catch (error) {
//             console.error('Error fetching approved products or decoding token:', error);
//         }
//     };

//     useEffect(() => {
//         fetchProducts();
//     }, []);

//     const decodeToken = (token) => {
//         try {
//             return JSON.parse(atob(token.split('.')[1]));
//         } catch (error) {
//             console.error('Error decoding token:', error);
//             return {};
//         }
//     };

//     const handleSearchChange = (e) => {
//         const { value } = e.target;
//         setSearchQuery(value);

//         const filtered = products.filter(product =>
//             (product.name && product.name.toLowerCase().includes(value.toLowerCase())) ||
//             (product.productCode && product.productCode.toLowerCase().includes(value.toLowerCase())) ||
//             (product.subcategory && product.subcategory.toLowerCase().includes(value.toLowerCase()))
//         );
//         setFilteredProducts(filtered);
//     };

//     const handleProductSelect = (product) => {
//         setSelectedProduct(product);
//         setFormData({ ...formData, productId: product._id });
//     };

//     const handleChangeProduct = () => {
//         setSelectedProduct(null);
//         setFormData({ ...formData, productId: '', quantity: '' });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const token = localStorage.getItem('token');
//             const decodedToken = decodeToken(token);
//             const employeeId = decodedToken.id;

//             const response = await api.post('/api/employee/requestProduct', { ...formData, employeeId });
//             setMessage(response.data.message || 'Product request sent successfully. Pending approval from admin.');
//             setTimeout(() => {
//                 setLoading(false);
//             }, 1000);
//         } catch (error) {
//             setMessage(error.response?.data?.message || 'Error sending product request');
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="container mt-5">
//             <h2>Request Product</h2>
//             <form onSubmit={handleSubmit} className="mt-4">
//                 <div className="form-group">
//                     <label htmlFor="search">Search Products</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="search"
//                         name="search"
//                         placeholder="Search by product name, code, or subcategory"
//                         value={searchQuery}
//                         onChange={handleSearchChange}
//                     />
//                 </div>
//                 {selectedProduct ? (
//                     <div className="form-group">
//                         <label>Selected Product:</label>
//                         <div className="card">
//                             <div className="card-body">
//                                 <h5 className="card-title">{selectedProduct.name}</h5>
//                                 <p className="card-text">Product Code: {selectedProduct.productCode}</p>
//                                 <p className="card-text">Category: {selectedProduct.category}</p>
//                                 <p className="card-text">Subcategory: {selectedProduct.subcategory}</p>
//                                 <button
//                                     type="button"
//                                     className="btn btn-secondary"
//                                     onClick={handleChangeProduct}
//                                 >
//                                     Change Product
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="form-group">
//                         <label>Available Products:</label>
//                         <ul className="list-group">
//                             {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
//                                 filteredProducts.map(product => (
//                                     <li
//                                         key={product._id}
//                                         className="list-group-item"
//                                         onClick={() => handleProductSelect(product)}
//                                     >
//                                         {product.name} - {product.productCode}
//                                     </li>
//                                 ))
//                             ) : (
//                                 <li className="list-group-item">No products found</li>
//                             )}
//                         </ul>
//                     </div>
//                 )}
//                 <div className="form-group">
//                     <label htmlFor="quantity">Quantity</label>
//                     <input
//                         type="number"
//                         className="form-control"
//                         id="quantity"
//                         name="quantity"
//                         placeholder="Quantity"
//                         value={formData.quantity}
//                         onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
//                     {loading ? 'Sending Request...' : 'Send Request'}
//                 </button>
//             </form>
//             {message && <div className="alert alert-info mt-3">{message}</div>}
//         </div>
//     );
// };

// export default AddEmployeeRequest;



import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddEmployeeRequest = () => {
    const [formData, setFormData] = useState({
        productId: '',
        quantity: '',
        branchId: '',
    });
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setMessage('Authorization token missing');
                return;
            }

            const response = await api.get('/api/product/BranchAllApprovedProducts', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const products = response.data || [];
            setProducts(products);
            setFilteredProducts(products);

            // Decode the token to get the employee's branchId
            const decodedToken = decodeToken(token);
            const branchId = decodedToken.branchId;

            if (!branchId) {
                setMessage('Invalid token');
                return;
            }

            setFormData(prevFormData => ({ ...prevFormData, branchId }));
        } catch (error) {
            console.error('Error fetching approved products or decoding token:', error);
            setMessage('Error fetching approved products or decoding token');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const decodeToken = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (error) {
            console.error('Error decoding token:', error);
            return {};
        }
    };

    const handleSearchChange = (e) => {
        const { value } = e.target;
        setSearchQuery(value);

        const filtered = products.filter(product =>
            (product.name && product.name.toLowerCase().includes(value.toLowerCase())) ||
            (product.productCode && product.productCode.toLowerCase().includes(value.toLowerCase())) ||
            (product.subcategory && product.subcategory.toLowerCase().includes(value.toLowerCase()))
        );
        setFilteredProducts(filtered);
    };

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
        setFormData({ ...formData, productId: product._id });
    };

    const handleChangeProduct = () => {
        setSelectedProduct(null);
        setFormData({ ...formData, productId: '', quantity: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setMessage('Authorization token missing');
                setLoading(false);
                return;
            }

            const decodedToken = decodeToken(token);
            const employeeId = decodedToken.id;

            const response = await api.post('/api/employee/requestProduct', { ...formData, employeeId });
            setMessage(response.data.message || 'Product request sent successfully. Pending approval from admin.');
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error sending product request');
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Request Product</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="form-group">
                    <label htmlFor="search">Search Products</label>
                    <input
                        type="text"
                        className="form-control"
                        id="search"
                        name="search"
                        placeholder="Search by product name, code, or subcategory"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
                {selectedProduct ? (
                    <div className="form-group">
                        <label>Selected Product:</label>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{selectedProduct.name}</h5>
                                <p className="card-text">Product Code: {selectedProduct.productCode}</p>
                                <p className="card-text">Category: {selectedProduct.category}</p>
                                <p className="card-text">Subcategory: {selectedProduct.subcategory}</p>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleChangeProduct}
                                >
                                    Change Product
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="form-group">
                        <label>Available Products:</label>
                        <ul className="list-group">
                            {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
                                filteredProducts.map(product => (
                                    <li
                                        key={product._id}
                                        className="list-group-item"
                                        onClick={() => handleProductSelect(product)}
                                    >
                                        {product.name} - {product.productCode}
                                    </li>
                                ))
                            ) : (
                                <li className="list-group-item">No products found</li>
                            )}
                        </ul>
                    </div>
                )}
                <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        type="number"
                        className="form-control"
                        id="quantity"
                        name="quantity"
                        placeholder="Quantity"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
                    {loading ? 'Sending Request...' : 'Send Request'}
                </button>
            </form>
            {message && <div className="alert alert-info mt-3">{message}</div>}
        </div>
    );
};

export default AddEmployeeRequest;
