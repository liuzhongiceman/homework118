import React, { useState } from 'react';
import './SignIn.css';

const services = require('../services');

export default function Login({ onLogin }) {

  const[ username, setUsername ] = useState('');
  
  const onUserNameInput = (e) => {
    setUsername(e.target.value);
  }

  const onClick = (e) => {
    e.preventDefault();
    services.login(username)
      .then(res => {
        onLogin(username);
      })
      .catch((e) => {
        console.log(e.status)
      });
  }

  return (
    <div className='sign-in'>
      <input onChange={onUserNameInput} value={username}/>
      <button onClick={onClick}>SignIn</button>
    </div>
  )
}