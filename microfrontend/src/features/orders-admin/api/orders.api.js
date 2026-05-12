import { bffClient } from "../../../shared/api/bff-client";

export function listOrders() {
  return bffClient.get("/admin/orders");
}

export function createOrder(payload) {
  return bffClient.post("/admin/orders", payload);
}

export function updateOrder(orderId, payload) {
  return bffClient.put(`/admin/orders/${orderId}`, payload);
}

export function deleteOrder(orderId) {
  return bffClient.delete(`/admin/orders/${orderId}`);
}
