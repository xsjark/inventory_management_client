import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import app from '../firebase';

const ModifyWarehouseForm = () => {
    const [warehouseId, setWarehouseId] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth(app);
            const user = auth.currentUser;
            if (!user) {
                throw new Error('User not signed in');
            }
            const idToken = await user.getIdToken();
    
            const warehouseId = warehouseId
            const productId = 'J4660J9KOFaaEGa55V7T'; // Replace with the actual product ID
            const quantity = 100; // Replace with the actual quantity
    
            const response = await fetch('http://localhost:3000/modifyProductQuantity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                },
                body: JSON.stringify({ warehouseId, productId, quantity })
            });
    
            if (response.ok) {
                console.log('Product quantity modified successfully');
            } else {
                throw new Error('Failed to modify product quantity');
            }
        } catch (error) {
            console.error('Error modifying product quantity:', error.message);
        }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Warehouse UID"
                value={warehouseId}
                onChange={(e) => setWarehouseId(e.target.value)}
            />
            <input
                type="text"
                placeholder="Warehouse Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button type="submit">Modify Warehouse</button>
        </form>
    );
};

export default ModifyWarehouseForm;
