const { estimateRoute } = require("../application/estimate-route.usecase");
const osrmClient = require("../infrastructure/osrm.client");

async function handleRouteEstimator(context, req) {
  const origin = req.query.origin || "-25.4294,-49.2719";
  const destination = req.query.destination || "-25.4384,-49.2733";
  const osrmBaseUrl = req.query.osrmBaseUrl || "https://router.project-osrm.org";

  try {
    context.res = {
      status: 200,
      body: await estimateRoute({
        origin,
        destination,
        osrmBaseUrl,
        osrmClient
      })
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: {
        error: "Route estimation failed",
        reason: error.response?.data || error.message
      }
    };
  }
}

module.exports = { handleRouteEstimator };
