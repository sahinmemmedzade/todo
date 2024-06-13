import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../slices/todo.slice";
import userReducer from "../slices/user.slice"

const store = configureStore({
    reducer: {
        todos: todoReducer,
        user: userReducer,
    }
})

export default store;