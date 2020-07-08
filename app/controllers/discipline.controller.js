const db = require("../models");
const Discipline = db.disciplines;
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

  const discipline = {
    nazva: req.body.nazva,
    vikladach: req.body.vikladach,
    kilk_god: req.body.kilk_god,
    groupa: req.body.groupa,
    cours: req.body.cours
  };

  // Save students in the database
  Discipline.create(discipline)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the disciplines."
      });
    });
};

// Retrieve all studentss from the database.
exports.findAll = (req, res) => {
  const searchWord = req.query.searchWord;
  var condition = searchWord ? { 
    [Op.or]: [
    {nazva: { [Op.like]: '%' + searchWord + '%' } },
    {vikladach: { [Op.like]: '%' + searchWord + '%'} },
    {kilk_god: { [Op.like]: '%' + searchWord + '%'} },
    {groupa: { [Op.like]: '%' + searchWord + '%'} },
    {cours: { [Op.like]: '%' + searchWord + '%'} }
    ]
  } : null;


  Discipline.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving disciplines."
      });
    });
};

// Find a single students with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Discipline.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Discipline with id=" + id
      });
    });
};

// Update a students by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Discipline.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Discipline was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Discipline with id=${id}. Maybe cafedras was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Discipline with id=" + id
      });
    });
};

// Delete a students with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Discipline.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Discipline was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Discipline with id=${id}. Maybe Discipline was not found!`
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
  Discipline.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Disciplines were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Disciplines"
      });
    });
};

// find all published students
exports.findAllPublished = (req, res) => {
  Discipline.findAll({ where: { published: true } })
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
