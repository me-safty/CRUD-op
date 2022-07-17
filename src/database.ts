import { Pool } from "pg";
import config from "./config"

const database = new Pool({
  host: config.PG_HOST,
  user: config.PG_USER,
  password: config.PG_PASS,
  database: config.PG_DB,
})

export default database;
