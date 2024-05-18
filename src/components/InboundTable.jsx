const ProductTable = ({ products }) => {

    const inbounds = {
        id: 'hhg4328742',
        company: 'McDonalds',
        items: {
            burger: 3,
        }
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>UID</th>
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
