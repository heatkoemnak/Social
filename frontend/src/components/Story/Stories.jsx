import Story from './Story';
import { stories } from '../../DummyData';
import './stories.scss';
export default function Stories() {
  return (
    <>
      <div className="headerStory">
        <h2 className="story-title">Stories</h2>
        <div className="createStory">
          <i className="fas fa-plus "></i>
          <button className="storyBtn">Create Story</button>
        </div>
      </div>
      <div className="storiesContainer">
        {stories.map((s, index) => (
          <Story key={index} story={s} />
        ))}
      </div>
    </>
  );
}
