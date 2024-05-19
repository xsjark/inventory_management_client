const CustomerTable = ({ customers }) =>  (
    <table>
      <thead>
        <tr>
          <th>Customer UID</th>
          <th>Name</th>
          <th>Disabled</th>
        </tr>
      </thead>
      <tbody>
        {customers && customers.map(customer => (
          <tr key={customer.id}>
            <td>{customer.id}</td>
            <td>{customer.name}</td>
            <td>{JSON.stringify(customer.disabled)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

export default CustomerTable;
