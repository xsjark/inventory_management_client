import React, { useEffect, useState } from "react";
import ProductQuantity from "../ProductQuantity";
import ProductSelect from "../ProductSelect";
import "./InboundForm.css";

const InboundForm = ({ products }) => {
    const [productSets, setProductSets] = useState([{ id: 1 }]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const addProductSet = () => {
        const newId = productSets[productSets.length - 1].id + 1;
        setProductSets([...productSets, { id: newId }]);
    };

    const removeProductSet = (idToRemove) => {
        if (idToRemove === 1) return; // Do not remove the first product set
        setProductSets(productSets.filter((set) => set.id !== idToRemove));
    };

    const handleProductChange = (id, productId) => {
        setProductSets(productSets.map((set) => (set.id === id ? { ...set, productId: productId } : set)));
    };

    const handleQuantityChange = (id, quantity) => {
        setProductSets(productSets.map((set) => (set.id === id ? { ...set, quantity: quantity } : set)));
    };

    useEffect(() => {
        const newSelectedProducts = productSets.map((set) => set.productId).filter((id) => !!id);
        setSelectedProducts(newSelectedProducts);
    }, [productSets]);

    return (
        <div>
            {productSets.map((productSet, index) => (
                <div key={productSet.id} className="inbound-form-row">
                    <ProductSelect
                        products={products}
                        value={productSet.productId}
                        onChange={(productId) => handleProductChange(productSet.id, productId)}
                        selectedProducts={selectedProducts}
                    />
                    <ProductQuantity
                        label="Quantity"
                        value={productSet.quantity}
                        onChange={(quantity) => handleQuantityChange(productSet.id, quantity)}
                    />  
                    {index !== 0 && <button onClick={() => removeProductSet(productSet.id)}>Remove</button>}
                </div>
            ))}
            <button onClick={addProductSet}>Add Product Set</button>
            {JSON.stringify(productSets)}
        </div>
    );
};

export default InboundForm;
