import './onlineFriend.scss';

export default function OnlineFriend({ user }) {
  return (
    <>
      <div className="onlineContainer">
        <div className="online-friends">
          <div className="online-friend">
            <div className="online-image-container">
              <img className="online-image" src={user?.profilePicture} alt="" />
              <span className="online"></span>
              <div className="online-badge">
                <p>{user?.username}</p>
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
