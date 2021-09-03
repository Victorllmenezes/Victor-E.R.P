const express = require("express");
const routes = express.Router();


const EntityController = require("../controllers/EntityController");

routes.post("/", EntityController.saveEntity);
routes.get("/", EntityController.getAllEntities);
routes.get("/:entity_id", EntityController.getAEntity);

module.exports = routes;