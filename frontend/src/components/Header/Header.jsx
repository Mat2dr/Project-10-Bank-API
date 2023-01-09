import React from 'react'
import { Link } from 'react-router-dom'
import agentBankLogo from '../../img/argentBankLogo.png'
import { useSelector } from 'react-redux';
import LogoutBtn from './LogoutBtn'
import LoginBtn from './LoginBtn'


const Header = () => {
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