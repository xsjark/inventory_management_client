import './App.css'
import SignInForm from './components/SignInForm'
import React, { useState, useEffect } from 'react';
import SignOutButton from './components/SignOutButton';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from './firebase';
import CreateProductForm from './components/CreateProductForm';
import ProductTable from './components/ProductTable';
import ModifyProductForm from './components/ModifyProductForm';
import DeleteProductForm from './components/DeleteProductForm';
import WarehouseTable from './components/WarehouseTable';
import InboundForm from './components/InboundForm/InboundForm';
import CreateWarehouseForm from './components/CreateWarehouseForm';
import DeleteWarehouseForm from './components/DeleteWarehouseForm';
import ModifyWarehouseForm from './components/ModifyWarehouseForm';
import CreateCustomerForm from './components/CreateCustomerForm';
import CustomerTable from './components/CustomerTable';
import ModifyCustomerForm from './components/ModifyCustomerForm';
import DeleteCustomerForm from './components/DeleteCustomer';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [role, setRole] = useState('');

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
  

  // useEffect(() => {
  //   const auth = getAuth(app);
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     setIsSignedIn(!!user);
  //     fetchProducts();
  //     fetchWarehouses();
  //     setLoading(false);
  //   });
  //   return () => unsubscribe();
  // }, []);

  const getRole = async () => {
    const auth = getAuth(app);
    const user = auth.currentUser;

    if (!user) {
      console.error('User not signed in');
      return;
    }

    const idToken = await user.getIdToken();

    try {
      const response = await fetch('http://localhost:3000/check-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setRole(data.role); // Set the state role using setRole
      } else {
        throw new Error('Failed to send token to server');
      }
    } catch (error) {
      console.error('Error sending token to server:', error.message);
    }
  };

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsSignedIn(!!user);

      Promise.all([
        getRole(),
        fetchProducts(),
        fetchWarehouses(),
        fetchCustomers()
      ]).then(() => {
        setLoading(false);
      }).catch((error) => {
        console.error('Error loading data:', error.message);
        setLoading(false); // Ensure loading is set to false even if there's an error
      });
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : isSignedIn ? (
        <>
          <div className='app-bar'>
            <p>{role}</p>
            <SignOutButton setIsSignedIn={setIsSignedIn} />
          </div>
          <div className='app-container'>
            <div className='products-container'>
              <CreateProductForm fetchProducts={fetchProducts} />
              <ModifyProductForm fetchProducts={fetchProducts} />
              <DeleteProductForm fetchProducts={fetchProducts} />
              <ProductTable products={products} />
            </div>
            <div className='warehouses-container'>
              <CreateWarehouseForm />
              <ModifyWarehouseForm />
              <DeleteWarehouseForm />
              {warehouses && warehouses.map(warehouse => (
                <WarehouseTable key={warehouse.name} warehouseInventory={warehouse} />
              ))}
            </div>
            <div className='customers-container'>
              <CreateCustomerForm />
              <ModifyCustomerForm />
              <DeleteCustomerForm />
              <CustomerTable customers={customers} />
            </div>
            {/* <div className='inbound-container'>
              <InboundForm products={products} warehouses={warehouses} />
            </div> */}
          </div>
        </>
      ) : (
        <>
          <SignInForm setIsSignedIn={setIsSignedIn} />
        </>
      )}
    </>
  )
}

export default App;
