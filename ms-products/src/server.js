const { app } = require("./app");
const { connectMongo } = require("./config/database");
const { env } = require("./config/env");
const { setProductsRepository } = require("./features/products/infrastructure/product-repository-provider");
const { mongoProductRepository } = require("./features/products/infrastructure/product.mongo-repository");
const { memoryProductRepository } = require("./features/products/infrastructure/product.memory-repository");

function startServer(mode) {
  app.listen(env.port, () => {
    console.log(`Products service running on port ${env.port} (${mode})`);
  });
}

connectMongo()
  .then(() => {
    setProductsRepository(mongoProductRepository);
    startServer("mongodb");
  })
  .catch((err) => {
    setProductsRepository(memoryProductRepository);
    console.warn("Mongo connection error:", err.message);
    console.warn("Products service using in-memory fallback data.");
    startServer("memory");
  });
