import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, getIdToken, signOut } from 'firebase/auth';
import app from '../firebase';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        const token = await getIdToken(user);
        sessionStorage.setItem('token', token);
      }
      console.log('Signed in successfully');
    } catch (error) {
      console.error('Error signing in:', error.message);
    }
  };

  const handleSignOut = async () => {
    const auth = getAuth(app);
    try {
      await signOut(auth);
      console.log('Signed out successfully');
  
      // Retrieve the token from session storage
      const token = sessionStorage.getItem('token');

      sessionStorage.removeItem('token');
  
      // Call the logout endpoint on the server
      const response = await fetch('http://localhost:3000/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        console.log('Logged out from server');
      } else {
        console.error('Failed to log out from server');
      }
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const fetchProtectedRoute = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('http://localhost:3000/protected', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Protected data:', data);
      } else {
        console.error('Failed to fetch protected data');
      }
    } catch (error) {
      console.error('Error fetching protected data:', error.message);
    }
  };  

  return (
    <div>
      <form onSubmit={handleSignIn}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Sign In</button>
      </form>
      <button onClick={handleSignOut}>Sign Out</button>
      <button onClick={fetchProtectedRoute}>Fetch</button>
    </div>
  );
};

export default SignInForm;
