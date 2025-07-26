import { useState, useEffect } from "react";
import { getPointSummary } from "../api/Points";
import type { PointSummaryView } from "../model/Points";
import Header from "../components/Header";
import PointSummary from "../components/PointSummary";
import TabSelector from "../components/TabSelector";
import Card from "../components/Card";
import EmptyState from "../components/EmptyState";

const Points: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [summary, setSummary] = useState<PointSummaryView | null>(null);

  // 포인트 api 호출
  useEffect(() => {
    (async () => {
      try {
        const data = await getPointSummary();
        setSummary(data);
      } catch (e) {
        console.error("포인트 조회 실패:", e);
        setSummary({ balance: 0, history: [] });
      }
    })();
  }, []);

  const balance = summary?.balance ?? 0;
  const transactions = summary?.history ?? [];

  // 포인트 적립/사용 정렬
  const filteredData = (summary?.history ?? []).filter((t) => {
    if (selectedTab === 1) return t.sign === "+"; // 적립
    if (selectedTab === 2) return t.sign === "-"; // 사용
    return true; // 전체
  });

  return (
    <div>
      <Header leftChild="<" title="포인트" />
           {transactions.length === 0 && balance === 0 ? (
            <EmptyState type="point" />
          ) : (
        <>
        <PointSummary point={balance} />
          <TabSelector
            tabs={["전체", "적립", "사용"]}
            selected={selectedTab}
            onSelect={setSelectedTab}
          />

          <div className="points-history-list">
            {filteredData.map((item) => (
              <Card
                key={item.pointTransactionId}
                type="point"
                title={item.reason}
                date={item.createdAt}
                amount={item.signedAmount}
              />
          ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Points;