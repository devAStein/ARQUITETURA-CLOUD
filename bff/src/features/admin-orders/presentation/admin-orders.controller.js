const { proxyRequest } = require("../../../shared/http/proxy-request");
const ordersClient = require("../infrastructure/orders.client");

function listOrders(_req, res) {
  return proxyRequest(res, ordersClient.listOrders());
}

function getOrderById(req, res) {
  return proxyRequest(res, ordersClient.getOrderById(req.params.id));
}

function createOrder(req, res) {
  return proxyRequest(res, ordersClient.createOrder(req.body));
}

function updateOrder(req, res) {
  return proxyRequest(res, ordersClient.updateOrder(req.params.id, req.body));
}

function deleteOrder(req, res) {
  return proxyRequest(res, ordersClient.deleteOrder(req.params.id));
}

module.exports = {
  listOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
};
