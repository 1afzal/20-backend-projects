import { Router } from "express";
const expenseRoute = Router();
import authMiddleware from "../middleware/auth.js";
import { getExpenses, addExpense, deleteExpense, updateExpense } from "../controllers/expenseController.js";
expenseRoute.use(authMiddleware);
expenseRoute.post('/add', addExpense);
expenseRoute.get('/', getExpenses);
expenseRoute.put('/:id', updateExpense);
expenseRoute.delete('/:id', deleteExpense);
export { expenseRoute };
//# sourceMappingURL=expenseRoute.js.map