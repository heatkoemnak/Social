import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [isLogged, setLogged] = useState(false);
  const [user, setUser] = useState([]);
  const [newUser, setNewUser] = useState([]);
  const [userId, setUserId] = useState([]);
  const [profile, setProfile] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  const value = {
    newUser,
    setNewUser,
    userId,
    setUserId,
    user,
    setUser,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    isLogged,
    setLogged,
    profile,
    setProfile,
    loading,
    setLoading,
  };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
