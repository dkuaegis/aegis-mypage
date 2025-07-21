import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Profile from "../components/Profile";
import ActivitySection from "../components/ActivitySection";
import pointImg from '../assets/point.png';

const Home: React.FC = () => {
    const navigate = useNavigate();

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
                onClick={() => navigate("/category/points")}
              />
            </div>
            <div className="main-button-group">
              <Button text={"쿠폰함"} type={"MAIN"} onClick={() => navigate("/category/coupons")} />
              <Button text={"QR코드"} type={"MAIN"} onClick={() => navigate("/category/qr")} />
            </div>
            <ActivitySection />
        </div>
    )
}

export default Home;