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
      setMag('Please choose a file!');
      return;
    }
    if (!category || !title) {
      setMag('Please fill in all fields!');
    }
    setMag('Uploading....');

    await axios
      .post(`http://localhost:8000/api/post/create-post`, formData)
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
          onClick={() => setIsClick(!isClick)}
        />
      </>
    );
  };

  const Loading = () => {
    return (
      <>
        <div className="Loading">
          <i className="fa-solid fa-spinner fa-spin-pulse"></i>
          <h2>Loading...</h2>
        </div>
      </>
    );
  };
  const Uploading = () => {
    return (
      <>
        <div className="Uploading">
          <i class="fa-solid fa-cloud-arrow-up fa-fade icon-upload"></i>
          <div>
            <i class="fa-solid fa-spinner fa-shake icon"></i>
            <h2>Uploading...</h2>
          </div>
        </div>
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

  const RemoveAction = () => {
    setFile('');
    setImage('');
    setCategory('');
    setTitle('');
    setMag('');
    setIsClick(!isClick);
  };

  return (
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
        <form className="postBtn" onSubmit={handleSubmit}>
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
          <input
            type="text"
            className="textArea"
            placeholder="what's on your mind?"
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="UploadProgress">{msg && <Uploading />}</div>
          <div className="Prev">
            <div className="leftPrev">
              {image ? (
                <i
                  className="fa-solid fa-xmark fa-fade fa-3xs delete-icon "
                  onClick={() => setImage()}
                ></i>
              ) : null}
              {image ? <img src={image} alt="" width={300} /> : <DragImg />}
            </div>
            <div className="rightPrev">
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

          <label className="OpModel">
            <div className="Icon">
              <label htmlFor="file">
                <i className="fa-solid fa-image photo-icon icon"></i>
              </label>
              <i className="fa-solid fa-paperclip icon"></i>
              <i class="fa-solid fa-video icon"></i>
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
            accept="
          image/png, image/jpeg, image/jpg, image/gif
        "
            onChange={(e) => handleChange(e)}
          />
        </form>
      ) : null}

      {posts ? (
        posts && posts.map((p, index) => <Post key={index} post={p} />)
      ) : (
        <Loading />
      )}
    </div>
  );
}
