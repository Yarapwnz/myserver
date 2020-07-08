const db = require("../models");
const Cafedra = db.cafedras;
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

  const cafedra = {
    nazva: req.body.nazva,
    zav_caf: req.body.zav_caf,
    fakultet: req.body.fakultet
  };

  // Save students in the database
  Cafedra.create(cafedra)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the cafedras."
      });
    });
};

// Retrieve all studentss from the database.
exports.findAll = (req, res) => {
  const searchWord = req.query.searchWord;
  var condition = searchWord ? { 
    [Op.or]: [
    {nazva: { [Op.like]: '%' + searchWord + '%' } },
    {zav_caf: { [Op.like]: '%' + searchWord + '%'} },
    {fakultet: { [Op.like]: '%' + searchWord + '%'} }
    ]
  } : null;


  Cafedra.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cafedras."
      });
    });
};

// Find a single students with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Cafedra.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving cafedras with id=" + id
      });
    });
};

// Update a students by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Cafedra.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cafedra was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Cafedra with id=${id}. Maybe cafedras was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating students with id=" + id
      });
    });
};

// Delete a students with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Cafedra.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cafedra was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Cafedra with id=${id}. Maybe Cafedra was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Cafedra with id=" + id
      });
    });
};

// Delete all studentss from the database.
exports.deleteAll = (req, res) => {
  Cafedra.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Cafedras were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Cafedras"
      });
    });
};

// find all published students
exports.findAllPublished = (req, res) => {
  Cafedra.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving students."
      });
    });
};
