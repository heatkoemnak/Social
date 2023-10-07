import Navbar from '../components/Navbar/Navbar';
import SideBar from '../components/Side/SideBar';
import { Outlet, useNavigate } from 'react-router-dom';
import './layout.scss';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../Context';

export default function Layout() {
  useEffect(() => {
    checkLogin();
  }, []);

  const { setLogged } = useContext(AuthContext);

  const history = useNavigate();
  const checkLogin = async () => {
    if (!localStorage.getItem('token')) {
      setLogged(true);
      history('/login');
    } else {
      setLogged(false);
      history('/');
    }
  };

  return (
    <>
      <Navbar />
      <div className="mainPage">
        <SideBar />
        <Outlet />
      </div>
    </>
  );
}
