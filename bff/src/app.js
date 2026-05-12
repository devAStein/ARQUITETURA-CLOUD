const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { aggregationRoutes } = require("./features/aggregation/presentation/aggregation.routes");
const { adminOrdersRoutes } = require("./features/admin-orders/presentation/admin-orders.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  res.json({ service: "bff", status: "ok" });
});

app.use(aggregationRoutes);
app.use(adminOrdersRoutes);

module.exports = { app };
