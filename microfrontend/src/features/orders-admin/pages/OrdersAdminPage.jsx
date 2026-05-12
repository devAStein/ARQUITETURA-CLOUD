import { useEffect, useState } from "react";
import { createOrder, deleteOrder, listOrders, updateOrder } from "../api/orders.api";
import { OrderForm } from "../components/OrderForm";
import { OrdersTable } from "../components/OrdersTable";
import { buildOrderPayload, createEmptyOrderForm } from "../model/order-form";

export function OrdersAdminPage({ refreshKey }) {
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState("");
  const [orderForm, setOrderForm] = useState(createEmptyOrderForm);

  useEffect(() => {
    loadOrders();
  }, [refreshKey]);

  function resetOrderForm() {
    setOrderForm(createEmptyOrderForm());
  }

  function updateOrderForm(changes) {
    setOrderForm((current) => ({
      ...current,
      ...changes
    }));
  }

  async function loadOrders() {
    setOrdersLoading(true);
    setOrdersError("");
    try {
      const response = await listOrders();
      setOrders(response.data);
    } catch (err) {
      setOrdersError(err.response?.data?.reason || err.message);
    } finally {
      setOrdersLoading(false);
    }
  }

  async function saveOrder() {
    setOrdersError("");
    try {
      const payload = buildOrderPayload(orderForm);
      if (!payload.customerName || !payload.destination) {
        setOrdersError("Preencha nome do cliente e destino.");
        return;
      }

      if (orderForm.id) {
        await updateOrder(orderForm.id, payload);
      } else {
        await createOrder(payload);
      }

      await loadOrders();
      resetOrderForm();
    } catch (err) {
      setOrdersError(err.response?.data?.reason || err.message);
    }
  }

  async function removeOrder(orderId) {
    setOrdersError("");
    try {
      await deleteOrder(orderId);
      await loadOrders();
      if (orderForm.id === orderId) resetOrderForm();
    } catch (err) {
      setOrdersError(err.response?.data?.reason || err.message);
    }
  }

  function startEditOrder(order) {
    setOrderForm({
      id: order.id,
      customerName: order.customerName,
      destination: order.destination,
      status: order.status
    });
  }

  return (
    <section className="admin-content">
      <OrderForm
        orderForm={orderForm}
        ordersError={ordersError}
        onChange={updateOrderForm}
        onSave={saveOrder}
        onReset={resetOrderForm}
        onRefresh={loadOrders}
      />
      <OrdersTable
        orders={orders}
        ordersLoading={ordersLoading}
        onEdit={startEditOrder}
        onDelete={removeOrder}
      />
    </section>
  );
}
