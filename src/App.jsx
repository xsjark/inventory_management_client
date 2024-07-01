import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from './firebase';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from './pages/Products';
import Warehouses from './pages/Warehouses';
import Customers from './pages/Customers';
import InboundInvoices from './pages/InboundInvoices';
import OutboundInvoices from './pages/OutboundInvoices';
import SignInForm from './components/SignInForm'
import AppBar from './components/AppBar';


function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [role, setRole] = useState('');

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
    
    const handleAuthChange = async (user) => {
      setIsSignedIn(!!user);
      if (user) {
        try {
          await getRole();
        } catch (error) {
          console.error('Error loading data:', error.message);
        }
      }
    };
  
    const unsubscribe = onAuthStateChanged(auth, handleAuthChange);
    
    return unsubscribe;
  }, []);

  return (
    <Router>
      {isSignedIn ? (
        <>
          <AppBar role={role} setIsSignedIn={setIsSignedIn} />
          <div className='app-container'>
            <Routes>
              <Route path="/products" element={<Products />} />
              <Route path="/warehouses" element={<Warehouses />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/inbound-invoices" element={<InboundInvoices />} />
              <Route path="/outbound-invoices" element={<OutboundInvoices />} />
              <Route path="/" element={<Products />} /> {/* Default route */}
            </Routes>
          </div>
        </>
      ) : (
        <SignInForm setIsSignedIn={setIsSignedIn} />
      )}
    </Router>
  )
}

export default App;
