const { app } = require("./app");
const { env } = require("./config/env");
const { initializeSqlDatabase } = require("./config/database");
const { setOrdersRepository } = require("./features/orders/infrastructure/order-repository-provider");
const { sqlOrderRepository } = require("./features/orders/infrastructure/order.sql-repository");
const { memoryOrderRepository } = require("./features/orders/infrastructure/order.memory-repository");

function startServer(mode) {
  app.listen(env.port, () => console.log(`Orders service running on ${env.port} (${mode})`));
}

initializeSqlDatabase()
  .then(() => {
    setOrdersRepository(sqlOrderRepository);
    startServer("azure-sql");
  })
  .catch((err) => {
    setOrdersRepository(memoryOrderRepository);
    console.warn("SQL init error:", err.message);
    console.warn("Orders service using in-memory fallback data.");
    startServer("memory");
  });
