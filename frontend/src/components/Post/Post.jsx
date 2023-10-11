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
  const { setIsUser, users } = useContext(PostContext);
  const [threeDot, setThreeDot] = useState(false);
  const [msg, setMsg] = useState(null);

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

  const DeletePost = async () => {
    try {
      setMsg('Deleting post...');
      await axios
        .delete(`http://localhost:8000/api/post/delete-post/${post._id}`)
        .then((res) => {
          setMsg(
            'Post has been deleted. You will be redirected to the home page.'
          );
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        });
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  const ThreeDot = () => {
    return (
      <>
        <div className="threeDots">
          <i
            className="fa-solid fa-xmark fa-fade fa-3xs"
            onClick={() => setThreeDot(false)}
          ></i>
          <span>Edit Post</span>
          <span onClick={DeletePost}>Delete Post</span>
        </div>
      </>
    );
  };

  return (
    <>
      {msg}
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
