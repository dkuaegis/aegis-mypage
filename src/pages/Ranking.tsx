import Header from "../components/Header";
import RankingInfo from "../components/RankingInfo";
import RankingList from "../components/RankingList";
import MyRankCard from "../components/MyRankCard";

const Ranking: React.FC = () => {
  return (
    <div>
      <Header leftChild="<" title="랭킹" />
      <RankingInfo totalParticipants={170} />
      <RankingList />
      <MyRankCard name="김단국" rank={11} score={320} />
    </div>
  );
};

export default Ranking;