import mongoose from "mongoose";

mongoose.pluralize(null); // prevent mongoose from pluraziling and converting collection names to lowercase

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("Already connected to MongoDB");
    return;
  }
  try {
    const MONGO_URI = process.env.DB_URI as string;
    await mongoose.connect(MONGO_URI, {
      dbName: "Finimize",
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectDB;
