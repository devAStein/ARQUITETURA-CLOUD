require("dotenv").config();

const env = {
  port: process.env.PORT || 4000,
  productsServiceUrl: process.env.PRODUCTS_SERVICE_URL,
  ordersServiceUrl: process.env.ORDERS_SERVICE_URL,
  azureFunctionUrl: process.env.AZURE_FUNCTION_URL,
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || "",
  osrmBaseUrl: process.env.OSRM_BASE_URL || "https://router.project-osrm.org"
};

module.exports = { env };
