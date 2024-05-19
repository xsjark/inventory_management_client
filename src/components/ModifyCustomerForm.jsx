import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import app from '../firebase';

const ModifyCustomerForm = () => {
    const [uid, setUid] = useState('');
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

            const response = await fetch('http://localhost:3000/modifyCustomer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                },
                body: JSON.stringify({ uid, name })
            });
            if (response.ok) {
                console.log('Customer modified successfully');
            } else {
                throw new Error('Failed to modify customer');
            }
        } catch (error) {
            console.error('Error modifying customer:', error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Customer UID' value={uid} onChange={(e) => setUid(e.target.value)} />
                <input type="text" placeholder='Customer Name' value={name} onChange={(e) => setName(e.target.value)} />
            <button type="submit">Modify Customer</button>
        </form>
    );
};

export default ModifyCustomerForm;
