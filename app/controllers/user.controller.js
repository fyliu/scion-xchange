const { offer } = require("../models");
const db = require("../models");
const User = db.user;
const Plant = db.plant;

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
    include: Plant
  })
    .then(data => {
      const offered = data.plants.reduce((offers, plant) => {
        const offer = { [plant.id]: plant.users_offer_scion.offered };
        return { ...offers, ...offer };
      }, []);
      res.send(offered);
    })
    .catch(err => {
    });
exports.updateOffers = async (req, res) => {
  //console.log(req.body, req.userId, req.route);
  let offers = [];

  for (const [plantId, offered] of Object.entries(req.body)) {
    offers.push({
      userId: req.userId,
      plantId: +plantId,
      offered: offered
    });
  }
  console.log(offers);

  for (item of offers) {
    await offer.upsert(item);
  }

  res.status(200).send("success");
};
