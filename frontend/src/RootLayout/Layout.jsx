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

  const { setLogged} = useContext(AuthContext);

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

  
  useEffect(() => {
    fetchCateByName();
  }, []);
  console.log(name);

  const fetchCateByName = async () => {
    try {
      if (name) {
        const res = await axios.get(`http://localhost:8000/api/cate/${name}`);
        setPosts(res.data);
      } else {
        const res = await axios.get('http://localhost:8000/api/cate/');
        setPosts(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* {loading ? (
        <div className="loading">
          <h2>LOADING......</h2>
        </div>
      ) : (
        ''
      )} */}
      <Navbar />
      <div className="mainPage">
        <SideBar />
        <Outlet />
      </div>
    </>
  );
}
