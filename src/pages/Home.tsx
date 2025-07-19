import Header from "../components/Header";
import Button from "../components/Button";
import Profile from "../components/Profile";
import ActivitySection from "../components/ActivitySection";
import pointImg from '../assets/point.png';

const Home = () => {
    return (
        <div>
            <Header leftChild={"<"} title={"마이"} />
            <Profile />
            <div className="point-box">
              <Button
                text={
                  <span className="point-info">
                    <img src={pointImg} alt="포인트" />
                    <span className="point-text">3,250</span>
                  </span>
                }
                type="POINT"
                onClick={() => {}}
              />
            </div>
            <div className="main-button-group">
              <Button text={"쿠폰함"} type={"MAIN"} onClick={() => {}} />
              <Button text={"QR코드"} type={"MAIN"} onClick={() => {}} />
            </div>
            <ActivitySection />
        </div>
    )
}

export default Home;