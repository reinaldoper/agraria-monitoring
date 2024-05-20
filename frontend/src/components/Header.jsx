import '../styles/Header.css';
import { useEffect, useState } from 'react';

const Header = () => {
  const [user, setUser] = useState('');

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);
  console.log(user);
  
  return (
    <>
      <h1 className="content-header">
        <h2>Monitoramento Agrária </h2>
        <span>{user ? ` Bem vindo: ${user.Username}` : ''}</span>
      </h1>
    </>
  )
}

export default Header
