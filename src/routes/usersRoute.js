const express = require("express");
const routes = express.Router();

const UserController = require("../controllers/UserController");

routes.post("/", UserController.saveUser);
routes.get("/", UserController.getAllUsers);
routes.get("/:user_id", UserController.getAUser);

module.exports = routes;