import mongoose from "mongoose";

mongoose.pluralize(null); // prevent mongoose from pluraziling and converting collection names to lowercase
const MONGO_URI = process.env.DB_URI as string;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {dbName: "Finimize"});
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

export default connectDB;