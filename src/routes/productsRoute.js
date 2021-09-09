const express = require("express");
const routes = express.Router();

const ProductsController = require("../controllers/ProductController");

routes.post("/", ProductsController.saveProduct);
routes.get("/", ProductsController.getAllProducts);
routes.get("/:entity_id", ProductsController.getAProduct);

module.exports = routes;
