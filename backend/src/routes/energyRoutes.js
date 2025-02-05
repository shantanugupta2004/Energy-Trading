const express = require("express");
const { getMarketListings, listEnergy, buyEnergy } = require("../controllers/energyController");
const router = express.Router();

router.post("/list", listEnergy);
router.get("/listings", getMarketListings);
router.post("/buy", buyEnergy);

module.exports = router;
