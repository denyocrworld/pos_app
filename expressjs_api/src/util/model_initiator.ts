import path from "path";
import sequelize from "../database/database_config";
const fs = require("fs");

export default class ModelInitiator {
  init(modelDirectory: string) {
    console.log(modelDirectory);
    fs.readdir(modelDirectory, (err: any, files: any) => {
      if (err) {
        console.error("Error reading router directory:", err);
        return;
      }

      const tsFiles = files.filter((file: any) => file.endsWith(".ts"));
      let models: any = [];
      tsFiles.forEach((file: any) => {
        const routerPath = path.join(modelDirectory, file);
        const model = require(routerPath);
        const filename = path.basename(file, ".ts");
      });
      sequelize.addModels(models);
    });

    sequelize.sync({ force: true }).then(() => {
      console.log("Database dan tabel telah dibuat!");
    });
  }
}
