import React from 'react'
import UserForm from '../components/UserForm/UserForm'

const Login = () => {
  return (
    <div style={{ marginTop: "200px" }}>
      <UserForm isLogin={true} />
    </div>
  )
}

export default Login