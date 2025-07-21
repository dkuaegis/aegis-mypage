import React, { useState } from "react";
import Header from "../components/Header";
import TabSelector from "../components/TabSelector";
import Card from "../components/Card";

const Coupons: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <div>
      <Header leftChild={"<"} title={"쿠폰함"} />
      <TabSelector
        tabs={["전체", "적립", "사용"]}
        selected={selectedTab}
        onSelect={setSelectedTab}
      />
      <div className="coupons-history-list">
        <Card />
      </div>
    </div>
  );
};

export default Coupons;