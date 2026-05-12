export function createEmptyOrderForm() {
  return {
    id: null,
    customerName: "",
    destination: "",
    status: "pending"
  };
}

export function buildOrderPayload(orderForm) {
  return {
    customerName: orderForm.customerName.trim(),
    destination: orderForm.destination.trim(),
    status: orderForm.status
  };
}
