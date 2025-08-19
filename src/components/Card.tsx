import "../style/Card.css";
import coinIcon from "../assets/point.svg";
import couponIcon from "../assets/coupon.png";
import type { CardProps } from "../model/Card";

const Card: React.FC<CardProps> = (props) => {
  // 포인트 카드
  if (props.type === "point") {
    const isPlus = props.amount > 0;
    return (
      <div className="card point-card">
        <img src={coinIcon} alt="동전" className="card-icon" />
        <div className="card-content">
          <div className="card-title">{props.title}</div>
          <div className="card-date">{props.date}</div>
        </div>
        <div className={`card-amount ${isPlus ? "plus" : "minus"}`}>
          {isPlus ? "+" : "-"}{Math.abs(props.amount).toLocaleString()}점
        </div>
      </div>
    );
  }
  // 쿠폰 카드
  const isUsed = props.status === "사용후";
  return (
    <div className={`card coupon-card${isUsed ? " used" : ""}`}>
      <img src={couponIcon} alt="쿠폰" className="card-icon" />
      <div className="card-content">
        <div className="card-title">{props.price}</div>
        <div className="card-desc">{props.desc}</div>
      </div>
      <div className={`card-coupon-status${isUsed ? " used" : ""}`}>{props.status}</div>
    </div>
  );
};

export default Card;