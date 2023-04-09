import { requestGetTodo, requestCreateTodo, requestDeleteTodo } from "api/api";
import { useEffect, useState } from "react";
import { swal } from "sweetalert";

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputTodo, setInputTodo] = useState("");
  const [updateModeTodos, setUpdateModeTodos] = useState(new Set());
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

  const deleteTodo = async (id) => {
    try {
      await requestDeleteTodo(id);
      await getTodos();
    } catch (e) {
      swal({
        icon: "error",
        title: "create To do ERROR!",
        text: "create To do",
      });
    }
  };

  const modifyTodo = async (key) => {
    console.log(key);
  };

  const setUpdateTodoMode = (id, isUpdateMode) => {
    const newSet = new Set([...updateModeTodos]);
    if (isUpdateMode) {
      newSet.add(id);
    } else {
      newSet.delete(id);
    }
    setUpdateModeTodos(newSet);
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
          return (
            <li key={todos.id}>
              {updateModeTodos.has(todos.id) ? (
                <div>
                  <input data-testid="modify-input" defaultValue={todos.todo} />
                  <button data-testid="submit-button" onClick={() => modifyTodo(todos.id)}>
                    제출
                  </button>
                  <button data-testid="cancel-button" onClick={() => setUpdateTodoMode(todos.id, false)}>
                    취소
                  </button>
                </div>
              ) : (
                <div>
                  <label>
                    <input type="checkbox" value={todos.isCompleted} /> <span>{todos.todo}</span>
                  </label>
                  <button data-testid="modify-button" onClick={() => setUpdateTodoMode(todos.id, true)}>
                    수정
                  </button>
                  <button data-testid="delete-button" onClick={() => deleteTodo(todos.id)}>
                    삭제
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ToDoList;
