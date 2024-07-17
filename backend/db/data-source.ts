import * as dotenv from "dotenv";

dotenv.config();

const dbURI = process.env.DATABASE_URI;
const components = dbURI.split("://")[1].split(":");
const host = components[0];
const port = components[1];
const username = encodeURIComponent(process.env.DATABASE_USERNAME ?? "");
const password = encodeURIComponent(process.env.DATABASE_PASSWORD ?? "");
const dbName = process.env.DATABASE_NAME;

const uri = `mongodb://${username}:${password}@${host}:${port}`;

export const dataSourceOptions = {
  uri,
  dbName,
};
