import React from 'react'
import TodoForm from '../components/TodoForm/TodoForm'

const Edit = () => {
    return (
        <div style={{marginTop:"200px"}}>
            <TodoForm isEdit={true} />
        </div>
    )
}

export default Edit