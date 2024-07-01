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

    return (
        <div className='products-container'>
            <CreateProductForm onSubmit={fetchProducts} />
            <ModifyProductForm onSubmit={fetchProducts} />
            <DeleteProductForm onSubmit={fetchProducts} />
            <ProductTable products={products} />
        </div>
    );
};

export default Products;
