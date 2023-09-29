// sequelize.ts
import { Sequelize } from "sequelize-typescript";

const DB = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite", // Nama file SQLite
});

export default DB;
