import { useState } from "react";
import Header from "../components/Header";
import PointSummary from "../components/PointSummary";
import TabSelector from "../components/TabSelector";
import Card from "../components/Card";
import EmptyState from "../components/EmptyState";

const Points: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const point = 3250;

  // 더미 포인트 내역 데이터 (현재 비어있음)
  const historyData: { id: number; title: string; date: string; amount: number }[] = [];

  return (
    <div>
      <Header leftChild="<" title="포인트" />
      {historyData.length > 0 ? (
        <>
          <PointSummary point={point} />
          <TabSelector
            tabs={["전체", "적립", "사용"]}
            selected={selectedTab}
            onSelect={setSelectedTab}
          />
          <div className="points-history-list">
            {historyData.map((item) => (
              <Card
                key={item.id}
                type="point"
                title={item.title}
                date={item.date}
                amount={item.amount}
              />
            ))}
          </div>
        </>
      ) : (
        <EmptyState type="point" />
      )}
    </div>
  );
};

export default Points;