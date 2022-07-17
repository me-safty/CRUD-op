import dotenv from "dotenv";

dotenv.config();

const { PORT, PG_HOST, PG_DB, PG_USER, PG_PASS, ENV, PG_DB_TEST } = process.env;

export default {
  PORT: PORT,
  PG_HOST: PG_HOST,
  PG_DB: ENV === "dev" ? PG_DB : PG_DB_TEST,
  PG_USER: PG_USER,
  PG_PASS: PG_PASS,
  ENV: ENV,
};
