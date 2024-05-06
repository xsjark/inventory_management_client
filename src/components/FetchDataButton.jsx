const FetchDataButton = ({ setData }) => {

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
                setData(data);
            } else {
                console.error('Failed to fetch protected data');
            }
        } catch (error) {
            console.error('Error fetching protected data:', error.message);
        }
    };

    return (
        <button onClick={fetchProtectedRoute} >Fetch Data</button>
    )
}

export default FetchDataButton;