const db = require("../models");
const Exam = db.exams;
const Op = db.Sequelize.Op;

// Create and Save a new students
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nazva) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const exam = {
    nazva: req.body.nazva,
    pib_v: req.body.pib_v,
    pib_s: req.body.pib_s,
    assessment: req.body.assessment,
    sec_assessment: req.body.sec_assessment,
    date_ex: req.body.date_ex,
    groupa: req.body.groupa,
    cours: req.body.cours
  };

  // Save students in the database
  Exam.create(exam)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the exams."
      });
    });
};

// Retrieve all studentss from the database.
exports.findAll = (req, res) => {
  const searchWord = req.query.searchWord;
  var condition = searchWord ? { 
    [Op.or]: [
    {nazva: { [Op.like]: '%' + searchWord + '%'} },
    {pib_v: { [Op.like]: '%' + searchWord + '%' } },
    {pib_s: { [Op.like]: '%' + searchWord + '%'} },
    {assessment: { [Op.like]: '%' + searchWord + '%'} },
    {sec_assessment: { [Op.like]: '%' + searchWord + '%'} },
    {date_ex: { [Op.like]: '%' + searchWord + '%'} },
    {groupa: { [Op.like]: '%' + searchWord + '%'} },
    {cours: { [Op.like]: '%' + searchWord + '%'} }
    ]
  } : null;


  Exam.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving exams."
      });
    });
};

// Find a single students with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Exam.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Exam with id=" + id
      });
    });
};

// Update a students by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Exam.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Exam was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Exam with id=${id}. Maybe cafedras was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Exam with id=" + id
      });
    });
};

// Delete a students with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Exam.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Exam was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Exam with id=${id}. Maybe Exam was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Discipline with id=" + id
      });
    });
};

// Delete all studentss from the database.
exports.deleteAll = (req, res) => {
  Exam.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Exams were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Exams"
      });
    });
};

// find all published students
exports.findAllPublished = (req, res) => {
  Exam.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Disciplines."
      });
    });
};
