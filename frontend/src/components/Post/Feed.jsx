import { useContext, useEffect, useState } from 'react';
import Post from './Post';
import { PostContext } from '../../context/PostContext';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Uploading from '../Custom/Uploading';
import Loading from '../Custom/Loading';
import './feed.scss';

export default function Feed() {
  const [authProfile, setAuthProfile] = useState();
  const [authUsername, setAuthUsername] = useState();
  const [cates, setCates] = useState([]);
  const [posts, setPosts] = useState();
  const [category, setCategory] = useState();
  const [msg, setMsg] = useState(null);
  const { name } = useParams();

  const { setIsUser } = useContext(PostContext);
  const [isClick, setIsClick] = useState(false);
  const [file, setFile] = useState('');
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchPosts();
  }, [name]);

  const fetchPosts = async () => {
    try {
      if (name) {
        await axios
          .get(`http://localhost:8000/api/cates/${name}`)
          .then((res) => {
            setPosts(res.data);
          });
      } else {
        await axios
          .get('http://localhost:8000/api/post/get-all-post')
          .then((res) => {
            setPosts(res.data);
          });
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

  const handleChange = async (e) => {
    setFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const DragImg = () => {
    return (
      <>
        <label
          htmlFor="file"
          onDrag={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setFile(e.dataTransfer.files[0]);
            setImage(URL.createObjectURL(e.dataTransfer.files[0]));
          }}
        >
          <img
            src="https://ajaxuploader.com/document/scr/images/drag-drop-file-upload.png"
            alt=""
            width={100}
          />
        </label>
      </>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);
    formData.append('category', category);
    if (!file) {
      setMsg('Please choose a file!');
      return;
    }
    if (!category || !title) {
      setMsg('Please fill in all fields!');
    }
    setMsg(
      <span
        className="msg"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '10vh',
          fontSize: '1rem',
        }}
      >
        <i className="fa-solid fa-spinner fa-spin-pulse"></i>
        Post have been uploading!
      </span>
    );
    await axios
      .post(`http://localhost:8000/api/post/create-post`, formData)
      .then(() => {
        setIsClick(!isClick);
      })
      .finally(
        setTimeout(() => {
          setMsg(
            <span
              className="msg"
              style={{
                color: 'green',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '10vh',
                fontSize: '1rem',
              }}
            >
              Uploaded Succeed!
            </span>
          );
        }, 1500)
      );
    window.location.reload().catch((err) => {
      setMsg('Upload fail!');
      console.log(err);
    });
  };

  useEffect(() => {
    fetchCate();
  }, []);

  const fetchCate = async () => {
    try {
      await axios
        .get('http://localhost:8000/api/cates/get-categories')
        .then((res) => {
          setCates(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const RemoveAction = () => {
    setFile('');
    setImage('');
    setCategory('');
    setTitle('');
    setMsg('');
    setIsClick(!isClick);
  };

  const Input = () => {
    return (
      <>
        <input
          type="text"
          name="post"
          placeholder="what's on your mind?"
          className="mindInput"
          onClick={() => setIsClick(!isClick)}
        />
      </>
    );
  };

  return (
    <>
      <div className="mainPost">
        <div className="postContainer">
          <div className="postHeader">
            <Link to={`/profile/${authUsername}`}>
              <img src={authProfile} alt="" className="userProfile" />
            </Link>
            {!isClick ? <Input /> : null}
            <input type="file" name="" className="fileInput" />
          </div>
          <button className="BtnPost">Post</button>
        </div>
        {isClick ? (
          <form className="postForm" onSubmit={handleSubmit}>
            <div className="wrapUser">
              <div className="user">
                <img src={authProfile} className="userProfileImage" alt="" />
                <span>{authUsername}</span>
              </div>
              <div className="flexIcon">
                <i
                  className="fa-solid fa-xmark fa-fade fa-3xs delete-icon "
                  onClick={RemoveAction}
                ></i>
              </div>
            </div>
            {msg ? (
              <Loading msg={msg} />
            ) : (
              <>
                <textarea
                  className="textArea"
                  placeholder="write something here..."
                  onChange={(e) => setTitle(e.target.value)}
                ></textarea>
                <div className="Prev">
                  <div className="PreviewImg">
                    {image ? (
                      <i
                        className="fa-solid fa-xmark fa-fade fa-3xs delete-icon "
                        onClick={() => setImage()}
                      ></i>
                    ) : null}
                    {image ? <img src={image} alt="" /> : <DragImg />}
                  </div>
                  <div className="Categories">
                    <label for="cates">Category:</label>
                    <div className="Cate">
                      <span>{category}</span>
                    </div>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {cates &&
                        cates.map((cate, index) => (
                          <option
                            key={index}
                            value={cate.name}
                            onChange={(e) => setCategory(e.target.value)}
                          >
                            {cate.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </>
            )}
            <label className="OpModel">
              <div className="Icon">
                <label htmlFor="file">
                  <i className="fa-solid fa-image photo-icon icon"></i>
                </label>
                <i className="fa-solid fa-paperclip icon"></i>
                <i className="fa-solid fa-video icon"></i>
              </div>
              <button className="BtnPost" type="submit">
                Post
              </button>
            </label>
            <input
              style={{ display: 'none' }}
              type="file"
              name="image"
              id="file"
              accept="image/* "
              onChange={(e) => handleChange(e)}
            />
          </form>
        ) : null}

        {posts ? (
          posts.map((p, index) => <Post key={index} post={p} />)
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}
