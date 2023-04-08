import { requestGetTodo } from "api/api";
import { useEffect, useState } from "react";

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    const res = await requestGetTodo();
    console.log(res);
    setTodos(res.todos);
  };
  return (
    <>
      <h1>TODOLIST</h1>
      <ul>
        {todos.map((todos) => {
          return <li key={todos.id}>{todos.todo}</li>;
        })}
      </ul>
    </>
  );
};

export default ToDoList;
