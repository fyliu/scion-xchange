const { Op } = require("sequelize");
const db = require("../models");
const User = db.user;
const Cultivar = db.cultivar;
const UserCultivar = db.user_cultivar;
const Want = db.want;

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

exports.getOffers = async (req, res) => {
  User.findOne({
    where: {
      id: req.userId
    },
    include: Cultivar
  })
    .then(data => {
      const offers = data.cultivars.reduce((offers, cultivar) => {
        const offer = { [cultivar.id]: cultivar.users_cultivars.offer };
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

  for (const [cultivarId, chosen] of Object.entries(req.body)) {
    offers.push({
      userId: req.userId,
      cultivarId: +cultivarId,
      offer: chosen
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
          }
        ]
      }
    ]
  })
    .then(data => {
      const tradeOffers = data.reduce((offers, { cultivar }) => {
        let tradeOffer = { name: cultivar.name };
        const usersInfo = cultivar.users.reduce((infos, user) => {
          return [...infos, { username: user.username, email: user.email }];
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
          }
        ]
      }
    ]
  })
    .then(data => {
      const tradeWants = data.reduce((wants, { cultivar }) => {
        let tradeWant = { name: cultivar.name };
        const usersInfo = cultivar.users.reduce((infos, user) => {
          return [...infos, { username: user.username, email: user.email }];
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
