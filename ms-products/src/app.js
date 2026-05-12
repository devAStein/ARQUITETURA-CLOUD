const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const { productsRoutes } = require("./features/products/presentation/product.routes");
const { swaggerSpec } = require("./features/products/presentation/product.swagger");
const { errorHandler } = require("./shared/errors/error-handler");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/health", (_req, res) => res.json({ service: "products", status: "ok" }));
app.use(productsRoutes);
app.use(errorHandler);

module.exports = { app };
