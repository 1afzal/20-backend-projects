import mongoose, { Schema } from "mongoose";
const todoSchema = new Schema({
    title: { type: String, required: true },
    isCompleted: { type: Boolean, required: true, default: false }
}, { timestamps: true });
const todoModel = mongoose.model("Todo ", todoSchema);
export { todoModel };
//# sourceMappingURL=todoModel.js.map