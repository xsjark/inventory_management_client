import { useState } from "react";

const ProductTable = ({ products }) => {
    const [hoveredRow, setHoveredRow] = useState(null);

    const styles = {
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
        },
        th: {
            backgroundColor: '#f8f9fa',
            padding: '12px',
            borderBottom: '2px solid #dee2e6',
            textAlign: 'left',
            fontSize: '14px',
            fontWeight: 'bold',
        },
        td: {
            padding: '12px',
            borderBottom: '1px solid #dee2e6',
            fontSize: '14px',
        },
        tr: {
            transition: 'background-color 0.3s ease',
        },
        trHover: {
            backgroundColor: '#f5f5f5',
        },
        statusActive: {
            color: '#28a745',
            fontWeight: 'bold',
        },
        statusDisabled: {
            color: '#dc3545',
            fontWeight: 'bold',
        },
    };

    return (
        <table style={styles.table}>
            <thead>
                <tr>
                    <th style={styles.th}>Product UID</th>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Status</th>
                </tr>
            </thead>
            <tbody>
                {products && products.map((product, index) => (
                    <tr 
                        key={product.id}
                        style={{
                            ...styles.tr,
                            ...(hoveredRow === index ? styles.trHover : {})
                        }}
                        onMouseEnter={() => setHoveredRow(index)}
                        onMouseLeave={() => setHoveredRow(null)}
                    >
                        <td style={styles.td}>{product.id}</td>
                        <td style={styles.td}>{product.name}</td>
                        <td style={styles.td}>
                            <span style={product.disabled ? styles.statusDisabled : styles.statusActive}>
                                {product.disabled ? 'Disabled' : 'Active'}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductTable;
