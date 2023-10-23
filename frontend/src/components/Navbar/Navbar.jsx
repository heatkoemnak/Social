import { Link, useNavigate } from 'react-router-dom';
import './navbar.scss';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context';
import axios from 'axios';
import { NotificationContext } from '../../context/Notification';

export default function Navbar({ socket }) {
  const [authProfile, setAuthProfile] = useState();
  const [authUsername, setAuthUsername] = useState();

  const logout = () => {
    axios.get('http://localhost:8000/api/auth/logout').then((res) => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.href = '/';
    });
  };
  const { setUserId, setProfile, setLogged, setUser } = useContext(AuthContext);
  const { notifications } = useContext(NotificationContext);

  useEffect(() => {
    GetAuth();
  }, []);
  const GetAuth = () => {
    if (localStorage.getItem('user')) {
      const isAuth = JSON.parse(localStorage.getItem('user'));
      setAuthProfile(isAuth.profilePicture);
      setAuthUsername(isAuth.username);
    }
  };
  const history = useNavigate();
  const checkLogin = async () => {
    if (
      localStorage.getItem('token') &&
      localStorage.getItem('user') &&
      localStorage.getItem('user') !== 'undefined'
    ) {
      setLogged(true);
      let user = localStorage.getItem('user');
      user = JSON.parse(user);
      setUser(user.username);
      setUserId(user._id);
      setProfile(
        user.profilePicture
          ? user.profilePicture
          : 'https://img.myloview.com/stickers/default-avatar-profile-icon-social-media-user-image-400-251200044.jpg'
      );

      history('/');
    }
  };

  useEffect(() => {
    return () => checkLogin();
  }, []);

  return (
    <div className="navbar">
      <div className="nav-container">
        <div className="navbar__left">
          <div className="navbar__left__logo">
            <Link to="/" onClick={GetAuth}>
              <h1>Social. Sale</h1>
            </Link>
          </div>
          <div className="navbar__left__links">
            <ul>
              <li>Home</li>
              <li>Raw Materials</li>
              <li>Recycle</li>
              <li>FAQs</li>
            </ul>
          </div>
        </div>
        <div className="navbar_middle_search">
          <input type="text" placeholder="Search" />
          <i className="fas fa-search"></i>
        </div>
        <div className="navbar__right">
          <div className="navbar__right__user" onClick={GetAuth}>
            <Link to={`/profile/${authUsername}`}>
              <p className="navbar-user-username">{authUsername}</p>
            </Link>
            <Link to={`/profile/${authUsername}`}>
              <img
                src={
                  authProfile
                    ? authProfile
                    : 'data:image/png;base64,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'
                }
                alt="user"
              />
            </Link>
          </div>
          <div className="navbar__right__icons">
            <ul>
              <li
                style={{
                  position: 'relative',
                  cursor: 'pointer',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '-10px',
                    display: 'flex',
                    gap: '5px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    backgroundColor: 'red',
                    width: '20px',
                    color: 'white',
                    borderRadius: '50%',
                  }}
                >
                  {notifications.length}
                </span>
                <i className="fas fa-bell"></i>
              </li>

              <li>
                <i className="fas fa-cog"></i>
              </li>
              <li
                onClick={logout}
                style={{
                  display: 'flex',
                  gap: '5px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <p style={{ color: '#fff' }}> LOGOUT</p>
                <i className="fas fa-sign-out-alt"></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
