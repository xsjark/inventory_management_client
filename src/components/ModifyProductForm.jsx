import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import app from '../firebase';

const ModifyProductForm = ({ onSubmit }) => {
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
                onSubmit();
                console.log('Product modified successfully');
            } else {
                throw new Error('Failed to modify product');
            }
        } catch (error) {
            console.error('Error modifying product:', error.message);
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
            backgroundColor: '#ffc107',
            color: 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'background-color 0.3s',
        },
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <input type="text" placeholder='Product UID' value={uid} onChange={(e) => setUid(e.target.value)} style={styles.input} />
            <input type="text" placeholder='Product Name' value={name} onChange={(e) => setName(e.target.value)} style={styles.input} />
            <button type="submit" style={styles.button}>Modify Product</button>
        </form>
    );
};

export default ModifyProductForm;
