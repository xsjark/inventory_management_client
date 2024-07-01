import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import app from '../firebase';
import CreateProductForm from "../components/CreateProductForm";
import DeleteProductForm from "../components/DeleteProductForm";
import ModifyProductForm from "../components/ModifyProductForm";
import ProductTable from "../components/ProductTable"; // Assuming you have this component

const Products = () => {
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
        fetchProducts();
    }, []);
    const styles = {
        container: {
            padding: '20px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            margin: '20px',
        },
        header: {
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: '#333',
        },
        formContainer: {
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '20px',
        },
    };
    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Products Management</h2>
            <div style={styles.formContainer}>
                <CreateProductForm onSubmit={fetchProducts} />
                <ModifyProductForm onSubmit={fetchProducts} />
                <DeleteProductForm onSubmit={fetchProducts} />
            </div>
            <ProductTable products={products} />
        </div>
    );
};

export default Products;
