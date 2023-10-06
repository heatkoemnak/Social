import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Cate({ cate }) {
  return (
    <>
      <Link to={`/${cate.name}`} key={cate.id}>
        <li>{cate.name}</li>
      </Link>
    </>
  );
}
