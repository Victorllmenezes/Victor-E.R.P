async function connectToDatabase() {
  if (global.connection && global.connection.state !== "disconnect")
    return global.connection;

  const database = require("mysql2/promise");
  const connection = await database.createConnection("");
  global.connection = connection;

  return connection;
}

module.exports = { connectToDatabase };
