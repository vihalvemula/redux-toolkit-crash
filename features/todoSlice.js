import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk("fetchTodos", async () => {
  const res = await fetch("https://dummyjson.com/todos");
  const list = await res.json();
  const todos = list.todos.filter((todo, index) => index < 5);
  return todos;
});

export const todoSlice = createSlice({
  name: "todos",
  initialState: {
    status: "",
    data: [],
  },
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        todo: action.payload,
      };
      state.data.push(todo);
    },
    removeTodo: (state, action) => {
      state.data = state.data.filter((todo) => todo.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.status = "Loading";
    });

    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.status = "Fulfilled";
      state.data = action.payload;
    });

    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.status = "Failed";
      //state.error = action.error;
    });
  },
});

//This is for dispatch
export const { addTodo, removeTodo } = todoSlice.actions;

//This is for configure store
export default todoSlice.reducer;
