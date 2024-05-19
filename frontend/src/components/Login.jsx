import '../styles/Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="login">
      <h2>Login</h2>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button>Login</button>
      </form>
      <p>Do you not have an account? <Link to="/register">Register</Link></p>
    </div>
  )
}

export default Login
