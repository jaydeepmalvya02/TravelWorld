import mongoose from "mongoose";
import dotenv from "dotenv";
import Tour from "../models/Tour.js";
import tours from "../data/tourData.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedTours = async () => {
  try {
    await Tour.deleteMany(); // Clear old data
    await Tour.insertMany(tours); // Insert new data
    console.log("✅ Tour data seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding tour data:", error);
    process.exit(1);
  }
};

seedTours();
