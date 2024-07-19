import { postSeeder } from "./postSeeder.js";
import { userSeeder } from "./userSeeder.js";

(async () => {
  console.log("Starting seeders...");
  await userSeeder();
  await postSeeder();
})();
