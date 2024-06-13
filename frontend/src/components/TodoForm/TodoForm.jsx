import "./TodoForm.css";
import { useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { editTodo, addTodo } from "../../slices/todo.slice"

const TodoForm = ({ isEdit }) => {
    const todoRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();


    const getSingleTodo = async () => {
        const response = await fetch(`/api/todos/${id}`);
        const data = await response.json();

        if (response.ok) {
            todoRef.current.value = data.title;
        } else {
            console.log(`Error : ${data.error}`);
        }
    }
    if (isEdit) {
        getSingleTodo();
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const title = todoRef.current.value.trim();

        try {
            const response = await fetch(isEdit ? `/api/todos/${id}` : `/api/todos`,
                {
                    method: isEdit ? "PATCH" : "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ title }),
                });
            const data = await response.json();

            if (response.ok) {
                if (isEdit) {
                    dispatch(editTodo(data));
                    navigate("/");
                } else {
                    dispatch(addTodo(data));
                }
            }

            if (!response.ok) {
                alert(data.error);
            }
            todoRef.current.value = "";
        } catch (error) {
            console.log("Fetch error", error);
        }
    }

    return (
        <div className="todoForm">
            <form onSubmit={handleSubmit}>
                <input
                    ref={todoRef}
                    id="input"
                    type="text"
                    placeholder={isEdit ? "Edit todo" : "Add todo"}
                />
                <button type="submit" id="add" className="btn">
                    {isEdit ? "Edit todo" : "Add todo"}
                </button>
            </form>
        </div>
    );
};

export default TodoForm;
