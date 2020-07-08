const db = require("../models");
const Teach = db.teachs;
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

  const teach = {
    pib: req.body.pib,
    data_nar: req.body.data_nar,
    adresa: req.body.adresa,
    ditu: req.body.ditu,
    zvannya: req.body.zvannya,
    tem_kand: req.body.tem_kand,
    tem_doc: req.body.tem_doc,
    payday: req.body.payday
  };

  // Save students in the database
  Teach.create(teach)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the teachs."
      });
    });
};

// Retrieve all studentss from the database.
exports.findAll = (req, res) => {
  const searchWord = req.query.searchWord;
  var condition = searchWord ? { 
    [Op.or]: [
    {pib: { [Op.like]: '%' + searchWord + '%'} },
    {data_nar: { [Op.like]: '%' + searchWord + '%' } },
    {adresa: { [Op.like]: '%' + searchWord + '%'} },
    {ditu: { [Op.like]: '%' + searchWord + '%'} },
    {tem_kand: { [Op.like]: '%' + searchWord + '%'} },
    {tem_doc: { [Op.like]: '%' + searchWord + '%'} },
    {zvannya: { [Op.like]: '%' + searchWord + '%'} },
    {payday: { [Op.like]: '%' + searchWord + '%'} }
    ]
  } : null;


  Teach.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving teachs."
      });
    });
};

// Find a single students with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Teach.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Teach with id=" + id
      });
    });
};

// Update a students by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Teach.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Teach was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Teach with id=${id}. Maybe cafedras was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Teach with id=" + id
      });
    });
};

// Delete a students with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Teach.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Teach was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Teach with id=${id}. Maybe Teach was not found!`
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
  Teach.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Teachs were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Teachs"
      });
    });
};

// find all published students
exports.findAllPublished = (req, res) => {
  Teach.findAll({ where: { published: true } })
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
