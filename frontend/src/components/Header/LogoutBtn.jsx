import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../slices/authSlice';

const Logout = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <Link className="main-nav-item" to='/' onClick={ () =>  dispatch(logoutUser(null)) }>
          <i className="fa fa-user-circle"></i>Sign Out
      </Link>
  </div>
  )
}

export default Logout