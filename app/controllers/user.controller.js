const { offer } = require("../models");

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

exports.updateOffers = async (req, res) => {
  //console.log(req.body, req.userId, req.route);
  let offers = [];
  console.log(req.body);

  for (const [plantId, offered] of Object.entries(req.body)) {
    console.log("plantId = %s", +plantId);
    console.log("selected = %d", offered);
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
