import express from "express";
const app = express();
import cors from "cors";
app.use(express.json());
app.use(cors());
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;
import { todoRoute } from "./routes/todoRoutes.js";
import mongoose from "mongoose";
import { connectDB } from "./config/connectDB.js";
connectDB();
app.use(`/todos`, todoRoute);
app.listen(PORT, () => {
    console.log(`Server is live at PORT ${PORT}`);
});
//# sourceMappingURL=index.js.map