const InboundInvoicesTable = ({ invoices }) => (
  <table>
    <thead>
      <tr>
        <th>Invoice UID</th>
        <th>Company</th>
        <th>Created</th>
        <th>Products</th>
        <th>Disabled</th>
      </tr>
    </thead>
    <tbody>
      {invoices && invoices.map(invoice => (
        <tr key={invoice.id}>
          <td>{invoice.id}</td>
          <td>{invoice.company.name}</td>
          <td>{invoice.createdOn ? new Date(invoice.createdOn).toLocaleString() : 'N/A'}</td>
          <td>
            <ul>
              {invoice.products.map((product, index) => (
                <li key={index}>
                  {product.productId}(x{product.quantity})
                </li>
              ))}
            </ul>
          </td>
          <td>{JSON.stringify(invoice.disabled)}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default InboundInvoicesTable;