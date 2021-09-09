const Entity = require("../models/Entity");
const {
  sendErrorNotFound,
  sendOk,
  sendInternalServerError,
  sendCreated,
} = require("../response/response");
require("../response/response");

module.exports = {
  async saveEntity(req, res) {
    const { id, name, addresses } = req.body;
    let entity;
    if (id === 0) {
      try {
        entity = await Entity.create(
          { name, addresses },
          { include: { association: "addresses" } }
        );
      } catch (error) {
        sendInternalServerError(res);
      }
      sendCreated(res.json(entity));
    } else {
      entity = await Entity.findByPk(id, {
        include: { association: "addresses" },
      });
      if (entity) {
        await Entity.update(
          { name, addresses },
          { include: { association: "addresses" }, where: { id } }
        );
        await entity.addresses.forEach((address) => address.destroy());
        await addresses.map(
          async (address) =>
            await entity.createAddress({ ...address, entity_id: id })
        );
        sendCreated(res, { status: 201, message: "Sucessfully updated!" });
      } else {
        sendErrorNotFound(res);
      }
    }
  },

  async getAEntity(req, res) {
    const { entity_id } = req.params;
    let entity;
    try {
      entity = await Entity.findByPk(entity_id, {
        include: { association: "addresses" },
      });
      !entity ? sendErrorNotFound(res) : sendOk(res, entity);
    } catch (error) {
      sendInternalServerError(res);
    }
  },

  async getAllEntities(req, res) {
    let entities;
    try {
      entities = await Entity.findAll({
        include: { association: "addresses" },
      });
      !entities ? sendErrorNotFound(res) : sendOk(res, entities);
    } catch (error) {
      sendInternalServerError(res);
    }
  },
};
