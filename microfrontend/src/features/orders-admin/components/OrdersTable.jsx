export function OrdersTable({ orders, ordersLoading, onEdit, onDelete }) {
  return (
    <div className="card">
      <h2>Pedidos cadastrados</h2>
      {ordersLoading && <p>Carregando pedidos...</p>}
      {!ordersLoading && orders.length === 0 && <p>Nenhum pedido encontrado.</p>}
      {orders.length > 0 && (
        <div className="orders-table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Destino</th>
                <th>Status</th>
                <th>Acoes</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customerName}</td>
                  <td>{order.destination}</td>
                  <td>{order.status}</td>
                  <td className="table-actions">
                    <button className="secondary small" onClick={() => onEdit(order)}>
                      Editar
                    </button>
                    <button className="danger small" onClick={() => onDelete(order.id)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
