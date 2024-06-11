// import React, { useState, useEffect } from "react";
// import api from '../../api/api';
// import AdminMenu from "../Menu/AdminMenu";
// const AddAssignment = () => {
//   const [products, setProducts] = useState([]);
//   // const [employees, setEmployees] = useState([]);
//   // const [branches, setBranches] = useState([]);
//   // const [selectedBranchId, setSelectedBranchId] = useState('');

//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [branches, setBranches] = useState([]);


//   const [inventoryData, setInventoryData] = useState([]);
 
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [filteredData, setFilteredData] = useState([]);
//   const decodeToken = (token) => {
//     try {
//         // Decode the token to get user information
//         return JSON.parse(atob(token.split('.')[1]));
//     } catch (error) {
//         console.error('Error decoding token:', error);
//         return {};
//     }
// };

// const existingToken = localStorage.getItem('token');
// let branchName, department, username, branchId;

// if (existingToken) {
//     const decodedToken = decodeToken(existingToken);
//     username = decodedToken.username;
//     branchName = decodedToken.branch;
//     department = decodedToken.department;
//     branchId = decodedToken.branchId
//     console.log("Username:", username);
//     console.log("Branch:", branchName);
//     console.log("Department:", department);
//     console.log("branchId:", branchId);
// }

//   const [formData, setFormData] = useState({
//     productId: "",
//     employeeId: "",
//     branchId: branchId,
//     assignedDate: "",
//     returnedDate: "",
//     currentStatus: "assigned",
//     quantity: 1,
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//       //   const productResponse = await api.get("/api/getAllInventory");
//       //  const inventoryData = productResponse.data;
//       //  console.log(inventoryData)
//       //  const filterdata = productResponse.data.locationId._id;
//       //  console.log("data", filterdata)
        
//       const productResponse = await api.get("/api/getAllInventory");
//       const inventoryData = productResponse.data;
  
//       console.log(inventoryData);
  
//       const filterData = inventoryData.map(item => item.locationId._id);
//       console.log("data", filterData);

//       // const filterBranch = filterData === branchId
//       // console.log("filter branch" , filterBranch)
    
//       const filterBranch = inventoryData.filter(item => item.locationId._id === branchId);
//       console.log("Filtered inventory data for branch:", filterBranch);
//       setFilteredData(filterBranch);

//       setInventoryData(filterBranch);
      


//         // const filteredInventory = Array.isArray(inventoryData)
//         //   ? inventoryData.filter(inventoryData => inventoryData.locationId === branchId)
//         //   : [];
//         // setFilteredProducts(filteredInventory);
//         // console.log(setFilteredProducts)
//       //  const filteredInventory = inventoryData.locationId.id === branchId;
        
//       //setFilteredProducts(filteredInventory);
//       //console.log("filter data" , filteredInventory)
//         const employeeResponse = await api.get("/api/AllUser");
//         setEmployees(employeeResponse.data);

//         const branchResponse = await api.get("/api/allLocation");
//         setBranches(branchResponse.data);


//         // console.log("Product info in inventory model", productResponse.data);
//         // const employeeResponse = await api.get("/api/AllUser");




//         //setBranches([...new Set(inventoryData.map(item => item.locationId))]); // Extract unique branch IDs

//       } catch (error) {
//         console.error("Error fetching data", error);
//       }
//     };

//     fetchData();
//   }, [branchId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post("/api/addAssignment", formData);
//       console.log(formData);
//       alert("Assignment record added successfully");
//     } catch (error) {
//       console.error("Error adding assignment", error);
//       alert("Error adding assignment");
//     }
//   };



//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     const lowercasedSearchTerm = e.target.value.toLowerCase();
//     setFilteredData(
//       inventoryData.filter(item =>
//         item.productId?.name?.toLowerCase().includes(lowercasedSearchTerm) ||
//         item.productId?.productCode?.toLowerCase().includes(lowercasedSearchTerm) ||
//         item.productId?.subcategory?.toLowerCase().includes(lowercasedSearchTerm)
//       )
//     );
//   };

//   const handleSelectProduct = (product) => {
//     setSelectedProduct(product);
//   };

//   const handleDeselectProduct = () => {
//     setSelectedProduct(null);
//   };

//   // if (loading) {
//   //   return <p>Loading...</p>;
//   // }

//   // // Filter products based on selected branch
//   // const filteredProducts = products.filter(product => product.locationId === selectedBranchId);
//   // const filteredEmployees = employees.filter(employee => employee.branchId === selectedBranchId);

//   return (
//     <div>
//       <AdminMenu />



//       <div className="container mt-5">
//       <div className="card shadow-sm">
//         <div className="card-body">
//           <h2 className="card-title mb-4">Inventory Data</h2>
//           {filteredData.length === 0 ? (
//             <p>No data available for this branch.</p>
//           ) : (
//             <table className="table table-striped">
//               <thead>
//                 <tr>
//                   {/* <th>#</th> */}
//                   {/* <th>Product ID</th> */}
//                   <th>Product Name</th>
//                   <th>Product Code</th>
//                   <th>Category</th>
//                   <th>sub category</th>
//                   <th>Brand</th>
//                   <th>Model</th>
//                   <th>Description</th>
//                   <th>Quantity</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                   {/* <th>Location Name</th>
//                   <th>Location Address</th> */}
//                   {/* <th>Location Contact Info</th> */}
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredData.map((item, index) => (
//                   <tr key={item._id} style={{ display: selectedProduct && selectedProduct._id !== item._id ? 'none' : 'table-row' }}>
//                   {/* <td>{index + 1}</td> */}
//                     {/* <td>{item.productId?._id || 'N/A'}</td> */}
//                     <td>{item.productId?.name || 'N/A'}</td>
//                     <td>{item.productId?.productCode || 'N/A'}</td>
//                     <td>{item.productId?.category || 'N/A'}</td>
//                     <td>{item.productId?.subcategory || 'N/A'}</td>
//                     <td>{item.productId?.brand || 'N/A'}</td>
//                     <td>{item.productId?.model || 'N/A'}</td>
//                     <td>{item.productId?.description || 'N/A'}</td>
//                     <td>{item.quantity}</td>
//                     <td>{item.status}</td>
//                     <td>
//                       {selectedProduct && selectedProduct._id === item._id ? (
//                         <button className="btn btn-warning btn-sm" onClick={handleDeselectProduct}>Deselect</button>
//                       ) : (
//                         <button className="btn btn-primary btn-sm" onClick={() => handleSelectProduct(item)}>Select</button>
//                       )}
//                     </td>
//                     {/* <td>{item.locationId.name}</td>
//                     <td>{item.locationId.address}</td> */}
//                     {/* <td>{item.locationId.contactInfo}</td> */}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>

//       <div className="container mt-5">
//     <h2>Add Assignment</h2>
//     <form onSubmit={handleSubmit} className="mt-4">
     


//     <div className="form-group">
//         <label htmlFor="branchId">Branch</label>
//         <input
//             type="text"
//             name="branchId"
//             value={branchName}
//             className="form-control"
//             disabled // This prevents editing
//             required
//         />
//     </div>






//         {/* <div className="form-group">
//             <label htmlFor="productId">Product</label>
//             <select name="productId" value={formData.productId} onChange={handleChange} className="form-control" required>
//                 <option value="" disabled>Select a product</option>
//                 {filteredProducts.length > 0 ? (
//                     filteredProducts.map((inventory) => (
//                         <option key={inventory._id} value={inventory.productId?.name}>
//                             {inventory.productId.name}
//                         </option>
//                     ))
//                 ) : (
//                     <option value="">No Products in this Branch</option>
//                 )}
//             </select>
//         </div> */}




// <div className="form-group">
//           <label htmlFor="productId">Product</label>
//           <select name="productId" value={formData.productId} onChange={handleChange} className="form-control" required>
//             <option value="" disabled>Select a product</option>
//             {filteredProducts.length > 0 ? (
//               filteredProducts.map((inventory) => (
//                 <option key={inventory._id} value={inventory.productId._id}>
//                   {inventory.productId.name}
//                 </option>
//               ))
//             ) : (
//               <option value="">No Products in this Branch</option>
//             )}
//           </select>
//         </div>
//         {/* <div className="form-group">
//             <label htmlFor="employeeId">Employee</label>
//             <select name="employeeId" value={formData.employeeId} onChange={handleChange} className="form-control" required>
//                 <option value="" disabled>Select an employee</option>
//                 {filteredEmployees.length > 0 ? filteredEmployees.map((user) => (
//                     <option key={user._id} value={user._id}>{user.username}</option>
//                 )) : <option value="">No Employees in this Branch</option>}
//             </select>
//         </div> */}
//         <div className="form-group">
//             <label htmlFor="assignedDate">Assigned Date</label>
//             <input type="date" name="assignedDate" value={formData.assignedDate} onChange={handleChange} className="form-control" required />
//         </div>
//         <div className="form-group">
//             <label htmlFor="returnedDate">Returned Date</label>
//             <input type="date" name="returnedDate" value={formData.returnedDate} onChange={handleChange} className="form-control" />
//         </div>
//         <div className="form-group">
//             <label htmlFor="currentStatus">Status</label>
//             <select name="currentStatus" value={formData.currentStatus} onChange={handleChange} className="form-control" required>
//                 <option value="assigned">Assigned</option>
//                 <option value="returned">Returned</option>
//                 <option value="in_transfer">In Transfer</option>
//             </select>
//         </div>
//         <div className="form-group">
//             <label htmlFor="quantity">Quantity</label>
//             <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="form-control" min="1" required />
//         </div>
//         <button type="submit" className="btn btn-primary">Add Assignment</button>
//     </form>
//     {/* {message && <div className="alert alert-info mt-3">{message}</div>} */}
// </div>







    
//     {/* <form onSubmit={handleSubmit}>
//       <div>
//         <label>Branch</label>
//         <select name="branchId" value={formData.branchId} onChange={handleChange} required>
//           <option value="" disabled>Select a branch</option>
//           {branches.map((branch) => (
//             <option key={branch._id} value={branch._id}>{branch.name}</option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <label>Product</label>
//         <select
//           name="productId"
//           value={formData.productId}
//           onChange={handleChange}
//           required
//         >
//           <option value="" disabled>Select a product</option>
//           {filteredProducts.length > 0 ? (
//             filteredProducts.map((inventory) => (
//               <option key={inventory._id} value={inventory.productId._id}>
//                 {inventory.productId.name}
//               </option>
//             ))
//           ) : (
//             <option value="">No Products in this Branch</option>
//           )}
//         </select>
//       </div>
//       <div>
//         <label>Employee</label>
//         <select name="employeeId" value={formData.employeeId} onChange={handleChange} required>
//           <option value="" disabled>Select an employee</option>
//           {filteredEmployees.length > 0 ? filteredEmployees.map((user) => (
//             <option key={user._id} value={user._id}>{user.username}</option>
//           )) : <option value="">No Employees in this Branch</option>}
//         </select>
//       </div>
//       <div>
//         <label>Assigned Date</label>
//         <input
//           type="date"
//           name="assignedDate"
//           value={formData.assignedDate}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div>
//         <label>Returned Date</label>
//         <input
//           type="date"
//           name="returnedDate"
//           value={formData.returnedDate}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label>Status</label>
//         <select name="currentStatus" value={formData.currentStatus} onChange={handleChange} required>
//           <option value="assigned">Assigned</option>
//           <option value="returned">Returned</option>
//           <option value="in_transfer">In Transfer</option>
//         </select>
//       </div>
//       <div>
//         <label>Quantity</label>
//         <input
//           type="number"
//           name="quantity"
//           value={formData.quantity}
//           onChange={handleChange}
//           min="1"
//           required
//         />
//       </div>
//       <button type="submit">Add Assignment</button>
//     </form> */}
//     </div>
//   );
// };

// export default AddAssignment;




// import React, { useState, useEffect } from "react";
// import api from '../../api/api';
// import AdminMenu from "../Menu/AdminMenu";

// const AddAssignment = () => {
//   const [inventoryData, setInventoryData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [filteredData, setFilteredData] = useState([]);

//   const [formData, setFormData] = useState({
//     productId: "",
//     employeeId: employeeId,
//     branchId: branchId,
//     assignedDate: "",
//     returnedDate: "",
//     currentStatus: "assigned",
//     quantity: 1,
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const existingToken = localStorage.getItem('token');
//         if (!existingToken) {
//           throw new Error("Token not found");
//         }

//         const decodedToken = decodeToken(existingToken);
//         const branchId = decodedToken.branchId;
//         const employeeId = decodedToken.id;
//         //const branchId = decodedToken.id;
//         return employeeId;
//         console.log("emp",employeeId)

//         const productResponse = await api.get("/api/getAllInventory");
//         const inventoryData = productResponse.data;
  
//         const filterBranch = inventoryData.filter(item => item.locationId._id === branchId);
//         setFilteredData(filterBranch);
//         setInventoryData(filterBranch);
//       } catch (error) {
//         console.error("Error fetching data", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const decodeToken = (token) => {
//     try {
//         // Decode the token to get user information
//         return JSON.parse(atob(token.split('.')[1]));
//     } catch (error) {
//         console.error('Error decoding token:', error);
//         return {};
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     const lowercasedSearchTerm = e.target.value.toLowerCase();
//     setFilteredData(
//       inventoryData.filter(item =>
//         item.productId?.name?.toLowerCase().includes(lowercasedSearchTerm) ||
//         item.productId?.productCode?.toLowerCase().includes(lowercasedSearchTerm) ||
//         item.productId?.subcategory?.toLowerCase().includes(lowercasedSearchTerm)
//       )
//     );
//   };

//   const handleSelectProduct = (product) => {
//     setSelectedProduct(product);
//   };

//   const handleDeselectProduct = () => {
//     setSelectedProduct(null);
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     for (const key in formData) {
//       data.append(key, formData[key]);

//     }

//     // if (!formData.productId || !formData.locationId || !formData.quantity ) {
//     //     setMessage('All fields are required');
//     //     return;
//     // }

//     try {
//         const response = await api.post('/api/addAssignment',  formData,{
//             // headers: {
//             //   'Content-Type': 'multipart/form-data',
//             // },
//           }); 
//         setMessage('Assignment added successfully');
//     } catch (error) {
//         setMessage(error.response?.data || 'Error adding inventory');
//     }
// };
// const handleChange = (e) => {
//   const { name, value } = e.target;
//   setFormData({ ...formData, [name]: value });
// };

//   return (
//     <div>
//       <AdminMenu />
//       <div className="container mt-5">
//             <h2>Add Inventory</h2>
//             <form onSubmit={handleSubmit}>
//       <div className="container mt-5">
//         <div className="card shadow-sm">
//           <div className="card-body">
//             <h2 className="card-title mb-4">Inventory Data</h2>
//             <div className="mb-3">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Search by product name, product code, or subcategory"
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//               />
//             </div>
//             {filteredData.length === 0 ? (
//               <p>No data available for this branch.</p>
//             ) : (
//               <table className="table table-striped">
//                 <thead>
//                   <tr>
//                     <th>Product Name</th>
//                     <th>Product Code</th>
//                     <th>Category</th>
//                     <th>Subcategory</th>
//                     <th>Brand</th>
//                     <th>Model</th>
//                     <th>Description</th>
//                     <th>Quantity</th>
//                     <th>Status</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredData.map(item => (
//                     <tr key={item._id} style={{ display: selectedProduct && selectedProduct._id !== item._id ? 'none' : 'table-row' }}>
//                       <td>{item.productId?.name || 'N/A'}</td>
//                       <td>{item.productId?.productCode || 'N/A'}</td>
//                       <td>{item.productId?.category || 'N/A'}</td>
//                       <td>{item.productId?.subcategory || 'N/A'}</td>
//                       <td>{item.productId?.brand || 'N/A'}</td>
//                       <td>{item.productId?.model || 'N/A'}</td>
//                       <td>{item.productId?.description || 'N/A'}</td>
//                       <td>{item.quantity}</td>
//                       <td>{item.status}</td>
//                       <td>
//                         {selectedProduct && selectedProduct._id === item._id ? (
//                           <button className="btn btn-warning btn-sm" onClick={handleDeselectProduct}>Deselect</button>
//                         ) : (
//                           <button className="btn btn-primary btn-sm" onClick={() => handleSelectProduct(item)}>Select</button>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//           <div>
//        <label>Assigned Date</label>
//        <input
//           type="date"
//           name="assignedDate"
//           value={formData.assignedDate}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div>
//         <label>Returned Date</label>
//         <input
//           type="date"
//           name="returnedDate"
//           value={formData.returnedDate}
//           onChange={handleChange}
//         />
//       </div>
//       <div></div>
//         </div>
//       </div>
//       </form>
//            {/* // {message && <div className="alert alert-info mt-3">{message}</div>} */}
//         </div>
//     </div>
//   );
// };

// export default AddAssignment;




// import React, { useState, useEffect } from "react";
// import api from '../../api/api';
// import AdminMenu from "../Menu/AdminMenu";

// const AddAssignment = () => {
//   const [inventoryData, setInventoryData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState([]);
//   const [formData, setFormData] = useState({
//     productId: "",
//     employeeId: "", // initialize as empty
//     branchId: "", // initialize as empty
//     assignedDate: "",
//     returnedDate: "",
//     currentStatus: "assigned",
//     quantity: 1,
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const existingToken = localStorage.getItem('token');
//         if (!existingToken) {
//           throw new Error("Token not found");
//         }
  
//         const decodedToken = decodeToken(existingToken);
//         const branchId = decodedToken.branchId;
//         const employeeId = decodedToken.id; // Assign employeeId from decoded token
//         setFormData((prevFormData) => ({ ...prevFormData, employeeId })); // Update formData with employeeId
  
//         const productResponse = await api.get("/api/getAllInventory");
//         const inventoryData = productResponse.data;
//         const filterBranch = inventoryData.filter(item => item.locationId._id === branchId);
//         setFilteredData(filterBranch);
//         setInventoryData(filterBranch);


//         const userResponse = await api.get("/api/AllUser");
//         const userData = userResponse.data;
//         const filterUser = userData.filter(item => item.locationId._id === branchId);
//         setFilteredUser(filterUser);
//         setUser(filterBranch);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data", error);
//         setLoading(false);
//       }
//     };
  
//     fetchData();
//   }, [setFormData]); // Trigger useEffect when formData changes

//   const decodeToken = (token) => {
//     try {
//       // Decode the token to get user information
//       return JSON.parse(atob(token.split('.')[1]));
//     } catch (error) {
//       console.error('Error decoding token:', error);
//       return {};
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     const lowercasedSearchTerm = e.target.value.toLowerCase();
//     setFilteredData(
//       inventoryData.filter(item =>
//         item.productId?.name?.toLowerCase().includes(lowercasedSearchTerm) ||
//         item.productId?.productCode?.toLowerCase().includes(lowercasedSearchTerm) ||
//         item.productId?.subcategory?.toLowerCase().includes(lowercasedSearchTerm)
//       )
//     );
//   };

//   const handleSelectProduct = (product) => {
//     setSelectedProduct(product);
//     setFormData({ ...formData, productId: product._id }); // Set selected product id in formData
//   };

//   const handleDeselectProduct = () => {
//     setSelectedProduct(null);
//     setFormData({ ...formData, productId: "" }); // Reset product id in formData
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.post('/api/addAssignment', formData);
//       console.log(response.data);
//       // Reset form data after successful submission
//       setFormData({
//         productId: "",
//         employeeId: "",
//         branchId: "",
//         assignedDate: "",
//         returnedDate: "",
//         currentStatus: "assigned",
//         quantity: 1,
//       });
//     } catch (error) {
//       console.error("Error adding assignment", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div>
//   <AdminMenu />
//   <div className="container mt-5">
//     <h2>Add Inventory</h2>
//     <form onSubmit={handleSubmit}>
//       <div className="mb-3">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Search by product name, product code, or subcategory"
//           value={searchTerm}
//           onChange={handleSearchChange}
//         />
//       </div>
//       {filteredData.length === 0 ? (
//         <p>No data available for this branch.</p>
//       ) : (
//         <table className="table table-striped">
//           <thead>
//             <tr>
//               <th>Product Name</th>
//               <th>Product Code</th>
//               <th>Category</th>
//               <th>Subcategory</th>
//               <th>Brand</th>
//               <th>Model</th>
//               <th>Description</th>
//               <th>Quantity</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.map(item => (
//               <tr key={item._id}>
//                 <td>{item.productId?.name || 'N/A'}</td>
//                 <td>{item.productId?.productCode || 'N/A'}</td>
//                 <td>{item.productId?.category || 'N/A'}</td>
//                 <td>{item.productId?.subcategory || 'N/A'}</td>
//                 <td>{item.productId?.brand || 'N/A'}</td>
//                 <td>{item.productId?.model || 'N/A'}</td>
//                 <td>{item.productId?.description || 'N/A'}</td>
//                 <td>{item.quantity}</td>
//                 <td>{item.status}</td>
//                 <td>
//                   {selectedProduct && selectedProduct._id === item._id ? (
//                     <button className="btn btn-warning btn-sm" onClick={handleDeselectProduct}>Deselect</button>
//                   ) : (
//                     <button className="btn btn-primary btn-sm" onClick={() => handleSelectProduct(item)}>Select</button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
        
//       )}
//     </form>
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="assignedDate">Assigned Date</label>
//           <input
//             type="date"
//             name="assignedDate"
//             value={formData.assignedDate}
//             onChange={handleChange}
//             className="form-control"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="returnedDate">Returned Date</label>
//           <input
//             type="date"
//             name="returnedDate"
//             value={formData.returnedDate}
//             onChange={handleChange}
//             className="form-control"
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="quantity">Quantity</label>
//           <input
//             type="number"
//             name="quantity"
//             value={formData.quantity}
//             onChange={handleChange}
//             className="form-control"
//             min="1"
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">Add Assignment</button>
//       </form>
//     </div>
//   </div>





//   <div>
//   {filteredData.length === 0 ? (
//         <p>No data available for this branch.</p>
//       ) : (
//         <table className="table table-striped">
//           <thead>
//             <tr>
//               <th>Product Name</th>
            
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUser.map(item => (
//               <tr key={item._id}>
//                 <td>{item.name || 'N/A'}</td>
               
//                 <td>
//                   {selectedProduct && selectedProduct._id === item._id ? (
//                     <button className="btn btn-warning btn-sm" onClick={handleDeselectProduct}>Deselect</button>
//                   ) : (
//                     <button className="btn btn-primary btn-sm" onClick={() => handleSelectProduct(item)}>Select</button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//   </div>






// </div>
//   )}
// export default AddAssignment;




// import React, { useState, useEffect } from "react";
// import api from '../../api/api';
// import AdminMenu from "../Menu/AdminMenu";

// const AddAssignment = () => {
//     const [inventoryData, setInventoryData] = useState([]);
//     const [filteredData, setFilteredData] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [user, setUser] = useState([]);
//     const [filteredUser, setFilteredUser] = useState([]);
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [searchUserTerm, setSearchUserTerm] = useState('');

//     const [formData, setFormData] = useState({
//         productId: "",
//         employeeId: "", // initialize as empty
//         branchId: "", // initialize as empty
//         assignedDate: "",
//         returnedDate: "",
//         currentStatus: "assigned",
//         quantity: 1,
//     });

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const existingToken = localStorage.getItem('token');
//                 if (!existingToken) {
//                     throw new Error("Token not found");
//                 }

//                 const decodedToken = decodeToken(existingToken);
//                 const branchId = decodedToken.branchId;
//                 //const employeeId = decodedToken.id; // Assign employeeId from decoded token
//                 //setFormData((prevFormData) => ({ ...prevFormData, employeeId })); // Update formData with employeeId

//                 const productResponse = await api.get("/api/getAllInventory");
//                 const inventoryData = productResponse.data;
//                 const filterBranch = inventoryData.filter(item => item.locationId._id === branchId);
//                 setFilteredData(filterBranch);
//                 setInventoryData(filterBranch);

//                 const userResponse = await api.get("/api/AllUser");
//                 const userData = userResponse.data;
//                 console.log(userData)
//                 const filterUser = userData.filter(item => item.branchId._id === branchId);
//                 console.log(filterUser)
//                 setUser(userData);
//                 setFilteredUser(filterUser);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching data", error);
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []); // Empty dependency array to run only once when component mounts

//     const decodeToken = (token) => {
//         try {
//             // Decode the token to get user information
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
//         setFormData({ ...formData, productId: product._id }); // Set selected product id in formData
//     };

    

//     const handleDeselectProduct = () => {
//         setSelectedProduct(null);
//         setFormData({ ...formData, productId: "" }); // Reset product id in formData
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await api.post('/api/addAssignment', formData);
//             console.log(response.data);
//             // Reset form data after successful submission
//             setFormData({
//                 productId: "",
//                 employeeId: "",
//                 branchId: "",
//                 assignedDate: "",
//                 returnedDate: "",
//                 currentStatus: "assigned",
//                 quantity: 1,
//             });
//         } catch (error) {
//             console.error("Error adding assignment", error);
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     if (loading) {
//         return <p>Loading...</p>;
//     }

//     const handleSelectUser = (user) => {
//       setSelectedUser(user);
//       setFormData({ ...formData, employeeId: user._id });
//   };

//   const handleSearchUserChange = (e) => {
//     setSearchUserTerm(e.target.value);
//     const lowercasedSearchTerm = e.target.value.toLowerCase();
//     setFilteredUser(
//         filteredUser.filter(user =>
//             user.username?.toLowerCase().includes(lowercasedSearchTerm) ||
//             user.department?.toLowerCase().includes(lowercasedSearchTerm) ||
//             user.designation?.toLowerCase().includes(lowercasedSearchTerm)
//         )
//     );
// };

//     return (
//         <div>
//             <AdminMenu />
//             <div className="container mt-5">
//                 <h2>Add Assignment</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-3">
//                         <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Search by product name, product code, or subcategory"
//                             value={searchTerm}
//                             onChange={handleSearchChange}
//                         />
//                     </div>
//                     {filteredData.length === 0 ? (
//                         <p>No data available for this branch.</p>
//                     ) : (
//                         <table className="table table-striped">
//                             <thead>
//                                 <tr>
//                                     <th>Product Name</th>
//                                     <th>Product Code</th>
//                                     <th>Category</th>
//                                     <th>Subcategory</th>
//                                     <th>Brand</th>
//                                     <th>Model</th>
//                                     <th>Description</th>
//                                     <th>Quantity</th>
//                                     <th>Status</th>
//                                     <th>Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {filteredData.map(item => (
//                                     <tr key={item._id}>
//                                         <td>{item.productId?.name || 'N/A'}</td>
//                                         <td>{item.productId?.productCode || 'N/A'}</td>
//                                         <td>{item.productId?.category || 'N/A'}</td>
//                                         <td>{item.productId?.subcategory || 'N/A'}</td>
//                                         <td>{item.productId?.brand || 'N/A'}</td>
//                                         <td>{item.productId?.model || 'N/A'}</td>
//                                         <td>{item.productId?.description || 'N/A'}</td>
//                                         <td>{item.quantity}</td>
//                                         <td>{item.status}</td>
//                                         <td>
//                                             {selectedProduct && selectedProduct._id === item._id ? (
//                                                 <button className="btn btn-warning btn-sm" onClick={handleDeselectProduct}>Deselect</button>
//                                             ) : (
//                                                 <button className="btn btn-primary btn-sm" onClick={() => handleSelectProduct(item)}>Select</button>
//                                             )}
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     )}




//                     {/* User Search and Select */}
//                 <div className="mb-3">
//                     <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Search by username, department, or designation"
//                         value={searchUserTerm}
//                         onChange={handleSearchUserChange}
//                     />
//                 </div>
//                 <div>
//                     {filteredUser.length === 0 ? (
//                         <p>No users available for this branch.</p>
//                     ) : (
//                         <table className="table table-striped">
//                             <thead>
//                                 <tr>
//                                     <th>User Name</th>
//                                     <th>Department</th>
//                                     <th>Designation</th>
//                                     <th>Select</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {filteredUser.map(user => (
//                                     <tr key={user._id}>
//                                         <td>{user.username || 'N/A'}</td>
//                                         <td>{user.department || 'N/A'}</td>
//                                         <td>{user.designation || 'N/A'}</td>
//                                         <td>
//                                             <button className="btn btn-primary btn-sm" onClick={() => handleSelectUser(user)}>Select</button>
//                                         </td>
//                                     </tr>
//                                 ))}
//  </tbody>
//                         </table>
//                     )}
//                 </div>








//                     {/* <div>
//                         {filteredUser.length === 0 ? (
//                             <p>No users available for this branch.</p>
//                         ) : (
//                             <table className="table table-striped">
//                                 <thead>
//                                     <tr>
//                                         <th>User Name</th>
//                                         <th>department</th>
//                                         <th>designation</th>
                                       
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {filteredUser.map(user => (
//                                         <tr key={user._id}>
//                                             <td>{user.username || 'N/A'}</td>
//                                             <td>{user.department || 'N/A'}</td>
//                                             <td>{user.designation || 'N/A'}</td>
                                          
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         )}
//                      */}

//                     <div>
//                         <form onSubmit={handleSubmit}>
//                             <div className="form-group">
//                                 <label htmlFor="assignedDate">Assigned Date</label>
//                                 <input
//                                     type="date"
//                                     name="assignedDate"
//                                     value={formData.assignedDate}
//                                     onChange={handleChange}
//                                     className="form-control"
//                                     required
//                                 />
//                             </div>
//                                                        <div className="form-group">
//                                 <label htmlFor="returnedDate">Returned Date</label>
//                                 <input
//                                     type="date"
//                                     name="returnedDate"
//                                     value={formData.returnedDate}
//                                     onChange={handleChange}
//                                     className="form-control"
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="quantity">Quantity</label>
//                                 <input
//                                     type="number"
//                                     name="quantity"
//                                     value={formData.quantity}
//                                     onChange={handleChange}
//                                     className="form-control"
//                                     min="1"
//                                     required
//                                 />
//                             </div>
//                             <button type="submit" className="btn btn-primary">Add Assignment</button>
//                         </form>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AddAssignment;





// import React, { useState, useEffect } from "react";
// import api from '../../api/api';
// import AdminMenu from "../Menu/AdminMenu";

// const AddAssignment = () => {
//     const [inventoryData, setInventoryData] = useState([]);
//     const [filteredData, setFilteredData] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [user, setUser] = useState([]);
//     const [filteredUser, setFilteredUser] = useState([]);
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [searchUserTerm, setSearchUserTerm] = useState('');

//     const [formData, setFormData] = useState({
//         productId: "",
//         employeeId: "", // initialize as empty
//         branchId: "", // initialize as empty
//         assignedDate: "",
//         returnedDate: "",
//         currentStatus: "assigned",
//         quantity: 1,
//     });

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const existingToken = localStorage.getItem('token');
//                 if (!existingToken) {
//                     throw new Error("Token not found");
//                 }

//                 const decodedToken = decodeToken(existingToken);
//                 const branchId = decodedToken.branchId;
//                 //const employeeId = decodedToken.id; // Assign employeeId from decoded token
//                 //setFormData((prevFormData) => ({ ...prevFormData, employeeId })); // Update formData with employeeId

//                 const productResponse = await api.get("/api/getAllInventory");
//                 const inventoryData = productResponse.data;
//                 const filterBranch = inventoryData.filter(item => item.locationId._id === branchId);
//                 setFilteredData(filterBranch);
//                 setInventoryData(filterBranch);

//                 const userResponse = await api.get("/api/AllUser");
//                 const userData = userResponse.data;
//                 console.log(userData)
//                 const filterUser = userData.filter(item => item.branchId._id === branchId);
//                 console.log(filterUser)
//                 setUser(userData);
//                 setFilteredUser(filterUser);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching data", error);
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []); // Empty dependency array to run only once when component mounts

//     const decodeToken = (token) => {
//         try {
//             // Decode the token to get user information
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
//         setFormData({ ...formData, productId: product._id }); // Set selected product id in formData
//     };

    

//     const handleDeselectProduct = () => {
//         setSelectedProduct(null);
//         setFormData({ ...formData, productId: "" }); // Reset product id in formData
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await api.post('/api/addAssignment', formData);
//             console.log(response.data);
//             // Reset form data after successful submission
//             setFormData({
//                 productId: "",
//                 employeeId: selectedUser ? selectedUser._id : "",
//                 branchId: "",
//                 assignedDate: "",
//                 returnedDate: "",
//                 currentStatus: "assigned",
//                 quantity: 1,
//             });
//         } catch (error) {
//             console.error("Error adding assignment", error);
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     if (loading) {
//         return <p>Loading...</p>;
//     }

//     const handleSelectUser = (user) => {
//       setSelectedUser(user);
//   };

//   const handleSearchUserChange = (e) => {
//     setSearchUserTerm(e.target.value);
//     const lowercasedSearchTerm = e.target.value.toLowerCase();
//     setFilteredUser(
//         filteredUser.filter(user =>
//             user.username?.toLowerCase().includes(lowercasedSearchTerm) ||
//             user.department?.toLowerCase().includes(lowercasedSearchTerm) ||
//             user.designation?.toLowerCase().includes(lowercasedSearchTerm)
//         )
//     );
// };

//     return (
//         <div>
//             <AdminMenu />
//             <div className="container mt-5">
//                 <h2>Add Assignment</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-3">
//                         <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Search by product name, product code, or subcategory"
//                             value={searchTerm}
//                             onChange={handleSearchChange}
//                         />
//                     </div>
//                     {filteredData.length === 0 ? (
//                         <p>No data available for this branch.</p>
//                     ) : (
//                         <table className="table table-striped">
//                             <thead>
//                                 <tr>
//                                     <th>Product Name</th>
//                                     <th>Product Code</th>
//                                     <th>Category</th>
//                                     <th>Subcategory</th>
//                                     <th>Brand</th>
//                                     <th>Model</th>
//                                     <th>Description</th>
//                                     <th>Quantity</th>
//                                     <th>Status</th>
//                                     <th>Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {filteredData.map(item => (
//                                     <tr key={item._id}>
//                                         <td>{item.productId?.name || 'N/A'}</td>
//                                         <td>{item.productId?.productCode || 'N/A'}</td>
//                                         <td>{item.productId?.category || 'N/A'}</td>
//                                         <td>{item.productId?.subcategory || 'N/A'}</td>
//                                         <td>{item.productId?.brand || 'N/A'}</td>
//                                         <td>{item.productId?.model || 'N/A'}</td>
//                                         <td>{item.productId?.description || 'N/A'}</td>
//                                         <td>{item.quantity}</td>
//                                         <td>{item.status}</td>
//                                         <td>
//                                             {selectedProduct && selectedProduct._id === item._id ? (
//                                                 <button className="btn btn-warning btn-sm" onClick={handleDeselectProduct}>Deselect</button>
//                                             ) : (
//                                                 <button className="btn btn-primary btn-sm" onClick={() => handleSelectProduct(item)}>Select</button>
//                                             )}
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     )}

//                     {/* User Search and Select */}
//                     <div className="mb-3">
//                         <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Search by username, department, or designation"
//                             value={searchUserTerm}
//                             onChange={handleSearchUserChange}
//                         />
//                     </div>
//                     <div>
//                         {filteredUser.length === 0 ? (
//                             <p>No users available for this branch.</p>
//                         ) : (
//                             <table className="table table-striped">
//                                 <thead>
//                                     <tr>
//                                         <th>User Name</th>
//                                         <th>Department</th>
//                                         <th>Designation</th>
//                                         <th>Select</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {filteredUser.map(user => (
//                                         <tr key={user._id}>
//                                             <td>{user.username || 'N/A'}</td>
//                                             <td>{user.department || 'N/A'}</td>
//                                             <td>{user.designation || 'N/A'}</td>
//                                             <td>
//                                                 <button className="btn btn-primary btn-sm" onClick={() => handleSelectUser(user)}>Select</button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         )}
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="assignedDate">Assigned Date</label>
//                         <input
//                             type="date"
//                             name="assignedDate"
//                             value={formData.assignedDate}
//                             onChange={handleChange}
//                             className="form-control"
//                             required
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="returnedDate">Returned Date</label>
//                         <input
//                             type="date"
//                             name="returnedDate"
//                             value={formData.returnedDate}
//                             onChange={handleChange}
//                             className="form-control"
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="quantity">Quantity</label>
//                         <input
//                             type="number"
//                             name="quantity"
//                             value={formData.quantity}
//                             onChange={handleChange}
//                             className="form-control"
//                             min="1"
//                             required
//                         />
//                     </div>
//                     <button type="submit" className="btn btn-primary">Add Assignment</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AddAssignment;





import React, { useState, useEffect } from "react";
import api from '../../api/api';
import AdminMenu from "../Menu/AdminMenu";

const AddAssignment = () => {
    const [inventoryData, setInventoryData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState([]);
    const [filteredUser, setFilteredUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchUserTerm, setSearchUserTerm] = useState('');

    const [formData, setFormData] = useState({
        productId: "",
        employeeId: "", // initialize as empty
        branchId: "", // initialize as empty
        assignedDate: "",
        returnedDate: "",
        currentStatus: "assigned",
        quantity: 1,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const existingToken = localStorage.getItem('token');
                if (!existingToken) {
                    throw new Error("Token not found");
                }

                const decodedToken = decodeToken(existingToken);
                const branchId = decodedToken.branchId;
                //const employeeId = decodedToken.id; // Assign employeeId from decoded token
                //setFormData((prevFormData) => ({ ...prevFormData, employeeId })); // Update formData with employeeId

                const productResponse = await api.get("/api/getAllInventory");
                const inventoryData = productResponse.data;
                const filterBranch = inventoryData.filter(item => item.locationId._id === branchId);
                setFilteredData(filterBranch);
                setInventoryData(filterBranch);

                const userResponse = await api.get("/api/AllUser");
                const userData = userResponse.data;
                console.log(userData)
                const filterUser = userData.filter(item => item.branchId._id === branchId);
                console.log(filterUser)
                setUser(userData);
                setFilteredUser(filterUser);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array to run only once when component mounts

    const decodeToken = (token) => {
        try {
            // Decode the token to get user information
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
        setFormData({ ...formData, productId: product._id }); // Set selected product id in formData
    };

    const handleDeselectProduct = () => {
        setSelectedProduct(null);
        setFormData({ ...formData, productId: "" }); // Reset product id in formData
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/addAssignment', formData);
            console.log(response.data);
            // Reset form data after successful submission
            setFormData({
                productId: "",
                employeeId: selectedUser ? selectedUser._id : "",
                branchId: "",
                assignedDate: "",
                returnedDate: "",
                currentStatus: "assigned",
                quantity: 1,
            });
        } catch (error) {
            console.error("Error adding assignment", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    const handleSelectUser = (user) => {
        setSelectedUser(user);
    };

    const handleSearchUserChange = (e) => {
        setSearchUserTerm(e.target.value);
        const lowercasedSearchTerm = e.target.value.toLowerCase();
        setFilteredUser(
            user.filter(user =>
                user.username?.toLowerCase().includes(lowercasedSearchTerm) ||
                user.department?.toLowerCase().includes(lowercasedSearchTerm) ||
                user.designation?.toLowerCase().includes(lowercasedSearchTerm)
            )
        );
    };

    return (
        <div>
            <AdminMenu />
            <div className="container mt-5">
                <h2>Add Assignment</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by product name, product code, or subcategory"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                    {selectedProduct && (
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
                                    <th>Quantity</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr key={selectedProduct._id}>
                                    <td>{selectedProduct.productId?.name || 'N/A'}</td>
                                    <td>{selectedProduct.productId?.productCode || 'N/A'}</td>
                                    <td>{selectedProduct.productId?.category || 'N/A'}</td>
                                    <td>{selectedProduct.productId?.subcategory || 'N/A'}</td>
                                    <td>{selectedProduct.productId?.brand || 'N/A'}</td>
                                    <td>{selectedProduct.productId?.model || 'N/A'}</td>
                                    <td>{selectedProduct.productId?.description || 'N/A'}</td>
                                    <td>{selectedProduct.quantity}</td>
                                    <td>{selectedProduct.status}</td>
                                    <td>
                                        <button className="btn btn-warning btn-sm" onClick={handleDeselectProduct}>Deselect</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    )}

                    {selectedUser && (
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>User Name</th>
                                    <th>Department</th>
                                    <th>Designation</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr key={selectedUser._id}>
                                    <td>{selectedUser.username || 'N/A'}</td>
                                    <td>{selectedUser.department || 'N/A'}</td>
                                    <td>{selectedUser.designation || 'N/A'}</td>
                                </tr>
                            </tbody>
                        </table>
                    )}

<div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by username, department, or designation"
                            value={searchUserTerm}
                            onChange={handleSearchUserChange}
                        />
                    </div>
                    {filteredUser.length === 0 ? (
                        <p>No users available for this branch.</p>
                    ) : (
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>User Name</th>
                                    <th>Department</th>
                                    <th>Designation</th>
                                    <th>Select</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUser.map(user => (
                                    <tr key={user._id}>
                                        <td>{user.username || 'N/A'}</td>
                                        <td>{user.department || 'N/A'}</td>
                                        <td>{user.designation || 'N/A'}</td>
                                        <td>
                                            <button className="btn btn-primary btn-sm" onClick={() => handleSelectUser(user)}>Select</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    <div className="form-group">
                        <label htmlFor="assignedDate">Assigned Date</label>
                        <input
                            type="date"
                            name="assignedDate"
                            value={formData.assignedDate}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="returnedDate">Returned Date</label>
                        <input
                            type="date"
                            name="returnedDate"
                            value={formData.returnedDate}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            className="form-control"
                            min="1"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Add Assignment</button>
                </form>
            </div>
        </div>
    );
};

export default AddAssignment;

