"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const database_config_1 = __importDefault(require("../database/database_config"));
const fs = require("fs");
class ModelInitiator {
    init(modelDirectory) {
        console.log(modelDirectory);
        fs.readdir(modelDirectory, (err, files) => {
            if (err) {
                console.error("Error reading router directory:", err);
                return;
            }
            const tsFiles = files.filter((file) => file.endsWith(".ts"));
            let models = [];
            tsFiles.forEach((file) => {
                const routerPath = path_1.default.join(modelDirectory, file);
                const model = require(routerPath);
                const filename = path_1.default.basename(file, ".ts");
            });
            database_config_1.default.addModels(models);
        });
        database_config_1.default.sync({ force: true }).then(() => {
            console.log("Database dan tabel telah dibuat!");
        });
    }
}
exports.default = ModelInitiator;
