const {Pool} = require('pg')

const pool = new Pool({
  user: process.env.DB_USER || "shantanu",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "energy_trading",
  password: process.env.DB_PASSWORD || "shantanu@2004",
  port: process.env.DB_PORT || 5432,
});

module.exports = pool;