import { useState, useEffect } from "react";
import axios from "axios";
function Todos() {
  interface Todo {
    _id: string;
    title: string;
    isCompleted: boolean;
  }

  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState<string>("")

  useEffect(() => {
    async function fetchTodo() {
      const result = await axios.get("http://localhost:6969/todos/all");
      setTodos(result.data.data);
    }
    fetchTodo();
  }, []);

  const filteredTodo = todos.filter((todo) =>
    todo.title.toLowerCase().includes(query.toLowerCase()) ||
    (todo.isCompleted && query.toLowerCase() === "completed") ||
    (!todo.isCompleted && query.toLowerCase() === "incomplete")
  );
  
  async function handleDelete(id:string){
    await axios.delete(`http://localhost:6969/todos/todo/delete/${id}`)
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id != id))
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          My Todos
        </h1>
        <div className="flex gap-5 ">
            <label htmlFor="query">Search</label>
            <input className="border-2 rounded" value={query} type="text" onChange={(e)=>{setQuery(e.target.value)}}/>
            
        </div>

        <div className="space-y-4">
          {filteredTodo.map((todo) => (
            <div
              key={todo._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center justify-between"
            >
              <div>
                <h2
                  className={`text-lg font-semibold ${
                    todo.isCompleted
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {todo.title}
                </h2>
              </div>

              <span
                className={`px-3 py-1 text-sm rounded-full font-medium ${
                  todo.isCompleted
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {todo.isCompleted ? "Completed" : "Incomplete"}
              </span>
              <button className="bg-red-600 text-white rounded-md p-1" onClick={()=>{handleDelete(todo._id)}}>
                Delete
              </button>
            </div>
          ))}
        </div>

        {todos.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No todos yet. Your future is suspiciously empty.
          </p>
        )}
      </div>
    </div>
  );
}

export default Todos;
