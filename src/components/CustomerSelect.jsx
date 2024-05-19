const CustomerSelect = ({ customers, handleSelectCustomer }) => {
    return (
        <div>
            <select
                id="customerSelect"
                name="customerSelect"
                onChange={(e) => {
                    const value = e.target.value;
                    handleSelectCustomer(value !== "" ? JSON.parse(value) : null);
                }}
            >
                <option value="">Select a customer</option>
                {customers.map((customer) => (
                    <option key={customer.id} value={JSON.stringify({ id: customer.id, name: customer.name })}>
                        {customer.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CustomerSelect;
