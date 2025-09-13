import "../style/Card.css";
import coinIcon from "../assets/point.svg";
import couponIcon from "../assets/coupon.svg";
import composeIcon from "../assets/prizes/compose.svg";
import discountCouponIcon from "../assets/prizes/discountcoupon.svg";
import starbucksIcon from "../assets/prizes/starbucks.svg";
import hotsixIcon from "../assets/prizes/hotsix.svg";
import chickenIcon from "../assets/prizes/chicken.svg";
import { IoHelpCircleOutline } from "react-icons/io5";
import { useState } from "react";
import type { CardProps } from "../model/Card";

// 상품명 기반 이미지 매핑 함수
const getPrizeIcon = (title: string): string => {
  const titleLower = title.toLowerCase();
  
  if (titleLower.includes("컴포즈")) {
    return composeIcon;
  }
  if (titleLower.includes("할인쿠폰")) {
    return discountCouponIcon;
  }
  if (titleLower.includes("스타벅스")) {
    return starbucksIcon;
  }
  if (titleLower.includes("핫식스")) {
    return hotsixIcon;
  }
  if (titleLower.includes("치킨")) {
    return chickenIcon;
  }
  return "";
};

const Card: React.FC<CardProps> = (props) => {
  const [showTooltip, setShowTooltip] = useState(false);

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
  if(props.type === "coupon") {
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
  }
  // 뽑기내역 카드
  if(props.type === "history") {
    const prizeIcon = getPrizeIcon(props.title);
    return (
      <div className="card history-card">
        <img src={prizeIcon} alt={props.title} className="card-icon" />
        <div className="card-content">
          <div className="history-card card-title">{props.title}</div>
          <div className="history-card card-date">{props.date}</div>
        </div>
        <div className="help-icon-container">
          <IoHelpCircleOutline
            size={24}
            className="help-icon"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          />
          {showTooltip && (
            <div className="tooltip">
              상품은 관리자가 기프티콘으로 익일 일괄로 지급할 예정입니다!
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export default Card;