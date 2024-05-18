// ProductSelect.js
import React from "react";

const ProductSelect = ({ products, value, onChange, selectedProducts }) => {
    const filteredProducts = products.filter(product => !product.disabled);

    const handleChange = (event) => {
        const productId = event.target.value;
        onChange(productId);
    };

    return (
        <select value={value} onChange={handleChange}>
            <option value="">Select a product</option>
            {filteredProducts.map(product => (
                <option 
                    key={product.id} 
                    value={product.id} 
                    disabled={selectedProducts.includes(product.id)}
                >
                    {product.name}
                </option>
            ))}
        </select>
    );
};

export default ProductSelect;
