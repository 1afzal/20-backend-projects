import mongoose from "mongoose";
const connectDB = async (url) => {
    try {
        await mongoose.connect(url);
    }
    catch (err) {
        console.log("Mongo connection error");
    }
};
export { connectDB };
//# sourceMappingURL=connectDB.js.map