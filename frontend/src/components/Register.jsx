import '../styles/Register.css'
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="register">
      <h2>Register</h2>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button>Register</button>
      </form>
      <p>Already have an account? <Link to="/">Login</Link></p>
    </div>
  )
}

export default Register
