import "../style/GachaResultCard.css";
import ImgPrize1 from "../assets/prizes/chicken.svg";
import ImgPrize2 from "../assets/prizes/starbucks.svg";
import ImgPrize3 from "../assets/prizes/discountcoupon.svg";
import ImgPrize4 from "../assets/prizes/compose.svg";
import ImgPrize5 from "../assets/prizes/hotsix.svg";
import Button from "./Button";

const PRIZE_IMAGE_MAP: Record<string, string> = {
  "치킨": ImgPrize1,
  "스타벅스 1만원권": ImgPrize2,
  "회비 할인 쿠폰": ImgPrize3,
  "컴포즈커피": ImgPrize4,
  "핫식스": ImgPrize5,
};

export type GachaResultCardProps = {
  item: {
    label: string;
    imageSrc?: string;
    description?: string;
  };
  onClose: () => void;
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
        <Button text="확인하기" type="GACHASAVE" onClick={onClose}/>
      </div>
    </div>
  );
}
