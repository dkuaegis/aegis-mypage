import React, { useState } from "react";
import Header from "../components/Header";
import PointSummary from "../components/PointSummary";
import TabSelector from "../components/TabSelector";
import Card from "../components/Card";

const Points: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const point = 3250;

  // 더미 포인트 내역 데이터
  const historyData = [
    {
      id: 1,
      title: "쿠폰 발행",
      date: "2025년 11월 12일",
      amount: -200,
    },
    {
      id: 2,
      title: "쿠폰 발행",
      date: "2025년 11월 3일",
      amount: -200,
    },
    {
      id: 3,
      title: "스터디 참여",
      date: "2025년 10월 25일",
      amount: 200,
    },
    {
      id: 4,
      title: "스터디 참여",
      date: "2025년 10월 15일",
      amount: 200,
    },
  ];

  return (
    <div>
      <Header leftChild="<" title="포인트" />
      <PointSummary point={point} />
      <TabSelector
        tabs={["전체", "적립", "사용"]}
        selected={selectedTab}
        onSelect={setSelectedTab}
      />
      <div className="points-history-list">
        <Card />
      </div>
    </div>
  );
};

export default Points;