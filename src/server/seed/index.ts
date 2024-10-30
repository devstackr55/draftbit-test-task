import { factory } from "typeorm-seeding";

import CreateInitialData from "./MainSeeders";
import { AppDataSource } from "../data-source";

async function seedDatabase() {
  try {
    await AppDataSource.initialize();
    const seeder = new CreateInitialData();

    await seeder.run(factory, AppDataSource);

    await AppDataSource.destroy();

    console.log("Database seeding completed.");
  } catch (error) {
    console.error("Error during database seeding:", error);
  }
}

seedDatabase();
