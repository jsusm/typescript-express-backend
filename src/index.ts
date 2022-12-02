import { AppDataSource } from "./data-source.js";

AppDataSource.initialize().then(async () => {
  console.log("typeorm initialized")
})
