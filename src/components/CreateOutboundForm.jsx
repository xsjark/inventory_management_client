import React, { useEffect, useState } from "react";
import ProductQuantity from "./ProductQuantity";
import ProductSelect from "./ProductSelect";
import WarehouseSelect from "./WarehouseSelect";
import CustomerSelect from "./CustomerSelect";
import { getAuth } from 'firebase/auth';
import app from './../firebase';

const CreateOutboundForm = ({ products, warehouses, customers }) => {
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

    const handleSelectCustomer = (selectedCustomer) => {
        if (selectedCustomer !== null) {
            setSelectedCustomerId(selectedCustomer.id);
            setSelectedCustomerName(selectedCustomer.name)
        } else {
            setSelectedCustomerId('');
            setSelectedCustomerName('');
        }
    };

    const handleSelectWarehouse = (selectedWarehouse) => {
        if (selectedWarehouse !== null) {
            setSelectedWarehouseId(selectedWarehouse.id);
            setSelectedWarehouseName(selectedWarehouse.name)
        } else {
            setSelectedWarehouseId('');
            setSelectedWarehouseName('');
        }
    };

    const handleSubmit = async () => {
        const auth = getAuth(app);
        const user = auth.currentUser;

        if (!user) {
            console.error('User not signed in');
            return;
        }

        const idToken = await user.getIdToken();

        if (!selectedWarehouseId) {
            alert('Please select a warehouse.');
            return;
        }

        if (!selectedCustomerId) {
            alert('Please select a customer.');
            return;
        }

        const updates = productSets.map(set => ({
            productId: set.productId,
            quantity: -parseInt(set.quantity, 10), // Negative quantity for outbound
        }));

        try {
            // Call modifyProductQuantity to subtract from inventory
            const modifyResponse = await fetch('http://localhost:3000/modifyProductQuantity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                },
                body: JSON.stringify({ warehouseId: selectedWarehouseId, updates })
            });

            if (!modifyResponse.ok) {
                throw new Error('Failed to update product quantities');
            }

            // Prepare products array for invoice
            const invoiceProducts = updates.map(update => ({
                productId: update.productId,
                quantity: -update.quantity // Convert back to positive for invoice
            }));

            // Call createOutboundInvoice
            const invoiceResponse = await fetch('http://localhost:3000/createOutboundInvoice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                },
                body: JSON.stringify({
                    companyUid: selectedCustomerId,
                    products: invoiceProducts,
                    warehouseId: selectedWarehouseId
                })
            });

            if (!invoiceResponse.ok) {
                throw new Error('Failed to create outbound invoice');
            }

            const invoiceData = await invoiceResponse.json();

            alert(`Product quantities updated and outbound invoice created successfully. Invoice ID: ${invoiceData.invoiceId}`);
        } catch (error) {
            console.error('Error:', error);
            alert(error.message || 'An error occurred while processing the request');
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
                <div key={productSet.id} className="outbound-form-row">
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
            <button onClick={handleSubmit}>Create Outbound Invoice</button>
        </div>
    );
};

export default CreateOutboundForm;
