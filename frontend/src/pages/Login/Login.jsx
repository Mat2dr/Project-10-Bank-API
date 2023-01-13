import React, { useState, useEffect } from 'react'
import { useNavigate  } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getUser, loginUser } from '../../slices/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

const Login = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const auth =useSelector((state) => state.auth);

  const [user, setUser] = useState({
    email: '',
    password: '',
   });

   useEffect(() => {
    if(auth.token) {
      navigate("/Dashboard")
    }
  }, [auth.token, navigate]); 

  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await dispatch(loginUser(user));
    const request = await dispatch(getUser(response.payload));
  }; 


  return (
    <main className="main bg-dark padding-15">
      <section className="sign-in-content">
        <FontAwesomeIcon icon={faCircleUser} />
        <h1>Sign In</h1>
        <form onSubmit={submitHandler}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" placeholder='email' onChange={ (e) => setUser({ ...user, email:e.target.value }) }/>
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={ (e) => setUser({ ...user, password:e.target.value }) }/>
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type='submit' className="sign-in-button">Sign In</button>
        </form>
      </section>
    </main>
  )
}

export default Login