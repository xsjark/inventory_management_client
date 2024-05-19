import React, { useState } from 'react';

const ModifyProductQuantity = () => {
    const [warehouseId, setWarehouseId] = useState('');
    const [productId, setProductId] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const token = sessionStorage.getItem('token');
            const response = await fetch('http://localhost:3000/modifyProductQuantity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    warehouseId,
                    productId,
                    quantity
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update product quantity');
            }

            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            setMessage('Failed to update product quantity');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Warehouse ID:
                        <input
                            type="text"
                            value={warehouseId}
                            onChange={(e) => setWarehouseId(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Product ID:
                        <input
                            type="text"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Quantity:
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Update Quantity</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ModifyProductQuantity;
