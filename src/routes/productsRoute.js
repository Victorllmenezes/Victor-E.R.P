const express = require("express");
const router = express.Router();

// Returns all products
router.get("/", (req, res, next) => {
  try {
    const response = { mensagem: "Usando o get de Produtos" }; //GetAllProducts();
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

// Saves 1 product
router.post("/", (req, res, next) => {
  const productTeste = {
    id: req.body.id,
    descripiton: req.body.description,
    purchasePrice: req.body.purchasePrice,
    standardProfitMargin: req.body.standardProfitMargin,
  };

  try {
    const response = {
      status: 201,
      message: "Created",
      product: productTeste,
    }; //SaveProduct(product);
    res.status(201).send(response);
  } catch (error) {
    next(error);
  }
});

// Returns 1 product
router.get("/:ProductId", (req, res, next) => {
  const id = req.params.ProductId;
  try {
    const response = {
      mensagem: "Usando o get especifico de Produto",
      id: id,
    }; //GetProduct(id);
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
