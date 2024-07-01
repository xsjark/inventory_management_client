import React, { useState } from 'react';
import { getAuth } from 'firebase/auth'; 
import app from '../firebase';

const CreateCustomerForm = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleCreateCustomer = async () => {
    const auth = getAuth(app); 
    const user = auth.currentUser;
  
    if (!user) {
      console.error('User not signed in');
      return;
    }
  
    const idToken = await user.getIdToken();
  
    try {
      const response = await fetch('http://localhost:3000/createCustomer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ name, disabled: false }),
      });
  
      if (response.ok) {
        console.log('Customer created successfully');
        onSubmit();
      } else {
        throw new Error('Failed to create customer');
      }
    } catch (error) {
      console.error('Error creating customer:', error.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder='Company Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleCreateCustomer}>Create Customer</button>
    </div>
  );
};

export default CreateCustomerForm;
