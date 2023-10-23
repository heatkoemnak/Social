import Navbar from '../components/Navbar/Navbar';
import SideBar from '../components/Side/SideBar';
import { Outlet } from 'react-router-dom';
import './layout.scss';

export default function Layout({ socket }) {
  return (
    <>
      <Navbar socket={socket} />
      <div className="mainPage">
        <SideBar socket={socket} />
        <Outlet />
      </div>
    </>
  );
}
