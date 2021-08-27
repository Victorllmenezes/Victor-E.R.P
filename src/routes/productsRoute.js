const express = require("express");
const router = express.Router();
const productWorker = require("../classes/workers/productWorker");
const responses = require("../response/response");
const product = require("../classes/product");

// Returns all products
router.get("/", async (req, res, next) => {
  try {
    const response = await productWorker.loadProducts();
    responses.sendOk(res, response);
  } catch (error) {
    responses.sendInternalServerError(res);
  }
});

// Returns 1 product
router.get("/:ProductId", async (req, res, next) => {
  const id = parseInt(req.params.ProductId);
  const isIdValid = !isNaN(parseInt(id));
  if (!isIdValid) responses.sendBadRequest(res);
  try {
    const response = await productWorker.loadProduct(id);
    response === undefined
      ? responses.sendErrorNotFound(res)
      : responses.sendOk(res, response);
  } catch (error) {
    responses.sendInternalServerError(res);
  }
});

// Saves 1 product
router.post("/", async (req, res, next) => {
  const requestObject = new product(
    req.body.id,
    req.body.description,
    req.body.purchasePrice,
    req.body.standardProfitMargin
  );
  try {
    await productWorker.saveProduct(requestObject);
    responses.sendOk(res, requestObject);
  } catch (error) {
    //responses.sendInternalServerError(res);
    res.status(error.status || 500).send({
      error: error.status || 500,
      message: error.message,
    });
  }
});

module.exports = router;
