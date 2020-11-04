import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {

  const [email, setEmail] = useState('');

  const handleSignUp = (event) => {
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
      <h1>Sign up with Calendapp</h1>
      <form onSubmit={handleSignUp}>
        <label>
          Enter your e-mail to get started
          <input 
            value={email}
            onChange={handleEmailChange}
            type="email" 
            name="email" 
          />
        </label>
        <button type="submit">Get started</button>
      </form>
      <p>Already have an account? <Link to="/login"> Log in</Link></p>
    </div>
  )
}

export default SignUp
