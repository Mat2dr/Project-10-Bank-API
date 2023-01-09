import React, { useState, useEffect } from 'react'
import { useNavigate  } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../slices/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const auth =useSelector((state) => state.auth);
  console.log(auth);

  const [user, setUser] = useState({
    email: '',
    password: '',
   });

   useEffect(() => {
    if(auth._id) {
      navigate("/Dashboard")
    }
  }, [auth._id, navigate]); 

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(user);
    dispatch(loginUser(user));
  }; 


  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
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