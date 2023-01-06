import React, { useState, useEffect } from 'react'
import { useNavigate  } from 'react-router-dom'
import ErrorMessage from '../../components/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/userActions';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo} = userLogin

  useEffect(() => {
    if(userInfo) {
      navigate('/Dashboard');
    }
  }, [userInfo])

  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(login(email,password))
    console.log(email,password);
  };


  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={submitHandler}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input value={email} type="text" id="username" placeholder='Username' onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input value={password} type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
          </div>
          { error && <ErrorMessage>{ error }</ErrorMessage> }
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