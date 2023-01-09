import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../../actions/userActions'
import agentBankLogo from '../../img/argentBankLogo.png'
import { useNavigate  } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import LogoutBtn from './LogoutBtn'
import LoginBtn from './LoginBtn'


const Header = () => {

 /*   const dispatch = useDispatch();
  let navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;

  const logoutHandler = async (e) => {
    e.preventDefault();

    dispatch(logout())
    navigate('/');
  }; */

  const auth = useSelector((state) => state.auth)

  return (
    <div>
        <nav className="main-nav">
          <Link className="main-nav-logo" to='/'>
            <img className="main-nav-logo-image" src={agentBankLogo} alt="Argent Bank Logo"/>
            <h1 className="sr-only">Argent Bank</h1>
          </Link>
          <div>
            {
              auth._id ? <LogoutBtn/> : <LoginBtn/>
            }
          </div>
        </nav>
    </div>
  )
}

export default Header