const { Router } = require("express");
const orderController = require("./order.controller");

const ordersRoutes = Router();

ordersRoutes.get("/orders", orderController.list);
ordersRoutes.get("/orders/:id", orderController.getById);
ordersRoutes.post("/orders", orderController.create);
ordersRoutes.put("/orders/:id", orderController.update);
ordersRoutes.delete("/orders/:id", orderController.remove);

module.exports = { ordersRoutes };
