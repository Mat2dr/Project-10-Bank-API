import React from 'react'
import { Link } from 'react-router-dom'

const LoginBtn = () => {
  return (
    <div>
        <Link className="main-nav-item" to='/Login'>
            <i className="fa fa-user-circle"></i>Sign In
        </Link>
    </div>
  )
}

export default LoginBtn