import type { Request, Response } from "express";
import { expenseModel } from "../models/expenseModel.js";
import mongoose from "mongoose";


//getExpense takes filter (filtering dates by days or months)
//startdate, enddate and userId will in in params

export const getExpenses = async (req: Request, res: Response) => {
  const { filter, startDate, endDate } = req.query;
  const userId = new mongoose.Types.ObjectId(req.user!.userId);

  const query: any = { userId }; //query will be specific distinct userId
  const now = new Date();
  let start: Date | undefined //declare a start date


  if (filter === "week") {
    start = new Date();
    start.setDate(now.getDate() - 7);
  } else if (filter === "month") {
    start = new Date();
    start.setMonth(now.getMonth() - 1);
  } else if (filter === "3months") {
    start = new Date();
    start.setMonth(now.getMonth() - 3);
  } else if (startDate && endDate) {
    query.date = {
      $gte: new Date(startDate as string),
      $lte: new Date(endDate as string),
    };
  }

  if (start) {
    query.date = { $gte: start };
  }

  const expenses = await expenseModel.find(query).sort({ date: -1 });
  res.json(expenses);
};

export const addExpense = async (req: Request, res: Response) => {
  const expense = await expenseModel.create({
    ...req.body,
    userId: new mongoose.Types.ObjectId(req.user!.userId),
  });
  res.status(201).json(expense);
};

export const updateExpense = async (req: Request, res: Response) => {
  const id = req.params.id;
  
  if (typeof id !== "string") {
    return res.status(400).json({ message: "Invalid expense id" });
  }

  let expenseId: mongoose.Types.ObjectId;
  try {
    expenseId = new mongoose.Types.ObjectId(id);
  } catch {
    return res.status(400).json({ message: "Invalid expense id" });
  }

  const filter: any = { 
    _id: expenseId, 
    userId: req.user!.userId 
  };

  const expense = await expenseModel.findOneAndUpdate(
    filter,
    req.body,
    { new: true }
  );

  if (!expense) {
    return res.status(404).json({ message: "Expense not found" });
  }

  res.json(expense);
};

export const deleteExpense = async (req: Request, res: Response) => {
  const id = req.params.id;
  
  if (typeof id !== "string") {
    return res.status(400).json({ message: "Invalid expense id" });
  }

  let expenseId: mongoose.Types.ObjectId;
  try {
    expenseId = new mongoose.Types.ObjectId(id);
  } catch {
    return res.status(400).json({ message: "Invalid expense id" });
  }

  const filter: any = {
    _id: expenseId,
    userId: req.user!.userId,
  };

  const deleted = await expenseModel.findOneAndDelete(filter);

  if (!deleted) {
    return res.status(404).json({ message: "Expense not found" });
  }

  res.json({ message: "Expense deleted" });
};