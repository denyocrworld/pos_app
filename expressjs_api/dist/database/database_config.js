"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// sequelize.ts
const sequelize_typescript_1 = require("sequelize-typescript");
const DB = new sequelize_typescript_1.Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite", // Nama file SQLite
});
exports.default = DB;
