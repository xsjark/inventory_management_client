import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import app from '../firebase';

const CreateProductForm = ({ onSubmit }) => {
    const [productName, setProductName] = useState('');

    const handleCreateProduct = async () => {
        const auth = getAuth(app);
        const user = auth.currentUser;
        console.log('client', auth.currentUser.uid)
        if (!user) {
            console.error('User not signed in');
            return;
        }
        const idToken = await user.getIdToken();

        try {
            const response = await fetch('http://localhost:3000/createProduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                },
                body: JSON.stringify({ name: productName, disabled: false })
            });

            if (response.ok) {
                console.log('Product added successfully');
                onSubmit();
            } else {
                throw new Error('Failed to add product');
            }
        } catch (error) {
            console.error('Error adding product:', error.message);
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
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'background-color 0.3s',
        },
    };

    return (
        <div style={styles.form}>
            <input
                type="text"
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                style={styles.input}
            />
            <button onClick={handleCreateProduct} style={styles.button}>Create Product</button>
        </div>
    );
};

export default CreateProductForm;
