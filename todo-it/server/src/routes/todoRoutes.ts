import { Router } from "express";
const todoRoute = Router();
import { todoModel } from "../models/todoModel.js";

todoRoute.post(`/new/todo`, async (req, res) => {
  const { title, isCompleted } = req.body;
  if (!title) {
    return res.status(400).json({
      error: "All fields required.",
    });
  }
  try {
    const newTodo = await todoModel.create({ title, isCompleted });
    return res.status(200).json({
      message: "Todo created",
      todo: newTodo,
    });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({
        error: (err as Error).message,
      });
    }
  }
});

todoRoute.get(`/all`, async (req, res) => {
  try {
    const todo = await todoModel.find({});
    return res.status(200).json({
      data: todo,
    });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({
        err: (err as Error).message,
      });
    }
  }
});

todoRoute.get(`/todo/:id`, async(req,res)=>{
    const idx = req.params.id

    try{    
        const todo = await todoModel.findById(idx);
        return res.status(200).json({
            data: todo
        })
    }
    catch(err){
        if(err instanceof Error){
            console.log((err as Error).message)
            return res.status(400).json({
                message: `Could'nt fetch Todo with id ${idx}`
            })
        }

    }

})

todoRoute.delete("/todo/delete/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const result = await todoModel.deleteOne({ _id: id });
  
      if (result.deletedCount !== 1) {
        return res.status(404).json({
          message: "Todo not found"
        });
      }
  
      return res.status(200).json({
        message: "Successfully deleted todo"
      });
  
    } catch (err) {
      return res.status(400).json({
        error: (err as Error).message
      });
    }
  });

  todoRoute.put("/update/todo/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { title, isCompleted } = req.body;
  
      const updatedTodo = await todoModel.findByIdAndUpdate(
        id,
        { title, isCompleted },
        { new: true, runValidators: true }
      );
  
      if (!updatedTodo) {
        return res.status(404).json({
          message: "Todo not found"
        });
      }
  
      return res.status(200).json({
        message: "Todo updated successfully",
        data: updatedTodo
      });
  
    } catch (err) {
        if(err instanceof Error){
            return res.status(400).json({
                error: err.message
              });
        }
    }
  });
  
export { todoRoute };
