import { useParams } from 'react-router-dom';
import './cate.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Fashion() {
  const { name } = useParams('');
  const [cate, setCate] = useState([]);

  useEffect(() => {
    fetchCateByName();
  }, [name]);

  const fetchCateByName = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/cate/${name}`);
      setCate(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="category">
      {cate.map((item) => (
        <div className="category__item" key={item.id}>
          <img src={item.post_image} alt="" />
          <div className="category__info">
            <h2>{item.desc}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}
