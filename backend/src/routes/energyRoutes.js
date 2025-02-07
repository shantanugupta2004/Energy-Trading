const express = require("express");
const { getMarketListings, listEnergy, buyEnergy } = require("../controllers/energyController");
const verifyToken = require('../middleware/authMiddleware')
const router = express.Router();

router.post("/list", verifyToken, listEnergy);
router.get("/listings", getMarketListings);
router.post("/buy", verifyToken, buyEnergy);

module.exports = router;
