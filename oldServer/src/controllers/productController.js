const productWorker = require("../classes/workers/productWorker");
const responses = require("../response/response");
const product = require("../classes/product");

async function getProducts(req, res, next) {
  try {
    const response = await productWorker.loadProducts();
    responses.sendOk(res, response);
  } catch (error) {
    responses.sendInternalServerError(res);
  }
}

async function getProduct(req, res, next) {
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
}

async function saveNewProduct(req, res, next) {
  const requestObject = new product(
    req.body.id,
    req.body.description,
    req.body.purchasePrice,
    req.body.standardProfitMargin
  );
  try {
    await productWorker.saveNewProduct(requestObject);
    responses.sendCreated(res, requestObject);
  } catch (error) {
    responses.sendInternalServerError(res);
  }
}

async function saveExistingProduct(req, res, next) {
  const requestObject = new product(
    req.body.id,
    req.body.description,
    req.body.purchasePrice,
    req.body.standardProfitMargin
  );
  try {
    await productWorker.saveProduct(requestObject);
    responses.sendCreated(res, requestObject);
  } catch (error) {
    responses.sendInternalServerError(res);
  }
}

module.exports = {
  getProduct,
  getProducts,
  saveNewProduct,
  saveExistingProduct,
};
