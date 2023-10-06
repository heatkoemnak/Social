import './closeFriend.scss';

export default function CloseFriend(user) {
  return (
    <>
      <div className="onlineContainer">
        <div className="online-friends">
          <div className="online-friend">
            <div className="online-image-container">
              <img
                className="online-image"
                src={user.user.profilePicture}
                alt=""
              />
              <div className="online-badge">
                <p>{user.user.username}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
