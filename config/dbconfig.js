require("dotenv").config();
const { Pool } = require("pg");


const isProduction = process.env.NODE_ENV === "production";
const database = process.env.NODE_ENV === "dev" ? process.env.PGDATABASE_TEST : process.env.PGDATABASE;

const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${database}`;
//const connectionString = `postgresql://root:12345@localhost:5432/esign`;

const pool = new Pool({
  connectionString: isProduction? process.env.DATABASE_URL : connectionString,
  ssl: isProduction ? { rejectUnauthorized: false }: false,
});

module.exports = {
  pool
};
