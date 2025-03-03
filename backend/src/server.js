require("dotenv").config();
const express = require("express");
const cors = require("cors");
const energyRoutes = require("./routes/energyRoutes");
const authRoutes = require('./routes/authRoutes')
const analyticsRoutes = require('./routes/analyticsRoutes.js')

const app = express();
app.use(cors({
  origin: "https://energy-trader.netlify.app", // Replace with your frontend URL
  methods: "GET,POST,PUT,DELETE",
  credentials: true, // If you're using cookies or sessions
}));
app.use(express.json());

app.use("/api/energy", energyRoutes);
app.use("/api/auth", authRoutes);
app.use("/analytics", analyticsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
