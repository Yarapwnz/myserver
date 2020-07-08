const db = require("../models");
const Student = db.students;
const Op = db.Sequelize.Op;

// Create and Save a new students
exports.create = (req, res) => {
  // Validate request
  if (!req.body.pib) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a students
  const student = {
    pib: req.body.pib,
    data_nar: req.body.data_nar,
    adresa: req.body.adresa,
    telephon: req.body.telephon,
    groupa: req.body.groupa,
    cours: req.body.cours
  };

  // Save students in the database
  Student.create(student)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the students."
      });
    });
};

// Retrieve all studentss from the database.
exports.findAll = (req, res) => {
  const searchWord = req.query.searchWord;
  var condition = searchWord ? { 
    [Op.or]: [
    {pib: { [Op.like]: '%' + searchWord + '%' } },
    {data_nar: { [Op.like]: '%' + searchWord + '%'} },
    {adresa: { [Op.like]: '%' + searchWord + '%'} },
    {telephon: { [Op.like]: '%' + searchWord + '%'} },
    {groupa: { [Op.like]: '%' + searchWord + '%'} },
    {cours: { [Op.like]: '%' + searchWord + '%'} }
    ]
  } : null;


  Student.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving studentss."
      });
    });
};

// Find a single students with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Student.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving students with id=" + id
      });
    });
};

// Update a students by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Student.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "students was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update students with id=${id}. Maybe students was not found or req.body is empty!`
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

  Student.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "students was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete students with id=${id}. Maybe students was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete students with id=" + id
      });
    });
};

// Delete all studentss from the database.
exports.deleteAll = (req, res) => {
  Student.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} studentss were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all students."
      });
    });
};

// find all published students
exports.findAllPublished = (req, res) => {
  Student.findAll({ where: { published: true } })
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
