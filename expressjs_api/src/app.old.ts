// index.ts
import express from "express";
import sequelize from "./database/database_config";
import { Task } from "./model/task";
const fs = require("fs");
const path = require("path");
const taskRouter = require("./router/tasks");
const userRouter = require("./router/user_router");

// Inisialisasi aplikasi Express
const app = express();

// Sinkronisasi model dengan database SQLite

// Task.sync({force: true});

const modelDirectory = path.join(__dirname, "model");
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
    console.log(`Required ${file}`);
    console.log(`Required ${file}`);
    const filename = path.basename(file, ".ts");
    console.log(filename);
    console.log(model);
    // app.use(`/api/${filename}`, model);
    // models.push(model);
  });
  sequelize.addModels(models);
});

sequelize.sync({ force: true }).then(() => {
  console.log("Database dan tabel telah dibuat!");
});

// Middleware untuk mengizinkan parsing JSON
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello, TypeScript Express!");
});

app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);
// const routerDirectory = path.join(__dirname, "router");
// fs.readdir(routerDirectory, (err: any, files: any) => {
//   if (err) {
//     console.error("Error reading router directory:", err);
//     return;
//   }

//   const tsFiles = files.filter((file: any) => file.endsWith(".ts"));
//   tsFiles.forEach((file: any) => {
//     const routerPath = path.join(routerDirectory, file);
//     console.log(`Required ${file}`);
//     console.log(`Required ${file}`);
//     const filename = path.basename(file, ".ts");
//     console.log(filename);
//     console.log(`PATH: ${routerPath}`);
//     const router = require(routerPath);

//     // app.use(`/api/${filename}`, router);
//   });
// });

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
