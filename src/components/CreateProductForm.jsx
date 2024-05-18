import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import app from '../firebase';

const CreateProductForm = ({ fetchProducts }) => {
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
                fetchProducts();
            } else {
                throw new Error('Failed to add product');
            }
        } catch (error) {
            console.error('Error adding product:', error.message);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
            />
            <button onClick={handleCreateProduct}>Create Product</button>
        </div>
    );
};

export default CreateProductForm;
