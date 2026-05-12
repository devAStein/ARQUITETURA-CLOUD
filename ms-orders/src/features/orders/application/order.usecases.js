const { buildOrderFromPayload } = require("../domain/order.entity");
const { validateOrderPayload } = require("./validate-order");

async function listOrders(repository) {
  return repository.findAll();
}

async function getOrderById(repository, orderId) {
  return repository.findById(Number(orderId));
}

async function createOrder(repository, payload) {
  if (repository.requiresManualValidation) {
    const errors = validateOrderPayload(payload);
    if (errors.length) return { validationErrors: errors };
  }

  return repository.create(buildOrderFromPayload(payload));
}

async function updateOrder(repository, orderId, payload) {
  if (repository.requiresManualValidation) {
    const errors = validateOrderPayload(payload);
    if (errors.length) return { validationErrors: errors };
  }

  return repository.updateById(Number(orderId), buildOrderFromPayload(payload));
}

async function deleteOrder(repository, orderId) {
  return repository.deleteById(Number(orderId));
}

module.exports = {
  listOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
};
