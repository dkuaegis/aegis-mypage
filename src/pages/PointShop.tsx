import Header from "../components/Header";
// import { lazy } from "react";
// const GachaMachine3D = lazy(() => import("../components/GachaMachine3D"));
// import type { GachaItem } from "../components/GachaMachine3D";
import Button from "../components/Button";
import "../style/PointShop.css";

// const items: GachaItem[] = [
//   { id: 'prize1', label: '치킨', color: '#FDF385'},
//   { id: 'prize2', label: '스타벅스 1만원권 상품권', color: '#CEF286' },
//   { id: 'prize3', label: '회비 할인 쿠폰', color: '#C2B5FB' },
//   { id: 'prize4', label: '컴포즈커피 아메리카노', color: '#FF5975' },
//   { id: 'prize5', label: '핫식스', color: '#74B8FF' },

// ];

const PointShop: React.FC = () => {
    return (
        <div>
            <Header leftChild={"<"} title={"포인트샵"}/>
            <div className="gacha-desc">꽝없는 뽑기!</div>
            <div className="gacha-title">임세윤님, 100포인트를<br />뽑기 1회권으로 교환할 수 있어요!</div>
            <div className="gachalist-container"></div>
            <div className="gacha-desc">핫식스, 스타벅스 상품권, 치킨 등 <br />복권에서 나온 상품으로 교환 가능해요</div>
            <Button text={"교환하기"} type={"EXCHANGE"} onClick={() => ""} />
        </div>
    )
}

export default PointShop;

{/* <div className="gacha-container">
                <GachaMachine3D
                items={items}
                onResult={(it: GachaItem) => console.log("결과:", it.label)}
                width={320}
                height={385}
                modelScale={0.6}
                />
            </div> */}