const express = require("express");
const { createOffer, getOffers, buyOffer } = require("../controllers/energyController");
const router = express.Router();

router.post("/sell", createOffer);
router.get("/market", getOffers);
router.post("/buy/:id", buyOffer);

module.exports = router;
