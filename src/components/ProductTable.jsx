const ProductTable = ({ products }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>UID</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {products && products.map(product => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductTable;
