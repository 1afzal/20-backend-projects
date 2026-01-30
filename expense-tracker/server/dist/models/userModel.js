import mongoose, { Document } from "mongoose";
import { Schema } from "mongoose";
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });
const userModel = mongoose.model("User", userSchema);
export { userModel };
//# sourceMappingURL=userModel.js.map