const mergeWith = require("lodash/mergeWith");
const isArray = require("lodash/isArray");
const { Op } = require("sequelize");
const db = require("../models");
const User = db.user;
const Cultivar = db.cultivar;
const Category = db.category;
const UserCultivar = db.user_cultivar;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.getProfile = (req, res) => {
  User.findOne({
    where: {
      id: req.userId
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      let authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          contactInfo: user.contactInfo
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateProfile = async (req, res) => {
  User.update(req.body, {
    where: { id: req.userId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Profile was updated successfully"
        });
      } else {
        res.send({
          message: `Cannot update profile with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating profile with id=" + id
      });
    });
};

exports.getOffers = async (req, res) => {
  User.findOne({
    where: {
      id: req.userId
    },
    include: Cultivar
  })
    .then(data => {
      const offers = data.cultivars.reduce((offers, cultivar) => {
        const offer = {
          [cultivar.id]: {
            offer: cultivar.users_cultivars.offer,
            offerDescription: cultivar.users_cultivars.offerDescription
          }
        };
        return { ...offers, ...offer };
      }, []);
      res.send(offers);
    })
    .catch(err => {
      //res.status(500).send({
      //  message: err.message || "Some error occurred while retrieving cultivars."
      //});
    });
};

exports.updateOffers = async (req, res) => {
  let offers = [];

  for (const [cultivarId, data] of Object.entries(req.body)) {
    offers.push({
      userId: req.userId,
      cultivarId: +cultivarId,
      offer: data.offer,
      offerDescription: data.offerDescription
    });
  }

  for (item of offers) {
    await UserCultivar.upsert(item);
  }

  res.status(200).send("success");
};

exports.getWants = async (req, res) => {
  User.findOne({
    where: {
      id: req.userId
    },
    include: Cultivar
  })
    .then(data => {
      const wants = data.cultivars.reduce((wants, cultivar) => {
        const want = { [cultivar.id]: cultivar.users_cultivars.want };
        return { ...wants, ...want };
      }, []);
      res.send(wants);
    })
    .catch(err => {
      //res.status(500).send({
      //  message: err.message || "Some error occurred while retrieving cultivars."
      //});
    });
};

exports.updateWants = async (req, res) => {
  let wants = [];

  for (const [cultivarId, chosen] of Object.entries(req.body)) {
    wants.push({
      userId: req.userId,
      cultivarId: +cultivarId,
      want: chosen
    });
  }

  for (item of wants) {
    await UserCultivar.upsert(item);
  }

  res.status(200).send("success");
};
exports.getTradeWants = async (req, res) => {
  UserCultivar.findAll({
    where: {
      userId: req.userId,
      want: true
    },
    attributes: ["userId"],
    include: [
      {
        model: Cultivar,
        include: [
          {
            model: User,
            attributes: ["username", "email"],
            through: {
              where: {
                offer: true
              }
            },
            where: {
              id: {
                [Op.ne]: req.userId
              }
            }
          },
          {
            model: Category
          }
        ]
      }
    ]
  })
    .then(data => {
      const tradeOffers = data.reduce((offers, { cultivar }) => {
        let tradeOffer = {
          name: cultivar.name,
          category: cultivar.category.name
        };
        const usersInfo = cultivar.users.reduce((infos, user) => {
          return [
            ...infos,
            {
              username: user.username,
              email: user.email,
              contactInfo: user.contactInfo,
              offer: user.users_cultivars.offer
            }
          ];
        }, []);
        tradeOffer = { ...tradeOffer, offers: usersInfo };
        return [...offers, tradeOffer];
      }, []);
      res.send(tradeOffers);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving trades."
      });
    });
};
// what user offer that others want
exports.getTradeOffers = async (req, res) => {
  UserCultivar.findAll({
    where: {
      userId: req.userId,
      offer: true
    },
    attributes: ["userId"],
    include: [
      {
        model: Cultivar,
        include: [
          {
            model: User,
            attributes: ["username", "email"],
            through: {
              where: {
                want: true
              }
            },
            where: {
              id: {
                [Op.ne]: req.userId
              }
            }
          },
          {
            model: Category
          }
        ]
      }
    ]
  })
    .then(data => {
      const tradeWants = data.reduce((wants, { cultivar }) => {
        let tradeWant = {
          name: cultivar.name,
          category: cultivar.category.name
        };
        const usersInfo = cultivar.users.reduce((infos, user) => {
          return [
            ...infos,
            {
              username: user.username,
              email: user.email,
              contactInfo: user.contactInfo,
              want: user.users_cultivars.want
            }
          ];
        }, []);
        tradeWant = { ...tradeWant, wants: usersInfo };
        return [...wants, tradeWant];
      }, []);
      res.send(tradeWants);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving trades."
      });
    });
};
const customizer = (objValue, srcValue) => {
  if (isArray(objValue)) {
    return objValue.concat(srcValue);
  }
};

const mergeByProperty = (target, source, prop) => {
  source.forEach(sourceElement => {
    let targetElement = target.find(targetElement => {
      return sourceElement[prop] === targetElement[prop];
    });
    targetElement
      ? //_.merge(targetElement, sourceElement)
        mergeWith(targetElement, sourceElement, customizer)
      : target.push(sourceElement);
  });
};

exports.getTrade = async (req, res) => {
  const Model = require("sequelize/lib/model");

  const queryOptionsOffers = {
    where: {
      userId: req.userId,
      offer: true
    },
    attributes: ["userId"],
    include: [
      {
        model: Cultivar,
        include: [
          {
            model: User,
            attributes: ["username", "email"],
            through: {
              where: {
                want: true
              }
            },
            where: {
              id: {
                [Op.ne]: req.userId
              }
            }
          },
          {
            model: Category
          }
        ]
      }
    ]
  };

  const queryOptionsWants = {
    where: {
      userId: req.userId,
      want: true
    },
    attributes: ["userId"],
    include: [
      {
        model: Cultivar,
        include: [
          {
            model: User,
            attributes: ["username", "email"],
            through: {
              where: {
                offer: true
              }
            },
            where: {
              id: {
                [Op.ne]: req.userId
              }
            }
          },
          {
            model: Category
          }
        ]
      }
    ]
  };

  Model._validateIncludedElements.bind(UserCultivar)(queryOptionsOffers);
  Model._validateIncludedElements.bind(UserCultivar)(queryOptionsWants);

  var findOffers = db.sequelize.dialect.queryGenerator
    .selectQuery("users_cultivars", queryOptionsOffers, UserCultivar)
    .slice(0, -1);
  var findWants = db.sequelize.dialect.queryGenerator
    .selectQuery("users_cultivars", queryOptionsWants, UserCultivar)
    .slice(0, -1);

  db.sequelize
    .query(`${findOffers} UNION ${findWants}`, {
      nest: true,
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(data => {
      const trades = data.reduce((trades, { cultivar }) => {
        let trade = {
          id: cultivar.id,
          name: cultivar.name,
          category: cultivar.category.name,
          users: [
            {
              username: cultivar.users.username,
              email: cultivar.users.email,
              //contactInfo: cultivar.users.contactInfo,
              offer: cultivar.users.users_cultivars.offer,
              want: cultivar.users.users_cultivars.want
            }
          ]
        };
        mergeByProperty(trades, [trade], "id");
        return trades;
      }, []);
      res.send(trades);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving trades."
      });
    });
};
