import CloseFriend from '../CloseFriend/CloseFriend';
import OnlineFriend from '../OnlineFriend/OnlineFriend';
import './friends.scss';
import { Users } from '../../DummyData';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../Context';
import { PostContext } from '../../context/PostContext';

export default function Friends({ username }) {
  const [friends, setFriends] = useState([]);
  const [authProfile, setAuthProfile] = useState();
  const [authUsername, setAuthUsername] = useState();
  const history = useNavigate();
  const { setLogged } = useContext(AuthContext);
  const { isUser } = useContext(PostContext);

  useEffect(() => {
    GetAuth();
  });

  const GetAuth = () => {
    if (localStorage.getItem('user') && localStorage.getItem('token')) {
      const isAuth = JSON.parse(localStorage.getItem('user'));
      setAuthProfile(isAuth.profilePicture);
      setAuthUsername(isAuth.username);
    } else {
      setLogged(false);
      history('/login');
    }
  };

  useEffect(() => {
    fetchFriend();
  }, [username]);
  const fetchFriend = async () => {
    try {
      if (username) {
        await axios
          .get(`http://localhost:8000/api/friend/get-followers/${username}`)
          .then((res) => {
            setFriends(res.data);
          });
      } else {
        await axios
          .get(`http://localhost:8000/api/friend/get-followers`)
          .then((res) => {
            setFriends(res.data);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="friendContainer">
        <h1 className="friend-title">User Friends</h1>
        <hr className="friendHr" />
        <span>
          {isUser ? "Who's following you" : `Who's following ${username}`}
        </span>
        {friends &&
          friends.map((user, index) => (
            <OnlineFriend key={index} user={user} />
          ))}

        <span className="closeFriend-title">Friends Request</span>
        {Users.map((user, index) => (
          <CloseFriend key={index} user={user} />
        ))}
      </div>
    </>
  );
}
