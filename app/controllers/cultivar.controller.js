const db = require("../models");
const Cultivar = db.cultivar;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
    return;
  }

  const cultivar = {
    name: req.body.name,
    species: req.body.species
  };

  Cultivar.create(cultivar)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the cultivar."
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}` } } : null;

  Cultivar.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cultivars."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Cultivar.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving cultivar with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Cultivar.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cultivar was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update cultivar with id=${id}. Maybe cultivar was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating cultivar with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Cultivar.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cultivar was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete cultivar with id=${id}. Maybe cultivar was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete cultivar with id=" + id
      });
    });
};
