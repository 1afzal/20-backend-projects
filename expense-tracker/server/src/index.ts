import express from "express";
const app = express()
import { userModel } from "./models/userModel.js";
import { userRouter } from "./routes/userRoute.js";
import { connectDB } from "./utils/connectDB.js";
import cors from "cors";
import dotenv from "dotenv";
import { expenseRoute } from "./routes/expenseRoute.js";
dotenv.config()
app.use(express.json());
app.use(cors());


connectDB(process.env.MONGO_URI || "");

app.use('/user', userRouter);
app.use('/expense', expenseRoute)

app.listen(6969, ()=>{
    console.log(`server live at port ${process.env.PORT}`);
})