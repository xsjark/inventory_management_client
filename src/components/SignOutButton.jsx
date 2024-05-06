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

    return (
        <button onClick={handleSignOut}>Sign Out</button>
    );
};

export default SignOutButton;
