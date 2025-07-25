import { useEffect, useState } from "react";
import Header from "../components/Header";
import RankingInfo from "../components/RankingInfo";
import RankingList from "../components/RankingList";
import MyRankCard from "../components/MyRankCard";
import { getRankingData } from "../api/Ranking";
import type { RankingInfoProps, MyRankCardProps } from "../model/Ranking";

const Ranking: React.FC = () => {
  const [info, setInfo] = useState<RankingInfoProps>({ totalParticipants: 0 });
  const [me, setMe] = useState<MyRankCardProps | null>(null);

  // 랭킹 api 호출
  useEffect(() => {
    (async () => {
      try {
        const { info, me } = await getRankingData();
        setInfo(info);
        setMe(me);
      } catch (error) {
        console.error("랭킹 데이터를 불러오지 못했습니다:", error);
      }
    })();
  }, []);

  return (
    <div>
      <Header leftChild="<" title="랭킹" />
      <RankingInfo totalParticipants={info.totalParticipants} />
      <RankingList />
      {me && (
        <MyRankCard
          name={me.name}
          rank={me.rank}
          score={me.score}
          avatar={me.avatar}
        />
      )}
    </div>
  );
};

export default Ranking;