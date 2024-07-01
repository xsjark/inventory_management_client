import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import app from '../firebase';
import CreateInboundForm from "../components/CreateInboundForm/CreateInboundForm"
import DeleteInboundInvoiceForm from "../components/DeleteInboundInvoiceForm"
import InboundInvoicesTable from "../components/InboundInvoicesTable"

const InboundInvoices = () => {

    const [inboundInvoices, setInboundInvoices] = useState([]);
    const [products, setProducts] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [customers, setCustomers] = useState([]);

    const fetchInboundInvoices = async () => {
        const auth = getAuth(app);
        const user = auth.currentUser;

        if (!user) {
            console.error('User not signed in');
            return;
        }

        try {
            const idToken = await user.getIdToken();
            const response = await fetch('http://localhost:3000/getInvoices', {
                headers: {
                    'Authorization': `Bearer ${idToken}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch invoices');
            }

            const fetchedInboundInvoices = await response.json();
            setInboundInvoices(fetchedInboundInvoices);
        } catch (error) {
            console.error('Error fetching invoices:', error.message);
        }
    };


    const fetchProducts = async () => {
        try {
            const auth = getAuth(app);
            const idToken = await auth.currentUser.getIdToken();
            const response = await fetch('http://localhost:3000/getProducts', {
                headers: {
                    'Authorization': `Bearer ${idToken}`
                }
            });
            if (response.ok) {
                const productsData = await response.json();
                setProducts(productsData);
            } else {
                throw new Error('Failed to fetch products');
            }
        } catch (error) {
            console.error('Error fetching products:', error.message);
        }
    };

    const fetchWarehouses = async () => {
        try {
            const auth = getAuth(app);
            const idToken = await auth.currentUser.getIdToken();
            const response = await fetch('http://localhost:3000/getWarehouses', {
                headers: {
                    'Authorization': `Bearer ${idToken}`
                }
            });
            if (response.ok) {
                const warehousesData = await response.json();
                setWarehouses(warehousesData);
            } else {
                throw new Error('Failed to fetch warehouses');
            }
        } catch (error) {
            console.error('Error fetching warehouses:', error.message);
        }
    };

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
        fetchProducts();
        fetchWarehouses();
        fetchInboundInvoices();
    }, []);

    return (
        <div className='inbound-container'>
            <CreateInboundForm products={products} warehouses={warehouses} customers={customers} />
            <DeleteInboundInvoiceForm onInvoiceDeleted={fetchInboundInvoices} />
            <InboundInvoicesTable invoices={inboundInvoices} />
        </div>
    )
}

export default InboundInvoices;