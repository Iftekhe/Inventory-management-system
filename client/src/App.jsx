
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AddProductPage from './pages/AddProductPage';
import ProductsPagee from './pages/ProductsPage';
import RegisterUpdateUserPage from './pages/RegisterUpdateUserPage';
import UsersListPage from './pages/UserListPage';
import EditUserPage from './pages/EditUserPage';
import Menu from '../src/components/Menu';
import EditProductPage from './pages/EditProductPage';
import InventoryPage from './pages/InventoryPage'


function App() {
    return (
        <Router>
            <Menu />
            <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/add-product" element={<AddProductPage />} />
                <Route path="/products" element={<ProductsPagee />} />
                <Route path="/register-Update-User" element={<RegisterUpdateUserPage />} />
                <Route path="/user-list" element={<UsersListPage/>}/>
                <Route path="/editUser/:id" element={<EditUserPage/>}/>
                <Route path="/editProduct/:id" element={<EditProductPage/>}/>
                <Route path="/Inventory" element={<InventoryPage/>}/>

            </Routes>
        </Router>
    );
}

export default App;








// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
