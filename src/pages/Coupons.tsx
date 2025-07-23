import { useState } from "react";
import Header from "../components/Header";
import TabSelector from "../components/TabSelector";
import Card from "../components/Card";
import EmptyState from "../components/EmptyState";

const Coupons: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  // 더미 쿠폰 데이터
  const couponData = [
    { id: 1, price: '5,000원', desc: 'Aegis 웰컴 쿠폰', status: '사용전' as const },
    { id: 2, price: '10% 할인', desc: '단국대 제휴 쿠폰', status: '사용전' as const },
    { id: 3, price: '아메리카노 1잔', desc: 'GS25 제휴 쿠폰', status: '사용후' as const },
    { id: 4, price: '3,000원', desc: '퀴즈 이벤트 보상', status: '사용후' as const },
    { id: 5, price: '2,000원', desc: 'Aegis 출석 보상', status: '사용전' as const },
  ];

  const filteredData = couponData.filter(item => {
    if (selectedTab === 1) { // 사용전
      return item.status === '사용전';
    }
    if (selectedTab === 2) { // 사용후
      return item.status === '사용후';
    }
    return true; // 전체
  });
  
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
            {filteredData.map((item) => (
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