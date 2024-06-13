import React from 'react'
import UserForm from '../components/UserForm/UserForm'

const SignUp = () => {
    return (
        <div style={{ marginTop: "200px" }}>
            <UserForm isLogin={false} />
        </div>
    )
}

export default SignUp