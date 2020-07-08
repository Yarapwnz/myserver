module.exports = app => {
  const cafedras = require("../controllers/cafedra.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", cafedras.create);

  // Retrieve all students
  router.get("/", cafedras.findAll);

  // Retrieve all published students
  router.get("/published", cafedras.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", cafedras.findOne);

  // Update a Tutorial with id
  router.put("/:id", cafedras.update);

  // Delete a Tutorial with id
  router.delete("/:id", cafedras.delete);

  // Create a new Tutorial
  router.delete("/", cafedras.deleteAll);

  app.use('/api/cafedras', router);
};
