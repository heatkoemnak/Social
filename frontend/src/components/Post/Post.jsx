import './post.scss';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context';
import { PostContext } from '../../context/PostContext';
import axios from 'axios';

export default function Post({ post }) {
  const [likes, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [authProfile, setAuthProfile] = useState();
  const [authUsername, setAuthUsername] = useState();
  const { userId } = useContext(AuthContext);
  const { setIsUser } = useContext(PostContext);
  const [threeDot, setThreeDot] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    await axios.get('http://localhost:8000/api/users/all-users').then((res) => {
      setUsers(res.data);
    });
  };

  const username = users.filter((u) => u._id === post.userId)[0]?.username;
  const profilePicture = users.filter((u) => u._id === post.userId)[0]
    ?.profilePicture;

  const now = new Date(post.createdAt);
  const GetAuth = () => {
    if (localStorage.getItem('user')) {
      const isAuth = JSON.parse(localStorage.getItem('user'));
      setAuthProfile(isAuth.profilePicture);
      setAuthUsername(isAuth.username);
    } else {
      setLogged(false);
      history('/login');
    }
  };
  useEffect(() => {
    GetAuth();
  }, []);

  const IsAuth = () => {
    if (username == authUsername) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  };
  useEffect(() => {
    setIsLiked(post.likes.includes(userId));
  }, [userId, post.likes]);

  const handleClick = async () => {
    try {
      await axios.post(
        `http://localhost:8000/api/post/like-dislike/${post._id}`,
        {
          userId,
        }
      );
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  const DeletePermission = () => {
    if (username == authUsername) {
      setThreeDot(false);
      setDelete(true);
    } else {
      alert('You are not allowed to delete this post');
      setThreeDot(false);
    }
  };

  const SureToDelete = () => {
    return (
      <>
        <div className="deletePost">
          <span>Are you sure you want to delete this post?</span>
          <div className="deleteBtn">
            <button className="delete" onClick={DeletePost}>
              Yes
            </button>
            <button className="cancel" onClick={() => setDelete(false)}>
              No
            </button>
          </div>
        </div>
      </>
    );
  };

  const DeletePost = async () => {
    try {
      await axios
        .delete(`http://localhost:8000/api/post/delete-post/${post._id}`)
        .then(window.location.reload());
      window.history.back();
      router.push('/');
      setTimeout(() => {
        setMsg(null);
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  const ThreeDot = () => {
    return (
      <>
        <div className="threeDots">
          <i
            className="fa-solid fa-xmark fa-fade fa-3xs delete-icon"
            onClick={() => setThreeDot(false)}
          ></i>
          <span>
            <i className="fa-solid fa-pen-to-square icon"></i>Edit post
          </span>
          <span onClick={DeletePermission}>
            <i className="fa-solid fa-trash icon"></i>
            Delete post
          </span>
          <span>
            <i className="fa-solid fa-lock icon"></i>Edit privacy
          </span>
        </div>
      </>
    );
  };

  return (
    <>
      {isDelete ? <SureToDelete /> : null}

      <div className="PostsContainer">
        <div className="postTop">
          <div className="profile">
            <Link to={`/profile/${username}`} className="link">
              <img
                src={
                  profilePicture
                    ? profilePicture
                    : 'https://img.myloview.com/stickers/default-avatar-profile-icon-social-media-user-image-400-251200044.jpg'
                }
                alt=""
              />
            </Link>
            <Link to={`/profile/${username}`} className="link">
              <span className="username" onClick={IsAuth}>
                {username}
                <i className="fa-solid fa-circle-check"></i>
              </span>
            </Link>
            <span className="time">{now.getDay()} days ago</span>
            <i className="fa-solid fa-earth-americas"></i>
          </div>
          <div className="threeDot">
            {!threeDot ? (
              <i
                className="fas fa-ellipsis-h"
                onClick={() => setThreeDot(true)}
              ></i>
            ) : (
              <ThreeDot />
            )}
          </div>
        </div>
        <div className="postCenter">
          <p className="postTitle">{post.desc}</p>
          <img src={post.post_image} alt="" />
        </div>
        <div className="postBottom">
          <div className="TextComment">
            <Link to={`/profile/${authUsername}`}>
              <img src={authProfile} alt="" className="profile" />
            </Link>
            <input
              type="text"
              name=""
              className="CmtHolder"
              placeholder="write a comment.."
            />
          </div>
          <div className="postBottomRight">
            <span className="likeCounter">{likes}</span>
            <i
              className="far fa-heart"
              onClick={handleClick}
              style={{ color: isLiked ? 'red' : 'black' }}
            ></i>
            <span className="postCommentText">{post.comments.length}</span>
            <i className="far fa-comment"></i>
            <span>comments</span>
            <span className="heart-count">{post.share.length}</span>
            <i className="far fa-paper-plane"></i>
            <span>Share</span>
          </div>
        </div>
      </div>
    </>
  );
}
