const { Router } = require("express");
const {
  listOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
} = require("./admin-orders.controller");

const adminOrdersRoutes = Router();

adminOrdersRoutes.get("/admin/orders", listOrders);
adminOrdersRoutes.get("/admin/orders/:id", getOrderById);
adminOrdersRoutes.post("/admin/orders", createOrder);
adminOrdersRoutes.put("/admin/orders/:id", updateOrder);
adminOrdersRoutes.delete("/admin/orders/:id", deleteOrder);

module.exports = { adminOrdersRoutes };
