import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

const LoginBtn = () => {
  return (
    <div>
        <Link className="main-nav-item" to='/Login'>
          <FontAwesomeIcon icon={faCircleUser} />Sign In
        </Link>
    </div>
  )
}

export default LoginBtn