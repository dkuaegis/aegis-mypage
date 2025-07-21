import { useState } from "react";
import Header from "../components/Header";
import TabSelector from "../components/TabSelector";
import Card from "../components/Card";

const Coupons: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  // 더미 쿠폰 데이터
  const couponData = [
    {
      id: 1,
      price: "2000원",
      desc: "동아리 회비 할인 쿠폰",
      status: "사용전" as const,
    },
    {
      id: 2,
      price: "2000원",
      desc: "동아리 회비 할인 쿠폰",
      status: "사용후" as const,
    },
  ];
  return (
    <div>
      <Header leftChild={"<"} title={"쿠폰함"} />
      <TabSelector
        tabs={["전체", "적립", "사용"]}
        selected={selectedTab}
        onSelect={setSelectedTab}
      />
      <div className="coupons-history-list">
        {couponData.map((item) => (
          <Card
            key={item.id}
            type="coupon"
            price={item.price}
            desc={item.desc}
            status={item.status}
          />
        ))}
      </div>
    </div>
  );
};

export default Coupons;