const WarehouseTable = ({ warehouseInventory }) => {
    // Extracting nested inventory data
    const inventory = warehouseInventory?.nestedCollections?.[0]?.inventory || [];
    
    return (
        <table>
            <caption>{warehouseInventory.name}</caption>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {inventory.map(({ name, quantity, productId }) => (
                    <tr key={name}>
                        <td>{productId}</td>
                        <td>{name}</td>
                        <td>{quantity}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default WarehouseTable;
