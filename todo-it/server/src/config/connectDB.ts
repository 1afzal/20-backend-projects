import mongoose from "mongoose";

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI || "");
        console.log("MongoDB connected")
    }
    catch(err){
        if(err instanceof Error){
        console.log((err as Error).message)
        }
    }
}
export { connectDB };
