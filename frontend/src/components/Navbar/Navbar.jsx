import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../../slices/user.slice";
const Navbar = () => {

    const user = useSelector((state) => state.user.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = async () => {
        try {
            const response = await fetch("/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const data = await response.json();

            if (response.ok) {
                dispatch(removeUser());
                navigate("/sign-up");
                localStorage.removeItem("user");
                alert(data.message);
            }

            if (!response.ok) {
                alert(data.error)
            }
        } catch (error) {
            console.log('Fetch error', error);
        }
    }
    return (
        <header className="header">
            <Link to="/">
                <h1 className="logo">TodoApp</h1>
            </Link>
            <nav>
                <ul className="menu">
                    {user && (
                        <li>
                            <button onClick={handleLogout} className="">
                                Log out
                            </button>
                        </li>
                    )}

                    {!user &&
                        <>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/sign-up">Sign Up</Link>
                            </li>
                        </>
                    }
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
