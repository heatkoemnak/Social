import Navbar from '../components/Navbar/Navbar';
import SideBar from '../components/Side/SideBar';
import { Outlet } from 'react-router-dom';
import './layout.scss';
import Noti from '../components/Notification/Noti';

export default function Layout() {
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
