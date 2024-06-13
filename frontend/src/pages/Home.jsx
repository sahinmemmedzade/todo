import TodoForm from "../components/TodoForm/TodoForm"
import TodoList from "../components/TodoList/TodoList"

const Home = () => {
    return (
        <div style={{marginTop:"200px"}}>
            <TodoForm isEdit={false}/>
            <TodoList />
        </div>
    )
}

export default Home