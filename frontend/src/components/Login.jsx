import '../styles/Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="login">
      <h2>Login</h2>
      <form>
        <input type="text" placeholder="Nome" />
        <input type="password" placeholder="Senha" />
        <button>Login</button>
      </form>
      <p>Ainda não tem uma conta? <Link to="/register">Registrar</Link></p>
    </div>
  )
}

export default Login
