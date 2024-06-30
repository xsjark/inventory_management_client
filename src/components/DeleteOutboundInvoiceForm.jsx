import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import app from '../firebase';

const DeleteOutboundInvoiceForm = ({ onInvoiceDeleted }) => {
    const [invoiceId, setInvoiceId] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleDelete = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!invoiceId.trim()) {
            setError('Please enter an invoice ID');
            return;
        }

        try {
            const auth = getAuth(app);
            const user = auth.currentUser;
            if (!user) {
                throw new Error('User not signed in');
            }
            const idToken = await user.getIdToken();

            const response = await fetch('http://localhost:3000/deleteOutboundInvoice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                },
                body: JSON.stringify({ invoiceId })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete outbound invoice');
            }

            const data = await response.json();
            setSuccess(data.message);
            setInvoiceId('');
            if (onInvoiceDeleted) {
                onInvoiceDeleted();
            }
        } catch (error) {
            console.error('Error deleting outbound invoice:', error.message);
            setError(error.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleDelete}>
                <input 
                    type="text" 
                    placeholder="Outbound Invoice ID" 
                    value={invoiceId} 
                    onChange={(e) => setInvoiceId(e.target.value)} 
                />
                <button type="submit">Delete Outbound Invoice</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default DeleteOutboundInvoiceForm;
