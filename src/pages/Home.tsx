import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyPage } from "../api/Mypage";
import Header from "../components/Header";
import Button from "../components/Button";
import Profile from "../components/Profile";
import ActivitySection from "../components/ActivitySection";
import QRModal from "../components/QRModal";
import pointImg from '../assets/point.png';

const Home: React.FC = () => {
    const [mypage, setMypage] = useState<{ name: string; profileIcon: string; pointBalance: number } | null>(null);
    const navigate = useNavigate();
    const [showQRModal, setShowQRModal] = useState(false);

    // API 호출
    useEffect(() => {
      (async () => {
        const data = await getMyPage();
        setMypage(data);
      })();
    }, []);

    return (
        <div>
            <Header leftChild={"<"} title={"마이"} />
            <Profile />
            <div className="point-box">
              <Button
                text={
                  <span className="point-info">
                    <img src={pointImg} alt="포인트" />
                    <span className="point-text">{mypage?.pointBalance}</span>
                  </span>
                }
                type="POINT"
                onClick={() => navigate("/category/points")}
              />
            </div>
            <div className="main-button-group">
              <Button text={"쿠폰함"} type={"MAIN"} onClick={() => navigate("/category/coupons")} />
              <Button text={"QR코드"} type={"MAIN"} onClick={() => setShowQRModal(true)} />
            </div>
            <ActivitySection />

            {showQRModal && (
              <QRModal
                onClose={() => setShowQRModal(false)}
                qrImageUrl="https://dummyimage.com/150x150/cccccc/000000.png&text=QR" // 임시 QR
              />
            )}
        </div>
    )
}

export default Home;