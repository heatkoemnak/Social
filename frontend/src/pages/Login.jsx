import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const history = useNavigate();
  const { email, user, setUser, password, setEmail, setPassword, setLogged } =
    useContext(AuthContext);

  const checkLogin = () => {
    if (
      localStorage.getItem('token') &&
      localStorage.getItem('user') !== 'undefined'
    ) {
      setLogged(true);
      history('/');
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let auth;
    if (email !== '' && password !== '') {
      try {
        await axios
          .post('http://localhost:8000/api/auth/login', { email, password })
          .then((res) => {
            setLogged(true);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            auth = JSON.parse(
              localStorage.getItem('user'),
              JSON.stringify(res.data.user)
            );

            history('/');
          });
      } catch (err) {
        console.log(err);
      }
      // try {
      //   await axios.get('http://localhost:8000/api/auth/user').then((res) => {
      //     localStorage.setItem('user', JSON.stringify(res.data));
      //     setLogged(true);
      //     history('/');
      //   });

      //   history('/');
      // } catch (err) {
      //   console.log(err);
      // }
    } else {
      toast.error(err.response.data.message, {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };
  return (
    <>
      <div className="auth">
        <ToastContainer />
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="">email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="">password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            minLength={6}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Login</button>
          <p>
            <span>Do not have an account?</span>
            <Link to="/register" className="link">
              Register here.
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
