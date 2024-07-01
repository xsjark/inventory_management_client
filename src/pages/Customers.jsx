import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import app from '../firebase';
import CreateCustomerForm from '../components/CreateCustomerForm';
import ModifyCustomerForm from '../components/ModifyCustomerForm';
import DeleteCustomerForm from '../components/DeleteCustomer';
import CustomerTable from '../components/CustomerTable';

const Customers = () => {

    const [customers, setCustomers] = useState([]);

    const fetchCustomers = async () => {
        try {
            const auth = getAuth(app);
            const idToken = await auth.currentUser.getIdToken();
            const response = await fetch('http://localhost:3000/getCustomers', {
                headers: {
                    'Authorization': `Bearer ${idToken}`
                }
            });
            if (response.ok) {
                const customersData = await response.json();
                setCustomers(customersData);
            } else {
                throw new Error('Failed to fetch customers');
            }
        } catch (error) {
            console.error('Error fetching customers:', error.message);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <div className='customers-container'>
            <CreateCustomerForm onSubmit={fetchCustomers} />
            <ModifyCustomerForm onSubmit={fetchCustomers} />
            <DeleteCustomerForm onSubmit={fetchCustomers} />
            <CustomerTable customers={customers} />
        </div>
    )
}

export default Customers;