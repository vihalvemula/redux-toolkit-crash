import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, fetchTodos, removeTodo } from "./features/todoSlice";
import "./todo.css";
import { useForm } from "react-hook-form";

const Todos = () => {
  const dispatch = useDispatch();
  let todos = useSelector((state) => state.data);
  const [todoText, setTodoText] = useState("");

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      todoText: todoText,
    },
  });

  const addHandler = (data) => {
    data?.todoText?.trim()?.length > 0 && dispatch(addTodo(data.todoText));
    reset();
  };
  console.log(todoText);
  return (
    <div className="todoList">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit(addHandler)}>
        <div className="todoListInput">
          <div className="todoListForm">
            <input
              type="text"
              placeholder="Enter a Todo..."
              // value={todoText}
              // onChange={(e) => setTodoText(e.target.value)}
              name="todoText"
              {...register("todoText", { required: true })}
            />
            {errors?.todoText?.type === "required" && (
              <span className="errorMsg">Please enter the text.</span>
            )}
          </div>
          <button type="submit">Add Todo</button>
        </div>
      </form>
      <div className="todoListItem">
        <ul>
          {todos.map((todo) => (
            <li>
              <label>{todo.todo}</label>
              <button onClick={() => dispatch(removeTodo(todo.id))}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todos;
