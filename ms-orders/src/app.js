const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const { swaggerSpec } = require("./shared/docs/swagger");
const { ordersRoutes } = require("./features/orders/presentation/order.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/health", (_req, res) => res.json({ service: "orders", status: "ok" }));
app.use(ordersRoutes);

module.exports = { app };
