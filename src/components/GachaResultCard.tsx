import "../style/GachaResultCard.css";
import ImgPrize1 from "../assets/prizes/hotsix.svg";
import ImgPrize2 from "../assets/prizes/compose.svg";
import ImgPrize3 from "../assets/prizes/discountcoupon.svg";
import ImgPrize4 from "../assets/prizes/starbucks.svg";
import ImgPrize5 from "../assets/prizes/chicken.svg";
import Button from "./Button";
import type { GachaResultCardProps } from "../model/Gacha";

const PRIZE_IMAGE_MAP: Record<string, string> = {
  "핫식스": ImgPrize1,
  "컴포즈커피": ImgPrize2,
  "회비 할인 쿠폰": ImgPrize3,
  "스타벅스 1만원권": ImgPrize4,
  "치킨": ImgPrize5,
};

function resolvePrizeImage(label: string, explicit?: string) {
  if (explicit) return explicit;
  const hit = Object.entries(PRIZE_IMAGE_MAP).find(([key]) =>
    label.includes(key)
  );
  return hit?.[1];
}

export default function GachaResultCard({ item, onClose }: GachaResultCardProps) {
  const { label, imageSrc } = item;
  const img = resolvePrizeImage(label, imageSrc);

  return (
    <div className="result-overlay" role="dialog" aria-modal="true">
      <div className="result-card">
        <p className="result-desc">포인트 뽑기 결과</p>
        <h3 className="result-title">축하합니다! <br />🎊 {label} 당첨 🎊</h3>
        <div className="result-image-wrapper">{img && <img className="result-image" src={img} alt={label} />}</div>
        <Button text="선물함으로 이동" type="GACHAHIS" onClick={() => { onClose(); window.location.href = '/category/giftbox/history'; }}/>
        <Button text="확인하기" type="GACHASAVE" onClick={onClose}/>
      </div>
    </div>
  );
}
