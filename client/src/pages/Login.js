import React, { useState } from 'react'

const Login = () => {

  const [email, setEmail] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    console.log('button clicked', event.target);
  }

  const handleEmailChange = (event) => {
    console.log(event.target.value);
    setEmail(event.target.value);
  }

  return (
    <div>
      <h1>calendapp</h1>
      <h1>Log into your account</h1>
      <form onSubmit={handleLogin}>
        <label>
          Enter your e-mail to get started
          <input 
            value={email}
            onChange={handleEmailChange}
            type="email" 
            name="email" 
          />
        </label>
        <button type="submit">Continue</button>
      </form>
      <p>Don't have an account? <a href="#">Sign up</a></p>
    </div>
  )
}

export default Login
