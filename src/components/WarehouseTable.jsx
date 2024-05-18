const WarehouseTable = ({ warehouseInventory }) => {
    // Extracting nested inventory data
    const inventory = warehouseInventory?.nestedCollections?.[0]?.inventory || [];

    return (
        <table>
            <caption>
                {warehouseInventory.name}
                <i>({warehouseInventory.id})</i>
                {warehouseInventory.disabled && (<i>disabled</i>)}
            </caption>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {inventory.map(({ name, quantity, productId }) => (
                    <tr key={warehouseInventory.id + productId}>
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
