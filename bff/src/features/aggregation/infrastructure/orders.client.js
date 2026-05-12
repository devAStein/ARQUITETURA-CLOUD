const axios = require("axios");
const { env } = require("../../../config/env");

function fetchOrders() {
  return axios.get(`${env.ordersServiceUrl}/orders`, {
    timeout: 6000
  });
}

module.exports = { fetchOrders };
