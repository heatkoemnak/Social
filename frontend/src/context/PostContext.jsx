import React, { createContext, useEffect, useState } from 'react';

export const PostContext = createContext();

export const PostContextProvider = (props) => {
  const [users, setUsers] = useState([]);
  const [isUser, setIsUser] = useState(false);

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
