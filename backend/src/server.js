require("dotenv").config();
const express = require("express");
const cors = require("cors");
const energyRoutes = require("./routes/energyRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/energy", energyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
