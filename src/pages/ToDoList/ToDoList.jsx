import { requestGetTodo, requestCreateTodo } from "api/api";
import { useEffect, useState } from "react";
import { swal } from "sweetalert";

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputTodo, setInputTodo] = useState("");
  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    const res = await requestGetTodo();
    console.log(res);
    setTodos(res.todos);
  };

  const createTodo = async () => {
    if (inputTodo.length > 0) {
      try {
        await requestCreateTodo(inputTodo);
        setInputTodo("");
        await getTodos();
      } catch (e) {
        swal({
          icon: "error",
          title: "create To do ERROR!",
          text: "create To do",
        });
      }
    }
  };
  return (
    <>
      <h1>TODOLIST</h1>
      <form onSubmit={createTodo}>
        <input
          data-testid="new-todo-input"
          value={inputTodo}
          onChange={(e) => setInputTodo(e.target.value)}
          autoFocus
        />
        <input type="submit" data-testid="new-todo-add-button" value="Submit" />
      </form>
      <ul>
        {todos.map((todos) => {
          return <li key={todos.id}>{todos.todo}</li>;
        })}
      </ul>
    </>
  );
};

export default ToDoList;
