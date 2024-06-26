import '../styles/Login.css';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../service/fetchApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(false);
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const header = {
      'Content-Type': 'application/json',
    }

    const options = {
      method: 'POST',
      headers: header,
      body: JSON.stringify({
        username,
        password: password,
      })
    }
    const { description, token, user } = await fetchUsers('login', options);
    if(description !== 'Requisição realizada com sucesso') {
      setLogin(true);
      setDescription(description);
    } else {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', JSON.stringify(token));
      navigate('/dashboard');
    }
  }

  return (
    <div className="login w3-gray">
      <h2>Login</h2>
      {login && <p>{description}</p>}
      <form onSubmit={handleLogin}>
        <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Nome" />
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
        <button type='submit'>Login</button>
      </form>
      <p>Ainda não tem uma conta? <Link to="/register">Registrar</Link></p>
    </div>
  )
}

export default Login
