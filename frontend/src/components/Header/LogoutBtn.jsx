import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../slices/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

const Logout = () => {
  const dispatch = useDispatch();

  const firstName = useSelector((state) => state.auth.firstName);


  return (
    <div className='dashboard-main-nav'>
      <Link className="main-nav-item" to='/Dashboard'>
          <FontAwesomeIcon icon={faCircleUser} />
          {firstName}
        </Link>
      <Link className="main-nav-item" to='/' onClick={ () =>  dispatch(logoutUser(null)) }>
        <FontAwesomeIcon icon={faRightFromBracket} />Sign Out
      </Link>
  </div>
  )
}

export default Logout