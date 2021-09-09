const express = require("express");
const routes = express.Router();

const ProductsController = require("../controllers/ProductController");

routes.post("/", ProductsController.saveProduct);
routes.get("/", ProductsController.getAllProducts);
routes.get("/:product_id", ProductsController.getAProduct);

module.exports = routes;
