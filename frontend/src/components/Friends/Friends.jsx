import CloseFriend from '../CloseFriend/CloseFriend';
import OnlineFriend from '../OnlineFriend/OnlineFriend';
import './friends.scss';
import { Users } from '../../DummyData';

export default function Friends() {
  return (
    <>
      <div className="friendContainer">
        <h1 className="friend-title">User Friends</h1>
        <hr className="friendHr" />
        <span className="onlineFriend-title">Online Friends</span>
        {Users.map((user, index) => (
          <OnlineFriend key={index} user={user} />
        ))}

        <span className="closeFriend-title">Close Friends</span>
        {Users.map((user, index) => (
          <CloseFriend key={index} user={user} />
        ))}
      </div>
    </>
  );
}
