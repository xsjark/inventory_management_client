const WarehouseSelect = ({ warehouses, handleSelectWarehouse }) => {
    return (
        <div>
            <select
                id="warehouseSelect"
                name="warehouseSelect"
                onChange={(e) => {
                    const value = e.target.value;
                    handleSelectWarehouse(value !== "" ? JSON.parse(value) : null);
                }}
            >
                <option value="">Select a warehouse</option>
                {warehouses.map((warehouse) => (
                    <option key={warehouse.id} value={JSON.stringify({ id: warehouse.id, name: warehouse.name })}>
                        {warehouse.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default WarehouseSelect;
