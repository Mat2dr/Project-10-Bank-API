import React from 'react'
import { Link } from 'react-router-dom'
import agentBankLogo from '../../img/argentBankLogo.png'


const Header = () => {

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
          <Link className="main-nav-item" to='/' onClick={() => {
            localStorage.removeItem('userInfo');
          }}>
            <i className="fa fa-user-circle"></i>Sign Out
          </Link>
        </div>
        </nav>
    </div>
  )
}

export default Header