import './profile.scss';
import Friends from '../../components/Friends/Friends';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../Context';
import { PostContext } from '../../context/PostContext';

export default function Profile() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [followers, setFollowers] = useState([]);
  const { username } = useParams();
  const [authProfile, setAuthProfile] = useState();
  const [authUsername, setAuthUsername] = useState();

  const { setLogged } = useContext(AuthContext);
  const { isUser } = useContext(PostContext);
  useEffect(() => {
    const FetchData = async () => {
      const post = await axios.get(
        `http://localhost:8000/api/post/get-post/${username}`
      );
      const user = await axios.get(
        `http://localhost:8000/api/users/${username}`
      );
      const followings = await axios.get(
        `http://localhost:8000/api/friend/get-followings/${username}`
      );
      const follower = await axios.get(
        `http://localhost:8000/api/friend/get-followers/${username}`
      );
      setUsers(user.data);
      setPosts(post.data);
      setFollowings(followings.data);
      setFollowers(follower.data);
    };
    return () => FetchData();
  }, [username]);

  useEffect(() => {
    GetAuth();
  }, []);
  const history = useNavigate();

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

  const EditProfile = () => {
    return (
      <div className="editInfo">
        <button className="editInfoBtn">
          <i className="fa-regular fa-pen-to-square"></i>Edit Profile
        </button>
        <button className="editInfoBtn">...</button>
      </div>
    );
  };

  const FollowBtn = () => {
    return (
      <>
        <div className="followBtn">
          <button className="btnFollow">Follow</button>
          <button className="BtnMessage">Message</button>
        </div>
      </>
    );
  };

  const TopProfile = () => {
    return (
      <>
        <div className="profile-top">
          <div className="profile-cover">
            <img
              className="profile-cover-image"
              src={
                users.coverPicture
                  ? users.coverPicture
                  : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7QLY3BVU7zOwdU_wH5GEvcbNP0pAd6yXpuQ&usqp=CAU'
              }
              alt=""
            />
          </div>
          <img
            className="profile-user-image"
            src={
              users.profilePicture
                ? users.profilePicture
                : 'https://img.myloview.com/stickers/default-avatar-profile-icon-social-media-user-image-400-251200044.jpg'
            }
            alt=""
          />
        </div>
        <div className="profileInfo">
          <div className="profileInfo-left">
            <div className="authTexts">
              <h4 className="authName">{username}</h4>
              <span className="authBio">Dear My friends</span>
            </div>
            {isUser ? <EditProfile /> : <FollowBtn />}
          </div>
          <div className="profileInfo-center">
            <span>followers</span>
            <p>{followers.length}</p>
            <span>followings</span>
            <p>{followings.length}</p>
            <span>
              <i className="fa-regular fa-images"></i>
              Photos
            </span>
            <p>{posts.length}</p>
          </div>
          <div className="profileInfo-right">
            <div className="profile-info-items">
              <span className="profile-info-item">
                <i className="fa-solid fa-city"></i>Live in <b>Phnom Penh</b>
              </span>
              <span className="profile-info-item">
                <i className="fa-regular fa-building"></i>
                Company or Business <b>Meta Store.</b>
              </span>
              <span className="profile-info-item">
                <i className="fa-solid fa-school"></i>
                Education <b>Royal University of Phnom Penh</b>
              </span>
              <span className="profile-info-item">
                <i className="fa-solid fa-cake-candles"></i>
                Burn <b>January 05 2002</b>
              </span>
              <span className="profile-info-item">
                Join <b>Feb 21 2021</b>
              </span>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="profileContainer">
        <TopProfile />
        <div className="BottomProfile">
          <div className="PostContainer">
            {posts.map((p) => (
              <Post key={p._id} post={p} />
            ))}
          </div>
          <Friends />
        </div>
      </div>
    </>
  );
}
