import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import app from '../firebase';

const DeleteCustomerForm = ({ onSubmit }) => {
    const [uid, setUid] = useState('');

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth(app);
            const user = auth.currentUser;
            if (!user) {
                throw new Error('User not signed in');
            }
            const idToken = await user.getIdToken();

            const response = await fetch('http://localhost:3000/deleteCustomer', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                },
                body: JSON.stringify({ uid })
            });
            if (response.ok) {
                console.log('Customer deleted successfully');
                onSubmit();
            } else {
                throw new Error('Failed to delete customer');
            }
        } catch (error) {
            console.error('Error deleting customer:', error.message);
        }
    };

    return (
        <form onSubmit={handleDelete}>
            <input type="text" placeholder="Customer UID" value={uid} onChange={(e) => setUid(e.target.value)} />
            <button type="submit">Delete Customer</button>
        </form>
    );
};

export default DeleteCustomerForm;
