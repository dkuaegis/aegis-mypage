import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import pointshopImg from "../assets/pointShop.svg";
import rankingImg from "../assets/ranking.svg";
import "../style/ActivitySection.css";

const ActivitySection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="activity-section">
      <div className="activity-title">나의 활동</div>
      <div className="activity-button-group">
        <Button
          text={
            <span className="activity-btn-content">
              <img src={pointshopImg} alt="포인트샵" className="activity-icon" />
              <span>포인트샵</span>
            </span>
          }
          type="ACTIVITY"
          onClick={() => navigate("/category/pointshop")}
        />
        <Button
          text={
            <span className="activity-btn-content">
              <img src={rankingImg} alt="랭킹" className="activity-icon" />
              <span>랭킹</span>
            </span>
          }
          type="ACTIVITY"
          onClick={() => navigate("/category/ranking")}
        />
      </div>
    </div>
  );
};

export default ActivitySection;