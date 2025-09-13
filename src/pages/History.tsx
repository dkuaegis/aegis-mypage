import Header from "../components/Header";
import Card from "../components/Card";
import TabNavigation from "../components/TabNavigation";
import type { HistoryCardProps } from "../model/Card";

export default function History() {
    // 임시 Mock Data
    const historyData: HistoryCardProps[] = [
        {
            type: "history",
            title: "컴포즈 커피 쿠폰",
            date: "2024.03.15"
        },
        {
            type: "history",
            title: "스타벅스 아메리카노",
            date: "2024.03.14"
        },
        {
            type: "history",
            title: "할인쿠폰 10%",
            date: "2024.03.13"
        },
        {
            type: "history",
            title: "핫식스 에너지 드링크",
            date: "2024.03.12"
        },
        {
            type: "history",
            title: "치킨 배달 쿠폰",
            date: "2024.03.11"
        }
    ];

    return(
        <div>
            <Header leftChild={"<"} title={"선물함"} />
            <TabNavigation defaultTab="history" />
            <div style={{ padding: "18px" }}>
                {historyData.map((item, index) => (
                    <Card key={index} {...item} />
                ))}
            </div>
        </div>
    )
}