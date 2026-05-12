const { aggregateDeliveryData } = require("../application/aggregate-delivery-data.usecase");
const productsClient = require("../infrastructure/products.client");
const ordersClient = require("../infrastructure/orders.client");
const routeEstimatorClient = require("../infrastructure/route-estimator.client");

async function getAggregatedData(req, res) {
  try {
    const origin = req.query.origin || "-25.4294,-49.2719";
    const destination = req.query.destination || "-25.4384,-49.2733";

    const data = await aggregateDeliveryData({
      origin,
      destination,
      productsClient,
      ordersClient,
      routeEstimatorClient
    });

    res.json(data);
  } catch (error) {
    const reason =
      error.response?.data ||
      error.message ||
      "Unknown error while aggregating data";
    res.status(502).json({
      error: "Failed to aggregate data",
      reason
    });
  }
}

module.exports = { getAggregatedData };
