import mongoose from "mongoose";


const connectDB = async(url:string)=> {
    try{
        await mongoose.connect(url)
    }
    catch(err){
        console.log("Mongo connection error")
    }
}
export { connectDB }; 
