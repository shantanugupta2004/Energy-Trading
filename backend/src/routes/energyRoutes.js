const express = require("express");
const { getMarketListings } = require("../controllers/energyController");
const verifyToken = require('../middleware/authMiddleware')
const router = express.Router();

router.get("/listings", getMarketListings);


module.exports = router;
