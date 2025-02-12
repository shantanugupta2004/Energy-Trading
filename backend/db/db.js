const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,       // Railway PostgreSQL user
  host: process.env.DB_HOST,       // Railway PostgreSQL host
  database: process.env.DB_NAME,   // Railway database name
  password: process.env.DB_PASSWORD, // Railway password
  port: process.env.DB_PORT,       // Railway PostgreSQL port
  ssl: {
    rejectUnauthorized: false, // Required for Railway SSL connection
  },
});

module.exports = pool;
