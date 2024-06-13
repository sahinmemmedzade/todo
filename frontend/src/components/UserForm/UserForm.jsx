import "./UserForm.css";
import { useRef } from "react"
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/user.slice";
import { useNavigate } from "react-router";
const UserForm = ({ isLogin }) => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const email = emailRef.current.value;
            const password = passwordRef.current.value;
            const response = await fetch(isLogin ? '/api/auth/login' : "/api/auth/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ password, email }),
                }
            );

            const data = await response.json();
            if (response.ok) {
                dispatch(setUser(data));
                localStorage.setItem("user", JSON.stringify(data));
                navigate("/")
                if (isLogin) {
                    alert("Succesfully logged in")
                } else {
                    alert("Account succesfully created")
                }

                emailRef.current.value = "";
                passwordRef.current.value = "";
            }

            if (!response.ok) {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            alert('Fetch error: ' + error);
        }
    }
    return (
        <div className="user-form">
            <form onSubmit={handleSubmit}>
                <h2>{isLogin ? "Login" : "Sign up"}</h2>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" placeholder="Email" id="email" ref={emailRef} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        ref={passwordRef}
                    />
                </div>
                <button className="btn">{isLogin ? "Login" : "Sign up"}</button>
            </form>
        </div>
    );
};

export default UserForm;
