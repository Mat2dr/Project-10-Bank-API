import React, { useState } from 'react'
import { Link, useEffect } from 'react-router-dom'
import ErrorMessage from '../../components/ErrorMessage';
import axios from 'axios';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(email,password);

    try {
      setError("");
      const config = {
        headers: {
          "Content-type":"application/json"
        }
      };
      const { data } = await axios.post(
        'http://localhost:3001/api/v1/user/login', 
        {
          email,
          password
        }, 
        config
      );
      console.log(data);
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
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