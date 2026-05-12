const axios = require("axios");
const { env } = require("../../../config/env");

function listOrders() {
  return axios.get(`${env.ordersServiceUrl}/orders`);
}

function getOrderById(orderId) {
  return axios.get(`${env.ordersServiceUrl}/orders/${orderId}`);
}

function createOrder(payload) {
  return axios.post(`${env.ordersServiceUrl}/orders`, payload);
}

function updateOrder(orderId, payload) {
  return axios.put(`${env.ordersServiceUrl}/orders/${orderId}`, payload);
}

function deleteOrder(orderId) {
  return axios.delete(`${env.ordersServiceUrl}/orders/${orderId}`);
}

module.exports = {
  listOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
};
