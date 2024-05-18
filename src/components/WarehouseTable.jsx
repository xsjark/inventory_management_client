const WarehouseTable = ({ warehouseId, warehouseInventory }) => {
    return (
        <table>
            <caption>
                {warehouseId}
            </caption>
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(warehouseInventory).map(([productName, quantity]) => (
                    <tr key={productName}>
                        <td>{productName}</td>
                        <td>{quantity}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default WarehouseTable;
