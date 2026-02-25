import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  ssl: false
});

export const db = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: (text: string, params?: any[]) => pool.query(text, params),
};