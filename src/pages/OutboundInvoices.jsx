import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import app from '../firebase';import CreateOutboundForm from "../components/CreateOutboundForm"
import DeleteOutboundInvoiceForm from "../components/DeleteOutboundInvoiceForm"
import OutboundInvoicesTable from "../components/OutboundInvoicesTable"

const OutboundInvoices = () => {
    const [products, setProducts] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [outboundInvoices, setOutboundInvoices] = useState([]);

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

      const fetchOutboundInvoices = async () => {
        try {
            const auth = getAuth(app);
            const user = auth.currentUser;
            if (!user) {
                throw new Error('User not signed in');
            }
            const idToken = await user.getIdToken();
    
            const response = await fetch('http://localhost:3000/getOutboundInvoices', {
                headers: {
                    'Authorization': `Bearer ${idToken}`
                }
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch outbound invoices');
            }
    
            const data = await response.json();
            setOutboundInvoices(data);
        } catch (error) {
            console.error('Error fetching outbound invoices:', error.message);
        }
    };

    useEffect(() => {
        fetchCustomers();
        fetchProducts();
        fetchWarehouses();
        fetchOutboundInvoices();
    }, []);

    return (
        <div className='outbound-container'>
            <CreateOutboundForm
                warehouses={warehouses}
                customers={customers}
                products={products}
                onInvoiceCreated={fetchOutboundInvoices}
            />
            <DeleteOutboundInvoiceForm onInvoiceDeleted={fetchOutboundInvoices} />
            <OutboundInvoicesTable invoices={outboundInvoices} />
        </div>
    )
}

export default OutboundInvoices;