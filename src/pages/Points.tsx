import { useState } from "react";
import Header from "../components/Header";
import PointSummary from "../components/PointSummary";
import TabSelector from "../components/TabSelector";
import Card from "../components/Card";
import EmptyState from "../components/EmptyState";
import { calculateTotalPoints } from "../utils/PointUtils";

const Points: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  // 더미 포인트 내역 데이터
  const historyData = [
    { id: 1, title: 'GS25 편의점', date: '2024.07.01', amount: -1500 },
    { id: 2, title: '영어퀴즈 정답', date: '2024.07.02', amount: 500 },
    { id: 3, title: '로그인 보상', date: '2024.07.03', amount: 100 },
    { id: 4, title: 'Aegis 기념품 교환', date: '2024.07.04', amount: -500 },
    { id: 5, title: '단국대학교 퀴즈', date: '2024.07.05', amount: 1000 },
    { id: 6, title: '이벤트 당첨', date: '2024.07.06', amount: 3650 },
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const point = calculateTotalPoints(historyData);

  const filteredData = historyData.filter(item => {
    if (selectedTab === 1) { // 적립
      return item.amount > 0;
    }
    if (selectedTab === 2) { // 사용
      return item.amount < 0;
    }
    return true; // 전체
  });

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
            {filteredData.map((item) => (
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