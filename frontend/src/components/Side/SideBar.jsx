import './sidebar.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cate from '../../Categories/Cate';
import Noti from '../Notification/Noti';

export default function SideBar() {
  const [Cates, setCates] = useState([]);

  useEffect(() => {
    fetchCates();
  }, []);

  const fetchCates = async () => {
    try {
      const res = await axios.get(
        'http://localhost:8000/api/cates/get-categories'
      );
      setCates(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="SideBar">
        <div className="sidebarContainer">
          <div className="sideBar">
            <div className="sideBar__container">
              <div className="sideBar__title">
                <input
                  className="searchGat"
                  type="text"
                  placeholder="Find by categories..."
                />
                <hr />
                <h2>Categories</h2>
              </div>
              <div className="sideBar__links">
                <ul>
                  {Cates.map((cate, index) => (
                    <Cate key={index} cate={cate} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Noti />
      </div>
    </>
  );
}
