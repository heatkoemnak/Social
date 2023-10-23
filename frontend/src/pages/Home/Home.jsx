import './home.scss';
import Friends from '../../components/Friends/Friends';
import TopRightBar from '../../components/TopRightbar/TopRightbar';
import Feed from '../../components/Post/Feed';
export default function Home() {
  return (
    <>
      <div className="home">
        <TopRightBar />
        <div className="BottomRightBar">
          <Feed />
          <Friends />
        </div>
      </div>
    </>
  );
}
