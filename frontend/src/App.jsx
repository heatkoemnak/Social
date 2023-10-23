import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.scss';
import Home from './pages/Home/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './RootLayout/Layout';
import Profile from './pages/Profile/Profile';
import { AuthContextProvider } from './Context';
import { PostContextProvider } from './context/PostContext';
import io from 'socket.io-client';
import axios from 'axios';
import { NotificationContextProvider } from './context/Notification';
import { useEffect, useState } from 'react';
axios.defaults.withCredentials = true;
// const socket = io('http://localhost:8000');

function App() {
  const [socket, setSocket] = useState(null);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout socket={socket} />,
      children: [
        {
          path: '/:name',
          element: <Home />,
        },
        {
          path: '/',
          element: <Home socket={socket} />,
        },
        {
          path: 'profile/:username',
          element: <Profile socket={socket} />,
        },
      ],
    },

    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
  ]);
  const [user, setUser] = useState('');

  const getAuth = () => {
    if (localStorage.getItem('user') && localStorage.getItem('token')) {
      const isAuth = JSON.parse(localStorage.getItem('user'));
      setUser(isAuth.username);
    }
  };
  useEffect(() => {
    getAuth();
  }, []);
  useEffect(() => {
    setSocket(io('http://localhost:8000'));
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit('join', user);
    }
  }, [socket, user]);
  return (
    <>
      <AuthContextProvider>
        <NotificationContextProvider>
          <PostContextProvider>
            <RouterProvider router={router} />
          </PostContextProvider>
        </NotificationContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
