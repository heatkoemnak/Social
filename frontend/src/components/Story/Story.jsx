import './story.scss';
import { Users } from '../../DummyData';
export default function Story(story) {
  return (
    <>
      <div className="storyWrapper">
        <img className="storyImage" src={story.story.storyImage} alt="" />
        <div className="storyInfo">
          <img
            className="profileImage"
            src={
              Users.filter((user) => user.id === story.story?.userId)[0]
                ?.profilePicture
            }
            alt=""
          />
          <span className="profileUsername">
            {
              Users.filter((user) => user.id === story.story?.userId)[0]
                ?.username
            }
          </span>
        </div>
      </div>
    </>
  );
}
