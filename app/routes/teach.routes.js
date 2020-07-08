module.exports = app => {
  const teachs = require("../controllers/teach.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", teachs.create);

  // Retrieve all students
  router.get("/", teachs.findAll);

  // Retrieve all published students
  router.get("/published", teachs.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", teachs.findOne);

  // Update a Tutorial with id
  router.put("/:id", teachs.update);

  // Delete a Tutorial with id
  router.delete("/:id", teachs.delete);

  // Create a new Tutorial
  router.delete("/", teachs.deleteAll);

  app.use('/api/teachs', router);
};
