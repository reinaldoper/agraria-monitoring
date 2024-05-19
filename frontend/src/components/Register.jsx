import '../styles/Register.css'
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="register">
      <h2>Registrar</h2>
      <form>
        <input type="text" placeholder="Nome" />
        <input type="password" placeholder="Senha" />
        <button>Registrar</button>
      </form>
      <p>Já tem uma conta? <Link to="/">Login</Link></p>
    </div>
  )
}

export default Register
