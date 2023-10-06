import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Context';
import { useContext } from 'react';

export default function Register() {
  const { username, email, password, setUsername, setEmail, setPassword } =
    useContext(AuthContext);

  const history = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post('http://localhost:8000/api/auth/register', {
          username,
          email,
          password,
        })
        .then((res) => {
          console.log(res.data);
          history('/login');
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="auth">
        <h1>Sign up</h1>
        <form onSubmit={handleRegister}>
          <label htmlFor="">username</label>
          <input
            name="username"
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="">email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="">password</label>
          <input
            name="password"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button>Register</button>
          <p>
            <span>You have an account?</span>
            <Link to="/login" className="link">
              Login.
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
