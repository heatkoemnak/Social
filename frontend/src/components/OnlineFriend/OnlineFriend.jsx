import './onlineFriend.scss';

export default function OnlineFriend(users) {
  return (
    <>
      <div className="onlineContainer">
        <div className="online-friends">
          <div className="online-friend">
            <div className="online-image-container">
              <img
                className="online-image"
                src={users.user.profilePicture}
                alt=""
              />
              <span className="online"></span>
              <div className="online-badge">
                <p>{users.user.username}</p>
                <button
                  className="onlineBtn"
                  type="submit"
                  onClick={() => alert('clicked')}
                >
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
