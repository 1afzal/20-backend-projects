import mongoose, { Document } from "mongoose";
export type ExpenseCategory = "Groceries" | "Leisure" | "Electronics" | "Utilities" | "Clothing" | "Health" | "Others";
export interface IExpense extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    amount: number;
    category: ExpenseCategory;
    description?: string;
    date: Date;
}
declare const expenseModel: mongoose.Model<IExpense, {}, {}, {}, mongoose.Document<unknown, {}, IExpense, {}, mongoose.DefaultSchemaOptions> & IExpense & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IExpense>;
export { expenseModel };
//# sourceMappingURL=expenseModel.d.ts.map