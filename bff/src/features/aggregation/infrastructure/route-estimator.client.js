const axios = require("axios");
const { env } = require("../../../config/env");

function estimateRoute({ origin, destination }) {
  return axios.get(env.azureFunctionUrl, {
    params: {
      origin,
      destination,
      googleMapsApiKey: env.googleMapsApiKey,
      osrmBaseUrl: env.osrmBaseUrl
    },
    timeout: 8000
  });
}

module.exports = { estimateRoute };
