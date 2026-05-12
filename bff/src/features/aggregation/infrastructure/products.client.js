const axios = require("axios");
const { env } = require("../../../config/env");

function fetchProducts() {
  return axios.get(`${env.productsServiceUrl}/products`, {
    timeout: 6000
  });
}

module.exports = { fetchProducts };
