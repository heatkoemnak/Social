import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.scss';
import Home from './pages/Home/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './RootLayout/Layout';
import Fashion from './Categories/Fashion';
import Profile from './pages/Profile/Profile';
import { AuthContextProvider } from './Context';
import { PostContextProvider } from './context/PostContext';

import axios from 'axios';
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/:name',
        element: <Home />,
      },
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'profile/:username',
        element: <Profile />,
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

function App() {
  return (
    <>
      <AuthContextProvider>
        <PostContextProvider>
          <RouterProvider router={router} />
        </PostContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
