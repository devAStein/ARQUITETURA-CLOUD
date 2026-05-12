async function aggregateDeliveryData({ origin, destination, productsClient, ordersClient, routeEstimatorClient }) {
  const [products, orders, route] = await Promise.all([
    productsClient.fetchProducts(),
    ordersClient.fetchOrders(),
    routeEstimatorClient.estimateRoute({ origin, destination })
  ]);

  return {
    generatedAt: new Date().toISOString(),
    source: "bff-aggregated",
    products: products.data,
    orders: orders.data,
    route: route.data
  };
}

module.exports = { aggregateDeliveryData };
