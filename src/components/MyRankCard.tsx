import type { MyRankCardProps } from '../model/Ranking';
import '../style/MyRankCard.css';
import javaIcon from '../../public/SWIFT.png';

const MyRankCard: React.FC<Pick<MyRankCardProps, 'name' | 'rank' | 'score'>> = ({ name, rank, score }) => {
  return (
    <div className="my-rank-card-container">
      <div className="my-rank-info">
        <img src={javaIcon} alt={name} className="my-rank-avatar" />
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