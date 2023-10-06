import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const PostContext = createContext();

export const PostContextProvider = (props) => {
  const [users, setUsers] = useState([]);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    await axios.get('http://localhost:8000/api/users/all-user').then((res) => {
      setUsers(res.data);
    });
  };

  const value = {
    isUser,
    setIsUser,
    users,
    setUsers,
  };
  return (
    <PostContext.Provider value={value}>{props.children}</PostContext.Provider>
  );
};
