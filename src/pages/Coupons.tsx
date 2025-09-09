import { useEffect, useState } from "react";
import Header from "../components/Header";
import TabSelector from "../components/TabSelector";
import Card from "../components/Card";
import EmptyState from "../components/EmptyState";
import { getCoupons } from "../api/Coupons";
import type { CouponCardProps } from "../model/Card";

const formatPrice = (amount: number): string => `${amount.toLocaleString()}원`;

const Coupons: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [couponItems, setCouponItems] = useState<
    Array<{
      id: number;
      price: string;
      desc: string;
      status: CouponCardProps["status"];
    }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  // 쿠폰 API 호출
  useEffect(() => {
    (async () => {
      try {
        const data = await getCoupons(); // [{ issuedCouponId, couponName, discountAmount, isValid }, ...]
        const mapped = (data ?? []).map((c) => ({
          id: c.issuedCouponId,
          price: formatPrice(c.discountAmount),
          desc: c.couponName,
          status: (c.isValid ? "사용전" : "사용후") as CouponCardProps["status"],
        }));
        setCouponItems(mapped);
      } catch (e) {
        console.error("쿠폰 조회 실패:", e);
        setCouponItems([]);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // 로딩 중일 때는 아무것도 렌더링하지 않음
  if (isLoading) {
    return (
      <div>
        <Header leftChild={"<"} title={"쿠폰함"} />
      </div>
    );
  }

  // 탭 필터: 0 전체, 1 사용전, 2 사용후
  const filteredData = couponItems.filter((item) => {
    if (selectedTab === 1) return item.status === "사용전";
    if (selectedTab === 2) return item.status === "사용후";
    return true; // 전체
  });

  return (
    <div>
      <Header leftChild={"<"} title={"쿠폰함"} />
      {couponItems.length === 0 ? (
        <EmptyState type="coupon" />
      ) : (
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
      )}
    </div>
  );
};

export default Coupons;