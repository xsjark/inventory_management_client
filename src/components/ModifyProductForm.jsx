import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import app from '../firebase';

const ModifyProductForm = ({ fetchProducts }) => {
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

            const response = await fetch('http://localhost:3000/modifyProduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                },
                body: JSON.stringify({ uid, name })
            });
            if (response.ok) {
                fetchProducts();
                console.log('Product modified successfully');
            } else {
                throw new Error('Failed to modify product');
            }
        } catch (error) {
            console.error('Error modifying product:', error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Product UID' value={uid} onChange={(e) => setUid(e.target.value)} />
                <input type="text" placeholder='Product Name' value={name} onChange={(e) => setName(e.target.value)} />
            <button type="submit">Modify Product</button>
        </form>
    );
};

export default ModifyProductForm;
