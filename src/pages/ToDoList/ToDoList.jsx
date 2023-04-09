import { requestGetTodo, requestCreateTodo, requestDeleteTodo, requestUpdateTodo } from "api/api";
import _ from "lodash";
import { useEffect, useState } from "react";
import { swal } from "sweetalert";

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputTodo, setInputTodo] = useState("");
  const [updateTodoInfo, setUpdateTodoInfo] = useState({ id: -1, todo: "", isCompleted: false });
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

  const updateTodo = async () => {
    try {
      await requestUpdateTodo(updateTodoInfo.id, updateTodoInfo.todo, updateTodoInfo.isCompleted);
      await getTodos();
    } catch (e) {
      swal({
        icon: "error",
        title: "create To do ERROR!",
        text: "create To do",
      });
    } finally {
      setUpdateTodoInfo({ id: -1, isCompleted: false, todo: "" });
    }
  };

  const changeUpdateTodoInfo = (updateInfo, newValue) => {
    const newUpdateTodoInfo = _.cloneDeep(updateTodoInfo);
    switch (updateInfo) {
      case "todo": {
        newUpdateTodoInfo.todo = newValue;
        break;
      }
      case "isCompleted": {
        newUpdateTodoInfo.isCompleted = newValue;
        break;
      }
    }
    setUpdateTodoInfo(newUpdateTodoInfo);
  };
  const setUpdateTodoMode = (id, isUpdateMode) => {
    if (isUpdateMode) {
      const targetTodo = todos.find((todo) => todo.id === id);
      setUpdateTodoInfo({
        id: targetTodo.id,
        todo: targetTodo.todo,
        isCompleted: targetTodo.isCompleted,
      });
    } else {
      setUpdateTodoInfo({
        id: -1,
        todo: "",
        isCompleted: false,
      });
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
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              {updateTodoInfo.id == todo.id ? (
                <div>
                  <input
                    name="is_completed"
                    type="checkbox"
                    checked={updateTodoInfo.isCompleted}
                    onChange={(e) => changeUpdateTodoInfo("isCompleted", e.target.checked)}
                  />
                  <input
                    name="todo"
                    data-testid="modify-input"
                    value={updateTodoInfo.todo}
                    onChange={(e) => changeUpdateTodoInfo("todo", e.target.value)}
                  />
                  <button onClick={updateTodo} data-testid="submit-button">
                    제출
                  </button>
                  <button data-testid="cancel-button" onClick={() => setUpdateTodoMode(todo.id, false)}>
                    취소
                  </button>
                </div>
              ) : (
                <div>
                  <label>
                    <input type="checkbox" checked={todo.isCompleted} /> <span>{todo.todo}</span>
                  </label>
                  <button data-testid="modify-button" onClick={() => setUpdateTodoMode(todo.id, true)}>
                    수정
                  </button>
                  <button data-testid="delete-button" onClick={() => deleteTodo(todo.id)}>
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
