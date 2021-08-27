const mysql = require("../../../mysql");
const product = require("../product");

async function loadProduct(productId) {
  const conn = await mysql.connectToDatabase();
  const sql = "SELECT * FROM PRODUTOS WHERE ID = ?";
  const values = [productId];
  const [response] = await conn.query(sql, values);

  let result;
  response.forEach((data) => {
    result = new product(
      data.ID,
      data.DESCRIPTION,
      data.PURCHASEPRICE,
      data.STANDARDPROFITMARGIN
    );
  });
  return result;
}

async function loadProducts() {
  const conn = await mysql.connectToDatabase();
  const sql = "SELECT * FROM PRODUTOS";
  const [response] = await conn.query(sql);

  let result = [];

  response.forEach((data) => {
    result.push(
      new product(
        data.ID,
        data.DESCRIPTION,
        data.PURCHASEPRICE,
        data.STANDARDPROFITMARGIN
      )
    );
  });
  return result;
}

async function saveProduct(product) {
  const conn = await mysql.connectToDatabase();
  const sql = "CALL SP_PRODUTOS(?,?,?,?,?)";
  const values = [
    1,
    product.ID,
    product.DESCRIPTION,
    product.PURCHASEPRICE,
    product.STANDARDPROFITMARGIN,
  ];
  const [response] = await conn.query(sql, values);

  if (product.ID == 0) product.ID = response.insertId;

  return product;
}

module.exports = { loadProduct, loadProducts, saveProduct };
