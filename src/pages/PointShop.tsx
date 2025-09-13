import { lazy, useState } from "react";
import type { GachaItem } from "../model/Gacha";
import GachaList from "../components/GachaList";
import Header from "../components/Header";
import Button from "../components/Button";
const GachaMachine3D = lazy(() => import("../components/GachaMachine3D"));
import "../style/PointShop.css";

const items: GachaItem[] = [
  { id: 'prize1', label: '치킨', color: '#FDF385'},
  { id: 'prize2', label: '스타벅스 1만원권 상품권', color: '#CEF286' },
  { id: 'prize3', label: '회비 할인 쿠폰', color: '#C2B5FB' },
  { id: 'prize4', label: '컴포즈커피 아메리카노', color: '#FF5975' },
  { id: 'prize5', label: '핫식스', color: '#74B8FF' },
];

const PointShop: React.FC = () => {
    const [showGacha, setShowGacha] = useState(false);

    return (
        <>
        <Header leftChild={"<"} title={"포인트샵"}/>
        <div className="pointshop-page">
            <p className="gacha-desc">꽝없는 뽑기!</p>
            <h1 className="gacha-title">임세윤님, 100포인트를<br />뽑기 1회권으로 교환할 수 있어요!</h1>
            {!showGacha ? (
                <>
                <GachaList />
                <p className="gacha-list-desc">핫식스, 스타벅스 상품권, 치킨 등 <br />뽑기에서 나온 상품들은<br />기프티콘으로 교환해드려요</p>
                <Button text={"교환하기"} type={"EXCHANGE"} onClick={() => setShowGacha(true)} />
            </>
        ) : (
                <div className="gacha-container">
                <GachaMachine3D
                    items={items}
                    onResult={(it: GachaItem) => console.log("결과:", it.label)}
                    width={320}
                    height={385}
                    modelScale={0.7}
                />
            </div>
        )}
        </div>
    </>
    )
};

export default PointShop;