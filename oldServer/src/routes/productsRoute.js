const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.getProducts);

router.get("/:ProductId", productController.getProduct);

router.post("/", productController.saveNewProduct);

router.patch("/", productController.saveExistingProduct);

module.exports = router;
