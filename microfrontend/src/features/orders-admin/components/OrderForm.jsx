export function OrderForm({ orderForm, ordersError, onChange, onSave, onReset, onRefresh }) {
  return (
    <div className="card">
      <h2>{orderForm.id ? `Editar pedido #${orderForm.id}` : "Novo pedido"}</h2>
      <div className="form-grid">
        <label>
          Cliente
          <input
            type="text"
            value={orderForm.customerName}
            onChange={(event) => onChange({ customerName: event.target.value })}
          />
        </label>
        <label>
          Destino
          <input
            type="text"
            value={orderForm.destination}
            onChange={(event) => onChange({ destination: event.target.value })}
          />
        </label>
        <label>
          Status
          <select
            value={orderForm.status}
            onChange={(event) => onChange({ status: event.target.value })}
          >
            <option value="pending">pending</option>
            <option value="in_progress">in_progress</option>
            <option value="delivered">delivered</option>
          </select>
        </label>
      </div>

      <div className="actions inline">
        <button onClick={onSave}>Salvar pedido</button>
        <button className="secondary" onClick={onReset}>
          Limpar formulario
        </button>
        <button className="secondary" onClick={onRefresh}>
          Atualizar lista
        </button>
      </div>
      {ordersError && <p className="error">Erro: {ordersError}</p>}
    </div>
  );
}
