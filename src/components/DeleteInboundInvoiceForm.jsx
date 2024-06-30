import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import app from '../firebase';

const DeleteInboundInvoiceForm = ({ onInvoiceDeleted }) => {
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

            const response = await fetch('http://localhost:3000/deleteInboundInvoice', {
                method: 'POST',  // Changed from DELETE to POST as per the route we created
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                },
                body: JSON.stringify({ invoiceId })  // Changed from uid to invoiceId
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete invoice');
            }

            const data = await response.json();
            setSuccess(data.message);
            setInvoiceId('');
            if (onInvoiceDeleted) {
                onInvoiceDeleted();
            }
        } catch (error) {
            console.error('Error deleting invoice:', error.message);
            setError(error.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleDelete}>
                <input 
                    type="text" 
                    placeholder="Invoice ID" 
                    value={invoiceId} 
                    onChange={(e) => setInvoiceId(e.target.value)} 
                />
                <button type="submit">Delete Invoice</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default DeleteInboundInvoiceForm;