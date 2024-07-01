// InputComponent.js
import React, { useState } from 'react';
import { getAuth } from 'firebase/auth'; // Import getAuth from Firebase Auth
import app from '../firebase';

const CreateWarehouseForm = ({ onSubmit }) => {
  const [warehouseName, setWarehouseName] = useState('');

  const handleCreateWarehouse = async () => {
    const auth = getAuth(app); // Initialize auth using getAuth
    const user = auth.currentUser;
  
    if (!user) {
      console.error('User not signed in');
      return;
    }
  
    const idToken = await user.getIdToken();
  
    try {
      const response = await fetch('http://localhost:3000/createWarehouse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ name: warehouseName }),
      });
  
      if (response.ok) {
        console.log('Warehouse created successfully');
        onSubmit();
      } else {
        throw new Error('Failed to create warehouse');
      }
    } catch (error) {
      console.error('Error creating warehouse:', error.message);
    }
  };

  return (
    <div>
        <input
          type="text"
          placeholder='Warehouse Name'
          value={warehouseName}
          onChange={(e) => setWarehouseName(e.target.value)}
        />
      <button onClick={handleCreateWarehouse}>Create Warehouse</button>
    </div>
  );
};

export default CreateWarehouseForm;
