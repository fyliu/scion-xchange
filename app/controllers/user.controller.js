const { offer } = require("../models");
const db = require("../models");
const User = db.user;
const Cultivar = db.cultivar;

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
        const offer = { [cultivar.id]: cultivar.users_offer_scions.chosen };
        return { ...offers, ...offer };
      }, []);
      res.send(offers);
    })
    .catch(err => {});
};

exports.updateOffers = async (req, res) => {
  console.log(req.body, req.userId, req.route);
  let offers = [];

  for (const [cultivarId, chosen] of Object.entries(req.body)) {
    offers.push({
      userId: req.userId,
      cultivarId: +cultivarId,
      chosen: chosen
    });
  }
  console.log(offers);

  for (item of offers) {
    await offer.upsert(item);
  }

  res.status(200).send("success");
};
