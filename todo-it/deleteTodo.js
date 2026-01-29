async function deleteTodos(id){
    await axios.delete(`http://localhost:6969/todos/todo/delete/:${id}`)
    setTodos((prevTodos) => prevTodos.filter((todo)=> todo._id !== id))
}
<button onClick={deleteTodos}Delete></button>