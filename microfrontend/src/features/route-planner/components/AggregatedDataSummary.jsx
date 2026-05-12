export function AggregatedDataSummary({ data }) {
  if (!data) return null;

  return (
    <div className="card">
      <h2>Resposta agregada</h2>
      <p>
        <strong>Produtos:</strong> {Array.isArray(data.products) ? data.products.length : 0}
      </p>
      <p>
        <strong>Pedidos:</strong> {Array.isArray(data.orders) ? data.orders.length : 0}
      </p>
      <p>
        <strong>Provedor de rota:</strong> {data.route?.provider || "-"}
      </p>
    </div>
  );
}
