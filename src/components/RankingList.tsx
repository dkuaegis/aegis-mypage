import type { RankingListProps } from '../model/Ranking';
import '../style/RankingList.css';

const RankingList: React.FC<RankingListProps> = ({ items }) => {
  const getRankIndicator = (rank: number) => {
    // 1, 2, 3위는 메달 이모지로 구분
    if (rank === 1) return <div className="rank-medal">🥇</div>;
    if (rank === 2) return <div className="rank-medal">🥈</div>;
    if (rank === 3) return <div className="rank-medal">🥉</div>;
    return <div className="rank-number">{rank}</div>;
  };

  return (
    <div className="ranking-list-container">
      {items.map((item) => (
        <div key={`${item.rank}-${item.name}`} className="ranking-item">
          {getRankIndicator(item.rank)}
          {item.avatar && (
            <img src={item.avatar} alt={item.name} className="ranking-avatar" />
          )}
          <div className="ranking-user-info">
            <p className="ranking-name">{item.name}</p>
            <p className="ranking-score">{item.score.toLocaleString()}점</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RankingList;