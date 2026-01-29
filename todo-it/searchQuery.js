const filteredTodo = todos.filter((todo) =>
    todo.title.toLowerCase().includes(query.toLowerCase()) ||
    (todo.isCompleted && query.toLowerCase() === "completed") ||
    (!todo.isCompleted && query.toLowerCase() === "incomplete")
  );
  