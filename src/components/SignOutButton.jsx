import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import app from '../firebase';

const SignOutButton = ({ setIsSignedIn }) => {
    const handleSignOut = async () => {
        const auth = getAuth(app);
        try {
            await signOut(auth);
            console.log('Signed out successfully');
            const token = sessionStorage.getItem('token');
            sessionStorage.removeItem('token');
            setIsSignedIn(false);

            // Call the logout endpoint on the server
            if (token) {
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
            } else {
                console.log('No token found in session storage');
            }
        } catch (error) {
            console.error('Error signing out:', error.message);
        }
    };

    const styles = {
        button: {
            padding: '8px 16px',
            backgroundColor: '#dc3545', // A red color for signout, contrasting with the blue used in the navbar
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '14px',
            transition: 'background-color 0.3s',
            outline: 'none',
        },
        hoverStyle: {
            backgroundColor: '#c82333', // Darker shade for hover effect
        }
    };

    return (
        <button 
            onClick={handleSignOut} 
            style={styles.button}
            onMouseOver={(e) => Object.assign(e.target.style, styles.hoverStyle)}
            onMouseOut={(e) => Object.assign(e.target.style, styles.button)}
        >
            Sign Out
        </button>
    );
};

export default SignOutButton;
