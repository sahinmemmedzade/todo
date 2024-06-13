import "./TodoList.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { setTodos, removeTodo } from "../../slices/todo.slice";
import { useDispatch, useSelector } from "react-redux";

const TodoList = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos.todos);

    const getAllTodos = async () => {
        try {
            const response = await fetch("/api/todos");
            const data = await response.json();

            if (response.ok) {
                dispatch(setTodos(data));
            }

            if (!response.ok) {
                alert(data.error);
            }
        } catch (error) {
            console.log("Fetch error", error);
        }
    };

    const handleDelete = async (id) => {
        const response = await fetch(`/api/todos/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            dispatch(removeTodo(id));
        } else {
            alert("Fetch error");
        }
    };

    useEffect(() => {
        getAllTodos();
    }, []);

    return (
        <div className="todoList">
            <ul>
                {todos.map((todo) => {
                    return (
                        <li key={todo._id}>
                            <span>{todo.title}</span>
                            <div className="todoActions">
                                <Link to={`/edit/${todo._id}`}>
                                    <button className="btn">Edit</button>
                                </Link>
                                <button onClick={() => handleDelete(todo._id)} className="btn">
                                    Delete
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default TodoList;
