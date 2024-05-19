const ProductTable = ({ products }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Product UID</th>
                    <th>Name</th>
                    <th>Disabled</th>
                </tr>
            </thead>
            <tbody>
                {products && products.map(product => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{JSON.stringify(product.disabled)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductTable;
