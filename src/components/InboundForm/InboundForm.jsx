import React, { useEffect, useState } from "react";
import ProductQuantity from "../ProductQuantity";
import ProductSelect from "../ProductSelect";
import "./InboundForm.css";
import WarehouseSelect from "../WarehouseSelect";
import CustomerSelect from "../CustomerSelect";

const InboundForm = ({ products, warehouses, customers }) => {
    const [productSets, setProductSets] = useState([{ id: 1 }]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectedWarehouseId, setSelectedWarehouseId] = useState('');
    const [selectedWarehouseName, setSelectedWarehouseName] = useState('');
    const [selectedCustomerId, setSelectedCustomerId] = useState('');
    const [selectedCustomerName, setSelectedCustomerName] = useState('');

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

    const handleSelectCustomer = (selectedWarehouse) => {
        if (selectedWarehouse !== null) {
            setSelectedCustomerId(selectedWarehouse.id);
            setSelectedCustomerName(selectedWarehouse.name)
        } else {
            setSelectedCustomerId('');
            setSelectedCustomerName('');
        }
    };

    const handleSelectWarehouse = (selectedCustomer) => {
        if (selectedCustomer !== null) {
            setSelectedWarehouseId(selectedCustomer.id);
            setSelectedWarehouseName(selectedCustomer.name)
        } else {
            setSelectedWarehouseId('');
            setSelectedWarehouseName('');
        }
    };
    
    useEffect(() => {
        const newSelectedProducts = productSets.map((set) => set.productId).filter((id) => !!id);
        setSelectedProducts(newSelectedProducts);
    }, [productSets]);

    return (
        <div>
            <WarehouseSelect warehouses={warehouses} handleSelectWarehouse={handleSelectWarehouse} />
            <CustomerSelect customers={customers} handleSelectCustomer={handleSelectCustomer} />
            {productSets.map((productSet, index) => (
                <div key={productSet.id} className="inbound-form-row">
                    <ProductSelect
                        products={products}
                        value={productSet.productId}
                        onChange={(productId) => handleProductChange(productSet.id, productId)}
                        selectedProducts={selectedProducts}
                    />
                    <ProductQuantity
                        value={productSet.quantity}
                        onChange={(quantity) => handleQuantityChange(productSet.id, quantity)}
                    />  
                    {index !== 0 && <button onClick={() => removeProductSet(productSet.id)}>-</button>}
                </div>
            ))}
            <button onClick={addProductSet}>+</button>
        </div>
    );
};

export default InboundForm;
