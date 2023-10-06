import { Link, useNavigate, useParams } from 'react-router-dom';
import './navbar.scss';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context';
import { PostContext } from '../../context/PostContext';
import axios from 'axios';

export default function Navbar() {
  const [authProfile, setAuthProfile] = useState();
  const [authUsername, setAuthUsername] = useState();

  const logout = () => {
    axios.get('http://localhost:8000/api/auth/logout').then((res) => {
      localStorage.clear();
      window.location.href = '/';
    });
  };
  const { user, setUserId, setProfile, setLogged, setUser } =
    useContext(AuthContext);
  const { setIsUser } = useContext(PostContext);

  // const IsAuth = () => {
  //   if (user) {
  //     setIsUser(false);
  //   }
  //   setIsUser(true);
  // };
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
      setAuth(user);
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
              <li>Blogs</li>
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
              <img src={authProfile} alt="user" width={50} />
            </Link>
          </div>
          <div className="navbar__right__icons">
            <ul>
              <li>
                <i className="fas fa-bell"></i>
              </li>
              <li>
                <i className="fas fa-shopping-cart"></i>
              </li>
              <li>
                <i className="fas fa-cog"></i>
              </li>
              <li onClick={logout}>
                <i className="fas fa-sign-out-alt"></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
