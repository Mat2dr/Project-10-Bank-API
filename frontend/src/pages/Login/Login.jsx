import React, { useState, useEffect } from 'react'
import { useNavigate  } from 'react-router-dom'
import ErrorMessage from '../../components/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../slices/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const auth =useSelector((state) => state.auth);
  console.log(auth);

  useEffect(() => {
    if(auth._id) {
      navigate("/Dasboard")
    }
  }, [auth._id, navigate]);

   const [user, setUser] = useState({
    email: '',
    password: '',
   });

  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(loginUser(user));
  }; 


  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={submitHandler}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder='Username' onChange={ (e) => setUser({ ...user, email:e.target.value }) }/>
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={ (e) => setUser({ ...user, password:e.target.value }) }/>
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type='submit' className="sign-in-button">
            { auth.loginStatus === "pending" ? "Submitting" : "Sign In"}
          </button>
          {auth.loginStatus === 'rejected' ? (<p>{auth.loginError}</p>) : null }
        </form>
      </section>
    </main>
  )
}

export default Login