import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import app from '../firebase';

const ModifyWarehouseForm = ({ onSubmit }) => {
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

    
            const response = await fetch('http://localhost:3000/modifyWarehouse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                },
                body: JSON.stringify({ warehouseId, name})
            });
    
            if (response.ok) {
                console.log('Warehouse name modified successfully');
                onSubmit();
            } else {
                throw new Error('Failed to modify warehouse name');
            }
        } catch (error) {
            console.error('Error modifying warehouse name:', error.message);
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
