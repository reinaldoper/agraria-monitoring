import '../styles/Header.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [user, setUser] = useState('');

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);
  
  return (
    <>
      <h1 className="content-header">
        <h2>Monitoramento Agrária </h2>
        <Link to="/">Login</Link>
        <Link to="/device">Device</Link>
        <Link to="/dashboard">DashBoard</Link>
        <span>{user ? `Bem vindo: ${user.Username}` : ''}</span>
      </h1>
    </>
  )
}

export default Header
