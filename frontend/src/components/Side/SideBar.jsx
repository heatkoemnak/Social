import './sidebar.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cate from '../../Categories/Cate';
export default function SideBar() {
  const [Cates, setCates] = useState([]);

  useEffect(() => {
    fetchCate();
  }, []);

  const fetchCate = async () => {
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

              {/* <ul>
                <li>digital services</li>
                <Link to="/fashion">fashion</Link>
                <li>Watch</li>
                <li>shoes</li>
                <li>bags</li>
                <li>Search</li>
                <li>cosmetics</li>
                <li>food</li>
                <li>beverage</li>
                <li>body care</li>
                <li>furniture</li>
                <li>decor</li>
                <li>household items</li>
                <li>health care</li>
                <li>media</li>
                <li>pet care</li>
                <li>office equipment</li>
              </ul> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
