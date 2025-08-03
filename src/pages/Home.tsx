import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { issueQRCode } from "../api/QRCode";
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
    const [qrUrl, setQrUrl] = useState<string>('');

    // 사용자 정보 조회 API 호출
    useEffect(() => {
      (async () => {
        try {
          const data = await getMyPage();
          setMypage(data);
        } catch (error) {
          console.error("사용자 정보 조회 실패:", error);
          navigate("/login/auth");
        }
      })();
    }, [navigate]);
    
    // QRCode 생성 API 호출
    const onClickQR = async () => {
      try {
        const base64 = await issueQRCode();
        setQrUrl(`data:image/png;base64,${base64}`);
        setShowQRModal(true);
      } catch (e) {
        console.error('QR 발급 실패:', e);
      }
    };

    return (
        <div>
            <Header leftChild={"<"} title={"마이"} backPath="/login/auth"/>
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
              <Button text={"QR코드"} type={"MAIN"} onClick={onClickQR} />
            </div>
            <ActivitySection />

            {showQRModal && (
              <QRModal onClose={() => setShowQRModal(false)} qrImageUrl={qrUrl} />
            )}
        </div>
    )
}

export default Home;