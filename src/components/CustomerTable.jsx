const CustomerTable = ({ customers }) =>  (
    <table>
      <thead>
        <tr>
          <th>Customer UID</th>
          <th>Name</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {customers && customers.map(customer => (
          <tr key={customer.id}>
            <td>{customer.id}</td>
            <td>{customer.name}</td>
            <td>{customer.disabled ? 'Disabled' : 'Active'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

export default CustomerTable;
