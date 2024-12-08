

// import React, { useState, useEffect } from 'react';
// import api from '../../api/api';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import EmployeeMenu from '../Menu/EmployeeMenu';

// const AddEmployeeRequest = () => {
//     const [inventoryData, setInventoryData] = useState([]);
//     const [filteredData, setFilteredData] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedProduct, setSelectedProduct] = useState(null);

//     const [formData, setFormData] = useState({
//         productId: "",
//         employeeId: "",
//         branchId: "",
//         assignedDate: "",
//         returnedDate: "",
//         currentStatus: "assigned",
//         quantity: 1,
//     });

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const existingToken = localStorage.getItem('token');
//                 if (!existingToken) throw new Error("Token not found");

//                 const decodedToken = decodeToken(existingToken);
//                 const branchId = decodedToken.branchId;
//                 setFormData((prevFormData) => ({ ...prevFormData, branchId }));

//                 const productResponse = await api.get("/api/product/BranchAllApprovedProducts", {
//                     headers: {
//                         'Authorization': `${existingToken}`
//                     }
//                 });
//                 setInventoryData(productResponse.data);
//                 setFilteredData(productResponse.data); // Set filtered data initially to all data
//             } catch (error) {
//                 console.error("Error fetching data", error);
//             }
//         };

//         fetchData();
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
//         setSearchTerm(e.target.value);
//         const lowercasedSearchTerm = e.target.value.toLowerCase();
//         setFilteredData(
//             inventoryData.filter(item =>
//                 item.productId?.name?.toLowerCase().includes(lowercasedSearchTerm) ||
//                 item.productId?.productCode?.toLowerCase().includes(lowercasedSearchTerm) ||
//                 item.productId?.subcategory?.toLowerCase().includes(lowercasedSearchTerm)
//             )
//         );
//     };

//     const handleSelectProduct = (product) => {
//         setSelectedProduct(product);
//         setFormData({ ...formData, productId: product.productId._id });
//         setFilteredData([product]); // Show only the selected product
//     };

//     const handleDeselectProduct = () => {
//         setSelectedProduct(null);
//         setFormData({ ...formData, productId: "" });
//         setFilteredData(inventoryData); // Show all products again
//     };

//     const handleSubmitRequest = async () => {
//         try {
//             const { productId, assignedDate, returnedDate, branchId } = formData;

//             // Call the API to submit the request
//             const existingToken = localStorage.getItem('token');
//             await api.post("/api/assignment/request", {
//                 productId,
//                 assignedDate,
//                 returnedDate,
//                 branchId,
//                 currentStatus: "pending", // Set status to pending
//                 quantity: 1, // Assuming quantity is always 1 for pending requests
//             }, {
//                 headers: {
//                     'Authorization': `${existingToken}`
//                 }
//             });

//             // Optionally, reset form data and selected product after successful submission
//             setFormData({
//                 productId: "",
//                 employeeId: "",
//                 branchId: "",
//                 assignedDate: "",
//                 returnedDate: "",
//                 currentStatus: "assigned",
//                 quantity: 1,
//             });
//             setSelectedProduct(null);
//             setFilteredData(inventoryData); // Show all products again

//             // Display a success message or handle UI updates as needed
//             alert("Request submitted successfully!");
//         } catch (error) {
//             console.error("Error submitting request:", error);
//             // Handle error states or display error message to the user
//         }
//     };

//     return (
//         <div>
//             <EmployeeMenu />
//             <div className="container mt-5">
//                 <h2>Request Product</h2>
//                 <form onSubmit={handleSubmit}></form>
//                 <div className="mb-3">
//                     <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Search by product name, product code, or subcategory"
//                         value={searchTerm}
//                         onChange={handleSearchChange}
//                         disabled={!!selectedProduct} // Disable search when a product is selected
//                     />
//                 </div>
//                 <table className="table table-striped">
//                     <thead>
//                         <tr>
//                             <th>Product Name</th>
//                             <th>Product Code</th>
//                             <th>Category</th>
//                             <th>Subcategory</th>
//                             <th>Brand</th>
//                             <th>Model</th>
//                             <th>Description</th>           
//                             <th>Select</th>
//                         </tr>
//                     </thead>
//                     <tbody>                          
//                        {filteredData.map(inventory => (
//                             <tr key={inventory._id}>
//                                 <td>{inventory.productId ? inventory.productId.name : 'N/A'}</td>
//                                 <td>{inventory.productId ? inventory.productId.productCode : 'N/A'}</td>
//                                 <td>{inventory.productId ? inventory.productId.category : 'N/A'}</td>
//                                 <td>{inventory.productId ? inventory.productId.subcategory : 'N/A'}</td>
//                                 <td>{inventory.productId ? inventory.productId.brand : 'N/A'}</td>
//                                 <td>{inventory.productId ? inventory.productId.model : 'N/A'}</td>
//                                 <td>{inventory.productId ? inventory.productId.description : 'N/A'}</td>
                                
//                                 <td>
//                                     {selectedProduct && selectedProduct._id === inventory._id ? (
//                                         <button className="btn btn-warning btn-sm" onClick={handleDeselectProduct}>Deselect</button>
//                                     ) : (
//                                         <button className="btn btn-primary btn-sm" onClick={() => handleSelectProduct(inventory)}>Select</button>
//                                     )}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 <button type="submit" className="btn btn-primary">Add Request</button>
//                 </form>
//                 {/* Submit Request Button */}
//                 {/* <div className="mt-3">
//                     <button
//                         className="btn btn-primary"
//                         onClick={handleSubmitRequest}
//                         disabled={!selectedProduct} // Disable button if no product is selected
//                     >
//                         Submit Request
//                     </button>
//                 </div> */}
//             </div>
//         </div>
//     )
// }

// export default AddEmployeeRequest;


import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import EmployeeMenu from '../Menu/EmployeeMenu';

const AddEmployeeRequest = () => {
    const [inventoryData, setInventoryData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [formData, setFormData] = useState({
        productId: "",
        employeeId: "",
        branchId: "",
        assignedDate: "",
        returnedDate: "",
        currentStatus: "assigned",
        quantity: 1,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const existingToken = localStorage.getItem('token');
                if (!existingToken) throw new Error("Token not found");

                const decodedToken = decodeToken(existingToken);
                const branchId = decodedToken.branchId;
                setFormData((prevFormData) => ({ ...prevFormData, branchId }));

                const productResponse = await api.get("/api/product/BranchAllApprovedProducts", {
                    headers: {
                        'Authorization': `${existingToken}`
                    }
                });
                setInventoryData(productResponse.data);
                setFilteredData(productResponse.data); // Set filtered data initially to all data
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
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
        setSearchTerm(e.target.value);
        const lowercasedSearchTerm = e.target.value.toLowerCase();
        setFilteredData(
            inventoryData.filter(item =>
                item.productId?.name?.toLowerCase().includes(lowercasedSearchTerm) ||
                item.productId?.productCode?.toLowerCase().includes(lowercasedSearchTerm) ||
                item.productId?.subcategory?.toLowerCase().includes(lowercasedSearchTerm)
            )
        );
    };

    const handleSelectProduct = (product) => {
        setSelectedProduct(product);
        setFormData({ ...formData, productId: product.productId._id });
        setFilteredData([product]); // Show only the selected product
    };

    const handleDeselectProduct = () => {
        setSelectedProduct(null);
        setFormData({ ...formData, productId: "" });
        setFilteredData(inventoryData); // Show all products again
    };

    const handleSubmitRequest = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            const { productId, assignedDate, returnedDate, branchId } = formData;

            // Call the API to submit the request
            const existingToken = localStorage.getItem('token');
            await api.post("/api/assignment/request", {
                productId,
                assignedDate,
                returnedDate,
                branchId,
                currentStatus: "pending", // Set status to pending
                quantity: 1, // Assuming quantity is always 1 for pending requests
            }, {
                headers: {
                    'Authorization': `${existingToken}`
                }
            });

            // Optionally, reset form data and selected product after successful submission
            setFormData({
                productId: "",
                employeeId: "",
                branchId: "",
                assignedDate: "",
                returnedDate: "",
                currentStatus: "assigned",
                quantity: 1,
            });
            setSelectedProduct(null);
            setFilteredData(inventoryData); // Show all products again

            // Display a success message or handle UI updates as needed
            alert("Request submitted successfully!");
        } catch (error) {
            console.error("Error submitting request:", error);
            // Handle error states or display error message to the user
        }
    };

    return (
        <div>
            <EmployeeMenu />
            <div className="container mt-5">
                <h2>Request Product</h2>
                <form onSubmit={handleSubmitRequest}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by product name, product code, or subcategory"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            disabled={!!selectedProduct} // Disable search when a product is selected
                        />
                    </div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Product Code</th>
                                <th>Category</th>
                                <th>Subcategory</th>
                                <th>Brand</th>
                                <th>Model</th>
                                <th>Description</th>           
                                <th>Select</th>
                            </tr>
                        </thead>
                        <tbody>                          
                           {filteredData.map(inventory => (
                                <tr key={inventory._id}>
                                    <td>{inventory.productId ? inventory.productId.name : 'N/A'}</td>
                                    <td>{inventory.productId ? inventory.productId.productCode : 'N/A'}</td>
                                    <td>{inventory.productId ? inventory.productId.category : 'N/A'}</td>
                                    <td>{inventory.productId ? inventory.productId.subcategory : 'N/A'}</td>
                                    <td>{inventory.productId ? inventory.productId.brand : 'N/A'}</td>
                                    <td>{inventory.productId ? inventory.productId.model : 'N/A'}</td>
                                    <td>{inventory.productId ? inventory.productId.description : 'N/A'}</td>
                                    
                                    <td>
                                        {selectedProduct && selectedProduct._id === inventory._id ? (
                                            <button className="btn btn-warning btn-sm" onClick={handleDeselectProduct}>Deselect</button>
                                        ) : (
                                            <button className="btn btn-primary btn-sm" onClick={() => handleSelectProduct(inventory)}>Select</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button type="submit" className="btn btn-primary">Add Request</button>
                </form>
            </div>
        </div>
    )
}

export default AddEmployeeRequest;
