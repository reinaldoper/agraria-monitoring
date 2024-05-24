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
      <div className="content-header">
        <h2>Monitoramento Agrária </h2>
        <div>
          <Link to="/">Login</Link>
          <Link to="/device">AddDevice</Link>
          <Link to="/dashboard">DashBoard</Link>
        </div>
        <span className='fa fa-male'>{user ? ` Bem vindo: ${user.Username}` : ''}</span>
      </div>
    </>
  )
}

export default Header
