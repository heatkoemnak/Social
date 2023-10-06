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
      await axios
        .post(`http://localhost:8000/api/post/like-dislike/${post._id}`, {
          userId,
        })
        .then((res) => {
          console.log(res.data);
        });
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  return (
    <>
      <div className="posts">
        <div className="post">
          <div className="post_leftSide">
            <div className="post-left-top">
              <div className="author">
                <Link to={`/profile/${username}`}>
                  <img
                    className="author_images"
                    onClick={IsAuth}
                    src={
                      profilePicture
                        ? profilePicture
                        : 'https://img.myloview.com/stickers/default-avatar-profile-icon-social-media-user-image-400-251200044.jpg'
                    }
                    alt=""
                  />
                </Link>
                <div className="author_info">
                  <Link to={`/profile/${username}`}>
                    <span className="author-name" onClick={IsAuth}>
                      {username}
                      <i className="fa-solid fa-circle-check"></i>
                    </span>
                  </Link>
                  <div className="flex-time">
                    <p className="post-time">{now.getDay()} days ago</p>
                    <i className="fa-solid fa-earth-americas"></i>
                  </div>
                </div>
              </div>
              <div className="post-body">
                <p className="post-decs">{post.desc}</p>
              </div>
              <div className="imageContainer">
                <img className="post-images" src={post?.post_image} alt="" />
              </div>
            </div>
            <div className="share_post">
              <Link to={`/profile/${authUsername}`}>
                <img src={authProfile} alt="" className="userProfile" />
              </Link>
              <input
                type="text"
                name=""
                className="CmtHolder"
                placeholder="write a comment.."
              />
              <span className="heart-count">{likes}</span>
              <i className="far fa-heart" onClick={handleClick}></i>
              <span className="heart-count">{post.comments.length}</span>
              <i className="far fa-comment"></i>
              <span>Comments</span>
              <span className="heart-count">{post.share.length}</span>
              <i className="far fa-paper-plane"></i>
              <span>Share</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
