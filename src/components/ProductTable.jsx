const ProductTable = ({ products }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Product UID</th>
                    <th>Name</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {products && products.map(product => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.disabled ? 'Disabled' : 'Active'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductTable;
