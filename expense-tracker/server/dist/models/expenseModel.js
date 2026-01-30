// Backend: models/expenseModel.ts
import mongoose, { Document } from "mongoose";
import { Schema } from "mongoose";
const expenseSchema = new Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    category: { type: String, enum: ["Groceries", "Leisure", "Electronics", "Utilities", "Clothing", "Health", "Others"], required: true },
    description: { type: String, required: false },
    date: { type: Date, required: true }
}, { timestamps: true });
const expenseModel = mongoose.model("Expense", expenseSchema);
export { expenseModel };
//# sourceMappingURL=expenseModel.js.map