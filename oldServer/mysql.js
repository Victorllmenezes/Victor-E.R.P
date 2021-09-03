const mysql = require("mysql2/promise");

async function connectToDatabase() {
  if (global.connection && global.connection.state !== "disconnect")
    return global.connection;

  const pool = await mysql.createPool({
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
  });

  let connection;
  try {
    connection = await pool.getConnection();
  } catch (error) {
    throw Error("Unable to connect with database!");
  }
  global.connection = connection;

  return connection;
}

module.exports = { connectToDatabase };

//exports.pool = pool;

//mysql.createConnection("mysql://root@localhost:3306/BancoRCA");
