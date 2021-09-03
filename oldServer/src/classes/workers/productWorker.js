const mysql = require("../../../mysql");
const product = require("../product");

async function loadProduct(productId) {
  const conn = await mysql.connectToDatabase();
  try {
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
  } finally {
    conn.release();
  }
}

async function loadProducts() {
  const conn = await mysql.connectToDatabase();
  const sql = "SELECT * FROM PRODUTOS";

  try {
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
  } finally {
    conn.release();
  }
}

async function saveNewProduct(product) {
  const conn = await mysql.connectToDatabase();
  try {
    const sql =
      "INSERT INTO PRODUTOS(DESCRIPTION, PURCHASEPRICE, STANDARDPROFITMARGIN)" +
      "VALUES(?, ?, ?);";
    const values = [
      product.description,
      product.purchasePrice,
      product.standardProfitMargin,
    ];
    const [response] = await conn.query(sql, values);

    if (product.id == 0) product.id = response.insertId;
    return product;
  } finally {
    conn.release();
  }
}

async function saveProduct(product) {
  const conn = await mysql.connectToDatabase();
  try {
    const sql =
      "UPDATE PRODUTOS SET DESCRIPTION = ?, PURCHASEPRICE = ?, STANDARDPROFITMARGIN = ? WHERE ID = ?;";
    const values = [
      product.description,
      product.purchasePrice,
      product.standardProfitMargin,
      product.id,
    ];
    await conn.query(sql, values);
    return product;
  } finally {
    conn.release();
  }
}

module.exports = { loadProduct, loadProducts, saveNewProduct, saveProduct };
