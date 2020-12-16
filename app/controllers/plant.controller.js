const db = require("../models");
const Plant = db.plant;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
    return;
  }

  const plant = {
    name: req.body.name,
    species: req.body.species
  };

  Plant.create(plant)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Plant."
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}` } } : null;

  Plant.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving plants."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Plant.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Plant with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Plant.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Plant was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Plant with id=${id}. Maybe Plant was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Plant with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Plant.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Plant was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Plant with id=${id}. Maybe Plant was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Plant with id=" + id
      });
    });
};
