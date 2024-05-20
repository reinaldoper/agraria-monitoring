import '../styles/Register.css'
import { Link } from 'react-router-dom';
import { fetchUsers } from '../service/fetchApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [register, setRegister] = useState(false);
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
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
    const { description, token } = await fetchUsers('register', options);
    if(description !== 'Requisição realizada com sucesso') {
      setRegister(true);
      setDescription(description);
    } else {
      localStorage.setItem('token', JSON.stringify(token));
      navigate('/');
    }
  }

  return (
    <div className="register">
      <h2>Registrar</h2>
      {register && <p>{description}</p>}
      <form onSubmit={handleRegister}>
        <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Nome" />
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
        <button>Registrar</button>
      </form>
      <p>Já tem uma conta? <Link to="/">Login</Link></p>
    </div>
  )
}

export default Register
