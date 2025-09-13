import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { issueQRCode } from "../api/QRCode";
import { getMyPage } from "../api/Mypage";
import Header from "../components/Header";
import Button from "../components/Button";
import Profile from "../components/Profile";
import ActivitySection from "../components/ActivitySection";
import QRModal from "../components/QRModal";
import pointImg from '../assets/point.svg';
//import aegisLogo from '../assets/aegisLogo.svg';/

const Home: React.FC = () => {
    const [mypage, setMypage] = useState<{ name: string; profileIcon: string; pointBalance: number } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [showQRModal, setShowQRModal] = useState(false);
    const [qrUrl, setQrUrl] = useState<string>('');

    // 사용자 정보 조회 API 호출
    useEffect(() => {
      (async () => {
        try {
          const data = await getMyPage();
          setMypage(data);
          setIsLoading(false);
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

    if (isLoading) {
      return <div></div>;
    }

    return (
        <div>
            <Header leftChild={""} title={""}/>           
              <Profile mypage={mypage} />
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
              <Button text={"선물함"} type={"MAIN"} onClick={() => navigate("/category/giftbox/history")} />
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