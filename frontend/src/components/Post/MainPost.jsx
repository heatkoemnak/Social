import { useContext, useEffect, useState } from 'react';
import Post from '../../components/Post/Post';
import { PostContext } from '../../context/PostContext';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function MainPost() {
  const [authProfile, setAuthProfile] = useState();
  const [authUsername, setAuthUsername] = useState();
  const [posts, setPosts] = useState();
  const { name } = useParams();

  const { setIsUser } = useContext(PostContext);
  const [isClick, setIsClick] = useState(false);
  const [file, setFile] = useState('');
  const [image, setImage] = useState('');
  const [title, setTitle] = useState();

  useEffect(() => {
    fetchCateByName();
  }, [name]);

  const fetchCateByName = async () => {
    try {
      if (name) {
        const res = await axios.get(`http://localhost:8000/api/cate/${name}`);
        setPosts(res.data);
      } else {
        const res = await axios.get('http://localhost:8000/api/cate/');
        setPosts(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetAuth();
  });

  const GetAuth = () => {
    if (localStorage.getItem('user')) {
      const isAuth = JSON.parse(localStorage.getItem('user'));
      setAuthProfile(isAuth.profilePicture);
      setAuthUsername(isAuth.username);
    }
    if (authUsername) {
      setIsUser(false);
    }
    setIsUser(true);
  };

  const handleShowForm = () => {
    setIsClick(!isClick);
  };

  const handleChange = async (e) => {
    setFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);
    await axios
      .post(`http://localhost:8000/api/post/create-post`, formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Input = () => {
    return (
      <>
        <input
          type="text"
          name="post"
          placeholder="what's on your mind?"
          className="mindInput"
          onClick={() => handleShowForm()}
        />
      </>
    );
  };

  return (
    <div className="mainPost">
      <div className="postContainer">
        <Link to={`/profile/${authUsername}`}>
          <img src={authProfile} alt="" className="userProfile" />
        </Link>
        {!isClick ? <Input /> : null}

        <input type="file" name="" className="fileInput" />
        <button className="BtnPost">Post</button>
      </div>
      {isClick ? (
        <form className="postBtn" onSubmit={handleSubmit}>
          <div className="wrapUser">
            <div className="user">
              <img src={authProfile} className="userProfileImage" alt="" />
              <span>{authUsername}</span>
            </div>
            <div className="flexIcon">
              <i
                className="fa-solid fa-xmark fa-fade fa-3xs delete-icon "
                onClick={() => handleShowForm()}
              ></i>
            </div>
          </div>
          <input
            type="text"
            className="textArea"
            placeholder="what's on your mind?"
            onChange={(e) => setTitle(e.target.value)}
          />
          <span>{title}</span>
          <img src={image} alt="" width={300} />
          <label htmlFor="file" className="OpModel">
            <i className="fa-solid fa-image photo-icon"></i>
            <button className="BtnPost" type="submit">
              Post
            </button>
          </label>
          <input
            style={{ display: 'none' }}
            type="file"
            name="image"
            id="file"
            accept="
          image/png, image/jpeg, image/jpg, image/gif
        "
            onChange={(e) => handleChange(e)}
          />
        </form>
      ) : null}
      {posts && posts.map((p, index) => <Post key={index} post={p} />)}
    </div>
  );
}
