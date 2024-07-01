import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import app from '../firebase';

const DeleteWarehouseForm = ({ onSubmit }) => {
    const [uid, setUid] = useState('');

    const handleDeleteWarehouse = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth(app);
            const user = auth.currentUser;
            if (!user) {
                throw new Error('User not signed in');
            }
            const idToken = await user.getIdToken();

            const response = await fetch('http://localhost:3000/deleteWarehouse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                },
                body: JSON.stringify({ warehouseId: uid })
            });
            if (response.ok) {
                console.log('Warehouse deleted successfully');
                onSubmit();
            } else {
                throw new Error('Failed to delete warehouse');
            }
        } catch (error) {
            console.error('Error deleting warehouse:', error.message);
        }
    };

    return (
        <form onSubmit={handleDeleteWarehouse}>
            <input type="text" placeholder="Warehouse UID" value={uid} onChange={(e) => setUid(e.target.value)} />
            <button type="submit">Delete Warehouse</button>
        </form>
    );
};

export default DeleteWarehouseForm;
