// Backend: models/expenseModel.ts
import mongoose, { Document } from "mongoose";
import { Schema } from "mongoose"; 

export type ExpenseCategory = "Groceries" | "Leisure" | "Electronics" | "Utilities" | "Clothing" | "Health" | "Others"

export interface IExpense extends Document {
    userId: mongoose.Schema.Types.ObjectId,
    amount: number,
    category: ExpenseCategory,
    description?: string,
    date: Date
}

const expenseSchema = new Schema<IExpense>({
    userId: {type: mongoose.Types.ObjectId, ref: "User", required: true },
    amount: {type: Number, required: true},
    category: {type: String, enum: ["Groceries", "Leisure", "Electronics", "Utilities", "Clothing", "Health", "Others"], required: true},
    description: {type: String, required: false},
    date: { type: Date, required: true}
}, {timestamps: true})

const expenseModel = mongoose.model<IExpense>("Expense", expenseSchema);

export { expenseModel };