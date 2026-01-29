import mongoose from "mongoose";

const connectDB = async (url:string): Promise<void> => {
  try {
    await mongoose.connect(url as string);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export { connectDB };
