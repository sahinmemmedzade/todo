import express from "express";
import protectRoutes from "../middlewares/protectRoutes.js";

import { getAllTodos, getSingleTodo, createTodo, deleteTodo, updateTodo } from "../controllers/todoControllers.js";


const todoRoutes = express.Router();

todoRoutes.use(protectRoutes);

todoRoutes.get("/", getAllTodos)

todoRoutes.get("/:id", getSingleTodo)

todoRoutes.post("/", createTodo)

todoRoutes.delete("/:id", deleteTodo)

todoRoutes.patch("/:id", updateTodo)

export default todoRoutes;