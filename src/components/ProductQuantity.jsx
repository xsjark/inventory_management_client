// ProductQuantity.js
import React from "react";

const ProductQuantity = ({ label, value, onChange }) => {
    return (
        <div>
            <label>{label}</label>
            <input type="number" value={value} onChange={(e) => onChange(e.target.value)} />
        </div>
    );
};

export default ProductQuantity;
