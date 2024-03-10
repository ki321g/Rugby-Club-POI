import * as dotenv from "dotenv";
import Mongoose from "mongoose";
import * as mongooseSeeder from "mais-mongoose-seeder";
import { seedData } from "./seed-data.js";

const seedLib = mongooseSeeder.default;

async function seed() {
  const seeder = seedLib(Mongoose);
  const dbData = await seeder.seed(seedData, { dropDatabase: false, dropCollections: true });
  console.log(dbData);
}

export function connectMongo() {
  dotenv.config();

  Mongoose.set("strictQuery", true);
  Mongoose.connect(process.env.DB);
  const db = Mongoose.connection;

  db.on("error", (err) => {
    console.log(`database connection error: ${err}`);
  });

  db.on("disconnected", () => {
    console.log("database disconnected");
  });

  db.once("open", async function () {
    if (this.readyState === 1) {
      console.log(`database connected to ${this.name} on ${this.host}`);
      const countUsers = await Mongoose.model("User").countDocuments();
      const countClubs = await Mongoose.model("Club").countDocuments();
      const countGames = await Mongoose.model("Game").countDocuments();
      console.log("countUsers", countUsers);
      console.log("countClubs", countClubs);
      console.log("countGames", countGames);
      if (countUsers === 0 && countClubs === 0 && countGames === 0) {        
        console.log("Database not seeded");
        await seed();  
      } else {
        console.log("Database already seeded"); 
      }
      
    }
  });
}
