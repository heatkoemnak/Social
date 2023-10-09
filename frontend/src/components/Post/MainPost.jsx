import { useContext, useEffect, useState } from 'react';
import Post from '../../components/Post/Post';
import { PostContext } from '../../context/PostContext';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function MainPost() {
  const [authProfile, setAuthProfile] = useState();
  const [authUsername, setAuthUsername] = useState();
  const [cates, setCates] = useState([]);
  const [posts, setPosts] = useState();
  const [category, setCategory] = useState();
  const [msg, setMag] = useState(null);
  const [progress, setProgress] = useState({ started: false, percentage: 0 });
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
        const res = await axios.get(`http://localhost:8000/api/cates/${name}`);
        setPosts(res.data);
      } else {
        const res = await axios.get(
          'http://localhost:8000/api/post/get-all-post'
        );
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
    formData.append('category', category);
    if (!file) {
      setMag('Please choose a file!');
      return;
    }
    if (!category || !title) {
      setMag('Please fill in all fields!');
    }
    setMag('Uploading....');
    setProgress((prevProgress) => {
      return {
        ...prevProgress,
        started: true,
      };
    });

    await axios
      .post(`http://localhost:8000/api/post/create-post`, formData, {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          let percentage = Math.floor((loaded / total) * 100);
          setProgress((prevProgress) => {
            return {
              ...prevProgress,
              percentage: percentage,
            };
          });
        },
      })
      .then((res) => {
        setMag('Upload Successful!');
        setIsClick(!isClick);
      })
      .catch((err) => {
        setMag('Upload fail!');
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

  useEffect(() => {
    fetchCate();
  }, []);

  const fetchCate = async () => {
    try {
      const res = await axios.get(
        'http://localhost:8000/api/cates/get-categories'
      );
      setCates(res.data);
    } catch (error) {
      console.log(error);
    }
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
          <div className="UploadProgress">
            {progress.started && (
              <progress
                value={progress.percentage}
                max="100"
                className="progress"
              />
            )}
            {msg && <span>{msg}</span>}
          </div>
          <div className="Prev">
            <div className="leftPrev">
              <img src={image} alt="" width={300} />
            </div>
            <div className="rightPrev">
              <label for="cates">Choose a category:</label>
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

          <label htmlFor="file" className="OpModel">
            <i className="fa-solid fa-image photo-icon"></i>
            <span>Photo</span>
            <option>
              <i className="fa-solid fa-video video-icon"></i>
              <span>Video</span>
            </option>
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
