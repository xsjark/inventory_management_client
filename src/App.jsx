import './App.css'
import SignInForm from './components/SignInForm'
import React, { useState, useEffect } from 'react';
import SignOutButton from './components/SignOutButton';
import FetchDataButton from './components/FetchDataButton';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from './firebase';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsSignedIn(!!user); 
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
          <FetchDataButton setData={setData} />
          {JSON.stringify(data)}
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
