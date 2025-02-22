const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get("/transactions", async (req, res)=> {
    try {
        const response = await axios.get(`https://api-sepolia.etherscan.io/api`, {
            params: {
                module: "account",
                action: "txlist",
                address: process.env.CONTRACT_ADDRESS,
                startblock: 0,
                endblock: 99999999,
                sort: "desc",
                apikey: process.env.ETHERSCAN_API_KEY
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error("Failed. The error is: ", error);
        res.status(500).json({error: "Failed to fetch transactions"});
    }
});

module.exports = router;