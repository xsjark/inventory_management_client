import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, getIdToken } from 'firebase/auth';
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
        console.log('ID token:', token);
      }
      console.log('Signed in successfully');
    } catch (error) {
      console.error('Error signing in:', error.message);
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignInForm;
