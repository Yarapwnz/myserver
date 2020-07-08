module.exports = app => {
  const disciplines = require("../controllers/discipline.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", disciplines.create);

  // Retrieve all students
  router.get("/", disciplines.findAll);

  // Retrieve all published students
  router.get("/published", disciplines.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", disciplines.findOne);

  // Update a Tutorial with id
  router.put("/:id", disciplines.update);

  // Delete a Tutorial with id
  router.delete("/:id", disciplines.delete);

  // Create a new Tutorial
  router.delete("/", disciplines.deleteAll);

  app.use('/api/disciplines', router);
};
