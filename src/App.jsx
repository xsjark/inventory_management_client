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

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

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

useEffect(() => {
  const auth = getAuth(app);
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setIsSignedIn(!!user);
    fetchProducts();
    setLoading(false);
  });
  return () => unsubscribe();
}, []);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : isSignedIn ? (
        <>
          <SignOutButton setIsSignedIn={setIsSignedIn} />
          <CreateProductForm  fetchProducts={fetchProducts} />
          <ModifyProductForm fetchProducts={fetchProducts} />
          <DeleteProductForm fetchProducts={fetchProducts} />
          <ProductTable products={products} />
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
