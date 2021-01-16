const { category } = require("../models");
const db = require("../models");
const Cultivar = db.cultivar;
const UserCultivar = db.user_cultivar;
const User = db.user;
const Category = db.category;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.name || !req.body.category) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
    return;
  }

  const cultivar = {
    name: req.body.name,
    categoryId: req.body.category
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

  Cultivar.findAll({
    order: [
      [
        {
          model: Category
        },
        "name"
      ],
      ["name"]
    ],
    where: condition,
    include: [{ model: Category }, { model: UserCultivar, include: User }]
  })
    .then(data => {
      const cultivars = data.reduce((cultivars, cultivar) => {
        return [
          ...cultivars,
          {
            id: cultivar.id,
            name: cultivar.name,
            category: cultivar.category.name,
            descriptions: cultivar.users_cultivars.reduce(
              (descriptions, association) => {
                return [
                  ...descriptions,
                  {
                    username: association.user.username,
                    description: association.offerDescription
                  }
                ];
              },
              []
            )
          }
        ];
      }, []);
      res.send(cultivars);
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

  Cultivar.findOne({
    where: {
      id: id
    },
    include: Category
  })
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
