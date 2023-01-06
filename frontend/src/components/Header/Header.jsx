import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../../actions/userActions'
import agentBankLogo from '../../img/argentBankLogo.png'
import { useNavigate  } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';


const Header = () => {

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;

  const logoutHandler = async (e) => {
    e.preventDefault();

    dispatch(logout())
    navigate('/');
  };

  return (
    <div>
        <nav className="main-nav">
        <Link className="main-nav-logo" to='/'>
          <img className="main-nav-logo-image" src={agentBankLogo} alt="Argent Bank Logo"/>
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          <Link className="main-nav-item" to='/Login'>
            <i className="fa fa-user-circle"></i>Sign In
          </Link>
          <Link className="main-nav-item" to='/' onClick={logoutHandler}>
            <i className="fa fa-user-circle"></i>Sign Out
          </Link>
        </div>
        </nav>
    </div>
  )
}

export default Header