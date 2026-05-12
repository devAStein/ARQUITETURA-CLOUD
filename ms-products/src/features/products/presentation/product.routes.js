const { Router } = require("express");
const productController = require("./product.controller");

const productsRoutes = Router();

productsRoutes.get("/products", productController.list);
productsRoutes.get("/products/:id", productController.getById);
productsRoutes.post("/products", productController.create);
productsRoutes.put("/products/:id", productController.update);
productsRoutes.delete("/products/:id", productController.remove);

module.exports = { productsRoutes };
