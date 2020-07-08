module.exports = app => {
  const exams = require("../controllers/exam.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", exams.create);

  // Retrieve all students
  router.get("/", exams.findAll);

  // Retrieve all published students
  router.get("/published", exams.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", exams.findOne);

  // Update a Tutorial with id
  router.put("/:id", exams.update);

  // Delete a Tutorial with id
  router.delete("/:id", exams.delete);

  // Create a new Tutorial
  router.delete("/", exams.deleteAll);

  app.use('/api/exams', router);
};
