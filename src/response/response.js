function sendInternalServerError(res) {
  res.status(500).send({
    error: 500,
    message: "Internal Server Error",
  });
}

function sendErrorNotFound(res) {
  res.status(404).send({
    error: 404,
    message: "Error Not Found!",
  });
}

function sendBadRequest(res) {
  res.status(400).send({
    error: 400,
    message: "Bad Request!",
  });
}

function sendCreated(res, response) {
  res.status(201).send(response);
}

function sendOk(res, response) {
  res.status(200).send(response);
}

//if (result === undefined) throw { status: 404, message: "Error Not Found!" };
//res.status(200).send(response);
//res.status(error.status || 500).send({ error: error.status || 500, message: error.status ? error.message : "Internal Server Error",});
//throw { status: 400, message: "Bad Request!" };  ADICIONAR VERIFICAÇÃO DE BADREQUEST!

module.exports = {
  sendBadRequest,
  sendCreated,
  sendErrorNotFound,
  sendInternalServerError,
  sendOk,
};
