import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config();

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    database: process.env.DB_DATABASE || "doks",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: false,
  },
});
