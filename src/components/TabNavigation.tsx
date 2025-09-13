import { useState } from "react";
import "../style/TabNavigation.css";
import type { TabNavigationProps } from "../model/TabNavigation";

const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs: customTabs,
  onTabChange,
  defaultTab
}) => {
  // 기본 탭 설정 (선물함용)
  const defaultTabs = [
    { id: "history", label: "뽑기내역" },
    { id: "coupons", label: "쿠폰" }
  ];

  const tabs = customTabs || defaultTabs;
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);

    // 기본 라우팅 로직 (선물함용)
    if (!customTabs) {
      if (tabId === "history") {
        window.location.href = "/category/giftbox/history";
      } else if (tabId === "coupons") {
        window.location.href = "/category/giftbox/coupons";
      }
    }

    onTabChange?.(tabId);
  };

  return (
    <div className="tab-navigation">
      <div className="tab-list">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-item ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-indicator-container">
        <div
          className="tab-indicator"
          style={{
            transform: `translateX(${tabs.findIndex(tab => tab.id === activeTab) * 100}%)`,
            width: `${100 / tabs.length}%`
          }}
        />
        </div>
    </div>
  );
};

export default TabNavigation;