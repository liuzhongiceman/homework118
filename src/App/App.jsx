import React, { useEffect, useState } from 'react';
import SignIn from '../SignIn/SignIn';
import MainContent from '../MainContent/MainContent';
import './App.css';

const services = require('../services');

export default function App() {
  
  const [user, setUser] = useState({isLoggedIn: false});
  
  useEffect(() => {
    services.getStatus()
      .then(data => {
        setUser({
          isLoggedIn: true,
          username: data.username,
        });
      });
  }, []);
  
  const login = (username) => { setUser({
      isLoggedIn: true,
      username: username,
    })
  }
  
  const logout = () => { setUser({ isLoggedIn: false }) }
  
  const displayContent = user.username ? <MainContent onLogout={logout} username={user.username}/> : <SignIn onLogin={login}/>;
  
  return (
    <div>
      <div className='container'>
        {displayContent}
      </div>
    </div>
  );
}
