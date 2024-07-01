import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import app from '../firebase';

const DeleteProductForm = ({ onSubmit }) => {
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

            const response = await fetch('http://localhost:3000/deleteProduct', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                },
                body: JSON.stringify({ uid })
            });
            if (response.ok) {
                console.log('Product deleted successfully');
                onSubmit();
            } else {
                throw new Error('Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error.message);
        }
    };

    const styles = {
        form: {
            display: 'flex',
            gap: '10px',
        },
        input: {
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '14px',
        },
        button: {
            padding: '8px 16px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'background-color 0.3s',
        },
    };

    return (
        <form onSubmit={handleDelete} style={styles.form}>
            <input type="text" placeholder="Product UID" value={uid} onChange={(e) => setUid(e.target.value)} style={styles.input} />
            <button type="submit" style={styles.button}>Delete Product</button>
        </form>
    );
};

export default DeleteProductForm;
