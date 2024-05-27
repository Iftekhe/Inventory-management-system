import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../api/api';

const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users and locations concurrently
        const [inventoryResponse, usersResponse, locationsResponse] = await Promise.all([
          api.get('/api/getAllInventory'),
        //   api.get('/api/AllUser'),
        //   api.get('/api/allLocation')
        ]);

        // Update state with inventory items
        setInventoryItems(inventoryResponse.data);

        // Log responses for debugging
        // console.log('Users Response:', usersResponse.data);
        // console.log('Locations Response:', locationsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        console.error(error.response?.data?.msg);
        setError(error.response?.data?.msg);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Inventory Items</h1>
      {error ? (
        <div>
          <p>Error: {error}</p>

        </div>
      ) : (
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Location Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {inventoryItems.map((item) => (
            <tr key={item._id}>
              <td>{item.productId.name}</td>
              <td>{item.locationId.name}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>    
      )}
    </div>
  );
};

export default Inventory;
