import { factory } from "typeorm-seeding";
import CreateInitialData from "./MainSeeders";
import { DataSource } from "typeorm";
import { AppDataSource } from "../data-source";
async function seedDatabase() {
  try {
    // Initialize the data source
    await AppDataSource.initialize();

    // Initialize and run the seeder
    const seeder = new CreateInitialData();
    console.log("seeder", seeder);
    await seeder.run(factory, AppDataSource);

    // Close the data source connection
    await AppDataSource.destroy();

    console.log("Database seeding completed.");
  } catch (error) {
    console.error("Error during database seeding:", error);
  }
}

// Execute the seeder function
seedDatabase();
