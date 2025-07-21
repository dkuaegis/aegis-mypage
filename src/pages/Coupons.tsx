import { useState } from "react";
import Header from "../components/Header";
import TabSelector from "../components/TabSelector";
import Card from "../components/Card";
import EmptyState from "../components/EmptyState";

const Coupons: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  // 더미 쿠폰 데이터
  const couponData: { id: number; price: string; desc: string; status: "사용전" | "사용후" }[] = [];

  return (
    <div>
      <Header leftChild={"<"} title={"쿠폰함"} />
      {couponData.length > 0 ? (
        <>
          <TabSelector
            tabs={["전체", "사용전", "사용후"]}
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
        </>
      ) : (
        <EmptyState type="coupon" />
      )}
    </div>
  );
};

export default Coupons;