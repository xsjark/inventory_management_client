import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import app from '../firebase'; // Adjust this import path as needed
import CreateWarehouseForm from '../components/CreateWarehouseForm';
import ModifyWarehouseForm from '../components/ModifyWarehouseForm';
import DeleteWarehouseForm from '../components/DeleteWarehouseForm';
import WarehouseTable from '../components/WarehouseTable';

const Warehouses = () => {
    const [warehouses, setWarehouses] = useState([]);

    const fetchWarehouses = async () => {
        try {
          const auth = getAuth(app);
          const idToken = await auth.currentUser.getIdToken();
          const response = await fetch('http://localhost:3000/getWarehouses', {
            headers: {
              'Authorization': `Bearer ${idToken}`
            }
          });
          if (response.ok) {
            const warehousesData = await response.json();
            setWarehouses(warehousesData);
          } else {
            throw new Error('Failed to fetch warehouses');
          }
        } catch (error) {
          console.error('Error fetching warehouses:', error.message);
        }
      };

      useEffect(() => {
        fetchWarehouses();
    }, []);

    return (
        <div className='warehouses-container'>
              <CreateWarehouseForm onSubmit={fetchWarehouses}/>
              <ModifyWarehouseForm onSubmit={fetchWarehouses}/>
              <DeleteWarehouseForm onSubmit={fetchWarehouses}/>
              {warehouses && warehouses.map(warehouse => (
                <WarehouseTable key={warehouse.name} warehouseInventory={warehouse} />
              ))}
            </div>
    )
}

export default Warehouses;