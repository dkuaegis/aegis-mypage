import type { MyRankCardProps } from '../model/Ranking';
import '../style/MyRankCard.css';

const MyRankCard: React.FC<Pick<MyRankCardProps, 'name' | 'rank' | 'score' | 'avatar'>> = ({ name, rank, score, avatar }) => {
  return (
    <div className="my-rank-card-container">
      <div className="my-rank-info">
        <img src={avatar} alt={name} className="my-rank-avatar" />
        <div className="my-rank-text">
          <p className="my-rank-name">{name}</p>
          <p className="my-rank-number">{rank}등</p>
        </div>
      </div>
      <div className="my-rank-score">
        {score.toLocaleString()}점
      </div>
    </div>
  );
};

export default MyRankCard; 