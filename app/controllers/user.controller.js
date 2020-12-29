const db = require("../models");
const User = db.user;
const Cultivar = db.cultivar;
const Offer = db.offer;
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
        const offer = { [cultivar.id]: cultivar.users_offer_scions.offer };
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
    await Offer.upsert(item);
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
        const want = { [cultivar.id]: cultivar.users_offer_scions.want };
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
    await Offer.upsert(item);
  }

  res.status(200).send("success");
};
